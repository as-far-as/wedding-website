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
   - `Guests` — header row: `Slug | Name | PlusOneAllowed`. Add one row per invitee. `Slug` is whatever goes in the URL (e.g. `jane-smith` → `/rsvp/jane-smith`); `PlusOneAllowed` is `TRUE`/`FALSE`.
   - `RSVPs` — header row: `Timestamp | Slug | Name | Attending | Dietary | Message | Plus One Name | Plus One Attending | Plus One Dietary | Accommodation`. Leave it empty — the function appends rows here. `Accommodation` is one of `campsite` / `cottage` / `gijon` / `own` (matching the options on the Accommodation page).
2. **Create a Google Cloud service account** with the Sheets API enabled, and download its JSON key.
3. **Share the Sheet** with the service account's `client_email` (Editor access).
4. **Add these Netlify environment variables** (Site settings → Environment variables):
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL` — the service account's email
   - `GOOGLE_PRIVATE_KEY` — the private key from the JSON key (paste as-is, including the `BEGIN/END PRIVATE KEY` lines)
   - `GOOGLE_SHEET_ID` — the long ID in the Sheet's URL, between `/d/` and `/edit`
5. Redeploy. Guest links are then just `https://<your-site>/rsvp/<slug>` for whatever slugs you've added to the `Guests` tab — no code changes needed to add more guests, just add rows to the Sheet.

## Deployment

Hosted on [Netlify](https://netlify.com). Deploys automatically on push to `main`. Config in `netlify.toml`.
