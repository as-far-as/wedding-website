# Adán & Natalie — Wedding Website

Wedding website for Adán Farpon and Natalie, getting married on **28 August 2027** in the Valle de Bueida, Quirós, Asturias, Spain.

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
npm install
npm run dev
```

## Deployment

Hosted on [Netlify](https://netlify.com). Deploys automatically on push to `main`. Config in `netlify.toml`.
