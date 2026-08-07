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
      (r) => (r.slug || '').trim().toLowerCase() === slug.trim().toLowerCase()
    );

    if (!match) {
      return { statusCode: 404, headers: JSON_HEADERS, body: JSON.stringify({ error: 'not_found' }) };
    }

    const houseInviteRaw = (match.houseinvite || '').toString().trim().toLowerCase();

    const rsvpRows = await readSheetRows('RSVPs');
    const priorSubmissions = rsvpRows.filter(
      (r) => (r.slug || '').trim().toLowerCase() === slug.trim().toLowerCase()
    );
    const latest = priorSubmissions[priorSubmissions.length - 1];

    return {
      statusCode: 200,
      headers: JSON_HEADERS,
      body: JSON.stringify({
        name: match.name || '',
        plusOneName: match.plusonename || '',
        houseInvite: ['true', 'yes', '1'].includes(houseInviteRaw),
        previousResponse: latest
          ? {
              attending: latest.attending || '',
              // note: the sheet's header is spelled "Accomodation" (one m);
              // normalizeKey() strips case/spacing but not typos, so this
              // has to match the sheet's actual spelling, not the correct one.
              accommodation: latest.accomodation || '',
              arrivalDay: latest.arrivalday || '',
              departureDay: latest.departureday || '',
              dietary: latest.dietary || '',
              message: latest.message || '',
              plusOneAttending: latest.plusoneattending || '',
              plusOneDietary: latest.plusonedietary || '',
            }
          : null,
      }),
    };
  } catch (err) {
    console.error('guest lookup failed', err);
    return { statusCode: 500, headers: JSON_HEADERS, body: JSON.stringify({ error: 'server_error' }) };
  }
};
