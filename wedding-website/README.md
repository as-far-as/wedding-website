# Adán & Natalie — Wedding Website

Wedding website for Adán Farpon and Natalie, getting married on **28 August 2027** in the Valle de Bueida, Quirós, Asturias, Spain.

## Stack

- [Vite](https://vitejs.dev/) + [React 19](https://react.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/) (`@tailwindcss/vite` plugin)
- [React Router v6](https://reactrouter.com/)
- English / Spanish / Asturian toggle via `src/i18n`
- Fonts: Anton (display), Cormorant Garamond (serif), Jost (sans) via Google Fonts
- Netlify Functions + Google Sheets for RSVPs

## Pages

| Route | Page |
|---|---|
| `/` | Home — countdown, vibe, what to expect, dress code, food & drink |
| `/location` | Venue, getting here (flights, car, train, shuttle) |
| `/accommodation` | On-site, casas rurales, Gijón + shuttle, DIY |
| `/asturias` | Region guide, food & drink |
| `/faqs` | Accordion Q&A |
| `/rsvp/:slug` | Personalised RSVP form (see below) |

## Local development

```bash
npm install
npm run dev
```

This covers everything except the RSVP form's live guest lookup/submission (see below). To exercise those too, use `npm run dev:functions` instead, which runs the Netlify CLI's local dev server (functions + site together).

## Environment variables

Copy `.env.example` to `.env` and fill in:

```
VITE_ADAN_NAME=...
VITE_NATALIE_NAME=...
VITE_ADAN_EMAIL=...
VITE_NATALIE_EMAIL=...
VITE_ADAN_PHONE=...
VITE_NATALIE_PHONE=...
VITE_SITE_PASSWORD=...
```

These need to be set as Netlify environment variables too (Site settings → Environment variables) for the live site.

## RSVP setup (Google Sheets)

The RSVP page (`/rsvp/:slug`) looks guests up by a unique slug and writes replies to a Google Sheet, via two Netlify Functions in `netlify/functions/`. None of this works until it's configured — do this once:

1. **Create a Google Sheet** with two tabs:
   - `Guests` — header row: `Slug | Name | PlusOneAllowed | HouseInvite | PlusOneName`. Add one row per invitee. `Slug` is whatever goes in the URL (e.g. `jane-smith` → `/rsvp/jane-smith`); `HouseInvite` is `TRUE`/`FALSE` — set it to `TRUE` for guests you're personally inviting to stay in one of the on-site houses, and they get a different accommodation question (a simple yes/no plus arrival/departure day) instead of the general four-option picker. `PlusOneName` (column E) is the actual name of their plus-one — if it's filled in, the guest sees "We'd love for you to bring **{name}** — are they coming too?"; if it's blank, no plus-one question is shown at all. (`PlusOneAllowed` is no longer read by the code — safe to ignore or delete.)
   - `RSVPs` — header row (order matters, spelling/casing doesn't): `Timestamp | Slug | Name | Attending | Dietary | Message | PlusOneName | PlusOneAttending | PlusOneDietary | Accomodation | ArrivalDay | DepartureDay`. Leave it empty — the function appends rows here. The value under `Accomodation` (however you've spelled it) is one of `campsite` / `cottage` / `gijon` / `own` / `house` (the last one only for `HouseInvite` guests who said yes). `ArrivalDay` / `DepartureDay` are only filled in for that case, one of `thu-26` / `fri-27` / `sat-28` / `sun-29` / `mon-30`.
   - Header text can be `PascalCase`, `snake_case`, `camelCase`, or `Spaced Out` — the code normalises case/spacing/underscores away before matching, so renaming a header for readability won't break anything. It does **not** fix typos, though — the header above is deliberately spelled `Accomodation` (one "m") because that's what's currently in the sheet; if you rename it to the correct `Accommodation`, ping for a one-line code update to match.
   - Guests can revisit their RSVP link to see (and edit) what they submitted. Each edit **appends a new row** rather than overwriting the old one — the site always shows/pre-fills the *latest* row for that `Slug`, so you get a small history of changes per guest for free rather than a risk of a lost edit overwriting the wrong thing.
2. **Create a Google Cloud service account** with the Sheets API enabled, and download its JSON key.
3. **Share the Sheet** with the service account's `client_email` (Editor access).
4. **Add these Netlify environment variables** (Site settings → Environment variables):
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL` — the service account's email
   - `GOOGLE_PRIVATE_KEY` — the private key from the JSON key (paste as-is, including the `BEGIN/END PRIVATE KEY` lines)
   - `GOOGLE_SHEET_ID` — the long ID in the Sheet's URL, between `/d/` and `/edit`
5. Redeploy. Guest links are then just `https://<your-site>/rsvp/<slug>` for whatever slugs you've added to the `Guests` tab — no code changes needed to add more guests, just add rows to the Sheet.

## Deployment

Hosted on [Netlify](https://netlify.com). Deploys automatically on push to `main`. Config in `netlify.toml`.
