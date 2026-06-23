# Adán & Natalie — Wedding Website

Wedding website for Adán Shennan Farpon and Natalie McAndrew D'Souza, getting married on **28 August 2027** in the Valle de Bueida, Quirós, Asturias, Spain.

## Stack

- [Vite](https://vitejs.dev/) + [React 19](https://react.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/) (`@tailwindcss/vite` plugin)
- [React Router v6](https://reactrouter.com/)
- Fonts: Syne (display), Cormorant Garamond (serif), Jost (sans) via Google Fonts

## Pages

| Route | Page |
|---|---|
| `/` | Hero — countdown, names, date |
| `/location` | Venue, weekend programme |
| `/accommodation` | On-site, casas rurales, Gijón + shuttle |
| `/transport` | Flights, driving, trains, shuttle bus |
| `/asturias` | Region guide, food & drink |
| `/faqs` | Accordion Q&A |

## Local development

```bash
cd wedding-website
npm install
npm run dev
```

## Environment variables

Copy `wedding-website/.env.example` to `wedding-website/.env` and fill in the values. Required for contact details on the FAQs page.

## Deployment

Hosted on [Netlify](https://netlify.com). Deploys automatically on push to `main`.
Base directory: `wedding-website` — set this in Netlify's site settings.
Config: `wedding-website/netlify.toml`.
