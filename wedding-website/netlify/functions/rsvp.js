import { appendRow } from './_sheets.js';

const JSON_HEADERS = { 'Content-Type': 'application/json' };

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: JSON_HEADERS, body: JSON.stringify({ error: 'method_not_allowed' }) };
  }

  let data;
  try {
    data = JSON.parse(event.body || '{}');
  } catch {
    return { statusCode: 400, headers: JSON_HEADERS, body: JSON.stringify({ error: 'invalid_json' }) };
  }

  const { slug, name, attending, accommodation, dietary, message, plusOneName, plusOneAttending, plusOneDietary } = data;

  if (!slug || !name || !attending) {
    return { statusCode: 400, headers: JSON_HEADERS, body: JSON.stringify({ error: 'missing_fields' }) };
  }

  try {
    await appendRow('RSVPs', [
      new Date().toISOString(),
      slug,
      name,
      attending,
      dietary || '',
      message || '',
      plusOneName || '',
      plusOneAttending || '',
      plusOneDietary || '',
      accommodation || '',
    ]);

    return { statusCode: 200, headers: JSON_HEADERS, body: JSON.stringify({ success: true }) };
  } catch (err) {
    console.error('rsvp submission failed', err);
    return { statusCode: 500, headers: JSON_HEADERS, body: JSON.stringify({ error: 'server_error' }) };
  }
};
