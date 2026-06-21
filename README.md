# Sai Saktheeswari Staffing Services

> Premium enterprise website for South India's most trusted staffing institution — built since 1991.

A production-grade, cinematic website built with Next.js 14, Framer Motion, and Tailwind CSS. Designed to feel like a ₹25L+ custom digital agency build — editorial typography, scroll-driven animations, Apple-style layouts, and a glassmorphism design system.

---

## Features

- **Cinematic Hero** — 5-slide image carousel with parallax background and animated headline
- **Legacy Timeline** — Full-screen parallax chapters for 1991 / 2000 / 2010 / 2025 milestones
- **Founder Section** — Apple editorial portrait layout with scroll-driven journey timeline
- **Workforce Excellence** — Editorial magazine-grid trust section
- **Discipline in Motion** — 300vh sticky-scroll image crossfade (Apple-style)
- **Industries Section** — 8 cinematic 88vh full-bleed industry panels
- **Process Section** — 4S enterprise storytelling flow
- **Training Carousel** — Interactive image gallery with smooth transitions
- **Premium Navbar** — Glassmorphism, gold gradient CTA, underline-reveal hover, scroll-shrink logo
- **WhatsApp CTA** — Desktop glass card + mobile full-width sticky contact bar
- **SEO Ready** — JSON-LD structured data, semantic HTML, Open Graph meta
- **Fully Responsive** — Mobile-first, tablet, and desktop breakpoints

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14.2 (App Router) |
| Language | TypeScript 5 |
| UI Library | React 18 |
| Styling | Tailwind CSS 3.4 |
| Animation | Framer Motion 12 |
| 3D/Motion | GSAP 3.15 |
| Fonts | Google Fonts — Poppins + Inter |
| Deployment | Vercel (recommended) |

---

## Design System

| Token | Value | Usage |
|---|---|---|
| `teal` | `#0d4f64` | Primary brand, accents |
| `navy` | `#0e1f2f` | Dark backgrounds |
| `gold` | `#e6a84f` | CTA buttons, highlights |
| `deep-black` | `#04090f` | Section backgrounds |

---

## Project Structure

```
website/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Main page — all sections
│   │   ├── layout.tsx        # Root layout, fonts, metadata
│   │   └── globals.css       # Global styles, font imports
│   ├── components/
│   │   ├── AnimatedCounter.tsx
│   │   ├── FadeIn.tsx
│   │   └── ui/
│   │       └── card-fan-carousel.tsx
│   └── lib/
│       └── constants.ts      # Company info, nav links, services
├── public/
│   └── images/
│       ├── dsc/              # Deployment & operations photos
│       ├── founder/          # Rajasekar founder portrait
│       ├── home/             # Hero carousel images
│       └── training-carousel/ # Training section gallery
├── .github/
│   └── workflows/
│       └── ci.yml            # CI build verification
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
git clone https://github.com/arshathhussain46/saisaktheeswari-staffing-services.git
cd saisaktheeswari-staffing-services
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run start
```

Build output: `.next/` — static pages prerendered, 95.5 kB main bundle.

---

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project at [vercel.com/new](https://vercel.com/new)
3. Select repository → Deploy

Vercel auto-detects Next.js. No configuration needed.

### Manual

```bash
npm run build
npm run start
```

Or export static output (if `output: 'export'` is set in `next.config.js`).

---

## Environment Variables

No environment variables are required for local development.

For production integrations (contact form, analytics), create `.env.local`:

```env
# Example — add as needed
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

## About

**Sai Saktheeswari Staffing Services** was founded in 1991 by **Rajasekar** in Cuddalore, Tamil Nadu. Over 35 years, the company has grown into one of South India's most trusted staffing institutions — deploying 500+ professionals across 100+ client organisations in security, labour outsourcing, and HR compliance.

**Head Office:** S.N Chavadi, Cuddalore, Tamil Nadu
**Branch:** Ellaipillaichavadi, Puducherry
**Contact:** +91 93676 26855
**Email:** saisaktheeswari@gmail.com

---

## Author

Built by **Alpha MasterMind AI** for Sai Saktheeswari Staffing Services.

---

## License

[MIT](./LICENSE) © 2025 Sai Saktheeswari Staffing Services
