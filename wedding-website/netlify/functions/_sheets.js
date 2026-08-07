import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

let cachedDoc = null;

export async function getSheet(tabName) {
  if (!cachedDoc) {
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    cachedDoc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);
    await cachedDoc.loadInfo();
  }
  const sheet = cachedDoc.sheetsByTitle[tabName];
  if (!sheet) throw new Error(`Sheet tab "${tabName}" not found`);
  return sheet;
}
