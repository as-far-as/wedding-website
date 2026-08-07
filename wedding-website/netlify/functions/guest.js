import { getSheet } from './_sheets.js';

const JSON_HEADERS = { 'Content-Type': 'application/json' };

export const handler = async (event) => {
  const slug = (event.queryStringParameters || {}).slug;
  if (!slug) {
    return { statusCode: 400, headers: JSON_HEADERS, body: JSON.stringify({ error: 'missing_slug' }) };
  }

  try {
    const sheet = await getSheet('Guests');
    const rows = await sheet.getRows();
    const match = rows.find(
      (r) => (r.get('Slug') || '').trim().toLowerCase() === slug.trim().toLowerCase()
    );

    if (!match) {
      return { statusCode: 404, headers: JSON_HEADERS, body: JSON.stringify({ error: 'not_found' }) };
    }

    const plusOneRaw = (match.get('PlusOneAllowed') || '').toString().trim().toLowerCase();

    return {
      statusCode: 200,
      headers: JSON_HEADERS,
      body: JSON.stringify({
        name: match.get('Name') || '',
        plusOneAllowed: ['true', 'yes', '1'].includes(plusOneRaw),
      }),
    };
  } catch (err) {
    console.error('guest lookup failed', err);
    return { statusCode: 500, headers: JSON_HEADERS, body: JSON.stringify({ error: 'server_error' }) };
  }
};
