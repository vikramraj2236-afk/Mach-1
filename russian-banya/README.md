# Russian Banya — Luxury Spa Website

A responsive, single-page luxury wellness website built with Next.js, React, TypeScript, Tailwind CSS, Framer Motion and Lucide React.

## Features

- Cinematic hero and editorial luxury visual system
- Responsive sticky navigation and animated mobile menu
- Eight treatment cards and four editable package cards
- Banya ritual storytelling section
- Responsive gallery with keyboard-accessible lightbox (Escape / arrow keys)
- Testimonials (clearly marked as sample content)
- Booking form with browser-side required-field, phone and date validation
- Booking confirmation state
- WhatsApp link with prefilled message
- SEO metadata and Open Graph defaults
- Vercel-compatible Next.js structure

## Requirements

- Node.js 20.9+
- npm

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Production build

```bash
npm run build
npm run start
```

## Customise before launch

Search `components/site.tsx` for these demo values and replace them:

- `https://wa.me/910000000000` — replace with your WhatsApp number in international format, digits only.
- `+91 00000 00000`, `hello@russianbanya.com` — replace phone and email.
- `Your business address`, city/state/PIN and business hours.
- Sample package/service prices.
- Sample testimonials — replace with verified customer reviews.
- Map integration placeholder — replace with an official Google Maps embed.
- Social links — replace with the business's Instagram and Facebook URLs.
- Replace Unsplash image IDs with licensed brand photography if required.

## Booking form integration

The booking form currently validates input in the browser and displays a confirmation state. It intentionally does **not** claim to send or store bookings. To receive real bookings, connect the submit handler in `components/site.tsx` to a server-side endpoint or booking provider. Recommended production flow:

1. Add a route handler such as `app/api/bookings/route.ts`.
2. Validate all fields again on the server (never rely on client validation alone).
3. Persist requests in your database / booking CRM.
4. Send confirmation and staff notifications using your email provider.
5. Add rate limiting, spam protection and a privacy notice / consent flow.

If the integration requires secrets, store them in environment variables and add their names (not values) to `.env.example`.

## Deploy to Vercel

1. Push this project to a GitHub repository.
2. Import the repository in Vercel.
3. Keep the default Next.js build settings.
4. Deploy.

No environment variables are required for the included demo.

## Notes

- External Unsplash image URLs are used for the visual preview; use properly licensed final photography for commercial launch.
- The map, business contact information, prices and testimonials are explicit editable placeholders.
- This project is a polished front-end starter, not a live booking backend or a claim of real-time appointment availability.
