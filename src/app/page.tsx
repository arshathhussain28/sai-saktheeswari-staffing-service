'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useInView, useMotionValue, useSpring } from 'framer-motion';
import { FadeIn, StaggerChildren, StaggerItem } from '@/components/FadeIn';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { COMPANY, SERVICES, INDUSTRIES, NAV_LINKS, FAQS } from '@/lib/constants';
import SocialCards from '@/components/ui/card-fan-carousel';
import GalleryMarquee from '@/components/GalleryMarquee';

/* ─── ANIMATION HELPERS ─── */
const ease = [0.25, 0.4, 0.25, 1] as [number, number, number, number];
const easeExpo = [0.16, 1, 0.3, 1] as [number, number, number, number];

function ScrollReveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 28 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease }}>
      {children}
    </motion.div>
  );
}

/* Navbar extracted → components/layout/Navbar.tsx (rendered in app/layout.tsx) */

/* ─── HERO ─── */
const HERO_SLIDES = [
  { src: '/images/dsc/formation-aerial.jpg', label: 'Guard team in disciplined formation' },
  { src: '/images/dsc/ceremonial-portrait.jpg', label: 'Ceremonial guard of honour' },
  { src: '/images/home/arm-badge-patch.jpg', label: 'Sai Saktheeswari — Since 1991' },
  { src: '/images/home/guards-march.jpg', label: 'Guards in professional formation' },
  { src: '/images/home/badge-uniform.jpg', label: 'Uniform & branding standards' },
];

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0, scale: 0.92 }),
  center: { x: 0, opacity: 1, scale: 1, transition: { duration: 0.65, ease } },
  exit: (dir: number) => ({ x: dir > 0 ? '-40%' : '40%', opacity: 0, scale: 0.92, transition: { duration: 0.5, ease } }),
};

function Hero() {
  const { scrollYProgress } = useScroll();
  const bgY = useTransform(scrollYProgress, [0, 0.4], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setDirection(1);
      setCurrent(p => (p + 1) % HERO_SLIDES.length);
    }, 4500);
    return () => clearInterval(t);
  }, [paused]);

  const prev = (current - 1 + HERO_SLIDES.length) % HERO_SLIDES.length;
  const next = (current + 1) % HERO_SLIDES.length;

  const goTo = (idx: number) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
  };

  const headline = ["South India's Most", 'Trusted Staffing Partner'];

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#060f18]">
      {/* Ambient cinematic background — active image, layered for depth + legibility */}
      <AnimatePresence mode="sync">
        <motion.div key={`bg-${current}`} className="absolute inset-0 z-0"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}>
          <motion.img style={{ y: bgY }}
            src={HERO_SLIDES[current].src} alt="" aria-hidden
            className="absolute inset-0 w-full h-full object-cover scale-110 blur-[3px] brightness-[0.5]" />
        </motion.div>
      </AnimatePresence>
      {/* Directional scrim — dark behind text (left), image breathes (right) */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#04090f]/96 via-[#050d1a]/82 to-[#050d1a]/55" />
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#04090f] via-transparent to-[#04090f]/70" />
      {/* Warm gold ambient glow */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_50%_60%_at_15%_50%,rgba(230,168,79,0.10),transparent)] pointer-events-none" />

      <motion.div style={{ opacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">

          {/* ── LEFT: Text content ── */}
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="inline-flex items-center gap-2.5 bg-[#e6a84f]/[0.08] border border-[#e6a84f]/25 rounded-full pl-2.5 pr-4 py-1.5 mb-8 backdrop-blur-md">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#e6a84f] opacity-60 animate-ping" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#e6a84f]" />
              </span>
              <span className="font-inter text-[#f0be6a] text-[11px] sm:text-xs font-semibold tracking-[0.18em] uppercase">Established 1991 · 35 Years of Excellence</span>
            </motion.div>

            <h1 className="mb-6">
              {headline.map((line, li) => (
                <div key={li} className="overflow-hidden">
                  <motion.span
                    initial={{ y: '110%' }} animate={{ y: 0 }}
                    transition={{ duration: 0.75, delay: 0.45 + li * 0.15, ease }}
                    className="font-poppins font-extrabold leading-[1.05] block text-4xl sm:text-5xl lg:text-[3.3rem] xl:text-6xl text-white">
                    {line}
                  </motion.span>
                </div>
              ))}
              <div className="overflow-hidden mt-2">
                <motion.span
                  initial={{ y: '110%' }} animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.78, ease }}
                  className="font-fraunces italic font-medium block text-2xl sm:text-3xl lg:text-[2.1rem] xl:text-4xl leading-[1.15] pb-1 bg-gradient-to-r from-[#f0be6a] via-[#e6a84f] to-[#c8902e] bg-clip-text text-transparent">
                  Where discipline meets dependability.
                </motion.span>
              </div>
            </h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0, duration: 0.6 }}
              className="font-inter text-base text-white/70 mb-1">
              Security Personnel · Labour Outsourcing · HR Statutory Compliance
            </motion.p>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: 0.6 }}
              className="font-inter text-sm text-white/45 mb-9">
              Serving 100+ businesses across Cuddalore, Puducherry & Tamil Nadu
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-3.5 mb-10">
              {/* Primary — gold gradient, shimmer sweep, glow, arrow */}
              <a href="/contact"
                className="group relative overflow-hidden inline-flex items-center justify-center gap-2.5
                  bg-gradient-to-br from-[#f0be6a] via-[#e6a84f] to-[#c8902e] text-[#0a1a24]
                  font-poppins font-bold text-sm tracking-[0.01em] px-7 py-3.5 rounded-xl
                  shadow-[0_8px_30px_rgba(230,168,79,0.35)] hover:shadow-[0_12px_44px_rgba(230,168,79,0.55)]
                  hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-300 ease-out">
                <span className="relative z-10">Request Workforce Support</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
                  <path d="M2 7h9.5M7.5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
              </a>
              {/* Secondary — glass, WhatsApp SVG, press feedback */}
              <a href={`https://wa.me/${COMPANY.phone.whatsapp}?text=Hello, I am interested in your staffing services.`}
                target="_blank" rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2.5
                  bg-white/[0.06] hover:bg-white/[0.12] backdrop-blur-md border border-white/20 hover:border-[#e6a84f]/50
                  text-white font-poppins font-semibold text-sm px-7 py-3.5 rounded-xl
                  active:scale-[0.98] transition-all duration-300 ease-out">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" className="text-[#25D366] group-hover:scale-110 transition-transform duration-300">
                  <path d="M17.6 6.32A7.85 7.85 0 0 0 12 4a7.94 7.94 0 0 0-6.9 11.9L4 20l4.2-1.1a7.9 7.9 0 0 0 3.8 1h.01a7.94 7.94 0 0 0 5.6-13.58ZM12 18.5h-.01a6.5 6.5 0 0 1-3.3-.9l-.24-.14-2.45.64.65-2.39-.16-.25A6.5 6.5 0 1 1 12 18.5Zm3.6-4.86c-.2-.1-1.17-.58-1.35-.64s-.31-.1-.44.1-.5.63-.62.76-.23.15-.43.05a5.3 5.3 0 0 1-2.67-2.33c-.2-.35.18-.32.55-1.06a.36.36 0 0 0-.02-.34c-.05-.1-.44-1.07-.6-1.46s-.32-.33-.44-.34h-.38a.73.73 0 0 0-.53.25 2.2 2.2 0 0 0-.68 1.62 3.8 3.8 0 0 0 .8 2.02 8.7 8.7 0 0 0 3.32 2.93c1.95.85 1.95.57 2.3.54a1.98 1.98 0 0 0 1.3-.92 1.6 1.6 0 0 0 .12-.92c-.06-.08-.19-.13-.39-.23Z"/>
                </svg>
                Talk on WhatsApp
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 0.6 }}
              className="flex flex-wrap gap-x-5 gap-y-2.5 text-white/55 text-xs font-inter">
              {['Licensed & Registered', 'PF & ESI Compliant', '500+ Workforce Deployed', '48–72hr Deployment'].map(t => (
                <span key={t} className="flex items-center gap-1.5">
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none" className="text-[#e6a84f] flex-shrink-0">
                    <path d="M2 7.5l3 3 7-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {t}
                </span>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: 3-card auto-scroll carousel ── */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease }}
            className="relative flex flex-col items-center gap-6"
            onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>

            {/* Card stack */}
            <div className="relative w-full h-[360px] sm:h-[420px] lg:h-[440px] flex items-center justify-center">

              {/* Previous card */}
              <motion.div
                key={`prev-${current}`}
                className="absolute w-[52%] h-[88%] rounded-2xl overflow-hidden cursor-pointer select-none"
                style={{ left: '0%', zIndex: 1 }}
                initial={{ opacity: 0 }} animate={{ opacity: 0.55, scale: 0.88, rotateY: 8, x: -12 }}
                transition={{ duration: 0.55, ease }}
                onClick={() => goTo(prev)}
              >
                <img src={HERO_SLIDES[prev].src} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-[#060f18]/40" />
              </motion.div>

              {/* Active center card */}
              <div className="relative w-[62%] h-full z-10 rounded-2xl overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.6)] ring-2 ring-white/10">
                <AnimatePresence custom={direction} mode="wait">
                  <motion.div key={current} custom={direction}
                    variants={slideVariants} initial="enter" animate="center" exit="exit"
                    className="absolute inset-0">
                    <img src={HERO_SLIDES[current].src} alt={HERO_SLIDES[current].label}
                      className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#060f18]/75 via-transparent to-transparent" />
                    {/* Caption */}
                    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                      className="absolute bottom-4 left-4 right-4">
                      <p className="font-inter text-white/80 text-xs bg-black/30 backdrop-blur-sm rounded-lg px-3 py-1.5 inline-block">
                        {HERO_SLIDES[current].label}
                      </p>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Next card */}
              <motion.div
                key={`next-${current}`}
                className="absolute w-[52%] h-[88%] rounded-2xl overflow-hidden cursor-pointer select-none"
                style={{ right: '0%', zIndex: 1 }}
                initial={{ opacity: 0 }} animate={{ opacity: 0.55, scale: 0.88, rotateY: -8, x: 12 }}
                transition={{ duration: 0.55, ease }}
                onClick={() => goTo(next)}
              >
                <img src={HERO_SLIDES[next].src} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-[#060f18]/40" />
              </motion.div>
            </div>

            {/* Dot navigation + progress bar */}
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center gap-2.5">
                {HERO_SLIDES.map((_, i) => (
                  <button key={i} onClick={() => goTo(i)} aria-label={`Slide ${i + 1}`}
                    className={`transition-all duration-300 rounded-full ${i === current ? 'w-7 h-2 bg-[#e6a84f]' : 'w-2 h-2 bg-white/25 hover:bg-white/50'}`} />
                ))}
              </div>
              {/* Auto-progress bar */}
              <div className="w-32 h-0.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  key={`progress-${current}`}
                  className="h-full bg-[#e6a84f]/70 rounded-full"
                  initial={{ width: '0%' }} animate={{ width: '100%' }}
                  transition={{ duration: 4.5, ease: 'linear' }} />
              </div>
            </div>

            {/* Arrow controls */}
            <div className="flex gap-3 absolute bottom-12 right-0">
              {[{ dir: -1, label: '←' }, { dir: 1, label: '→' }].map(({ dir, label }) => (
                <button key={label} onClick={() => { setDirection(dir); setCurrent(p => (p + dir + HERO_SLIDES.length) % HERO_SLIDES.length); }}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#e6a84f]/80 text-white font-bold text-sm flex items-center justify-center transition-all border border-white/15 hover:border-[#e6a84f]">
                  {label}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden lg:block">
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}
          className="w-5 h-8 border-2 border-white/25 rounded-full flex justify-center pt-1.5">
          <div className="w-1 h-1.5 bg-white/40 rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}


/* ─── STATS — ENTERPRISE LEGACY EXPERIENCE ─── */

/* Custom luxury line-art icons (gold stroke, matched weight) */
const iconProps = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.4, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
function TrophyIcon() {
  return (<svg viewBox="0 0 32 32" className="w-full h-full" {...iconProps}>
    <path d="M10 5h12v6a6 6 0 0 1-12 0V5Z" /><path d="M10 7H6v2a4 4 0 0 0 4 4" /><path d="M22 7h4v2a4 4 0 0 1-4 4" />
    <path d="M16 17v4" /><path d="M12 27h8" /><path d="M13 21h6l-1 6h-4l-1-6Z" /></svg>);
}
function NetworkIcon() {
  return (<svg viewBox="0 0 32 32" className="w-full h-full" {...iconProps}>
    <circle cx="16" cy="7" r="3" /><circle cx="7" cy="22" r="3" /><circle cx="25" cy="22" r="3" />
    <path d="M16 10v5m0 0-6.5 5M16 15l6.5 5" /><path d="M10 22h12" /></svg>);
}
function PartnershipIcon() {
  return (<svg viewBox="0 0 32 32" className="w-full h-full" {...iconProps}>
    <path d="m6 16 4-4 5 4 2-2 5 5" /><path d="m17 14 3-3 6 6" /><path d="M3 12h4l3 3" /><path d="M29 12h-4l-3 3" />
    <path d="M15 20l-3 3a1.5 1.5 0 0 1-2-2l3-3" /></svg>);
}
function BuildingIcon() {
  return (<svg viewBox="0 0 32 32" className="w-full h-full" {...iconProps}>
    <path d="M6 27V9l8-4 8 4v18" /><path d="M22 13h4v14" /><path d="M4 27h24" />
    <path d="M11 13h0M16 13h0M11 18h0M16 18h0M11 23h0M16 23h0" strokeWidth="2" /></svg>);
}
function IndustryIcon() {
  return (<svg viewBox="0 0 32 32" className="w-full h-full" {...iconProps}>
    <path d="M4 27V14l7 4V14l7 4V9l3-3 3 3v18" /><path d="M3 27h26" />
    <path d="M22 6V3h2v3" /><path d="M9 23h0M16 23h0M23 23h0" strokeWidth="2" /></svg>);
}

const LEGACY_STATS = [
  { value: 35, suffix: '+', label: 'Years of Excellence', sub: 'Since 1991', Icon: TrophyIcon, img: '/images/dsc/formation-aerial.jpg' },
  { value: 500, suffix: '+', label: 'Professionals Deployed', sub: 'Trained workforce', Icon: NetworkIcon, img: '/images/dsc/formation-aerial.jpg' },
  { value: 100, suffix: '+', label: 'Trusted Clients', sub: 'Long-term partnerships', Icon: PartnershipIcon, img: '/images/dsc/formation-aerial.jpg' },
  { value: 2, suffix: '', label: 'Operational Offices', sub: 'Cuddalore · Puducherry', Icon: BuildingIcon, img: '/images/dsc/campus-signage.jpg' },
  { value: 5, suffix: '', label: 'Industries Served', sub: 'Across South India', Icon: IndustryIcon, img: '/images/dsc/deployment-campus-1.jpg' },
];

/* Letter-by-letter heading reveal */
function RevealHeading({ text, className, inView }: { text: string; className?: string; inView: boolean }) {
  return (
    <h2 className={className} aria-label={text}>
      {text.split(' ').map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap mr-[0.25em]">
          {word.split('').map((ch, ci) => (
            <motion.span key={ci} className="inline-block"
              initial={{ opacity: 0, y: 24, rotateX: -40 }}
              animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ delay: 0.3 + (wi * 4 + ci) * 0.022, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
              {ch}
            </motion.span>
          ))}
        </span>
      ))}
    </h2>
  );
}

/* Trusted-across industry icons (custom line art — no emojis) */
function ManufacturingIcon() {
  return (<svg viewBox="0 0 32 32" className="w-full h-full" {...iconProps}>
    <path d="M5 27V14l7 4v-4l7 4V7l4-2v22" /><path d="M3 27h26" />
    <path d="M9 22h0M16 22h0M23 22h0" strokeWidth="2" /></svg>);
}
function HealthcareIcon() {
  return (<svg viewBox="0 0 32 32" className="w-full h-full" {...iconProps}>
    <rect x="6" y="9" width="20" height="16" rx="2.5" /><path d="M16 13v8M12 17h8" /></svg>);
}
function EducationIcon() {
  return (<svg viewBox="0 0 32 32" className="w-full h-full" {...iconProps}>
    <path d="M16 6 3 12l13 6 13-6-13-6Z" /><path d="M8 15v6c0 1.3 3.6 3 8 3s8-1.7 8-3v-6" /><path d="M29 12v6" /></svg>);
}
function IndustrialIcon() {
  return (<svg viewBox="0 0 32 32" className="w-full h-full" {...iconProps}>
    <circle cx="16" cy="16" r="4" />
    <path d="M16 4v3M16 25v3M28 16h-3M7 16H4M24.5 7.5l-2.1 2.1M9.6 22.4l-2.1 2.1M24.5 24.5l-2.1-2.1M9.6 9.6 7.5 7.5" /></svg>);
}
function CorporateIcon() {
  return (<svg viewBox="0 0 32 32" className="w-full h-full" {...iconProps}>
    <path d="M9 27V6a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v21" /><path d="M5 27h22" />
    <path d="M13 10h0M19 10h0M13 15h0M19 15h0M13 20h0M19 20h0" strokeWidth="2" /></svg>);
}
const TRUST_INDUSTRIES = [
  { name: 'Manufacturing', Icon: ManufacturingIcon, img: '/images/dsc/deployment-campus-1.jpg', desc: 'Plant & factory floor security' },
  { name: 'Healthcare', Icon: HealthcareIcon, img: '/images/dsc/female-guards-salute.jpg', desc: 'Hospital & campus personnel' },
  { name: 'Education', Icon: EducationIcon, img: '/images/dsc/campus-deployment-2.jpg', desc: 'Institutional campus protection' },
  { name: 'Industrial', Icon: IndustrialIcon, img: '/images/dsc/guard-lineup-3.jpg', desc: 'Site patrol & access control' },
  { name: 'Corporate', Icon: CorporateIcon, img: '/images/dsc/team-group-1.jpg', desc: 'Office & facility management' },
];

/* Premium showcase gallery — real workforce imagery only (no vehicles) */
const SHOWCASE_IMAGES = [
  { src: '/images/dsc/formation-aerial.jpg', label: 'Workforce in formation' },
  { src: '/images/home/guards-march.jpg', label: 'Disciplined deployment' },
  { src: '/images/dsc/female-guards-salute.jpg', label: 'Trained female personnel' },
  { src: '/images/dsc/campus-patrol-1.jpg', label: 'Ceremonial honour guard' },
  { src: '/images/dsc/guard-ceremonial.jpg', label: 'Ceremonial post' },
  { src: '/images/home/arm-badge-patch.jpg', label: 'Since 1991 — verified standards' },
  { src: '/images/dsc/campus-deployment-2.jpg', label: 'Campus deployment' },
  { src: '/images/dsc/team-group-1.jpg', label: 'Professional team' },
];

/* ════════════════════════════════════════════════════════════════
   A LEGACY BUILT ON TRUST — cinematic brand experience
   (replaces the former statistics / timeline / photo-gallery)
   ════════════════════════════════════════════════════════════════ */

const LEGACY_CHAPTERS = [
  {
    year: '1991', kicker: 'The Beginning',
    lines: ['One Vision.', 'One Team.', 'One Commitment.'],
    img: '/images/dsc/guard-lineup-1.jpg',
  },
];

/* Alternating editorial milestones (rendered in LegacyTimeline) */
const LEGACY_MILESTONES = [
  {
    year: '2000', kicker: 'Expansion',
    headline: 'Expanding Across Tamil Nadu.',
    sub: 'Trusted by industries where reliability matters most.',
    img: '/images/dsc/formation-aerial.jpg',
  },
  {
    year: '2010', kicker: 'Partnership',
    headline: 'Building Long-Term Workforce Partnerships.',
    sub: 'Discipline. Scale. Trust — earned over decades.',
    img: '/images/home/guards-march.jpg',
  },
  {
    year: '2025', kicker: 'Legacy',
    headline: 'A Legacy, Sustained.',
    sub: 'The standard set in 1991 — upheld every day since, across 500+ professionals and 100+ clients.',
    img: '/images/dsc/team-group-1.jpg',
  },
];

const LEGACY_FIGURES = [
  { v: '35', u: 'Years of Service' },
  { v: '500+', u: 'Professionals' },
  { v: '100+', u: 'Trusted Clients' },
  { v: '2', u: 'Operational Offices' },
  { v: '5', u: 'Core Industries' },
];

/* — One full-height legacy chapter — */
function LegacyChapter({ chapter }: { chapter: typeof LEGACY_CHAPTERS[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-28%' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.32, 1.08]);
  const imgY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);
  const textY = useTransform(scrollYProgress, [0, 1], [70, -70]);

  return (
    <div ref={ref} className="relative h-screen min-h-[600px] w-full overflow-hidden flex items-center justify-center">
      <motion.div style={{ scale: imgScale, y: imgY }} className="absolute inset-0 will-change-transform">
        <motion.img src={chapter.img} alt=""
          className="w-full h-full object-cover"
          initial={{ opacity: 0, filter: 'blur(22px)' }}
          animate={inView ? { opacity: 1, filter: 'blur(0px)' } : {}}
          transition={{ duration: 1.9, ease: [0.22, 1, 0.36, 1] }} />
      </motion.div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(4,9,15,0.55)_0%,rgba(3,6,12,0.9)_100%)]" />
      <div className="absolute inset-0 bg-[#04090f]/25" />

      <motion.div style={{ y: textY }} className="relative z-10 text-center px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-fraunces font-semibold leading-none mb-5 tracking-tight bg-gradient-to-b from-white/[0.18] to-white/[0.04] bg-clip-text text-transparent"
          style={{ fontSize: 'clamp(5rem, 16vw, 13rem)' }}>
          {chapter.year}
        </motion.div>
        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.25, duration: 0.9 }}
          className="font-inter text-[#e6a84f] text-[11px] tracking-[0.55em] uppercase mb-7">{chapter.kicker}</motion.p>
        <div className="space-y-1.5">
          {chapter.lines.map((ln, li) => (
            <RevealHeading key={li} inView={inView} text={ln}
              className="font-poppins text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1]" />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* — 2025 finale: figures as luxury typography — */
/* Count-up hook — eases to target on activate; respects reduced-motion */
function useCountUp(target: number, active: boolean, duration = 1800) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setN(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - start) / duration, 1);
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return n;
}

/* Glassmorphic metric card — animated counter + hover lift + gold glow */
function LegacyStatCard({ stat, index, active }: { stat: typeof LEGACY_STATS[0]; index: number; active: boolean }) {
  const n = useCountUp(stat.value, active);
  const Icon = stat.Icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.35 + index * 0.1, duration: 0.7, ease }}
      className="group relative overflow-hidden rounded-2xl bg-white/[0.035] backdrop-blur-xl border border-white/[0.08] hover:border-[#e6a84f]/40 p-5 sm:p-6 lg:p-7 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_28px_64px_rgba(0,0,0,0.55)]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_0%,rgba(230,168,79,0.12),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="relative">
        <div className="w-10 h-10 rounded-xl bg-[#e6a84f]/[0.1] border border-[#e6a84f]/20 text-[#e6a84f] flex items-center justify-center mb-5 group-hover:scale-110 group-hover:border-[#e6a84f]/45 transition-all duration-300">
          <Icon />
        </div>
        <p className="font-poppins font-extrabold text-white leading-none mb-2.5 tabular-nums" style={{ fontSize: 'clamp(2.3rem, 5vw, 3.4rem)' }}>
          {n}<span className="text-[#e6a84f]">{stat.suffix}</span>
        </p>
        <p className="font-poppins font-semibold text-white/90 text-[13px] sm:text-sm leading-tight">{stat.label}</p>
        <p className="font-inter text-white/40 text-[11px] sm:text-xs mt-1">{stat.sub}</p>
      </div>
    </motion.div>
  );
}

function LegacyFinale() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-18%' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.2, 1.05]);
  const imgY = useTransform(scrollYProgress, [0, 1], ['-3%', '6%']);

  // Mouse-parallax depth for the ambient gold glow
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const glowX = useSpring(useTransform(mx, [-0.5, 0.5], [-26, 26]), { stiffness: 60, damping: 20 });
  const glowY = useSpring(useTransform(my, [-0.5, 0.5], [-22, 22]), { stiffness: 60, damping: 20 });
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const feature = LEGACY_STATS[0];
  const cards = LEGACY_STATS.slice(1);
  const years = useCountUp(feature.value, inView);

  return (
    <div ref={ref} onMouseMove={onMove}
      className="relative min-h-screen w-full overflow-hidden flex items-center py-24 lg:py-32">
      {/* Cinematic background — now clearly visible */}
      <motion.img style={{ scale: imgScale, y: imgY }} src="/images/dsc/formation-aerial.jpg" alt=""
        className="absolute inset-0 w-full h-[112%] object-cover will-change-transform" />
      <div className="absolute inset-0 bg-[#04090f]/68" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#04090f_0%,rgba(4,9,15,0.4)_45%,#04090f_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_78%_65%_at_50%_42%,transparent,rgba(4,9,15,0.72))]" />
      <motion.div style={{ x: glowX, y: glowY }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_45%_45%_at_78%_22%,rgba(230,168,79,0.13),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#e6a84f]/25 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 w-full">
        {/* Heading */}
        <motion.div initial={{ opacity: 0, y: 26 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease }} className="max-w-3xl mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2.5 mb-6">
            <span className="w-8 h-px bg-[#e6a84f]" />
            <span className="font-inter text-[#f0be6a] text-[11px] tracking-[0.4em] uppercase">Est. 1991 · The Legacy Today</span>
          </div>
          <h2 className="font-poppins text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.02]">
            Three Decades of{' '}
            <span className="font-fraunces italic font-medium bg-gradient-to-r from-[#f7d99a] via-[#e6a84f] to-[#c8902e] bg-clip-text text-transparent">Trust</span>
          </h2>
          <p className="font-inter text-white/55 text-base lg:text-lg leading-relaxed mt-5 max-w-xl">
            Measured not in years alone, but in the trust earned along the way — every figure below took 35 years to become true.
          </p>
        </motion.div>

        {/* Bento — feature "35 Years" + 2×2 metric cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5">
          {/* Feature panel */}
          <motion.div
            initial={{ opacity: 0, y: 34 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.85, ease }}
            className="lg:col-span-5 group relative overflow-hidden rounded-3xl border border-[#e6a84f]/25 bg-gradient-to-br from-[#0c1622]/85 to-[#04090f]/85 backdrop-blur-2xl p-7 sm:p-9 lg:p-10 flex flex-col justify-between min-h-[300px] lg:min-h-[460px]">
            <img src="/images/dsc/team-group-1.jpg" alt="" aria-hidden
              className="absolute inset-0 w-full h-full object-cover opacity-[0.14] group-hover:opacity-[0.24] transition-opacity duration-[1200ms]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#04090f] via-[#04090f]/55 to-transparent" />
            <div className="absolute -top-12 -right-12 w-52 h-52 bg-[radial-gradient(circle,rgba(230,168,79,0.22),transparent_65%)] pointer-events-none" />
            <div className="relative flex items-center justify-between">
              <span className="font-inter text-[#f0be6a] text-[11px] tracking-[0.3em] uppercase">Since 1991</span>
              <span className="w-11 h-11 rounded-xl bg-[#e6a84f]/[0.12] border border-[#e6a84f]/30 text-[#e6a84f] flex items-center justify-center"><TrophyIcon /></span>
            </div>
            <div className="relative">
              <p className="font-poppins font-extrabold text-white leading-[0.85] tabular-nums" style={{ fontSize: 'clamp(4.5rem, 11vw, 8rem)' }}>{years}</p>
              <p className="font-fraunces italic text-2xl lg:text-3xl text-[#e6a84f] mt-1">years of excellence</p>
              <p className="font-inter text-white/55 text-sm mt-4 max-w-xs leading-relaxed">A legacy built on discipline, trust, and an uncompromising standard — set in 1991, upheld every day since.</p>
            </div>
          </motion.div>

          {/* 2×2 metric grid */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-4 lg:gap-5">
            {cards.map((stat, i) => (
              <LegacyStatCard key={stat.label} stat={stat} index={i} active={inView} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* — Editorial image tile — */
function EditorialImg({ src, label, className = '', natural = false }: { src: string; label: string; className?: string; natural?: boolean }) {
  return (
    <ScrollReveal className={`group relative overflow-hidden rounded-2xl ${className}`}>
      <img src={src} alt={label}
        className={natural
          ? 'block w-full h-auto transition-transform duration-[1300ms] ease-out group-hover:scale-[1.02]'
          : 'absolute inset-0 w-full h-full object-cover transition-transform duration-[1300ms] ease-out group-hover:scale-105'} />
      <div className="absolute inset-0 bg-gradient-to-t from-[#04090f]/80 via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-5 left-5 flex items-center gap-2.5">
        <span className="w-6 h-px bg-[#e6a84f] transition-all duration-500 group-hover:w-10" />
        <span className="font-inter text-[#e6a84f] text-[10px] tracking-[0.3em] uppercase">{label}</span>
      </div>
    </ScrollReveal>
  );
}

/* — Section 2: Workforce Excellence (editorial magazine) — */
function WorkforceExcellence() {
  return (
    <div className="relative bg-[#04090f] py-24 lg:py-36">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14 lg:mb-20">
          <FadeIn>
            <p className="font-inter text-[#e6a84f] text-[11px] font-semibold tracking-[0.45em] uppercase mb-5">The Standard</p>
            <h2 className="font-poppins text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.05] mb-6">Workforce Excellence</h2>
            <p className="font-inter text-white/45 text-lg leading-relaxed">
              Three decades have refined a single discipline — the deliberate preparation of every individual we deploy. This is not staffing. This is standard-setting.
            </p>
          </FadeIn>
        </div>

        {/* Asymmetric magazine grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-5">
          <EditorialImg src="/images/dsc/female-guards-salute.jpg" label="Our People"
            className="md:col-span-7 aspect-[4/3] md:aspect-[16/12]" />
          <EditorialImg src="/images/dsc/guard-lineup-1.jpg" label="Discipline"
            className="md:col-span-5 aspect-[4/3] md:aspect-[16/12]" />
          <EditorialImg src="/images/dsc/supervisors-duo.jpg" label="Trust"
            className="md:col-span-5 aspect-[4/3]" />
          <EditorialImg src="/images/dsc/formation-aerial.jpg" label="Scale"
            className="md:col-span-7 aspect-[4/3] md:aspect-auto" />
        </div>
        <EditorialImg src="/images/dsc/guard-lineup-3.jpg" label="The Workforce"
          natural className="mt-4 lg:mt-5" />
      </div>
    </div>
  );
}

/* — Section 3: Discipline in Motion (Apple-style scroll sequence) — */
function DisciplineInMotion() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  const o1 = useTransform(scrollYProgress, [0, 0.30, 0.40], [1, 1, 0]);
  const s1 = useTransform(scrollYProgress, [0, 0.40], [1.0, 1.18]);
  const o2 = useTransform(scrollYProgress, [0.30, 0.40, 0.66, 0.74], [0, 1, 1, 0]);
  const s2 = useTransform(scrollYProgress, [0.30, 0.74], [1.18, 1.0]);
  const o3 = useTransform(scrollYProgress, [0.66, 0.74, 1], [0, 1, 1]);
  const s3 = useTransform(scrollYProgress, [0.66, 1], [1.18, 1.02]);

  const cap1 = useTransform(scrollYProgress, [0.03, 0.10, 0.30, 0.40], [0, 1, 1, 0]);
  const cap2 = useTransform(scrollYProgress, [0.40, 0.48, 0.66, 0.74], [0, 1, 1, 0]);
  const cap3 = useTransform(scrollYProgress, [0.74, 0.82, 1], [0, 1, 1]);

  return (
    <section ref={ref} className="relative h-[300vh] bg-black">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.img style={{ opacity: o1, scale: s1 }} src="/images/home/guards-march.jpg" alt=""
          className="absolute inset-0 w-full h-full object-cover will-change-transform" />
        <motion.img style={{ opacity: o2, scale: s2 }} src="/images/dsc/formation-aerial.jpg" alt=""
          className="absolute inset-0 w-full h-full object-cover will-change-transform" />
        <motion.img style={{ opacity: o3, scale: s3 }} src="/images/dsc/guard-ceremonial.jpg" alt=""
          className="absolute inset-0 w-full h-full object-cover will-change-transform" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,9,15,0.62)_0%,rgba(4,9,15,0.28)_45%,rgba(4,9,15,0.85)_100%)]" />
        {/* Center scrim — lifts the text off the image for legibility */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_62%_46%_at_50%_50%,rgba(4,9,15,0.6),transparent_72%)]" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
          {/* Eyebrow — flanked by gold rules */}
          <div className="flex items-center gap-4 mb-8 sm:mb-10">
            <span className="h-px w-10 sm:w-16 bg-gradient-to-r from-transparent to-[#e6a84f]/70" />
            <p className="font-inter text-[#f0be6a] text-[10px] sm:text-[11px] font-semibold tracking-[0.45em] uppercase whitespace-nowrap [text-shadow:0_2px_14px_rgba(0,0,0,0.85)]">Discipline in Motion</p>
            <span className="h-px w-10 sm:w-16 bg-gradient-to-l from-transparent to-[#e6a84f]/70" />
          </div>

          {/* Captions — editorial two-tone: Poppins white + Fraunces gold serif */}
          <div className="relative h-32 sm:h-36 md:h-44 w-full max-w-4xl">
            {[
              { o: cap1, a: 'Every step,', b: 'in formation.' },
              { o: cap2, a: 'Every guard,', b: 'in line.' },
              { o: cap3, a: 'Every duty,', b: 'with honour.' },
            ].map((c, i) => (
              <motion.div key={i} style={{ opacity: c.o }}
                className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 sm:gap-2">
                <span className="font-poppins font-bold text-white leading-[1.04] tracking-[-0.01em] [text-shadow:0_3px_26px_rgba(0,0,0,0.7)]" style={{ fontSize: 'clamp(1.9rem, 6vw, 4rem)' }}>{c.a}</span>
                <span className="font-fraunces italic font-medium leading-[1.04] bg-gradient-to-r from-[#f7d99a] via-[#f0be6a] to-[#e6a84f] bg-clip-text text-transparent drop-shadow-[0_3px_18px_rgba(0,0,0,0.55)]" style={{ fontSize: 'clamp(1.9rem, 6vw, 4rem)' }}>{c.b}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* — Alternating editorial milestone (2000 · 2010 · 2025) — */
function LegacyMilestone({ m, index }: { m: typeof LEGACY_MILESTONES[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-18%' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-7%', '7%']);
  const flip = index % 2 === 1;

  return (
    <div ref={ref} className="relative">
      {/* node on the central line (desktop) */}
      <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <motion.span initial={{ scale: 0, opacity: 0 }} animate={inView ? { scale: 1, opacity: 1 } : {}} transition={{ duration: 0.5, ease }}
          className="flex w-4 h-4 rounded-full bg-[#04090f] border-2 border-[#e6a84f] items-center justify-center">
          <span className="w-1.5 h-1.5 rounded-full bg-[#e6a84f] shadow-[0_0_12px_rgba(230,168,79,0.9)]" />
        </motion.span>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">
        {/* IMAGE — soft-morphism frame + parallax */}
        <motion.div initial={{ opacity: 0, y: 42 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, ease }}
          className={`relative ${flip ? 'lg:order-2' : ''}`}>
          <div className="relative rounded-[1.75rem] p-2 bg-gradient-to-br from-[#0e1c28] to-[#070e16] border border-white/10
            shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_30px_64px_rgba(0,0,0,0.55)]">
            <div className="relative aspect-[16/11] overflow-hidden rounded-[1.4rem]">
              <motion.img style={{ y: imgY }} src={m.img} alt={`Sai Saktheeswari — ${m.kicker}`}
                className="absolute inset-0 w-full h-[118%] object-cover will-change-transform" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#04090f]/65 via-transparent to-transparent" />
              <div className="absolute inset-3 rounded-[1.1rem] border border-[#e6a84f]/15 pointer-events-none" />
            </div>
          </div>
        </motion.div>

        {/* TEXT */}
        <div className={`relative ${flip ? 'lg:order-1 lg:pr-12' : 'lg:pl-12'}`}>
          <motion.span initial={{ opacity: 0, y: 26 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, ease }}
            className="block font-fraunces font-semibold leading-[0.9] tracking-tight bg-gradient-to-br from-[#f7d99a] via-[#e6a84f] to-[#c8902e] bg-clip-text text-transparent drop-shadow-[0_4px_30px_rgba(230,168,79,0.18)]"
            style={{ fontSize: 'clamp(3.4rem, 8vw, 6rem)' }}>
            {m.year}
          </motion.span>
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2, duration: 0.8 }}
            className="font-inter text-[#f0be6a] text-[11px] tracking-[0.4em] uppercase mt-3 mb-5">{m.kicker}</motion.p>
          <RevealHeading inView={inView} text={m.headline}
            className="font-poppins text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-[1.06] tracking-[-0.01em]" />
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.7, duration: 0.9 }}
            className="font-inter text-white/65 text-base lg:text-lg leading-relaxed mt-6 max-w-md">{m.sub}</motion.p>
        </div>
      </div>
    </div>
  );
}

/* — Cinematic aurora background (21st.dev-inspired): drifting light, depth grid, beam, particles, grain — */
function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* drifting aurora light */}
      <motion.div animate={{ x: ['-8%', '10%', '-8%'], y: ['-6%', '8%', '-6%'], scale: [1, 1.18, 1] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-32 left-[16%] w-[42rem] h-[42rem] rounded-full blur-[120px] bg-[radial-gradient(circle,rgba(230,168,79,0.18),transparent_60%)]" />
      <motion.div animate={{ x: ['8%', '-10%', '8%'], y: ['6%', '-8%', '6%'], scale: [1.12, 1, 1.12] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[26%] right-[12%] w-[36rem] h-[36rem] rounded-full blur-[130px] bg-[radial-gradient(circle,rgba(45,122,151,0.20),transparent_62%)]" />
      <motion.div animate={{ x: ['-6%', '8%', '-6%'], y: ['8%', '-4%', '8%'], scale: [1, 1.1, 1] }}
        transition={{ duration: 32, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-24 left-[34%] w-[38rem] h-[38rem] rounded-full blur-[140px] bg-[radial-gradient(circle,rgba(200,144,46,0.12),transparent_60%)]" />

      {/* depth grid, masked to centre */}
      <div className="absolute inset-0 opacity-[0.05]"
        style={{ backgroundImage: 'linear-gradient(#e6a84f 1px, transparent 1px), linear-gradient(90deg, #e6a84f 1px, transparent 1px)', backgroundSize: '58px 58px', WebkitMaskImage: 'radial-gradient(ellipse 70% 62% at 50% 38%, #000 26%, transparent 76%)', maskImage: 'radial-gradient(ellipse 70% 62% at 50% 38%, #000 26%, transparent 76%)' }} />

      {/* sweeping light beam */}
      <motion.div animate={{ x: ['-45%', '150%'] }} transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', repeatDelay: 5 }}
        className="absolute top-0 h-full w-1/4 bg-gradient-to-r from-transparent via-[#e6a84f]/[0.06] to-transparent skew-x-[16deg] blur-md" />

      {/* very subtle floating particles */}
      {[...Array(14)].map((_, i) => (
        <motion.span key={i}
          className="absolute w-[3px] h-[3px] rounded-full bg-[#f0be6a]/50"
          style={{ left: `${(i * 7.3 + 4) % 96}%`, top: `${(i * 11.7 + 6) % 92}%` }}
          animate={{ y: [0, -34, 0], opacity: [0, 0.7, 0] }}
          transition={{ duration: 7 + (i % 5), repeat: Infinity, ease: 'easeInOut', delay: i * 0.6 }} />
      ))}

      {/* film-grain noise */}
      <div className="absolute inset-0 opacity-[0.04] mix-blend-soft-light"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: '200px 200px' }} />

      {/* vignette to anchor text */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_32%,rgba(4,9,15,0.82)_88%)]" />
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#04090f] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#04090f] to-transparent" />
    </div>
  );
}

/* — Editorial timeline: 2000 · 2010 · 2025 · cinematic aurora + scroll-drawn line — */
function LegacyTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 60%', 'end 80%'] });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const cometTop = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const cometOpacity = useTransform(scrollYProgress, [0, 0.04, 0.96, 1], [0, 1, 1, 0]);

  // mouse-reactive ambient glow
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.15);
  const glowX = useSpring(useTransform(mx, [0, 1], ['8%', '92%']), { stiffness: 50, damping: 22 });
  const glowY = useSpring(useTransform(my, [0, 1], ['0%', '100%']), { stiffness: 50, damping: 22 });
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };

  return (
    <div ref={ref} onMouseMove={onMove} className="relative bg-[#04090f] py-24 lg:py-36 overflow-hidden">
      <AuroraBackground />
      <motion.div style={{ left: glowX, top: glowY }}
        className="absolute hidden lg:block w-[30rem] h-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[110px] bg-[radial-gradient(circle,rgba(230,168,79,0.1),transparent_60%)] pointer-events-none" />

      <FadeIn className="relative z-10 text-center mb-20 lg:mb-28 px-6">
        <div className="inline-flex items-center gap-2.5 mb-6">
          <span className="w-8 h-px bg-[#e6a84f]" />
          <span className="font-inter text-[#f0be6a] text-[11px] tracking-[0.4em] uppercase">The Milestones</span>
          <span className="w-8 h-px bg-[#e6a84f]" />
        </div>
        <h2 className="font-poppins font-extrabold text-white text-4xl lg:text-6xl leading-[1.04]">
          Three decades,
          <span className="block font-fraunces italic font-medium bg-gradient-to-r from-[#f7d99a] to-[#c8902e] bg-clip-text text-transparent mt-1">measured in milestones.</span>
        </h2>
      </FadeIn>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
        {/* central timeline line (desktop) */}
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-white/10" />
        <motion.div style={{ scaleY: lineScaleY }} className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 origin-top bg-gradient-to-b from-[#f0be6a] via-[#e6a84f] to-[#c8902e] shadow-[0_0_16px_rgba(230,168,79,0.7)]" />
        {/* traveling comet head */}
        <motion.div style={{ top: cometTop, opacity: cometOpacity }}
          className="hidden lg:block absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <span className="block w-2.5 h-2.5 rounded-full bg-[#f7d99a] shadow-[0_0_18px_6px_rgba(230,168,79,0.6)]" />
        </motion.div>

        <div className="space-y-24 lg:space-y-36">
          {LEGACY_MILESTONES.map((m, i) => <LegacyMilestone key={m.year} m={m} index={i} />)}
        </div>
      </div>
    </div>
  );
}

function LegacyExperience() {
  const introRef = useRef<HTMLDivElement>(null);
  const introInView = useInView(introRef, { once: true, margin: '-15%' });
  const { scrollYProgress } = useScroll({ target: introRef, offset: ['start start', 'end start'] });
  const introImgScale = useTransform(scrollYProgress, [0, 1], [1.15, 1.3]);
  const introImgOpacity = useTransform(scrollYProgress, [0, 1], [0.32, 0.1]);

  return (
    <section className="relative bg-[#04090f]">

      {/* ── INTRO TITLE SCREEN ── */}
      <div ref={introRef} className="relative h-[88vh] min-h-[560px] w-full overflow-hidden flex items-center justify-center">
        <motion.img style={{ scale: introImgScale, opacity: introImgOpacity }}
          src="/images/dsc/formation-aerial.jpg" alt=""
          className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(4,9,15,0.4)_0%,#04090f_95%)]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[50rem] h-[50rem] bg-[#e6a84f]/[0.04] rounded-full blur-[160px] pointer-events-none" />

        <div className="relative z-10 text-center px-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={introInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-poppins font-extrabold text-[#e6a84f] tracking-[0.08em] uppercase leading-none mb-6"
            style={{ fontSize: 'clamp(2.4rem, 7vw, 6rem)' }}>
            Est. 1991
          </motion.p>
          <RevealHeading inView={introInView} text="A Legacy Built On Trust"
            className="font-poppins text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.04] max-w-5xl mx-auto" />
          <motion.div initial={{ scaleX: 0 }} animate={introInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.9, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-10 h-px w-56 bg-gradient-to-r from-transparent via-[#e6a84f] to-transparent" />
          <motion.p initial={{ opacity: 0 }} animate={introInView ? { opacity: 1 } : {}} transition={{ delay: 1.2, duration: 1 }}
            className="font-inter text-white/40 text-xs tracking-[0.3em] uppercase mt-10">Scroll to begin</motion.p>
        </div>
      </div>

      {/* ── SECTION 1 · LEGACY STORY ── */}
      {LEGACY_CHAPTERS.map((c, i) => <LegacyChapter key={i} chapter={c} />)}
      <LegacyTimeline />
      <LegacyFinale />

      {/* ── SECTION 2 · WORKFORCE EXCELLENCE ── */}
      <WorkforceExcellence />

      {/* ── SECTION 3 · DISCIPLINE IN MOTION ── */}
      <DisciplineInMotion />
    </section>
  );
}

/* ─── FOUNDER — CINEMATIC LEGACY EXPERIENCE ─── */

const FOUNDER_STORY = [
  {
    year: '1991',
    headline: 'The Vision',
    body: 'Founded in Cuddalore on a single commitment to discipline and trust — driven by a belief that South India deserved a workforce partner it could truly rely on.',
  },
  {
    year: '2000',
    headline: 'The Expansion',
    body: 'A decade of delivered promises opened doors across Tamil Nadu. Industries that once questioned us returned as long-term partners — because results do not need advertising.',
  },
  {
    year: '2010',
    headline: 'The Partnership Era',
    body: 'Trusted by manufacturers, hospitals, and educational institutions alike. Each relationship was built personally — not through proposals, but through performance.',
  },
  {
    year: '2025',
    headline: 'The Legacy',
    body: '500+ professionals. 100+ clients. 35 years of honour. The commitment made in 1991 remains unchanged — every worker we deploy carries our reputation.',
  },
];

function JourneyMilestone({ entry, index }: { entry: typeof FOUNDER_STORY[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-18%' });
  const isLeft = index % 2 === 0;
  return (
    <div ref={ref} className="relative pb-14 lg:pb-20 last:pb-0 pl-14 lg:pl-0 lg:grid lg:grid-cols-2">
      {/* Glowing pulse node on the rail */}
      <div className="absolute left-3 lg:left-1/2 lg:-translate-x-1/2 top-6 z-20">
        <motion.span
          initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.55, ease }}
          className="relative flex h-4 w-4 items-center justify-center">
          <span className="absolute inline-flex h-full w-full rounded-full bg-[#e6a84f]/40 animate-ping" />
          <span className="relative h-3 w-3 rounded-full bg-[#e6a84f] ring-4 ring-[#04090f] shadow-[0_0_18px_rgba(230,168,79,0.85)]" />
        </motion.span>
      </div>

      {/* Glass milestone panel — alternates sides on desktop */}
      <motion.div
        initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease }}
        className={isLeft ? 'lg:col-start-1 lg:pr-14' : 'lg:col-start-2 lg:pl-14'}>
        <div className={`group relative overflow-hidden rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] hover:border-[#e6a84f]/40 p-6 lg:p-8 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_28px_64px_rgba(0,0,0,0.5)] ${isLeft ? 'lg:text-right' : ''}`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(230,168,79,0.1),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <div className="relative">
            <p className="font-poppins font-extrabold leading-none mb-3 bg-gradient-to-br from-[#f7d99a] via-[#e6a84f] to-[#c8902e] bg-clip-text text-transparent tabular-nums" style={{ fontSize: 'clamp(2.6rem, 7vw, 4.5rem)' }}>{entry.year}</p>
            <p className="font-fraunces italic font-medium text-white text-xl lg:text-2xl mb-3">{entry.headline}</p>
            <p className="font-inter text-white/60 text-sm lg:text-[15px] leading-[1.8]">{entry.body}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function FounderSection() {
  /* Journey timeline */
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: tlScroll } = useScroll({ target: timelineRef, offset: ['start end', 'end center'] });
  const lineScaleY = useTransform(tlScroll, [0, 0.95], [0, 1]);

  return (
    <section className="relative bg-[#04090f]">

      {/* ── JOURNEY TIMELINE ── */}
      <div ref={timelineRef} className="relative py-24 lg:py-36 bg-[#04090f] overflow-hidden">
        {/* Ambient cinematic lighting */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(230,168,79,0.06),transparent)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_85%_75%,rgba(13,79,100,0.08),transparent)] pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#e6a84f]/20 to-transparent" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-12">
          {/* Centered header */}
          <FadeIn className="text-center mb-16 lg:mb-24 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2.5 mb-5">
              <span className="w-8 h-px bg-[#e6a84f]" />
              <span className="font-inter text-[#f0be6a] text-[11px] font-semibold tracking-[0.4em] uppercase">The Journey</span>
              <span className="w-8 h-px bg-[#e6a84f]" />
            </div>
            <h2 className="font-poppins font-extrabold text-white leading-[1.05]" style={{ fontSize: 'clamp(2.2rem, 5.5vw, 4rem)' }}>
              How a legacy is built.{' '}
              <span className="font-fraunces italic font-medium bg-gradient-to-r from-[#f7d99a] to-[#c8902e] bg-clip-text text-transparent">Year by year.</span>
            </h2>
          </FadeIn>

          {/* Alternating timeline */}
          <div className="relative">
            {/* Static rail track */}
            <div className="absolute left-[19px] lg:left-1/2 lg:-translate-x-1/2 top-1 bottom-0 w-px bg-white/[0.06]" />
            {/* Gold rail — drawn on scroll */}
            <motion.div
              style={{ scaleY: lineScaleY, transformOrigin: 'top' }}
              className="absolute left-[19px] lg:left-1/2 lg:-translate-x-1/2 top-1 bottom-0 w-px bg-gradient-to-b from-[#e6a84f]/60 via-[#e6a84f]/25 to-transparent"
            />
            {FOUNDER_STORY.map((entry, i) => (
              <JourneyMilestone key={i} entry={entry} index={i} />
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}

/* ─── SERVICES ─── */
/* ─── WHAT WE DO — premium editorial bento ─── */
const svcStroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
function IconShield() { return <svg width="22" height="22" viewBox="0 0 24 24" {...svcStroke}><path d="M12 2 4 5v6c0 5 3.4 8.5 8 10 4.6-1.5 8-5 8-10V5l-8-3Z" /><path d="m9 12 2 2 4-4" /></svg>; }
function IconWorkforce() { return <svg width="22" height="22" viewBox="0 0 24 24" {...svcStroke}><circle cx="9" cy="8" r="3" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 5.4a3 3 0 0 1 0 5.2M21.5 20a6.5 6.5 0 0 0-5-6.3" /></svg>; }
function IconContract() { return <svg width="22" height="22" viewBox="0 0 24 24" {...svcStroke}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M8 13h8M8 17h5" /></svg>; }
function IconCompliance() { return <svg width="22" height="22" viewBox="0 0 24 24" {...svcStroke}><path d="M12 3v18M5 7h14M7 7l-3 6a3 3 0 0 0 6 0L7 7Zm10 0-3 6a3 3 0 0 0 6 0l-3-6Z" /></svg>; }

const SERVICE_VISUALS: Record<string, { img: string; Icon: () => React.ReactElement }> = {
  security: { img: '/images/dsc/campus-deployment-2.jpg', Icon: IconShield },
  labour: { img: '/images/dsc/team-group-1.jpg', Icon: IconWorkforce },
  contract: { img: '/images/dsc/supervisors-duo.jpg', Icon: IconContract },
  compliance: { img: '/images/dsc/campus-patrol-1.jpg', Icon: IconCompliance },
};

function ServiceCard({ service, index }: { service: typeof SERVICES[0]; index: number }) {
  const v = SERVICE_VISUALS[service.id];
  const span = index === 0 || index === 3 ? 'lg:col-span-7' : 'lg:col-span-5';
  return (
    <motion.a href="/services"
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: (index % 2) * 0.1, ease }}
      className={`${span} group relative overflow-hidden rounded-3xl ring-1 ring-white/[0.08] hover:ring-[#e6a84f]/40 min-h-[300px] lg:min-h-[360px] flex transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_70px_rgba(0,0,0,0.55)]`}>
      <img src={v.img} alt={service.title}
        className="absolute inset-0 w-full h-full object-cover brightness-[0.5] group-hover:brightness-[0.42] group-hover:scale-[1.06] transition-all duration-[900ms] ease-out" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#04090f] via-[#04090f]/55 to-[#04090f]/10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_100%,rgba(230,168,79,0.16),transparent_55%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10 mt-auto p-6 lg:p-8 w-full">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-2xl bg-[#04090f]/55 backdrop-blur-md border border-[#e6a84f]/30 text-[#e6a84f] flex items-center justify-center group-hover:scale-110 group-hover:border-[#e6a84f]/55 transition-all duration-300">
            <v.Icon />
          </div>
          <span className="font-fraunces italic text-white/25 text-3xl leading-none">0{index + 1}</span>
        </div>
        <h3 className="font-poppins font-bold text-white text-xl lg:text-2xl mb-2 tracking-[-0.01em]">{service.title}</h3>
        <p className="font-inter text-white/60 text-sm leading-relaxed mb-5 max-w-md line-clamp-2">{service.desc}</p>
        <span className="inline-flex items-center gap-2 font-poppins font-semibold text-[#e6a84f] text-sm">
          Explore Service
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
            <path d="M2 7h9.5M7.5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </motion.a>
  );
}

function ServicesSection() {
  return (
    <section id="services" className="relative bg-[#050d1a] py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#e6a84f]/20 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(230,168,79,0.06),transparent)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial split header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 lg:mb-16">
          <FadeIn className="max-w-2xl">
            <div className="inline-flex items-center gap-2.5 mb-5">
              <span className="w-8 h-px bg-[#e6a84f]" />
              <span className="font-inter text-[#f0be6a] text-[11px] font-semibold tracking-[0.3em] uppercase">What We Do</span>
            </div>
            <h2 className="font-poppins text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.04]">
              Complete Workforce{' '}
              <span className="font-fraunces italic font-medium bg-gradient-to-r from-[#f7d99a] to-[#c8902e] bg-clip-text text-transparent">Solutions</span>
            </h2>
          </FadeIn>
          <FadeIn className="lg:max-w-md">
            <p className="font-inter text-white/55 text-base lg:text-lg leading-relaxed lg:text-right">
              From security personnel to statutory compliance — one trusted partner for every workforce need across Tamil Nadu since 1991.
            </p>
          </FadeIn>
        </div>

        {/* Asymmetric bento */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 4S ENTERPRISE PROCESS ─── */

type EntMetric = { value?: number; suffix?: string; comma?: boolean; display?: string; label: string };
const ENT_METRICS: EntMetric[] = [
  { value: 10000, suffix: '+', comma: true, label: 'Workforce in Network' },
  { value: 500, suffix: '+', label: 'Client Businesses' },
  { value: 95, suffix: '%', label: 'Year-One Retention' },
  { display: '24/7', label: 'Support Coverage' },
];

const PROCESS_STEPS = [
  {
    num: '01', key: 'SOURCE', eyebrow: 'Talent Acquisition Network',
    desc: 'We identify the right candidates from verified talent pools across Tamil Nadu and Puducherry — built over 35 years of regional presence and community trust.',
    points: ['25+ district coverage', 'Community referral network', 'Gender-inclusive hiring', 'Verified talent database'],
    img: '/images/dsc/formation-aerial.jpg',
    imgAlt: 'Sai Saktheeswari guards in S-formation — scale of talent network',
    stat: '10,000+', statLabel: 'in our talent network', flip: false,
  },
  {
    num: '02', key: 'SCREEN', eyebrow: 'Verification Workflow',
    desc: 'Every candidate undergoes a rigorous 3-stage screening: background verification, medical fitness assessment, and skills evaluation — before any placement offer.',
    points: ['Criminal background check', 'Medical fitness clearance', 'Skill & aptitude test', 'Reference verification'],
    img: '/images/home/arm-badge-patch.jpg',
    imgAlt: 'Sai Saktheeswari arm badge — verified professional standards since 1991',
    stat: '100%', statLabel: 'background verified', flip: true,
  },
  {
    num: '03', key: 'SUPPORT', eyebrow: 'Training Ecosystem',
    desc: 'Our certified training programme covers security protocols, emergency response, professional grooming, and communication — overseen by our senior training supervisors.',
    points: ['Security & safety protocols', 'Emergency response drills', 'Professional grooming standards', 'Communication skills'],
    img: '/images/home/guards-march.jpg',
    imgAlt: 'Sai Saktheeswari guards marching in formation — training excellence',
    stat: '500+', statLabel: 'trained & deployed', flip: false,
  },
  {
    num: '04', key: 'SUSTAIN', eyebrow: 'Performance Management',
    desc: "Our commitment doesn't end at deployment. Continuous monitoring, monthly performance reviews, and workforce continuity planning ensure your operations never miss a beat.",
    points: ['Monthly performance reviews', 'Attendance & duty tracking', 'Replacement guarantee', 'Client satisfaction checks'],
    img: '/images/home/badge-uniform.jpg',
    imgAlt: 'Sai Saktheeswari uniform badge — sustained professional standards',
    stat: '95%', statLabel: 'year-one retention rate', flip: true,
  },
];

function ProcessStepPanel({ step, index }: { step: typeof PROCESS_STEPS[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <div ref={ref} className={`relative ${index % 2 === 0 ? 'bg-[#050d1a]' : 'bg-[#060d1c]'}`}>
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#e6a84f]/12 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className={`flex flex-col ${step.flip ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-20 items-center`}>

          {/* Image side */}
          <div className="w-full lg:w-[52%]">
            <div className="relative rounded-3xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.55)] ring-1 ring-white/8">
              <motion.img style={{ y: imgY }}
                src={step.img} alt={step.imgAlt}
                className="w-full aspect-[4/3] lg:aspect-[16/11] object-cover scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050d1a]/55 via-transparent to-transparent" />
              <motion.div
                initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.55, duration: 0.5 }}
                className={`absolute bottom-5 ${step.flip ? 'left-5' : 'right-5'} bg-black/70 backdrop-blur-xl border border-white/10 rounded-2xl px-5 py-4`}>
                <p className="font-poppins text-2xl font-extrabold text-[#e6a84f] leading-none">{step.stat}</p>
                <p className="font-inter text-white/50 text-xs mt-1">{step.statLabel}</p>
              </motion.div>
            </div>
          </div>

          {/* Content side */}
          <div className="w-full lg:w-[48%]">
            <motion.div
              initial={{ opacity: 0, x: step.flip ? 24 : -24 }} animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.65 }}
              className="flex items-end gap-4 mb-5">
              <span className="font-poppins text-[6rem] lg:text-[9rem] xl:text-[11rem] font-extrabold text-white/[0.04] leading-none select-none">{step.num}</span>
              <div className="h-px flex-1 bg-gradient-to-r from-[#e6a84f]/25 to-transparent mb-6" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 12 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.12, duration: 0.55 }}
              className="font-inter text-[#e6a84f] text-[10px] font-bold tracking-[0.3em] uppercase mb-3">
              {step.eyebrow}
            </motion.p>

            <motion.h3
              initial={{ opacity: 0, y: 18 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.18, duration: 0.6 }}
              className="font-poppins text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-none mb-7">
              {step.key}
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 12 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="font-inter text-white/48 text-base lg:text-lg leading-relaxed mb-8">
              {step.desc}
            </motion.p>

            <div className="space-y-3.5">
              {step.points.map((pt, pi) => (
                <motion.div key={pi}
                  initial={{ opacity: 0, x: -14 }} animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.32 + pi * 0.075, duration: 0.45 }}
                  className="flex items-center gap-3.5 group cursor-default">
                  <div className="w-5 h-5 rounded-full bg-[#e6a84f]/8 border border-[#e6a84f]/25 flex items-center justify-center flex-shrink-0 group-hover:bg-[#e6a84f]/18 group-hover:border-[#e6a84f]/50 transition-all duration-200">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#e6a84f]" />
                  </div>
                  <span className="font-inter text-white/60 text-sm group-hover:text-white/85 transition-colors duration-200">{pt}</span>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function ProcessMetric({ m }: { m: EntMetric }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-30px' });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView || m.value == null) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1700;
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      setN(Math.round(m.value! * (1 - Math.pow(1 - p, 4))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, m.value]);
  const text = m.display ?? `${m.comma ? n.toLocaleString('en-IN') : n}${m.suffix ?? ''}`;
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 26, scale: 0.96 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.65, ease: easeExpo }}
      className="group relative bg-[#0a1422]/85 backdrop-blur-xl border border-[#e6a84f]/20 rounded-2xl p-5 lg:p-7 text-center shadow-[0_20px_55px_rgba(0,0,0,0.55)] hover:border-[#e6a84f]/45 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden">
      <span className="absolute -top-10 left-1/2 -translate-x-1/2 w-28 h-20 bg-[#e6a84f]/12 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <span className="relative block font-poppins font-extrabold text-[#e6a84f] text-[2rem] lg:text-[2.7rem] leading-none tabular-nums drop-shadow-[0_2px_16px_rgba(230,168,79,0.35)]">{text}</span>
      <span className="relative block font-inter text-white/65 text-[9.5px] lg:text-[10.5px] uppercase tracking-[0.18em] mt-3 font-medium">{m.label}</span>
    </motion.div>
  );
}

function ProcessSection() {
  const heroRef = useRef(null);
  const { scrollYProgress: heroProg } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroImgY = useTransform(heroProg, [0, 1], ['0%', '15%']);
  const heroScale = useTransform(heroProg, [0, 1], [1.06, 1.18]);

  const journeyRef = useRef(null);
  const { scrollYProgress: jProg } = useScroll({ target: journeyRef, offset: ['start 78%', 'center 55%'] });
  const lineScaleX = useTransform(jProg, [0, 1], [0, 1]);

  const stages = PROCESS_STEPS.map((s) => ({ num: s.num, key: s.key, eyebrow: s.eyebrow, desc: s.desc, points: s.points, stat: s.stat, statLabel: s.statLabel }));

  return (
    <section id="process" className="relative bg-[#050d1a] overflow-hidden">

      {/* ── HERITAGE EDITORIAL HERO — asymmetric · soft-morphism ── */}
      <div ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden py-32 lg:py-36 bg-[#04090f]">
        {/* faint formation atmosphere on the right + gold floor glow + fine grid */}
        <motion.div style={{ y: heroImgY }} className="absolute inset-y-0 right-0 w-full lg:w-[60%] will-change-transform">
          <img src="/images/dsc/formation-aerial.jpg" alt="" aria-hidden className="w-full h-full object-cover object-center opacity-[0.18] lg:opacity-[0.28]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#04090f] via-[#04090f]/75 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#04090f] via-transparent to-[#04090f]/60" />
        </motion.div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_122%,rgba(230,168,79,0.13),transparent)] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#e6a84f 1px, transparent 1px), linear-gradient(90deg, #e6a84f 1px, transparent 1px)', backgroundSize: '64px 64px' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">

            {/* LEFT — editorial */}
            <div className="lg:col-span-7">
              <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: easeExpo }}
                className="flex items-center gap-4 mb-8">
                <span className="h-px w-14 bg-gradient-to-r from-[#e6a84f] to-transparent" />
                <span className="font-inter text-[#f0be6a] text-[10px] font-semibold tracking-[0.42em] uppercase">Est. 1991 · Proven Methodology</span>
              </motion.div>

              <h2 className="font-poppins font-extrabold leading-[0.86] tracking-[-0.03em]">
                <motion.span initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-10%' }} transition={{ duration: 0.85, delay: 0.05, ease: easeExpo }}
                  className="block text-[4rem] sm:text-7xl lg:text-8xl xl:text-[9rem] text-white">The 4<span className="text-[#e6a84f]">S</span></motion.span>
                <motion.span initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-10%' }} transition={{ duration: 0.85, delay: 0.16, ease: easeExpo }}
                  className="block text-[4rem] sm:text-7xl lg:text-8xl xl:text-[9rem] text-white/45">System</motion.span>
              </h2>

              <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.42, ease: easeExpo }}
                className="font-fraunces italic text-[#f0be6a] text-2xl lg:text-[2.1rem] leading-snug mt-6">
                Four disciplined stages. One workforce standard.
              </motion.p>

              <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.58 }}
                className="font-inter text-white/70 text-base lg:text-lg max-w-lg leading-relaxed mt-7">
                Every worker we deploy follows our proprietary 4S journey — from talent sourcing to long-term performance assurance.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.72, ease: easeExpo }}
                className="flex flex-wrap items-center gap-x-5 gap-y-2.5 mt-9">
                {['Source', 'Screen', 'Support', 'Sustain'].map((st, i) => (
                  <div key={st} className="flex items-center gap-5">
                    {i > 0 && <span className="h-1 w-1 rounded-full bg-[#e6a84f]/50" />}
                    <span className="font-inter text-white/55 text-xs tracking-[0.16em] uppercase">
                      <span className="font-fraunces italic text-[#e6a84f]/80 mr-1.5 not-italic">0{i + 1}</span>{st}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* RIGHT — soft-morphism framed image + floating emblem */}
            <div className="lg:col-span-5">
              <motion.div initial={{ opacity: 0, scale: 0.94, y: 30 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.3, ease: easeExpo }}
                className="relative">
                <div className="relative rounded-[2rem] p-2 bg-gradient-to-br from-[#0e1c28] to-[#070e16] border border-white/10
                  shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_30px_70px_rgba(0,0,0,0.6),0_0_0_1px_rgba(230,168,79,0.1)]">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
                    <motion.img style={{ scale: heroScale }} src="/images/dsc/formation-aerial.jpg"
                      alt="Sai Saktheeswari workforce in disciplined formation, viewed from above"
                      className="absolute inset-0 w-full h-full object-cover will-change-transform" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#04090f]/75 via-transparent to-transparent" />
                    <div className="absolute inset-3 rounded-[1.2rem] border border-[#e6a84f]/20 pointer-events-none" />
                    <span className="absolute bottom-4 left-4 font-inter text-white/85 text-[11px] bg-[#04090f]/55 backdrop-blur-md border border-white/10 rounded-lg px-3 py-1.5">
                      Disciplined formation · Cuddalore
                    </span>
                  </div>
                </div>

                <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-5 -left-4 sm:-left-7 w-24 h-24 rounded-full flex flex-col items-center justify-center text-center
                    bg-gradient-to-br from-[#16232f] to-[#070e16] border border-[#e6a84f]/30
                    shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_18px_40px_rgba(0,0,0,0.55)]">
                  <span className="font-fraunces font-semibold text-[#e6a84f] text-[1.7rem] leading-none">35</span>
                  <span className="font-inter text-white/50 text-[8px] tracking-[0.25em] uppercase mt-1">Years</span>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Floating soft-morphism metric cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mt-14 lg:mt-20">
            {ENT_METRICS.map((m, i) => (<ProcessMetric key={i} m={m} />))}
          </div>
        </div>

        {/* scroll cue */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden lg:block">
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}
            className="w-5 h-8 border border-white/25 rounded-full flex justify-center pt-1.5">
            <div className="w-1 h-1.5 bg-[#e6a84f]/70 rounded-full" />
          </motion.div>
        </motion.div>
      </div>

      {/* ── 4S JOURNEY — compact & detailed (replaces the 4 full-screen panels) ── */}
      <div ref={journeyRef} className="relative bg-[#04090f] py-20 lg:py-28 border-t border-white/[0.05] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_50%_0%,rgba(230,168,79,0.06),transparent)] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-10">
            <p className="font-inter text-[#e6a84f] text-[11px] font-bold tracking-[0.4em] uppercase mb-3">The 4S Journey</p>
            <h3 className="font-fraunces italic text-white/90 text-2xl lg:text-[2.2rem] leading-snug">Four disciplined stages, one standard.</h3>
          </FadeIn>

          {/* scroll-drawn progress track */}
          <div className="relative h-px w-40 mx-auto mb-14 bg-white/10 overflow-hidden rounded-full">
            <motion.div style={{ scaleX: lineScaleX }} className="absolute inset-0 origin-left bg-gradient-to-r from-[#f0be6a] to-[#c8902e]" />
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {stages.map((st, i) => (
              <motion.div key={st.key}
                initial={{ opacity: 0, y: 28, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.7, delay: i * 0.1, ease: easeExpo }}
                className="group relative overflow-hidden rounded-3xl p-7 lg:p-8 bg-white/[0.03] border border-white/[0.07] hover:border-[#e6a84f]/30 transition-all duration-400 hover:-translate-y-1.5 hover:shadow-[0_24px_56px_rgba(0,0,0,0.45)]">
                {/* faint numeral watermark + hover glow */}
                <span className="absolute -top-5 right-3 font-fraunces italic text-white/[0.04] text-[7rem] leading-none select-none pointer-events-none">{st.num}</span>
                <span className="absolute -top-16 -right-10 w-48 h-48 bg-[#e6a84f]/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-fraunces italic text-[#e6a84f] text-2xl leading-none">{st.num}</span>
                    <span className="h-px w-7 bg-[#e6a84f]/40" />
                    <span className="font-inter text-[#f0be6a]/80 text-[10px] font-semibold uppercase tracking-[0.18em]">{st.eyebrow}</span>
                  </div>
                  <h4 className="font-poppins font-extrabold text-white text-2xl tracking-[-0.01em] mb-2.5">{st.key}</h4>
                  <p className="font-inter text-white/70 text-sm leading-relaxed">{st.desc}</p>

                  <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 mt-5">
                    {st.points.map((pt) => (
                      <div key={pt} className="flex items-start gap-2">
                        <svg width="13" height="13" viewBox="0 0 14 14" fill="none" className="text-[#e6a84f] flex-shrink-0 mt-0.5"><path d="M2 7.5l3 3 7-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        <span className="font-inter text-white/65 text-[12.5px] leading-snug">{pt}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-baseline gap-2.5 mt-6 pt-5 border-t border-white/[0.07]">
                    <span className="font-poppins font-extrabold text-[#e6a84f] text-2xl tabular-nums">{st.stat}</span>
                    <span className="font-inter text-white/55 text-xs">{st.statLabel}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}

/* ─── TRAINING ─── */
function TrainingSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const yFeatured = useTransform(scrollYProgress, [0, 1], [28, -28]);
  const yBadge = useTransform(scrollYProgress, [0, 1], [-18, 22]);

  const photos = [
    { src: '/images/training-3.jpeg', caption: 'Weekly briefing · Cuddalore centre' },
    { src: '/images/training-7.jpeg', caption: 'On-site training drill' },
    { src: '/images/training-11.jpeg', caption: 'Large-scale team session' },
    { src: '/images/deployment.jpeg', caption: 'Deployed at client site' },
  ];

  const sIcon = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  const points = [
    { title: 'Discipline & Conduct', desc: 'Punctuality, grooming and professional behaviour standards.',
      Icon: () => (<svg width="22" height="22" viewBox="0 0 24 24" {...sIcon}><circle cx="12" cy="8" r="5" /><path d="m8.5 12.5-1.5 8 5-3 5 3-1.5-8" /></svg>) },
    { title: 'Safety Protocols', desc: 'Fire safety, emergency response, access control & incident reporting.',
      Icon: () => (<svg width="22" height="22" viewBox="0 0 24 24" {...sIcon}><path d="M12 2 4 5v6c0 5 3.4 8.5 8 10 4.6-1.5 8-5 8-10V5l-8-3Z" /><path d="M12 8v4M12 16h.01" /></svg>) },
    { title: 'Communication', desc: 'Professional interaction with clients, supervisors and the public.',
      Icon: () => (<svg width="22" height="22" viewBox="0 0 24 24" {...sIcon}><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4L3 21l1.1-3.9A8.4 8.4 0 1 1 21 11.5Z" /></svg>) },
    { title: 'Refresher Sessions', desc: 'Weekly briefings keep skills sharp and compliance current.',
      Icon: () => (<svg width="22" height="22" viewBox="0 0 24 24" {...sIcon}><path d="M21 12a9 9 0 1 1-3-6.7" /><path d="M21 4v4h-4" /></svg>) },
  ];

  return (
    <section ref={ref} className="relative bg-[#04090f] py-24 lg:py-32 overflow-hidden">
      {/* ambient depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_55%_at_82%_18%,rgba(230,168,79,0.08),transparent)] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#e6a84f 1px, transparent 1px)', backgroundSize: '34px 34px' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* ── LEFT: Bento image mosaic + floating stat ── */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {/* Featured wide */}
              <motion.div style={{ y: yFeatured }}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7, ease }}
                className="col-span-2 relative rounded-2xl overflow-hidden ring-1 ring-white/10 group aspect-[16/10] shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
                <img src={photos[0].src} alt={photos[0].caption} className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700 brightness-90" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#04090f]/85 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 w-7 h-7 border-t border-l border-[#e6a84f]/50 rounded-tl-lg" />
                <span className="absolute bottom-3 left-3 font-inter text-white/85 text-xs bg-[#04090f]/55 backdrop-blur-md border border-white/10 rounded-lg px-3 py-1.5">{photos[0].caption}</span>
              </motion.div>

              {/* Two squares */}
              {[photos[1], photos[2]].map((p, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease }}
                  className="relative rounded-2xl overflow-hidden ring-1 ring-white/10 group aspect-square">
                  <img src={p.src} alt={p.caption} loading="lazy" className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700 brightness-90" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#04090f]/75 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                    <p className="font-inter text-white text-[11px]">{p.caption}</p>
                  </div>
                </motion.div>
              ))}

              {/* Wide bottom */}
              <motion.div
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, delay: 0.3, ease }}
                className="col-span-2 relative rounded-2xl overflow-hidden ring-1 ring-white/10 group aspect-[16/6]">
                <img src={photos[3].src} alt={photos[3].caption} loading="lazy" className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700 brightness-90" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#04090f]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                  <p className="font-inter text-white text-[11px]">{photos[3].caption}</p>
                </div>
              </motion.div>
            </div>

            {/* Floating glass stat badge */}
            <motion.div style={{ y: yBadge }}
              initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4, ease }}
              className="absolute -bottom-5 -right-2 sm:-right-4 bg-[#0a1422]/85 backdrop-blur-xl border border-[#e6a84f]/25 rounded-2xl px-5 py-4 shadow-[0_20px_50px_rgba(0,0,0,0.55)]">
              <p className="font-poppins font-extrabold text-[#e6a84f] text-2xl leading-none">100%</p>
              <p className="font-inter text-white/55 text-[10px] uppercase tracking-[0.16em] mt-1.5 leading-tight">Trained before<br />deployment</p>
            </motion.div>
          </div>

          {/* ── RIGHT: Content ── */}
          <div>
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease }}
              className="inline-flex items-center gap-2.5 bg-[#e6a84f]/[0.08] border border-[#e6a84f]/25 rounded-full pl-2.5 pr-4 py-1.5 mb-6 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#e6a84f]" />
              <span className="font-inter text-[#f0be6a] text-[11px] font-semibold tracking-[0.22em] uppercase">Training Excellence</span>
            </motion.div>

            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}
              className="font-poppins font-extrabold text-white text-3xl sm:text-4xl lg:text-5xl leading-[1.08] mb-5">
              Every worker trained
              <span className="block font-fraunces italic font-medium bg-gradient-to-r from-[#f0be6a] to-[#c8902e] bg-clip-text text-transparent">before deployment.</span>
            </motion.h2>

            <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1, ease }}
              className="font-inter text-white/55 text-base leading-relaxed mb-9 max-w-xl">
              We supply a <span className="text-white/85 font-medium">discipline-first, professionally trained workforce</span>. Our senior supervisors oversee training at our Cuddalore centre — a standard upheld for 35 years.
            </motion.p>

            {/* Pillars — 2x2 glass cards */}
            <div className="grid sm:grid-cols-2 gap-3.5 mb-9">
              {points.map((p, i) => (
                <motion.div key={p.title}
                  initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.5, delay: i * 0.08, ease }}
                  className="group relative bg-white/[0.03] border border-white/[0.07] hover:border-[#e6a84f]/30 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.4)] overflow-hidden">
                  <span className="absolute -top-12 -right-12 w-24 h-24 bg-[#e6a84f]/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative w-11 h-11 rounded-xl bg-[#e6a84f]/[0.1] border border-[#e6a84f]/20 flex items-center justify-center text-[#e6a84f] mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <p.Icon />
                  </div>
                  <h4 className="relative font-poppins font-bold text-white text-[15px] mb-1.5">{p.title}</h4>
                  <p className="relative font-inter text-white/45 text-[13px] leading-relaxed">{p.desc}</p>
                </motion.div>
              ))}
            </div>

            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2, ease }}>
              <a href="/training"
                className="group relative overflow-hidden inline-flex items-center gap-2.5 bg-gradient-to-br from-[#f0be6a] via-[#e6a84f] to-[#c8902e] text-[#0a1a24] font-poppins font-bold text-sm px-7 py-3.5 rounded-xl shadow-[0_8px_30px_rgba(230,168,79,0.3)] hover:shadow-[0_12px_44px_rgba(230,168,79,0.5)] hover:-translate-y-0.5 transition-all duration-300">
                <span className="relative z-10">View Full Training Programme</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"><path d="M2 7h9.5M7.5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── WHY US ─── */
function WhyUsSection() {
  const eo = [0.16, 1, 0.3, 1] as [number, number, number, number]; // classic expo-out
  const wuIcon = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

  // Count-up for the 35 Years feature numeral
  const featRef = useRef(null);
  const featInView = useInView(featRef, { once: true, margin: '-90px' });
  const [years, setYears] = useState(0);
  useEffect(() => {
    if (!featInView) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1500;
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      setYears(Math.round(35 * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [featInView]);

  const points = [
    {
      title: 'Trained Before Deployment',
      desc: 'Rigorous training in discipline, safety, communication and professional conduct — every guard, every time.',
      span: 'lg:col-span-3 sm:col-span-2',
      Icon: () => (<svg width="26" height="26" viewBox="0 0 24 24" {...wuIcon}><path d="M12 3 5 6v5c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z" /><path d="m9 12 2 2 4-4" /></svg>),
    },
    {
      title: 'Full Statutory Compliance',
      desc: 'PF, ESI & Contract Labour Act — handled end-to-end by our in-house team. Zero compliance risk for you.',
      span: 'lg:col-span-2',
      Icon: () => (<svg width="24" height="24" viewBox="0 0 24 24" {...wuIcon}><path d="M12 3v18M7 6h10M8 21h8" /><path d="M7 6 4 13a3 3 0 0 0 6 0L7 6ZM17 6l-3 7a3 3 0 0 0 6 0l-3-7Z" /></svg>),
    },
    {
      title: 'Local Expert Presence',
      desc: "Offices in Cuddalore & Puducherry. We know Tamil Nadu's workforce landscape deeply.",
      span: 'lg:col-span-2',
      Icon: () => (<svg width="24" height="24" viewBox="0 0 24 24" {...wuIcon}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>),
    },
    {
      title: 'Female Security Staff',
      desc: 'Trained female security personnel for campuses, hospitals and commercial complexes.',
      span: 'lg:col-span-2',
      Icon: () => (<svg width="24" height="24" viewBox="0 0 24 24" {...wuIcon}><circle cx="12" cy="8" r="4" /><path d="M5.5 21a6.5 6.5 0 0 1 13 0" /></svg>),
    },
  ];

  return (
    <section className="relative bg-[#050d1a] py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_50%_0%,rgba(230,168,79,0.08),transparent)] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#e6a84f 1px, transparent 1px)', backgroundSize: '34px 34px' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: eo }}
          className="text-center mb-14 lg:mb-16">
          <div className="inline-flex items-center gap-2.5 bg-[#e6a84f]/[0.1] border border-[#e6a84f]/30 rounded-full pl-2.5 pr-4 py-1.5 mb-7 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[#e6a84f]" />
            <span className="font-inter text-[#f0be6a] text-[11px] font-semibold tracking-[0.28em] uppercase">Why Choose Us</span>
          </div>
          <h2 className="font-poppins font-extrabold text-white text-[2rem] sm:text-4xl lg:text-[3.25rem] leading-[1.06] tracking-[-0.02em]">
            Why 100+ businesses trust
            <span className="block font-fraunces italic font-medium bg-gradient-to-r from-[#f7d9a0] via-[#e6a84f] to-[#c8902e] bg-clip-text text-transparent pb-1 mt-1">Sai Saktheeswari.</span>
          </h2>
          <p className="font-inter text-white/65 text-base lg:text-[17px] leading-relaxed max-w-xl mx-auto mt-5">
            Three decades of disciplined service — and the proof behind every promise.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 lg:gap-5">

          {/* Feature — 35 Years */}
          <motion.div ref={featRef} initial={{ opacity: 0, y: 26, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.8, ease: eo }}
            className="group relative overflow-hidden rounded-3xl p-7 lg:p-9 sm:col-span-2 lg:col-span-3 bg-gradient-to-br from-[#0c1c28] to-[#04090f] border border-[#e6a84f]/25 hover:border-[#e6a84f]/45 transition-colors duration-500">
            <div className="absolute -top-16 -right-10 w-52 h-52 bg-[#e6a84f]/10 blur-3xl rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
            {/* one-time glass reflection sweep */}
            <motion.span initial={{ x: '-130%' }} whileInView={{ x: '130%' }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.45, ease: 'easeInOut' }}
              className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent skew-x-12 pointer-events-none" />
            <div className="relative flex items-start justify-between gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#e6a84f]/[0.14] border border-[#e6a84f]/30 flex items-center justify-center text-[#e6a84f] group-hover:scale-105 transition-transform duration-300">
                <svg width="26" height="26" viewBox="0 0 24 24" {...wuIcon}><path d="M8 21h8M12 17v4M6 4h12v3a6 6 0 0 1-12 0V4Z" /><path d="M6 6H3.5v1.5A3.5 3.5 0 0 0 6 11M18 6h2.5v1.5A3.5 3.5 0 0 1 18 11" /></svg>
              </div>
              <span className="font-inter text-[#e6a84f]/75 text-[10px] tracking-[0.3em] uppercase mt-2">Since 1991</span>
            </div>
            <div className="relative mt-6">
              <span className="font-fraunces font-semibold leading-none tabular-nums bg-gradient-to-br from-[#f7d9a0] via-[#f0be6a] to-[#c8902e] bg-clip-text text-transparent text-[5.5rem] lg:text-[7.5rem] drop-shadow-[0_4px_30px_rgba(230,168,79,0.2)]">{years}</span>
              <h3 className="font-poppins font-bold text-white text-2xl lg:text-[1.7rem] tracking-[-0.01em] mt-1">Years of Trust</h3>
              <p className="font-inter text-white/70 text-[15px] leading-relaxed mt-3.5 max-w-md">
                Three decades of dependable staffing and security service across South India — built relationship by relationship.
              </p>
            </div>
          </motion.div>

          {/* Standard cards */}
          {points.map((p, i) => (
            <motion.div key={p.title}
              initial={{ opacity: 0, y: 24, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.65, delay: 0.08 + i * 0.09, ease: eo }}
              className={`group relative overflow-hidden rounded-3xl p-6 lg:p-7 bg-white/[0.035] border border-white/[0.08] hover:border-[#e6a84f]/35 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_50px_rgba(0,0,0,0.45)] ${p.span || ''}`}>
              <span className="absolute -top-12 -right-12 w-24 h-24 bg-[#e6a84f]/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative w-12 h-12 rounded-2xl bg-[#e6a84f]/[0.12] border border-[#e6a84f]/25 flex items-center justify-center text-[#e6a84f] mb-5 group-hover:scale-110 group-hover:rotate-[6deg] transition-transform duration-300">
                <p.Icon />
              </div>
              <h3 className="relative font-poppins font-bold text-white text-[17px] tracking-[-0.01em] mb-2">{p.title}</h3>
              <p className="relative font-inter text-white/70 text-sm leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}

          {/* 48-72hr — small */}
          <motion.div initial={{ opacity: 0, y: 24, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.65, delay: 0.36, ease: eo }}
            className="group relative overflow-hidden rounded-3xl p-6 lg:p-7 lg:col-span-2 bg-white/[0.035] border border-white/[0.08] hover:border-[#e6a84f]/35 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_50px_rgba(0,0,0,0.45)]">
            <span className="absolute -top-12 -right-12 w-24 h-24 bg-[#e6a84f]/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative w-12 h-12 rounded-2xl bg-[#e6a84f]/[0.12] border border-[#e6a84f]/25 flex items-center justify-center text-[#e6a84f] mb-5 group-hover:scale-110 group-hover:rotate-[6deg] transition-transform duration-300">
              <svg width="24" height="24" viewBox="0 0 24 24" {...wuIcon}><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" /></svg>
            </div>
            <h3 className="relative font-poppins font-bold text-white text-[17px] tracking-[-0.01em] mb-2">48–72hr Deployment</h3>
            <p className="relative font-inter text-white/70 text-sm leading-relaxed">Fast mobilisation of trained staff for standard requirements — WhatsApp us for urgent needs.</p>
          </motion.div>

          {/* CTA tile */}
          <motion.div initial={{ opacity: 0, y: 24, scale: 0.98 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.7, delay: 0.42, ease: eo }}
            className="relative overflow-hidden rounded-3xl p-7 lg:p-8 sm:col-span-2 lg:col-span-4 bg-gradient-to-br from-[#0d2230] to-[#04090f] border border-[#e6a84f]/25 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="absolute -bottom-16 -left-10 w-52 h-52 bg-[#e6a84f]/10 blur-3xl rounded-full" />
            <div className="relative">
              <h3 className="font-poppins font-extrabold text-white text-xl lg:text-2xl leading-tight tracking-[-0.01em]">Ready to strengthen<br className="hidden md:block" /> your workforce?</h3>
              <p className="font-inter text-white/65 text-sm mt-2.5">Trained, verified staff — deployed in 48–72 hours.</p>
            </div>
            <div className="relative flex flex-col sm:flex-row md:flex-col gap-2.5 flex-shrink-0">
              <a href="/contact"
                className="group relative overflow-hidden inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#f0be6a] via-[#e6a84f] to-[#c8902e] text-[#0a1a24] font-poppins font-bold text-[13px] px-6 py-3 rounded-xl shadow-[0_8px_24px_rgba(230,168,79,0.3)] hover:-translate-y-0.5 transition-all duration-300">
                <span className="relative z-10">Request Workforce</span>
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none" className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"><path d="M2 7h9.5M7.5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </a>
              <a href={`https://wa.me/${COMPANY.phone.whatsapp}?text=Hello, I am interested in your staffing services.`} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 hover:border-[#e6a84f]/40 text-white font-poppins font-semibold text-[13px] px-6 py-3 rounded-xl transition-all duration-300">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="text-[#25D366]"><path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.38 5.06L2 22l5.07-1.33A9.96 9.96 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2Zm5.47 12.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.4-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.06 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35Z" /></svg>
                Talk on WhatsApp
              </a>
              <a href="/contact"
                className="inline-flex items-center justify-center gap-1.5 text-white/65 hover:text-[#e6a84f] font-inter font-medium text-xs transition-colors duration-300">
                Schedule a consultation
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M2 7h9.5M7.5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── INDUSTRIES ─── */
/* ─── INDUSTRIES — CINEMATIC CASE-STUDY PANELS ─── */
const INDUSTRIES_CINEMATIC = [
  {
    n: '01', name: 'Manufacturing', headline: 'Securing the engines of production.',
    body: 'Round-the-clock floor security and disciplined workforce management for factories and production plants — where a single lapse can halt an entire line.',
    proof: ['Plant-floor security', 'Shift workforce control', 'Material gate management'],
    img: '/images/dsc/deployment-campus-1.jpg',
  },
  {
    n: '02', name: 'Healthcare', headline: 'Protecting places that never close.',
    body: 'Trained personnel — including dedicated female officers — for hospitals and care campuses, where calm authority and absolute reliability are non-negotiable.',
    proof: ['Female security officers', 'Visitor & ward control', 'Emergency response'],
    img: '/images/dsc/female-guards-salute.jpg',
  },
  {
    n: '03', name: 'Education', headline: 'Guardians of every campus.',
    body: 'Professional campus protection for schools, colleges and institutions — keeping thousands of students, staff and visitors safe, every single day.',
    proof: ['Campus access control', 'Event security', 'Student safety patrols'],
    img: '/images/dsc/campus-deployment-2.jpg',
  },
  {
    n: '04', name: 'Industrial', headline: 'Vigilance through the night shift.',
    body: 'Large-scale industrial estates demand uninterrupted supervision. Our officers monitor perimeters, control access and patrol grounds without pause.',
    proof: ['Perimeter patrol', 'Night-shift monitoring', 'Access supervision'],
    img: '/images/dsc/guard-lineup-3.jpg',
  },
  {
    n: '05', name: 'Corporate Offices', headline: 'The first impression of authority.',
    body: 'Polished, professional security presence for corporate towers and business parks — the disciplined face that greets every executive and guest.',
    proof: ['Reception & lobby security', 'Executive protection', 'Facility management'],
    img: '/images/dsc/team-group-1.jpg',
  },
  {
    n: '06', name: 'Logistics & Warehousing', headline: 'Securing the flow of goods.',
    body: 'Workforce and security management across warehouses and loading docks — protecting inventory and orchestrating disciplined movement at scale.',
    proof: ['Inventory protection', 'Dock & gate control', 'Workforce deployment'],
    img: '/images/home/guards-march.jpg',
  },
  {
    n: '07', name: 'Commercial Complexes', headline: 'Order within constant motion.',
    body: 'Malls, hotels and commercial complexes see thousands pass through daily. Our officers maintain calm, controlled, professional environments throughout.',
    proof: ['Crowd management', 'Surveillance posts', 'Customer assistance'],
    img: '/images/dsc/campus-patrol-1.jpg',
  },
  {
    n: '08', name: 'Government Institutions', headline: 'Trusted with public responsibility.',
    body: 'Administrative complexes and official facilities require workforce of proven discipline and integrity — deployed with the gravity such duty demands.',
    proof: ['Administrative security', 'Ceremonial duty', 'Restricted-access control'],
    img: '/images/dsc/guard-ceremonial.jpg',
  },
];

function IndustryPanel({ item, index }: { item: typeof INDUSTRIES_CINEMATIC[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-12%' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.28, 1.06]);
  const imgY = useTransform(scrollYProgress, [0, 1], ['-7%', '7%']);
  const textY = useTransform(scrollYProgress, [0, 1], [44, -44]);
  const flip = index % 2 === 1;

  return (
    <div ref={ref} className="relative h-[88vh] min-h-[560px] w-full overflow-hidden">
      {/* Cinematic image with parallax + scale */}
      <motion.div style={{ scale: imgScale, y: imgY }} className="absolute inset-0 will-change-transform">
        <motion.img src={item.img} alt={`Sai Saktheeswari workforce deployed in ${item.name}`}
          className="w-full h-full object-cover"
          initial={{ opacity: 0, filter: 'blur(16px)' }}
          animate={inView ? { opacity: 1, filter: 'blur(0px)' } : {}}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }} />
      </motion.div>

      {/* Directional scrim — heavier on the text side */}
      <div className={`absolute inset-0 ${flip
        ? 'bg-[linear-gradient(270deg,rgba(4,9,15,0.94)_0%,rgba(4,9,15,0.78)_32%,rgba(4,9,15,0.15)_70%,transparent_100%)]'
        : 'bg-[linear-gradient(90deg,rgba(4,9,15,0.94)_0%,rgba(4,9,15,0.78)_32%,rgba(4,9,15,0.15)_70%,transparent_100%)]'}`} />
      <div className="absolute inset-0 bg-[#04090f]/20" />

      {/* Text */}
      <div className={`absolute inset-0 flex items-center ${flip ? 'justify-end' : 'justify-start'}`}>
        <motion.div style={{ y: textY }}
          className={`w-full max-w-xl px-7 sm:px-12 lg:px-20 ${flip ? 'text-left lg:text-right' : 'text-left'}`}>

          {/* Index */}
          <motion.div
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.8 }}
            className={`flex items-center gap-4 mb-7 ${flip ? 'lg:justify-end' : ''}`}>
            <span className="font-poppins text-[#e6a84f] text-sm font-bold tracking-[0.3em]">{item.n}</span>
            <span className="font-inter text-white/30 text-[10px] tracking-[0.35em] uppercase">Industries We Serve</span>
          </motion.div>

          {/* Name */}
          <RevealHeading inView={inView} text={item.name}
            className="font-poppins text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-[1.02] mb-5" />

          {/* Headline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.45, duration: 0.7 }}
            className="font-poppins text-xl lg:text-2xl text-[#f4cd87] font-medium mb-6">
            {item.headline}
          </motion.p>

          {/* Gold accent line */}
          <motion.div
            initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.55, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className={`h-px w-24 bg-gradient-to-r from-[#e6a84f] to-transparent mb-6 ${flip ? 'lg:ml-auto lg:bg-gradient-to-l' : ''}`}
            style={{ transformOrigin: flip ? 'right' : 'left' }} />

          {/* Body */}
          <motion.p
            initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="font-inter text-white/55 text-base lg:text-lg leading-relaxed mb-8 max-w-md lg:inline-block">
            {item.body}
          </motion.p>

          {/* Proof points */}
          <div className={`flex flex-wrap gap-x-6 gap-y-3 ${flip ? 'lg:justify-end' : ''}`}>
            {item.proof.map((p, pi) => (
              <motion.span key={pi}
                initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.75 + pi * 0.1, duration: 0.5 }}
                className="flex items-center gap-2 font-inter text-white/65 text-sm">
                <span className="w-1 h-1 rounded-full bg-[#e6a84f]" />
                {p}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function IndustriesSection() {
  return (
    <section className="relative bg-[#04090f]">
      {/* Intro */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 text-center">
        <FadeIn>
          <p className="font-inter text-[#e6a84f] text-[11px] font-semibold tracking-[0.45em] uppercase mb-5">Who We Protect</p>
          <h2 className="font-poppins text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.05] mb-6 max-w-4xl mx-auto">
            Trusted Across Every Sector We Enter
          </h2>
          <p className="font-inter text-white/45 text-base lg:text-lg max-w-2xl mx-auto">
            From factory floors to government complexes, our workforce operates where reliability is not optional — eight industries, one uncompromising standard.
          </p>
        </FadeIn>
      </div>

      {/* Cinematic panels */}
      {INDUSTRIES_CINEMATIC.map((item, i) => (
        <IndustryPanel key={i} item={item} index={i} />
      ))}
    </section>
  );
}

/* ─── DEPLOYMENT BANNER ─── */
function DeploymentBanner() {
  return (
    <section className="relative overflow-hidden py-28 lg:py-36">
      <img src="/images/dsc/formation-aerial.jpg" alt="" aria-hidden
        className="absolute inset-0 w-full h-full object-cover object-top brightness-[0.3]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#04090f] via-[#04090f]/82 to-[#04090f]/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#04090f] via-transparent to-[#04090f]/70" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_55%_at_18%_100%,rgba(230,168,79,0.15),transparent)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: easeExpo }}
          className="inline-flex items-center gap-2.5 bg-[#e6a84f]/[0.08] border border-[#e6a84f]/25 rounded-full pl-2.5 pr-4 py-1.5 mb-7 backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-[#e6a84f]" />
          <span className="font-inter text-[#f0be6a] text-[11px] font-semibold tracking-[0.22em] uppercase">Trusted by 100+ businesses · Since 1991</span>
        </motion.div>

        <motion.h2 initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: easeExpo }}
          className="font-poppins font-extrabold text-white text-4xl sm:text-5xl lg:text-6xl leading-[1.04] tracking-[-0.02em] max-w-3xl">
          Professionally trained.
          <span className="block font-fraunces italic font-medium bg-gradient-to-r from-[#f7d99a] to-[#c8902e] bg-clip-text text-transparent mt-1">Reliably deployed.</span>
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.8 }}
          className="font-inter text-white/72 text-base lg:text-lg mt-6 max-w-xl leading-relaxed">
          Our guards arrive at your site disciplined, uniformed, and ready — every single time.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.32, duration: 0.7, ease: easeExpo }}
          className="flex flex-col sm:flex-row gap-3.5 mt-9">
          <a href="/contact"
            className="group relative overflow-hidden inline-flex items-center justify-center gap-2.5 bg-gradient-to-br from-[#f0be6a] via-[#e6a84f] to-[#c8902e] text-[#0a1a24] font-poppins font-bold text-sm px-7 py-3.5 rounded-xl shadow-[0_8px_30px_rgba(230,168,79,0.35)] hover:shadow-[0_12px_44px_rgba(230,168,79,0.55)] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300">
            <span className="relative z-10">Request Security Personnel</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"><path d="M2 7h9.5M7.5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </a>
          <a href="#contact"
            className="inline-flex items-center justify-center gap-2 bg-white/[0.06] hover:bg-white/[0.12] backdrop-blur-md border border-white/20 hover:border-[#e6a84f]/50 text-white font-poppins font-semibold text-sm px-7 py-3.5 rounded-xl active:scale-[0.98] transition-all duration-300">
            Get In Touch
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── LEAD FORM — premium dark contact experience ─── */
function ContactCard({ c }: { c: { key: string; label: string; val: string; raw: string; href: string; ext?: boolean; tint: string; icon: React.ReactNode } }) {
  const [copied, setCopied] = useState(false);
  const copy = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard?.writeText(c.raw).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500); });
  };
  return (
    <a href={c.href} {...(c.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="group relative flex items-center gap-4 bg-white/[0.03] border border-white/[0.08] hover:border-[#e6a84f]/30 rounded-2xl p-4 transition-all duration-300 hover:-translate-y-0.5 overflow-hidden">
      <span className="absolute -top-10 -right-8 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ backgroundColor: `${c.tint}22` }} />
      <span className="relative w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 border transition-transform duration-300 group-hover:scale-105"
        style={{ color: c.tint, backgroundColor: `${c.tint}1a`, borderColor: `${c.tint}33` }}>{c.icon}</span>
      <div className="relative min-w-0">
        <p className="font-inter text-white/45 text-[11px] uppercase tracking-wide">{c.label}</p>
        <p className="font-poppins font-semibold text-white text-sm truncate">{c.val}</p>
      </div>
      <button type="button" onClick={copy} aria-label={`Copy ${c.label}`}
        className="relative ml-auto flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-[#e6a84f] hover:bg-white/[0.06] transition-colors">
        {copied
          ? (<svg width="15" height="15" viewBox="0 0 14 14" fill="none"><path d="M2 7.5l3 3 7-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>)
          : (<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4"><rect x="5" y="5" width="8" height="9" rx="1.5" /><path d="M11 5V3.5A1.5 1.5 0 0 0 9.5 2H4a2 2 0 0 0-2 2v6.5A1.5 1.5 0 0 0 3.5 12" /></svg>)}
      </button>
    </a>
  );
}

function LeadForm() {
  const [form, setForm] = useState({ name: '', company: '', phone: '', industry: '', message: '' });
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [sent, setSent] = useState(false);
  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const validate = () => {
    const er: Record<string, boolean> = {};
    if (!form.name.trim()) er.name = true;
    if (!/^[\d+\s-]{8,}$/.test(form.phone.trim())) er.phone = true;
    setErrors(er);
    return Object.keys(er).length === 0;
  };
  const onSubmit = (e: React.FormEvent) => { e.preventDefault(); if (validate()) setSent(true); };
  const mailtoHref = () => {
    const sub = encodeURIComponent(`Workforce Enquiry from ${form.name}${form.company ? ' — ' + form.company : ''}`);
    const body = encodeURIComponent(`Name: ${form.name}\nCompany: ${form.company || '—'}\nPhone: ${form.phone}\nIndustry: ${form.industry || '—'}\n\nRequirement:\n${form.message}`);
    return `mailto:${COMPANY.email}?subject=${sub}&body=${body}`;
  };
  const waHref = () => `https://wa.me/${COMPANY.phone.whatsapp}?text=${encodeURIComponent(`Hello, I have a workforce requirement.\nName: ${form.name || '—'}\nIndustry: ${form.industry || '—'}\n${form.message || ''}`)}`;

  const contacts = [
    { key: 'call', label: 'Call Us', val: COMPANY.phone.primary, raw: COMPANY.phone.primary, href: `tel:${COMPANY.phone.primary.replace(/\s/g, '')}`, tint: '#e6a84f',
      icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" /></svg>) },
    { key: 'wa', label: 'WhatsApp', val: 'Chat instantly · fast response', raw: COMPANY.phone.primary, href: `https://wa.me/${COMPANY.phone.whatsapp}`, ext: true, tint: '#25D366',
      icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.38 5.06L2 22l5.07-1.33A9.96 9.96 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2Zm5.47 12.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.4-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.06 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35Z" /></svg>) },
    { key: 'mail', label: 'Email', val: COMPANY.email, raw: COMPANY.email, href: `mailto:${COMPANY.email}`, tint: '#e6a84f',
      icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></svg>) },
  ];

  const field = (name: keyof typeof form, label: string, type = 'text') => (
    <div className="relative">
      <input id={`lf-${name}`} name={name} type={type} value={form[name]} onChange={onChange} placeholder=" "
        className={`peer w-full bg-white/[0.04] border rounded-xl px-4 pt-5 pb-2 font-inter text-sm text-white outline-none transition-colors ${errors[name] ? 'border-red-400/60' : 'border-white/12 focus:border-[#e6a84f]/55'}`} />
      <label htmlFor={`lf-${name}`}
        className="absolute left-4 top-3.5 font-inter text-white/40 text-sm transition-all duration-200 pointer-events-none peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-[#e6a84f] peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:text-white/50">{label}</label>
    </div>
  );

  return (
    <section id="contact" className="relative bg-[#04090f] py-24 lg:py-32 overflow-hidden">
      <AuroraBackground />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">

          {/* LEFT — info */}
          <motion.div initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7, ease: easeExpo }}>
            <div className="inline-flex items-center gap-2.5 mb-6">
              <span className="w-8 h-px bg-[#e6a84f]" />
              <span className="font-inter text-[#f0be6a] text-[11px] tracking-[0.4em] uppercase">Get In Touch</span>
            </div>
            <h2 className="font-poppins font-extrabold text-white text-4xl lg:text-5xl leading-[1.05] tracking-[-0.02em]">
              Need reliable staff in
              <span className="font-fraunces italic font-medium bg-gradient-to-r from-[#f7d99a] to-[#c8902e] bg-clip-text text-transparent"> Tamil Nadu?</span>
            </h2>
            <p className="font-inter text-white/60 text-base lg:text-lg leading-relaxed mt-5 max-w-md">
              Tell us your requirement — we respond within 24 hours with a tailored solution.
            </p>

            <div className="space-y-3 mt-9">
              {contacts.map((c) => <ContactCard key={c.key} c={c} />)}
            </div>

            <div className="mt-5 bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5 space-y-4">
              {[COMPANY.address.head, COMPANY.address.branch].map((a, i) => (
                <div key={i} className="flex gap-3">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="text-[#e6a84f] flex-shrink-0 mt-0.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                  <div>
                    <p className="font-poppins font-semibold text-white/85 text-xs uppercase tracking-wide mb-1">{a.label}</p>
                    <p className="font-inter text-white/50 text-[13px] leading-relaxed">{a.text}</p>
                  </div>
                </div>
              ))}
              <div className="rounded-xl overflow-hidden border border-white/10 h-44 mt-1">
                <iframe title="Sai Saktheeswari Head Office — Cuddalore"
                  src="https://maps.google.com/maps?q=S.N%20Chavadi%2C%20Cuddalore%20607006&z=14&output=embed"
                  loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="w-full h-full grayscale-[0.25] opacity-95" />
              </div>
            </div>
          </motion.div>

          {/* RIGHT — glass form */}
          <motion.div initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7, delay: 0.1, ease: easeExpo }}
            className="relative">
            <div className="relative rounded-3xl p-7 sm:p-9 bg-gradient-to-br from-[#0c1822]/90 to-[#070e16]/90 backdrop-blur-2xl border border-white/[0.08] shadow-[0_30px_70px_rgba(0,0,0,0.55)]">
              {sent ? (
                <div className="text-center py-10">
                  <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, ease: easeExpo }}
                    className="w-16 h-16 rounded-2xl bg-[#e6a84f]/15 border border-[#e6a84f]/30 text-[#e6a84f] flex items-center justify-center mx-auto mb-6">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M4 12.5l5 5L20 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </motion.div>
                  <h3 className="font-poppins font-bold text-white text-2xl mb-2">Thank you, {form.name.split(' ')[0] || 'there'}.</h3>
                  <p className="font-inter text-white/55 text-sm max-w-sm mx-auto mb-7">Choose how to send your requirement — we respond within 24 hours.</p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <a href={mailtoHref()} className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#f0be6a] to-[#c8902e] text-[#0a1a24] font-poppins font-bold text-sm px-6 py-3 rounded-xl">Send via Email</a>
                    <a href={waHref()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-white font-poppins font-semibold text-sm px-6 py-3 rounded-xl transition-colors">Send via WhatsApp</a>
                  </div>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate>
                  <h3 className="font-poppins font-bold text-white text-2xl mb-1.5">Send your requirement</h3>
                  <p className="font-inter text-white/45 text-sm mb-7">We respond within 24 hours · 100% confidential.</p>
                  <div className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>{field('name', 'Full name *')}{errors.name && <p className="text-red-400/80 text-xs mt-1">Please enter your name.</p>}</div>
                      {field('company', 'Company')}
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>{field('phone', 'Phone *', 'tel')}{errors.phone && <p className="text-red-400/80 text-xs mt-1">Enter a valid phone.</p>}</div>
                      <div className="relative">
                        <select id="lf-industry" name="industry" value={form.industry} onChange={onChange}
                          className="peer w-full bg-white/[0.04] border border-white/12 focus:border-[#e6a84f]/55 rounded-xl px-4 pt-5 pb-2 font-inter text-sm text-white outline-none appearance-none cursor-pointer transition-colors">
                          <option value="" className="bg-[#0a1422]"> </option>
                          {INDUSTRIES.map(i => <option key={i.name} className="bg-[#0a1422]">{i.name}</option>)}
                        </select>
                        <label htmlFor="lf-industry" className={`absolute left-4 font-inter pointer-events-none transition-all duration-200 ${form.industry ? 'top-1.5 text-[10px] text-white/50' : 'top-3.5 text-sm text-white/40'}`}>Industry</label>
                      </div>
                    </div>
                    <div className="relative">
                      <textarea id="lf-message" name="message" rows={4} value={form.message} onChange={onChange} placeholder=" "
                        className="peer w-full bg-white/[0.04] border border-white/12 focus:border-[#e6a84f]/55 rounded-xl px-4 pt-5 pb-2 font-inter text-sm text-white outline-none resize-none transition-colors" />
                      <label htmlFor="lf-message" className="absolute left-4 top-3.5 font-inter text-white/40 text-sm transition-all duration-200 pointer-events-none peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-[#e6a84f] peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:text-white/50">Your requirement — staff count, type, location, duration</label>
                    </div>
                  </div>
                  <button type="submit"
                    className="group relative overflow-hidden w-full mt-7 inline-flex items-center justify-center gap-2.5 bg-gradient-to-br from-[#f0be6a] via-[#e6a84f] to-[#c8902e] text-[#0a1a24] font-poppins font-bold text-sm px-7 py-3.5 rounded-xl shadow-[0_8px_30px_rgba(230,168,79,0.32)] hover:shadow-[0_12px_44px_rgba(230,168,79,0.5)] hover:-translate-y-0.5 transition-all duration-300">
                    <span className="relative z-10">Submit Requirement</span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"><path d="M2 7h9.5M7.5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ — premium dark glass accordion ─── */
function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="relative bg-[#050d1a] py-24 lg:py-32 overflow-hidden border-t border-white/[0.05]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_0%,rgba(230,168,79,0.06),transparent)] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#e6a84f 1px, transparent 1px)', backgroundSize: '34px 34px' }} />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: easeExpo }}
          className="text-center mb-14 lg:mb-16">
          <div className="inline-flex items-center gap-2.5 mb-6">
            <span className="w-8 h-px bg-[#e6a84f]" />
            <span className="font-inter text-[#f0be6a] text-[11px] tracking-[0.4em] uppercase">FAQ</span>
            <span className="w-8 h-px bg-[#e6a84f]" />
          </div>
          <h2 className="font-poppins font-extrabold text-white text-4xl lg:text-5xl leading-[1.05]">
            Frequently asked
            <span className="block font-fraunces italic font-medium bg-gradient-to-r from-[#f7d99a] to-[#c8902e] bg-clip-text text-transparent mt-1">questions.</span>
          </h2>
          <p className="font-inter text-white/55 text-base lg:text-lg mt-5">Everything you need to know about working with Sai Saktheeswari.</p>
        </motion.div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <motion.div key={i}
                initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-30px' }} transition={{ duration: 0.5, delay: i * 0.05, ease: easeExpo }}
                className={`rounded-2xl border transition-colors duration-300 overflow-hidden ${isOpen ? 'bg-white/[0.05] border-[#e6a84f]/25' : 'bg-white/[0.025] border-white/[0.07] hover:border-white/[0.14]'}`}>
                <button onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen}
                  className="w-full text-left py-5 px-5 sm:px-6 flex justify-between items-center gap-4">
                  <span className={`font-poppins font-semibold text-[15px] sm:text-base transition-colors ${isOpen ? 'text-white' : 'text-white/80'}`}>{faq.q}</span>
                  <motion.span animate={{ rotate: isOpen ? 135 : 0 }} transition={{ duration: 0.3, ease: easeExpo }}
                    className={`flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center text-lg leading-none ${isOpen ? 'border-[#e6a84f]/50 text-[#e6a84f]' : 'border-white/15 text-white/50'}`}>+</motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.32, ease: easeExpo }} className="overflow-hidden">
                      <p className="px-5 sm:px-6 pb-5 font-inter text-white/55 text-sm leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: easeExpo }}
          className="text-center mt-12">
          <p className="font-inter text-white/45 text-sm mb-4">Still have a question?</p>
          <a href={`https://wa.me/${COMPANY.phone.whatsapp}`} target="_blank" rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2.5 bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 hover:border-[#e6a84f]/40 text-white font-poppins font-semibold text-sm px-7 py-3.5 rounded-xl transition-all duration-300">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-[#25D366]"><path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.38 5.06L2 22l5.07-1.33A9.96 9.96 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2Zm5.47 12.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.4-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.06 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35Z" /></svg>
            Ask on WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── FOOTER ─── */
/* Footer extracted → components/layout/Footer.tsx (rendered in app/layout.tsx) */

/* ─── PAGE ─── */
export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <LegacyExperience />
      <FounderSection />
      <ServicesSection />
      <ProcessSection />
      <TrainingSection />
      <WhyUsSection />
      <IndustriesSection />
      <DeploymentBanner />
      <LeadForm />
      <FAQSection />

      {/* Training Fan Carousel */}
      <section className="py-20 bg-[#0e1f2f]">
        <ScrollReveal className="max-w-7xl mx-auto px-4 text-center mb-4">
          <p className="font-inter text-[#e6a84f]/80 font-semibold text-sm uppercase tracking-widest mb-3">Training Excellence</p>
          <h2 className="font-poppins text-3xl font-bold text-white mb-2">Trained Before Every Deployment</h2>
          <p className="font-inter text-white/50 text-sm">Real sessions. Real guards. Real results.</p>
        </ScrollReveal>
        <SocialCards cards={[
          { imgUrl: '/images/training-carousel/guards-salute.jpg', alt: 'Guards in formation salute' },
          { imgUrl: '/images/training-carousel/female-guards.jpg', alt: 'Female security guards' },
          { imgUrl: '/images/training-carousel/campus-deployment.jpg', alt: 'Ceremonial guards at campus' },
          { imgUrl: '/images/training-carousel/ceremonial-guard.jpg', alt: 'Guard at ceremonial post' },
          { imgUrl: '/images/home/guards-march.jpg', alt: 'Guards marching in formation' },
          { imgUrl: '/images/home/badge-uniform.jpg', alt: 'Sai Saktheeswari uniform badge' },
          { imgUrl: '/images/training-carousel/team-formation.jpg', alt: 'Team in formation' },
          { imgUrl: '/images/training-carousel/patrol-duty.jpg', alt: 'Guards on patrol duty' },
        ]} />
      </section>

      {/* Full workforce gallery — every real photo, web-optimized marquee */}
      <GalleryMarquee />

    </div>
  );
}
