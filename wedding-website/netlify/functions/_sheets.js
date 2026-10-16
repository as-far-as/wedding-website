import { createSign } from 'node:crypto';

// Talks to the Google Sheets API directly over native fetch (Node 22 ships
// it built in). This deliberately avoids google-auth-library/google-spreadsheet:
// their HTTP client chain (gaxios -> node-fetch -> fetch-blob) doesn't bundle
// cleanly under Netlify's Functions esbuild step, and this OAuth2 JWT-bearer
// flow is simple enough to implement directly with node:crypto.

const TOKEN_URL = 'https://oauth2.googleapis.com/token';
const SHEETS_API = 'https://sheets.googleapis.com/v4/spreadsheets';

let cachedToken = null; // { accessToken, expiresAt }

function base64url(input) {
  return Buffer.from(input)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

// Accepts the private key either as a base64-encoded blob (recommended —
// immune to the newline/quote mangling that happens when pasting a raw PEM
// key into an env var UI) or as a raw PEM string (with real or escaped \n).
function resolvePrivateKey() {
  const raw = (process.env.GOOGLE_PRIVATE_KEY || '').trim();
  if (!raw) return raw;
  if (!raw.includes('BEGIN')) {
    try {
      const decoded = Buffer.from(raw, 'base64').toString('utf-8');
      if (decoded.includes('BEGIN')) return decoded;
    } catch {
      // fall through to raw-PEM handling below
    }
  }
  const unquoted = raw.replace(/^['"]|['"]$/g, '');
  return unquoted.replace(/\\n/g, '\n');
}

async function getAccessToken() {
  const now = Math.floor(Date.now() / 1000);
  if (cachedToken && cachedToken.expiresAt > now + 30) {
    return cachedToken.accessToken;
  }

  const header = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claims = base64url(JSON.stringify({
    iss: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    scope: 'https://www.googleapis.com/auth/spreadsheets',
    aud: TOKEN_URL,
    iat: now,
    exp: now + 3600,
  }));
  const signingInput = `${header}.${claims}`;
  const signature = createSign('RSA-SHA256').update(signingInput).sign(resolvePrivateKey());
  const assertion = `${signingInput}.${base64url(signature)}`;

  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion,
    }),
  });

  if (!res.ok) {
    throw new Error(`Google auth failed: ${res.status} ${await res.text()}`);
  }

  const data = await res.json();
  cachedToken = { accessToken: data.access_token, expiresAt: now + data.expires_in };
  return cachedToken.accessToken;
}

// Normalizes a header cell to a lookup key that's tolerant of however it's
// styled in the sheet — "Plus One Name", "PlusOneName", "plus_one_name" and
// "plusOneName" all resolve to the same key, so a header renaming (case,
// spacing, underscores) doesn't silently break the read side.
function normalizeKey(key) {
  return key.toString().trim().toLowerCase().replace(/[^a-z0-9]/g, '');
}

function rowsToObjects(values) {
  if (!values || values.length === 0) return [];
  const [header, ...rows] = values;
  const keys = header.map(normalizeKey);
  return rows.map((row, i) => {
    const obj = { _rowNumber: i + 2 }; // +2: header row + 1-index
    keys.forEach((key, j) => { obj[key] = row[j] ?? ''; });
    return obj;
  });
}

// Converts a 0-based column index to its Sheets letter (0 -> A, 25 -> Z, 26 -> AA, ...).
function columnToLetter(index) {
  let letter = '';
  let n = index;
  while (n >= 0) {
    letter = String.fromCharCode((n % 26) + 65) + letter;
    n = Math.floor(n / 26) - 1;
  }
  return letter;
}

export async function readSheetRows(tabName) {
  const token = await getAccessToken();
  const url = `${SHEETS_API}/${process.env.GOOGLE_SHEET_ID}/values/${encodeURIComponent(tabName)}`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) {
    throw new Error(`Sheets read failed: ${res.status} ${await res.text()}`);
  }
  const data = await res.json();
  return rowsToObjects(data.values);
}

// Guards against spreadsheet formula injection: with valueInputOption=USER_ENTERED,
// Sheets treats a cell starting with =, +, -, or @ as a formula. A leading
// apostrophe forces it to be read as plain text instead, so a guest typing
// something like "=IMPORTXML(...)" into a free-text field can't leave a live
// formula sitting in the sheet.
function sanitizeForSheets(value) {
  if (typeof value !== 'string') return value;
  return /^[=+\-@]/.test(value) ? `'${value}` : value;
}

export async function appendRow(tabName, rowValues) {
  const token = await getAccessToken();
  const url = `${SHEETS_API}/${process.env.GOOGLE_SHEET_ID}/values/${encodeURIComponent(tabName)}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ values: [rowValues.map(sanitizeForSheets)] }),
  });
  if (!res.ok) {
    throw new Error(`Sheets append failed: ${res.status} ${await res.text()}`);
  }
}

// Finds a header's column (0-based), creating it at the end of the header
// row if it isn't there yet — mirrors the same on-demand-column pattern the
// Apps Script mail merge uses for "Invite Sent At".
export async function getOrCreateColumnIndex(tabName, headerName) {
  const token = await getAccessToken();
  const headerUrl = `${SHEETS_API}/${process.env.GOOGLE_SHEET_ID}/values/${encodeURIComponent(`${tabName}!1:1`)}`;
  const res = await fetch(headerUrl, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) {
    throw new Error(`Sheets header read failed: ${res.status} ${await res.text()}`);
  }
  const data = await res.json();
  const header = (data.values && data.values[0]) || [];
  const index = header.map(normalizeKey).indexOf(normalizeKey(headerName));
  if (index !== -1) return index;

  const newIndex = header.length;
  await updateCell(tabName, 1, newIndex, headerName);
  return newIndex;
}

export async function updateCell(tabName, rowNumber, colIndex, value) {
  const token = await getAccessToken();
  const range = `${tabName}!${columnToLetter(colIndex)}${rowNumber}`;
  const url = `${SHEETS_API}/${process.env.GOOGLE_SHEET_ID}/values/${encodeURIComponent(range)}?valueInputOption=USER_ENTERED`;
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ values: [[sanitizeForSheets(value)]] }),
  });
  if (!res.ok) {
    throw new Error(`Sheets cell update failed: ${res.status} ${await res.text()}`);
  }
}
