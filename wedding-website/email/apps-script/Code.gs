/**
 * Wedding invitation mail merge — sends personalised invitation emails from
 * your own Gmail account, using this Sheet's "Guests" tab as the guest list.
 *
 * SETUP (one-time)
 * 1. Open your wedding guest Google Sheet.
 * 2. Extensions > Apps Script. This opens a blank script project bound to
 *    this specific spreadsheet (important: it must be opened FROM the
 *    sheet, via Extensions > Apps Script, not created standalone — that's
 *    what lets SpreadsheetApp.getActiveSpreadsheet() below find it).
 * 3. Delete anything in the default Code.gs file and paste this file's
 *    contents in its place.
 * 4. Click the + next to "Files" > "HTML" twice, to add two template files:
 *      - name one exactly EmailTemplate, paste in the full contents of
 *        invitation-template.html
 *      - name the other exactly EmailTemplateEs, paste in the full contents
 *        of invitation-template-es.html
 *    (no .html extension needed in the file name field — Apps Script adds
 *    that itself). Leave both files' {{Guest Name}} / {{RSVP Link}} /
 *    {{Website URL}} / {{RSVP Deadline}} placeholders exactly as they are;
 *    this script fills them in below.
 * 5. Edit the CONFIG block just below to match your sheet's tab name,
 *    your site's URL, and RSVP deadline.
 * 6. Make sure your "Guests" tab has:
 *      - an "Email" column with each guest's email address — this script
 *        doesn't invent one, it reads it from there
 *      - a "Language" column: put "es" (or "Spanish"/"español") in it for
 *        any guest whose invite and links should go out in Spanish; leave
 *        it blank (or "en") for English. Both are wired into the site
 *        itself — the link each guest gets also carries ?lang=es or
 *        ?lang=en, so the website opens straight into their language too.
 *    Also fine to add an empty "Invite Sent At" column; the script creates
 *    it automatically the first time it runs if it's missing.
 * 7. Run sendTestInvite() first (see below) to email yourself a real,
 *    fully-merged preview before sending to anyone else.
 * 8. Before sending for real, add a "Test" column and put something like
 *    "yes" in it next to a handful of trusted guests (people happy to get
 *    a real invite a little early), then run sendTestBatch() — this sends
 *    the real email to just those people's actual addresses, so you can
 *    see how it lands in a real inbox and click through the real RSVP
 *    flow, before anyone else gets theirs.
 * 9. When ready, run sendAllInvites() for everyone else. The very first
 *    run of any of these three functions will pop up Google's "this app
 *    isn't verified" consent screen — that's expected for a personal
 *    script only you run; click through Advanced > Go to (project name) >
 *    Allow. It only sends as you, from your own Gmail account, and only
 *    when you run it.
 *
 * SAFETY
 * - Rows are skipped if "Invite Sent At" is already filled in, so re-running
 *   sendAllInvites() (e.g. after adding a few late-arriving guests) won't
 *   re-email everyone — it only sends to rows that haven't gone out yet.
 *   sendTestBatch() fills this in too, so anyone it emails won't be sent a
 *   second copy when you later run sendAllInvites().
 * - sendTestBatch() and sendAllInvites() both show a confirmation dialog
 *   (sendTestBatch() lists exactly who it's about to email) before doing
 *   anything irreversible.
 * - Gmail's own sending limit is ~100 recipients/day for a plain personal
 *   @gmail.com account (higher for Google Workspace) — for a guest list
 *   larger than that, split sendAllInvites() across a couple of days by
 *   temporarily filtering the sheet, or ask and I can add batching.
 */

const CONFIG = {
  GUEST_SHEET_NAME: 'Guests',
  WEBSITE_URL: 'https://your-site.netlify.app',      // homepage, no trailing slash
  RSVP_BASE_URL: 'https://your-site.netlify.app/rsvp', // personal link = this + "/" + slug
  RSVP_DEADLINE: '1st December 2026',
  TEST_RECIPIENT_EMAIL: 'you@example.com', // where sendTestInvite() sends its preview
  DEFAULT_LANGUAGE: 'en', // used when a guest row's Language column is blank/unrecognised

  LANGUAGES: {
    en: {
      TEMPLATE_FILE: 'EmailTemplate',
      SUBJECT: "You're invited — Natalie & Adán, 28th August 2027",
    },
    es: {
      TEMPLATE_FILE: 'EmailTemplateEs',
      SUBJECT: 'Estáis invitados — Natalie & Adán, 28 de agosto de 2027',
    },
  },
};

/** Maps whatever's in the guest row's Language column to 'en' or 'es'. */
function resolveLanguage_(rawValue) {
  const v = (rawValue || '').toString().trim().toLowerCase();
  if (['es', 'esp', 'spanish', 'español', 'espanol'].includes(v)) return 'es';
  if (['en', 'eng', 'english'].includes(v)) return 'en';
  return CONFIG.DEFAULT_LANGUAGE;
}

/** Any non-blank-ish value in the Test column marks that row for sendTestBatch(). */
function isTestRow_(rawValue) {
  const v = (rawValue || '').toString().trim().toLowerCase();
  return v !== '' && !['no', 'false', '0'].includes(v);
}

/** Menu so you can run this from the Sheet itself, no script editor needed. */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Wedding Invites')
    .addItem('Send test email to me', 'sendTestInvite')
    .addItem('Send to test guests (Test column)', 'sendTestBatch')
    .addItem('Send all unsent invites', 'sendAllInvites')
    .addToUi();
}

/** Normalises a header cell so "Plus One Name", "plus_one_name" etc. all match. */
function normalizeKey(key) {
  return key.toString().trim().toLowerCase().replace(/[^a-z0-9]/g, '');
}

function getGuestSheet_() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.GUEST_SHEET_NAME);
  if (!sheet) {
    throw new Error(`No tab called "${CONFIG.GUEST_SHEET_NAME}" — check CONFIG.GUEST_SHEET_NAME matches your sheet.`);
  }
  return sheet;
}

/** Reads the guest list into row objects, and figures out (or creates) the
 *  "Invite Sent At" column, returning its 1-indexed column number too. */
function readGuestRows_() {
  const sheet = getGuestSheet_();
  const data = sheet.getDataRange().getValues();
  const header = data[0];
  const keys = header.map(normalizeKey);

  let sentAtCol = keys.indexOf('invitesentat');
  if (sentAtCol === -1) {
    sentAtCol = header.length;
    sheet.getRange(1, sentAtCol + 1).setValue('Invite Sent At');
    keys.push('invitesentat');
  }

  const rows = data.slice(1).map((row, i) => {
    const obj = { _rowNumber: i + 2, _sentAtCol: sentAtCol + 1 }; // +2: header row + 1-index
    keys.forEach((key, j) => { obj[key] = (row[j] ?? '').toString().trim(); });
    return obj;
  });

  return rows;
}

/** Builds the merged HTML + subject for one guest row, in whichever
 *  language their Language column resolves to. */
function buildEmail_(guest) {
  const lang = resolveLanguage_(guest.language);
  const langConfig = CONFIG.LANGUAGES[lang];

  const displayName = guest.plusonename
    ? `${guest.name} & ${guest.plusonename}`
    : guest.name;
  // ?lang= so the site itself opens straight into the guest's language,
  // rather than relying on their browser or a stored preference.
  const rsvpLink = `${CONFIG.RSVP_BASE_URL}/${guest.slug}?lang=${lang}`;
  const websiteUrl = `${CONFIG.WEBSITE_URL}?lang=${lang}`;

  let html = HtmlService.createHtmlOutputFromFile(langConfig.TEMPLATE_FILE).getContent();
  html = html
    .split('{{Guest Name}}').join(displayName)
    .split('{{RSVP Link}}').join(rsvpLink)
    .split('{{Website URL}}').join(websiteUrl)
    .split('{{RSVP Deadline}}').join(CONFIG.RSVP_DEADLINE);

  return { html, subject: langConfig.SUBJECT };
}

/** Emails yourself one fully-merged invite (using the first guest row found)
 *  so you can check names, links and rendering before sending for real. */
function sendTestInvite() {
  const rows = readGuestRows_();
  const guest = rows.find((r) => r.name && r.slug);
  if (!guest) {
    SpreadsheetApp.getUi().alert('No guest rows with both a Name and a slug were found to build a test email from.');
    return;
  }

  const { html, subject } = buildEmail_(guest);
  GmailApp.sendEmail(CONFIG.TEST_RECIPIENT_EMAIL, `[TEST] ${subject}`, 'This email needs an HTML-capable mail client to view.', {
    htmlBody: html,
    name: 'Natalie & Adán',
  });

  SpreadsheetApp.getUi().alert(`Test email sent to ${CONFIG.TEST_RECIPIENT_EMAIL}, merged from "${guest.name}"'s row (${resolveLanguage_(guest.language)}).`);
}

/** Sends the real invite, to their real address, to every guest row marked
 *  in a "Test" column (any value except blank/no/false/0) — use this to do
 *  an end-to-end test with a handful of trusted people before running
 *  sendAllInvites() for everyone. Marks them as sent too, so they won't be
 *  emailed a second time by sendAllInvites() later. */
function sendTestBatch() {
  const rows = readGuestRows_();
  const sheet = getGuestSheet_();

  if (!('test' in (rows[0] || {}))) {
    SpreadsheetApp.getUi().alert('No "Test" column found — add one to your Guests tab and put a value (e.g. "yes") next to whichever guests you want to test with first.');
    return;
  }

  const toSend = rows.filter((r) => r.name && r.slug && r.email && isTestRow_(r.test) && !r.invitesentat);

  if (toSend.length === 0) {
    SpreadsheetApp.getUi().alert('Nothing to send — mark a row with a value (e.g. "yes") in the Test column, and make sure it has an Email and hasn\'t already been sent.');
    return;
  }

  const ui = SpreadsheetApp.getUi();
  const names = toSend.map((r) => `${r.name} (${r.email})`).join(', ');
  const response = ui.alert('Confirm test send', `This will send ${toSend.length} real invitation email(s) to: ${names}. Continue?`, ui.ButtonSet.YES_NO);
  if (response !== ui.Button.YES) return;

  let sent = 0;
  toSend.forEach((guest) => {
    const { html, subject } = buildEmail_(guest);
    GmailApp.sendEmail(guest.email, subject, 'This email needs an HTML-capable mail client to view.', {
      htmlBody: html,
      name: 'Natalie & Adán',
    });
    sheet.getRange(guest._rowNumber, guest._sentAtCol).setValue(new Date());
    sent += 1;
  });

  ui.alert(`Sent ${sent} test invitation(s).`);
}

/** Sends the real invite to every guest row that has an email address and
 *  hasn't already been sent one (Invite Sent At is blank). */
function sendAllInvites() {
  const rows = readGuestRows_();
  const sheet = getGuestSheet_();

  const toSend = rows.filter((r) => r.name && r.slug && r.email && !r.invitesentat);
  const missingEmail = rows.filter((r) => r.name && r.slug && !r.email);

  if (toSend.length === 0) {
    SpreadsheetApp.getUi().alert('Nothing to send — every guest with an email address already has an "Invite Sent At" value.');
    return;
  }

  let confirmMsg = `This will send ${toSend.length} invitation email(s). This cannot be undone. Continue?`;
  if (missingEmail.length > 0) {
    confirmMsg += `\n\n(${missingEmail.length} guest row(s) have no Email value and will be skipped: ${missingEmail.map((r) => r.name).join(', ')})`;
  }

  const ui = SpreadsheetApp.getUi();
  const response = ui.alert('Confirm send', confirmMsg, ui.ButtonSet.YES_NO);
  if (response !== ui.Button.YES) return;

  let sent = 0;
  toSend.forEach((guest) => {
    const { html, subject } = buildEmail_(guest);
    GmailApp.sendEmail(guest.email, subject, 'This email needs an HTML-capable mail client to view.', {
      htmlBody: html,
      name: 'Natalie & Adán',
    });
    sheet.getRange(guest._rowNumber, guest._sentAtCol).setValue(new Date());
    sent += 1;
  });

  ui.alert(`Sent ${sent} invitation(s).`);
}
