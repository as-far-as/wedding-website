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

function rowsToObjects(values) {
  if (!values || values.length === 0) return [];
  const [header, ...rows] = values;
  return rows.map((row) => {
    const obj = {};
    header.forEach((key, i) => { obj[key] = row[i] ?? ''; });
    return obj;
  });
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

export async function appendRow(tabName, rowValues) {
  const token = await getAccessToken();
  const url = `${SHEETS_API}/${process.env.GOOGLE_SHEET_ID}/values/${encodeURIComponent(tabName)}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ values: [rowValues] }),
  });
  if (!res.ok) {
    throw new Error(`Sheets append failed: ${res.status} ${await res.text()}`);
  }
}
