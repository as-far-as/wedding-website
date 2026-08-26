import { appendRow, readSheetRows } from './_sheets.js';

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

  const { slug, name, attending, accommodation, arrivalDay, departureDay, dietary, message, plusOneName, plusOneAttending, plusOneDietary } = data;

  if (!slug || !name || !attending) {
    return { statusCode: 400, headers: JSON_HEADERS, body: JSON.stringify({ error: 'missing_fields' }) };
  }

  try {
    // Reject submissions for a slug that isn't a real guest — this endpoint
    // is reachable directly (independent of the site password gate), so
    // without this check anyone could write arbitrary rows into the sheet.
    const guestRows = await readSheetRows('Guests');
    const guestExists = guestRows.some(
      (r) => (r.slug || '').trim().toLowerCase() === slug.trim().toLowerCase()
    );
    if (!guestExists) {
      return { statusCode: 404, headers: JSON_HEADERS, body: JSON.stringify({ error: 'guest_not_found' }) };
    }

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
      arrivalDay || '',
      departureDay || '',
    ]);

    return { statusCode: 200, headers: JSON_HEADERS, body: JSON.stringify({ success: true }) };
  } catch (err) {
    console.error('rsvp submission failed', err);
    return { statusCode: 500, headers: JSON_HEADERS, body: JSON.stringify({ error: 'server_error' }) };
  }
};
