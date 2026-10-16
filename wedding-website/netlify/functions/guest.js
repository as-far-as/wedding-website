import { readSheetRows, getOrCreateColumnIndex, updateCell } from './_sheets.js';

const JSON_HEADERS = { 'Content-Type': 'application/json' };
const VISITED_AT_HEADER = 'RSVP Page Visited At';

// Records the first time a guest's personalised RSVP link is opened. Best
// effort only — a hiccup here should never stop the guest's page from
// loading, so failures are logged and swallowed, not thrown.
async function recordFirstVisit(guest) {
  if (guest.rsvppagevisitedat) return; // already recorded, nothing to do
  try {
    const colIndex = await getOrCreateColumnIndex('Guests', VISITED_AT_HEADER);
    const timestamp = new Date().toISOString().replace('T', ' ').replace(/\.\d+Z$/, ' UTC');
    await updateCell('Guests', guest._rowNumber, colIndex, timestamp);
  } catch (err) {
    console.error('recording guest visit failed', err);
  }
}

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

    await recordFirstVisit(match);

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
