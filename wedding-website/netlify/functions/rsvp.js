import { getSheet } from './_sheets.js';

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

  const { slug, name, attending, dietary, message, plusOneName, plusOneAttending, plusOneDietary } = data;

  if (!slug || !name || !attending) {
    return { statusCode: 400, headers: JSON_HEADERS, body: JSON.stringify({ error: 'missing_fields' }) };
  }

  try {
    const sheet = await getSheet('RSVPs');
    await sheet.addRow({
      Timestamp: new Date().toISOString(),
      Slug: slug,
      Name: name,
      Attending: attending,
      Dietary: dietary || '',
      Message: message || '',
      'Plus One Name': plusOneName || '',
      'Plus One Attending': plusOneAttending || '',
      'Plus One Dietary': plusOneDietary || '',
    });

    return { statusCode: 200, headers: JSON_HEADERS, body: JSON.stringify({ success: true }) };
  } catch (err) {
    console.error('rsvp submission failed', err);
    return { statusCode: 500, headers: JSON_HEADERS, body: JSON.stringify({ error: 'server_error' }) };
  }
};
