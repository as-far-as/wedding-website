import { readSheetRows } from './_sheets.js';

const JSON_HEADERS = { 'Content-Type': 'application/json' };

export const handler = async (event) => {
  const slug = (event.queryStringParameters || {}).slug;
  if (!slug) {
    return { statusCode: 400, headers: JSON_HEADERS, body: JSON.stringify({ error: 'missing_slug' }) };
  }

  try {
    const guestRows = await readSheetRows('Guests');
    const match = guestRows.find(
      (r) => (r.Slug || '').trim().toLowerCase() === slug.trim().toLowerCase()
    );

    if (!match) {
      return { statusCode: 404, headers: JSON_HEADERS, body: JSON.stringify({ error: 'not_found' }) };
    }

    const houseInviteRaw = (match.HouseInvite || '').toString().trim().toLowerCase();

    const rsvpRows = await readSheetRows('RSVPs');
    const priorSubmissions = rsvpRows.filter(
      (r) => (r.slug || '').trim().toLowerCase() === slug.trim().toLowerCase()
    );
    const latest = priorSubmissions[priorSubmissions.length - 1];

    return {
      statusCode: 200,
      headers: JSON_HEADERS,
      body: JSON.stringify({
        name: match.Name || '',
        plusOneName: match.PlusOneName || '',
        houseInvite: ['true', 'yes', '1'].includes(houseInviteRaw),
        previousResponse: latest
          ? {
              attending: latest.attending || '',
              accommodation: latest.accommodation || '',
              arrivalDay: latest.arrival_day || '',
              departureDay: latest.departure_day || '',
              dietary: latest.dietary || '',
              message: latest.message || '',
              plusOneAttending: latest.plus_one_attending || '',
              plusOneDietary: latest.plus_one_dietary || '',
            }
          : null,
      }),
    };
  } catch (err) {
    console.error('guest lookup failed', err);
    return { statusCode: 500, headers: JSON_HEADERS, body: JSON.stringify({ error: 'server_error' }) };
  }
};
