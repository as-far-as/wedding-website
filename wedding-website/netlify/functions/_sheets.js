import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

let cachedDoc = null;

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

export async function getSheet(tabName) {
  if (!cachedDoc) {
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: resolvePrivateKey(),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);
    await doc.loadInfo();
    cachedDoc = doc;
  }
  const sheet = cachedDoc.sheetsByTitle[tabName];
  if (!sheet) throw new Error(`Sheet tab "${tabName}" not found`);
  return sheet;
}
