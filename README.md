# GSAssociates Construction — Website

Professional website for GSAssociates Construction Pvt. Ltd., built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + CSS Custom Properties |
| Fonts | Barlow + Barlow Condensed (Google Fonts) |
| Animations | CSS transitions + Framer Motion |
| Forms | React Hook Form + Zod validation |
| Carousel | Embla Carousel |
| Icons | Lucide React |
| Deployment | Vercel |

---

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout (Nav + Footer)
│   ├── page.tsx            # Home page
│   ├── about/page.tsx
│   ├── services/page.tsx
│   ├── projects/
│   │   ├── page.tsx        # Projects listing + filter
│   │   └── [slug]/page.tsx # Project detail
│   ├── clients/page.tsx
│   ├── contact/page.tsx
│   ├── not-found.tsx
│   ├── loading.tsx
│   ├── error.tsx
│   └── sitemap.ts
├── components/
│   ├── layout/             # Navbar, Footer, PageWrapper, ScrollReveal
│   ├── ui/                 # Button, Badge, SectionLabel, Divider
│   ├── home/               # HeroCarousel, StatsRow, AboutSnippet, etc.
│   ├── contact/            # ContactForm, ContactInfo, MapEmbed
│   └── about/ services/ projects/ (future expansions)
├── data/                   # Static content — projects, services, stats
├── hooks/                  # useCountUp, useIntersection
├── lib/                    # utils.ts (cn, helpers)
└── styles/
    └── globals.css         # Design tokens + base styles
```

---

## Design System

**Colors:**
- Navy `#0d1b2e` — backgrounds, nav, footer
- Blue Primary `#185FA5` — CTAs, links
- Blue Bright `#378ADD` — hover states, accents
- Gold `#E8A020` — highlights, CTA accents

**Fonts:**
- `Barlow Condensed 700/800` — all headings, display text
- `Barlow 300/400/600/700` — body, labels, navigation

---

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.local.template .env.local
# Edit .env.local with your values

# 3. Run dev server
npm run dev

# Open http://localhost:3000
```

---

## Production Build

```bash
npm run build
npm start
```

---

## Deploying to Vercel

1. Push project to GitHub
2. Go to [vercel.com](https://vercel.com) → Import Repository
3. Set environment variables from `.env.local.template`
4. Add your custom domain in Vercel project settings
5. Deploy — Vercel auto-deploys on every push to `main`

**Region:** `bom1` (Mumbai) — configured in `vercel.json` for lowest latency in India.

---

## Adding Real Content

### Project Photos
Place images in `/public/images/projects/` named as `proj-001.jpg`, `proj-002.jpg`, etc. matching the `thumbnail` field in `src/data/projects.ts`.

### Client Logos
Place logos in `/public/images/clients/` and update `ClientStrip.tsx` to use `<Image>` components.

### Contact Form Backend
The form at `src/components/contact/ContactForm.tsx` currently simulates a submission. To wire up email delivery:
1. Install Resend: `npm install resend`
2. Create `src/app/api/contact/route.ts`
3. Use your `RESEND_API_KEY` from `.env.local`

### Google Maps
Replace the placeholder `EMBED_URL` in `src/components/contact/MapEmbed.tsx` with your actual Google Maps embed URL from [Google Maps Embed API](https://developers.google.com/maps/documentation/embed).

---

## Pre-launch Checklist

- [ ] Replace all placeholder content in `src/data/` with real data
- [ ] Add actual project photos to `/public/images/projects/`
- [ ] Add client logos to `/public/images/clients/`
- [ ] Add company logo SVG to `/public/images/logo.svg`
- [ ] Update phone/email/address in `Footer.tsx` and `ContactInfo.tsx`
- [ ] Set up contact form email backend (Resend recommended)
- [ ] Add real Google Maps embed URL in `MapEmbed.tsx`
- [ ] Add Google Analytics ID to `.env.local`
- [ ] Update `NEXT_PUBLIC_SITE_URL` in `.env.local`
- [ ] Update `metadata` in `layout.tsx` with final company name
- [ ] Test on mobile (iOS Safari + Android Chrome)
- [ ] Run Lighthouse audit — target 90+ all categories
- [ ] Configure custom domain on Vercel