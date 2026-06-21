# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] — 2025-06-21

### Added
- Full Next.js 14 App Router architecture
- Cinematic Hero section with 5-slide carousel and parallax background
- Legacy Experience section with full-screen parallax chapters (1991 / 2000 / 2010 / 2025)
- Workforce Excellence editorial magazine grid
- Founder Section — Apple editorial portrait layout with scroll-driven journey timeline
- Discipline in Motion — sticky-scroll 300vh Apple-style crossfade showcase
- Industries Section — 8 cinematic 88vh full-bleed panels
- Process Section — 4S enterprise storytelling flow
- Training Carousel — interactive image gallery
- FAQ accordion with smooth expand/collapse
- Contact section with WhatsApp, call, and form CTAs
- Premium Navbar with glassmorphism, gold gradient CTA, underline hover animation, scroll-shrink behaviour
- Desktop WhatsApp glass card CTA ("Speak With Our Team")
- Mobile sticky contact bar with WhatsApp primary action
- Framer Motion scroll-driven animations throughout
- `RevealHeading` — letter-by-letter 3D flip reveal component
- `FadeIn` / `StaggerChildren` / `StaggerItem` utility components
- `AnimatedCounter` component for statistics
- Custom Tailwind design system: teal `#0d4f64`, navy `#0e1f2f`, gold `#e6a84f`
- Full TypeScript strict type safety
- JSON-LD structured data for local business SEO
- Responsive design: mobile-first, tablet, desktop
- Poppins + Inter font pairing via Google Fonts

### Fixed
- Framer Motion v12 Variants type compatibility (`ease` tuple typing)
- Hero `AnimatePresence mode="wait"` warning
