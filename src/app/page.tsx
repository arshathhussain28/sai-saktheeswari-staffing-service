'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useInView, useMotionValue, useSpring } from 'framer-motion';
import { FadeIn, StaggerChildren, StaggerItem } from '@/components/FadeIn';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { COMPANY, SERVICES, INDUSTRIES, NAV_LINKS, FAQS } from '@/lib/constants';
import SocialCards from '@/components/ui/card-fan-carousel';

/* ─── ANIMATION HELPERS ─── */
const ease = [0.25, 0.4, 0.25, 1] as [number, number, number, number];

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

/* ─── NAVBAR ─── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#04090f]/93 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_4px_40px_rgba(0,0,0,0.5)] py-3'
          : 'bg-gradient-to-b from-[#04090f]/30 to-transparent backdrop-blur-[3px] py-6'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 flex items-center justify-between">

        {/* Logo */}
        <a href="/" className="flex items-center gap-3.5 group flex-shrink-0">
          <motion.div
            animate={{ scale: scrolled ? 0.84 : 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-10 h-10 rounded-full overflow-hidden ring-1 ring-[#e6a84f]/30 group-hover:ring-[#e6a84f]/65 transition-all duration-500">
            <img src="/images/logo.jpeg" alt="Sai Saktheeswari Staffing Services" className="w-full h-full object-cover" />
          </motion.div>
          <motion.div animate={{ scale: scrolled ? 0.93 : 1 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
            <p className="font-poppins font-semibold text-white text-[13px] leading-tight tracking-[-0.01em]">Sai Saktheeswari</p>
            <p className="font-inter text-[#e6a84f]/70 text-[10px] tracking-[0.22em] uppercase mt-0.5">Staffing Services</p>
          </motion.div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href}
              className="relative group px-4 py-2 font-inter text-[12.5px] font-medium text-white/58 hover:text-white transition-colors duration-300 tracking-[0.025em]">
              {l.label}
              <span className="absolute bottom-[3px] left-4 right-4 h-px bg-[#e6a84f] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-400 ease-out" />
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <a href="/contact"
          className="hidden lg:flex group items-center gap-2.5 relative overflow-hidden
            bg-gradient-to-br from-[#f0be6a] via-[#e6a84f] to-[#c8902e]
            text-[#0a1a24] font-poppins font-bold text-[13px] tracking-[0.02em]
            px-[22px] py-[10px] rounded-[9px]
            shadow-[0_2px_14px_rgba(230,168,79,0.28),0_1px_0_rgba(255,255,255,0.22)_inset]
            hover:shadow-[0_4px_24px_rgba(230,168,79,0.44),0_1px_0_rgba(255,255,255,0.28)_inset]
            hover:-translate-y-[2px] transition-all duration-400 ease-out">
          <span className="relative z-10">Request Workforce</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"
            className="relative z-10 transition-transform duration-300 group-hover:translate-x-[3px] flex-shrink-0">
            <path d="M1.5 6h9M7 2.5l3.5 3.5L7 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none" />
        </a>

        {/* Mobile hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          className="lg:hidden flex flex-col gap-[5px] p-1.5">
          <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="block h-[1.5px] w-5 bg-white rounded-full origin-center" />
          <motion.span animate={{ opacity: menuOpen ? 0 : 1 }}
            transition={{ duration: 0.2 }}
            className="block h-[1.5px] w-3.5 bg-white/50 rounded-full" />
          <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="block h-[1.5px] w-5 bg-white rounded-full origin-center" />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden bg-[#04090f]/97 backdrop-blur-2xl border-t border-white/[0.06]">
            <div className="px-6 pt-5 pb-8 flex flex-col">
              {NAV_LINKS.map((l, i) => (
                <motion.a key={l.href} href={l.href}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 + i * 0.04, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => setMenuOpen(false)}
                  className="font-inter text-[15px] font-medium text-white/65 hover:text-white py-3 border-b border-white/[0.05] last:border-0 transition-colors duration-250 tracking-[0.01em]">
                  {l.label}
                </motion.a>
              ))}
              <motion.a href="/contact"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="mt-6 flex items-center justify-center gap-2.5
                  bg-gradient-to-r from-[#f0be6a] to-[#c8902e] text-[#0a1a24]
                  font-poppins font-bold text-sm tracking-[0.03em]
                  py-3.5 rounded-xl shadow-[0_4px_16px_rgba(230,168,79,0.3)]">
                Request Workforce
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M2 6.5h9M7.5 3l3.5 3.5L7.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ─── HERO ─── */
const HERO_SLIDES = [
  // Image 4 first — user's specified initial center: ceremony with Indian flag
  { src: '/images/home/ceremony-flag.jpg', label: 'Republic Day ceremony at client site' },
  { src: '/images/home/ceremony-group.jpg', label: 'Deployed guard team — ceremonial event' },
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

  const headline = ["South India's Most", 'Trusted Staffing', 'Partner Since 1991'];

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#060f18]">
      {/* Ambient background — blurred active image */}
      <AnimatePresence mode="sync">
        <motion.div key={`bg-${current}`} className="absolute inset-0 z-0"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}>
          <motion.img style={{ y: bgY }}
            src={HERO_SLIDES[current].src} alt="" aria-hidden
            className="absolute inset-0 w-full h-full object-cover scale-110 blur-sm brightness-[0.38]" />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#0d4f64]/60 via-transparent to-[#0e1f2f]/80" />

      <motion.div style={{ opacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">

          {/* ── LEFT: Text content ── */}
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-[#e6a84f]/15 border border-[#e6a84f]/30 rounded-full px-4 py-1.5 mb-8">
              <span className="text-[#e6a84f] text-sm">⭐</span>
              <span className="font-inter text-[#e6a84f] text-sm font-medium">Established 1991 — 35 Years of Excellence</span>
            </motion.div>

            <div className="mb-6">
              {headline.map((line, li) => (
                <div key={li} className="overflow-hidden">
                  <motion.h1
                    initial={{ y: '110%' }} animate={{ y: 0 }}
                    transition={{ duration: 0.75, delay: 0.45 + li * 0.15, ease }}
                    className={`font-poppins font-extrabold leading-[1.06] block text-4xl sm:text-5xl lg:text-5xl xl:text-6xl ${li === 1 ? 'text-[#e6a84f]' : 'text-white'}`}>
                    {line}
                  </motion.h1>
                </div>
              ))}
            </div>

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
              className="flex flex-col sm:flex-row gap-3 mb-10">
              <a href="/contact"
                className="bg-[#e6a84f] hover:bg-[#c8902e] text-[#0e1f2f] font-poppins font-bold px-7 py-3.5 rounded-xl transition-all shadow-xl hover:shadow-[#e6a84f]/40 hover:-translate-y-0.5 text-center text-sm">
                Request Workforce Support →
              </a>
              <a href={`https://wa.me/${COMPANY.phone.whatsapp}?text=Hello, I am interested in your staffing services.`}
                target="_blank" rel="noopener noreferrer"
                className="border-2 border-white/50 text-white hover:bg-white hover:text-[#0d4f64] font-poppins font-semibold px-7 py-3.5 rounded-xl transition-all text-center text-sm">
                💬 Talk on WhatsApp
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 0.6 }}
              className="flex flex-wrap gap-4 text-white/45 text-xs font-inter">
              {['Licensed & Registered', 'PF & ESI Compliant', '500+ Workforce Deployed', '48-72hr Deployment'].map(t => (
                <span key={t} className="flex items-center gap-1.5">
                  <span className="text-[#e6a84f]">✓</span> {t}
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
  { value: 35, suffix: '+', label: 'Years of Excellence', sub: 'Since 1991', Icon: TrophyIcon, img: '/images/founder/rajasekar-office.jpg' },
  { value: 500, suffix: '+', label: 'Professionals Deployed', sub: 'Trained workforce', Icon: NetworkIcon, img: '/images/dsc/formation-aerial.jpg' },
  { value: 100, suffix: '+', label: 'Trusted Clients', sub: 'Long-term partnerships', Icon: PartnershipIcon, img: '/images/home/ceremony-flag.jpg' },
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
  { name: 'Education', Icon: EducationIcon, img: '/images/dsc/campus-wide.jpg', desc: 'Institutional campus protection' },
  { name: 'Industrial', Icon: IndustrialIcon, img: '/images/dsc/guards-patrol.jpg', desc: 'Site patrol & access control' },
  { name: 'Corporate', Icon: CorporateIcon, img: '/images/dsc/team-group-1.jpg', desc: 'Office & facility management' },
];

/* Premium showcase gallery — real workforce imagery only (no vehicles) */
const SHOWCASE_IMAGES = [
  { src: '/images/dsc/formation-aerial.jpg', label: 'Workforce in formation' },
  { src: '/images/home/guards-march.jpg', label: 'Disciplined deployment' },
  { src: '/images/dsc/female-guards-salute.jpg', label: 'Trained female personnel' },
  { src: '/images/home/ceremony-flag.jpg', label: 'Ceremonial honour guard' },
  { src: '/images/dsc/guard-ceremonial.jpg', label: 'Ceremonial post' },
  { src: '/images/home/arm-badge-patch.jpg', label: 'Since 1991 — verified standards' },
  { src: '/images/dsc/campus-wide.jpg', label: 'Campus deployment' },
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
    img: '/images/home/ceremony-flag.jpg',
  },
  {
    year: '2000', kicker: 'Expansion',
    lines: ['Expanding Across', 'Tamil Nadu.'],
    sub: 'Trusted by industries where reliability matters most.',
    img: '/images/dsc/formation-aerial.jpg',
  },
  {
    year: '2010', kicker: 'Partnership',
    lines: ['Building Long-Term', 'Workforce Partnerships.'],
    sub: 'Discipline. Scale. Trust — earned over decades.',
    img: '/images/home/guards-march.jpg',
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
          className="font-poppins font-extrabold text-white/[0.12] leading-none mb-5 tracking-tight"
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
        {chapter.sub && (
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 1.1, duration: 1 }}
            className="font-inter text-white/50 text-base lg:text-xl mt-8 max-w-lg mx-auto leading-relaxed">
            {chapter.sub}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}

/* — 2025 finale: figures as luxury typography — */
function LegacyFinale() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-22%' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.25, 1.05]);

  return (
    <div ref={ref} className="relative min-h-screen w-full overflow-hidden flex items-center py-28 lg:py-32">
      <motion.img style={{ scale: imgScale }} src="/images/dsc/guard-lineup-1.jpg" alt=""
        className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-[#04090f]/90" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#04090f_0%,rgba(4,9,15,0.55)_50%,#04090f_100%)]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 w-full">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1 }}
          className="text-center mb-14 lg:mb-20">
          <p className="font-inter text-[#e6a84f] text-[11px] tracking-[0.55em] uppercase mb-6">2025</p>
          <RevealHeading inView={inView} text="Three Decades of Trust"
            className="font-poppins text-4xl md:text-6xl font-extrabold text-white" />
        </motion.div>

        <div className="border-y border-white/[0.08]">
          {LEGACY_FIGURES.map((f, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 34 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.14, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className={`group flex items-center justify-between gap-6 py-6 lg:py-9 ${i < LEGACY_FIGURES.length - 1 ? 'border-b border-white/[0.06]' : ''}`}>
              <span className="font-poppins font-extrabold leading-none bg-gradient-to-b from-white to-white/55 bg-clip-text text-transparent group-hover:from-[#f7d99a] group-hover:to-[#c8902e] transition-all duration-500"
                style={{ fontSize: 'clamp(3.5rem, 12vw, 9rem)' }}>
                {f.v}
              </span>
              <span className="font-inter text-white/40 text-xs sm:text-base lg:text-xl tracking-[0.18em] uppercase text-right">{f.u}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* — Editorial image tile — */
function EditorialImg({ src, label, className = '' }: { src: string; label: string; className?: string }) {
  return (
    <ScrollReveal className={`group relative overflow-hidden rounded-2xl ${className}`}>
      <img src={src} alt={label}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1300ms] ease-out group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#04090f]/80 via-transparent to-transparent" />
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
          <EditorialImg src="/images/dsc/director-office.jpg" label="Leadership"
            className="md:col-span-7 aspect-[4/3] md:aspect-[16/12]" />
          <EditorialImg src="/images/dsc/guard-lineup-1.jpg" label="Discipline"
            className="md:col-span-5 aspect-[4/3] md:aspect-[16/12]" />
          <EditorialImg src="/images/dsc/supervisors-duo.jpg" label="Trust"
            className="md:col-span-5 aspect-[4/3]" />
          <EditorialImg src="/images/dsc/formation-aerial.jpg" label="Scale"
            className="md:col-span-7 aspect-[4/3] md:aspect-auto" />
        </div>
        <EditorialImg src="/images/dsc/team-group-2.jpg" label="The Workforce"
          className="mt-4 lg:mt-5 aspect-[16/10] md:aspect-[21/7]" />
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
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,9,15,0.55)_0%,rgba(4,9,15,0.2)_45%,rgba(4,9,15,0.8)_100%)]" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
          <p className="font-inter text-[#e6a84f] text-[11px] tracking-[0.55em] uppercase mb-6">Discipline In Motion</p>
          <div className="relative h-24 w-full max-w-3xl">
            {[
              { o: cap1, t: 'Every step, in formation.' },
              { o: cap2, t: 'Every guard, in line.' },
              { o: cap3, t: 'Every duty, with honour.' },
            ].map((c, i) => (
              <motion.p key={i} style={{ opacity: c.o }}
                className="absolute inset-0 flex items-center justify-center font-poppins text-2xl md:text-4xl lg:text-5xl font-bold text-white">
                {c.t}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </section>
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
    body: 'With a single commitment to discipline and trust, Rajasekar founded Sai Saktheeswari Staffing Services in Cuddalore — driven by a belief that South India deserved a workforce partner it could truly rely on.',
  },
  {
    year: '2000',
    headline: 'The Expansion',
    body: 'A decade of delivered promises opened doors across Tamil Nadu. Industries that once questioned us returned as long-term partners — because results do not need advertising.',
  },
  {
    year: '2010',
    headline: 'The Partnership Era',
    body: 'Trusted by manufacturers, hospitals, and educational institutions alike. Rajasekar personally built each relationship — not through proposals, but through performance.',
  },
  {
    year: '2025',
    headline: 'The Legacy',
    body: '500+ professionals. 100+ clients. 35 years of honour. The commitment made in 1991 remains unchanged — every worker we deploy carries our reputation.',
  },
];

function FounderTimelineEntry({ entry }: { entry: typeof FOUNDER_STORY[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15%' });
  return (
    <div ref={ref} className="relative flex gap-10 sm:gap-16 pb-20 last:pb-0">
      {/* Node */}
      <div className="flex-shrink-0 flex items-start justify-center" style={{ width: '1rem' }}>
        <motion.div
          initial={{ scale: 0, opacity: 0 }} animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-2.5 h-2.5 rounded-full bg-[#e6a84f] shadow-[0_0_16px_rgba(230,168,79,0.8)] relative z-10 mt-5 flex-shrink-0"
        />
      </div>
      {/* Content */}
      <div>
        <motion.p
          initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="font-poppins font-extrabold text-[#e6a84f]/75 leading-none mb-2.5"
          style={{ fontSize: 'clamp(2rem, 6.5vw, 4rem)' }}>
          {entry.year}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.26, duration: 0.8 }}
          className="font-poppins font-semibold text-white text-xl lg:text-2xl mb-4 leading-snug">
          {entry.headline}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.37, duration: 0.8 }}
          className="font-inter text-white/65 text-base lg:text-lg leading-[1.85] max-w-[500px]">
          {entry.body}
        </motion.p>
      </div>
    </div>
  );
}

function FounderSection() {
  /* Portrait */
  const portraitRef = useRef<HTMLDivElement>(null);
  const portraitInView = useInView(portraitRef, { once: true, margin: '-8%' });
  const { scrollYProgress: portraitScroll } = useScroll({ target: portraitRef, offset: ['start end', 'end start'] });
  const imgParallaxY = useTransform(portraitScroll, [0, 1], ['-6%', '6%']);
  const imgScaleP = useTransform(portraitScroll, [0, 1], [1.1, 1.0]);

  /* Journey timeline */
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: tlScroll } = useScroll({ target: timelineRef, offset: ['start end', 'end center'] });
  const lineScaleY = useTransform(tlScroll, [0, 0.95], [0, 1]);

  return (
    <section className="relative bg-[#04090f]">

      {/* ── PORTRAIT EDITORIAL — single viewport ── */}
      <div ref={portraitRef} className="relative min-h-screen overflow-hidden flex items-center">
        {/* Founder image — parallax, right-weighted */}
        <motion.div style={{ scale: imgScaleP, y: imgParallaxY }} className="absolute inset-0 will-change-transform">
          <motion.img
            src="/images/founder/rajasekar-office.jpg"
            alt="Rajasekar — Founder & Managing Director, Sai Saktheeswari Staffing Services"
            className="absolute inset-0 w-full h-full object-cover object-center"
            initial={{ opacity: 0, filter: 'blur(22px)' }}
            animate={portraitInView ? { opacity: 1, filter: 'blur(0px)' } : {}}
            transition={{ duration: 1.9, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>
        {/* Directional scrim — dark left (text), lighter right (image) */}
        <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(4,9,15,0.97)_0%,rgba(4,9,15,0.88)_36%,rgba(4,9,15,0.46)_62%,rgba(4,9,15,0.04)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#04090f_0%,transparent_12%,transparent_88%,#04090f_100%)]" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[45%] h-[60%] bg-[#e6a84f]/[0.05] blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-7 sm:px-12 lg:px-20 py-24 w-full">
          <div className="max-w-[480px]">
            <motion.p
              initial={{ opacity: 0, y: 12 }} animate={portraitInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9 }}
              className="font-inter text-[#e6a84f] text-[11px] tracking-[0.55em] uppercase mb-7">
              A Vision That Built A Legacy
            </motion.p>

            <div style={{ fontSize: 'clamp(3.8rem, 9.5vw, 7rem)' }} className="mb-5">
              <RevealHeading inView={portraitInView} text="Rajasekar"
                className="font-poppins font-extrabold text-white leading-[0.94]" />
            </div>

            <motion.div
              initial={{ scaleX: 0 }} animate={portraitInView ? { scaleX: 1 } : {}}
              transition={{ delay: 0.6, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="h-px w-24 bg-gradient-to-r from-[#e6a84f]/60 to-transparent mb-7"
              style={{ transformOrigin: 'left' }}
            />

            <motion.p
              initial={{ opacity: 0, y: 12 }} animate={portraitInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.38, duration: 0.9 }}
              className="font-inter text-white/55 text-base lg:text-[1.05rem] leading-[1.82] mb-7 max-w-[400px]">
              One man. One commitment. 35 years building the most trusted staffing institution in South India — every worker trained before deployment, every single time.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, x: -10 }} animate={portraitInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.52, duration: 0.9 }}
              className="border-l-2 border-[#e6a84f]/35 pl-5 mb-8">
              <p className="font-poppins text-[#e6a84f]/75 text-base lg:text-lg leading-[1.65] italic">
                "Every worker we deploy carries our reputation."
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={portraitInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.65, duration: 0.8 }}
              className="space-y-1.5">
              <p className="font-inter text-white/52 text-sm tracking-[0.28em] uppercase">Founder & Managing Director</p>
              <p className="font-inter text-[#e6a84f]/35 text-[11px] tracking-[0.38em] uppercase">Since 1991</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── JOURNEY TIMELINE ── */}
      <div ref={timelineRef} className="relative py-24 lg:py-36 bg-[#04090f]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_20%_50%,rgba(13,79,100,0.06),transparent)]" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-12">
          <FadeIn className="mb-16 lg:mb-24">
            <p className="font-inter text-[#e6a84f] text-[11px] tracking-[0.55em] uppercase mb-5">The Journey</p>
            <h2 className="font-poppins font-extrabold text-white leading-[1.06]"
              style={{ fontSize: 'clamp(2.2rem, 5.5vw, 4rem)' }}>
              How a legacy is built.<br />
              <span className="text-white/25">Year by year.</span>
            </h2>
          </FadeIn>
          <div className="relative pl-7 sm:pl-10">
            <motion.div
              style={{ scaleY: lineScaleY, transformOrigin: 'top' }}
              className="absolute left-[0.55rem] sm:left-[0.8rem] top-5 bottom-0 w-px bg-gradient-to-b from-[#e6a84f]/55 via-[#e6a84f]/18 to-transparent"
            />
            {FOUNDER_STORY.map((entry, i) => (
              <FounderTimelineEntry key={i} entry={entry} />
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}

/* ─── SERVICES ─── */
function ServicesSection() {
  return (
    <section className="py-24 bg-[#f8f9fa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <p className="font-inter text-[#e6a84f] font-semibold text-sm uppercase tracking-widest mb-3">What We Do</p>
          <h2 className="font-poppins text-4xl font-bold text-[#0d4f64] mb-4">Complete Workforce Solutions</h2>
          <p className="font-inter text-[#6b7c8d] max-w-2xl mx-auto leading-relaxed">
            From security personnel to statutory compliance — one trusted partner for all your workforce needs in Tamil Nadu.
          </p>
        </FadeIn>

        <StaggerChildren className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" stagger={0.1}>
          {SERVICES.map((s) => (
            <StaggerItem key={s.id}>
              <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.2 }}
                className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-shadow group h-full">
                <div className="w-14 h-14 bg-[#e8f4f8] rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:bg-[#0d4f64] transition-colors">
                  <span className="group-hover:brightness-200">{s.icon}</span>
                </div>
                <h3 className="font-poppins font-bold text-lg text-[#1a2a3a] mb-3">{s.title}</h3>
                <p className="font-inter text-[#6b7c8d] text-sm leading-relaxed mb-6">{s.desc}</p>
                <a href={s.href} className="font-poppins text-[#0d4f64] font-semibold text-sm hover:text-[#e6a84f] transition-colors flex items-center gap-1">
                  Learn More →
                </a>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}

/* ─── 4S ENTERPRISE PROCESS ─── */

const ENT_METRICS = [
  { display: '10,000+', label: 'Workforce in Network' },
  { display: '500+', label: 'Client Businesses' },
  { display: '95%', label: 'Year-One Retention' },
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
    desc: 'Our certified training programme covers security protocols, emergency response, professional grooming, and communication — personally overseen by Founder Rajasekar.',
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

function ProcessSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', '25% start'] });
  const heroImgY = useTransform(scrollYProgress, [0, 1], [0, -55]);

  return (
    <section ref={containerRef} id="process" className="relative bg-[#050d1a] overflow-hidden">

      {/* ── ENTERPRISE HEADER ── */}
      <div className="relative py-24 lg:py-36 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_100%,rgba(230,168,79,0.07),transparent)] pointer-events-none" />
        <FadeIn className="relative z-10 mb-14 px-4">
          <div className="inline-flex items-center gap-2 bg-[#e6a84f]/8 border border-[#e6a84f]/18 rounded-full px-4 py-1.5 mb-7">
            <div className="w-1.5 h-1.5 rounded-full bg-[#e6a84f] animate-pulse" />
            <span className="font-inter text-[#e6a84f] text-[10px] font-bold tracking-[0.3em] uppercase">35 Years · Proven Methodology</span>
          </div>
          <h2 className="font-poppins text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white leading-[0.92] mb-6">
            The 4<span className="text-[#e6a84f]">S</span><br />
            <span className="text-white">Workforce</span><br />
            <span className="text-white/30">System</span>
          </h2>
          <p className="font-inter text-white/38 text-base lg:text-lg max-w-xl mx-auto leading-relaxed">
            Every worker we deploy follows our proprietary 4S journey — from talent sourcing to long-term performance assurance.
          </p>
        </FadeIn>

        {/* Enterprise metrics strip */}
        <div className="relative z-10 max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-0 lg:bg-white/[0.04] lg:border lg:border-white/8 lg:rounded-2xl lg:overflow-hidden">
            {ENT_METRICS.map((m, i) => (
              <ScrollReveal key={i}
                className="bg-white/[0.04] border border-white/8 rounded-2xl lg:rounded-none lg:bg-transparent lg:border-0 lg:border-r last:lg:border-r-0 lg:border-white/8 p-6 lg:p-8 flex flex-col items-center gap-2">
                <span className="font-poppins text-3xl lg:text-4xl xl:text-5xl font-extrabold text-[#e6a84f]">{m.display}</span>
                <span className="font-inter text-white/32 text-[9px] lg:text-[10px] uppercase tracking-[0.2em] text-center">{m.label}</span>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      {/* ── AERIAL FORMATION BANNER ── */}
      <div className="relative overflow-hidden" style={{ height: 'clamp(260px, 42vw, 520px)' }}>
        <motion.img style={{ y: heroImgY }}
          src="/images/dsc/formation-aerial.jpg"
          alt="Sai Saktheeswari security guards in S-formation — over 500 workforce strong"
          className="absolute inset-0 w-full h-full object-cover object-center scale-[1.2] brightness-[0.35]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050d1a] via-[#050d1a]/10 to-[#050d1a]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050d1a]/60 via-transparent to-[#050d1a]/60" />

        {/* 4S journey dots */}
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <FadeIn className="text-center">
            <p className="font-inter text-white/20 text-[9px] tracking-[0.5em] uppercase mb-7">The 4S Journey</p>
            <div className="flex items-center justify-center">
              {(['SOURCE', 'SCREEN', 'SUPPORT', 'SUSTAIN'] as const).map((s, i) => (
                <div key={s} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#e6a84f] shadow-[0_0_16px_rgba(230,168,79,0.7)]" />
                    <span className="font-poppins text-white/65 font-bold text-[9px] sm:text-[10px] mt-3 tracking-[0.18em]">{s}</span>
                  </div>
                  {i < 3 && (
                    <div className="w-8 sm:w-14 lg:w-24 xl:w-32 h-px bg-gradient-to-r from-[#e6a84f]/55 to-[#e6a84f]/12 mx-0.5" />
                  )}
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>

      {/* ── 4 STEP STORIES ── */}
      {PROCESS_STEPS.map((step, i) => (
        <ProcessStepPanel key={i} step={step} index={i} />
      ))}

    </section>
  );
}

/* ─── TRAINING ─── */
function TrainingSection() {
  const photos = [
    { src: '/images/training-3.jpeg', caption: 'Weekly briefing at Cuddalore centre' },
    { src: '/images/founder-training.jpeg', caption: 'Rajasekaran conducting personal training' },
    { src: '/images/training-11.jpeg', caption: 'Large-scale team session' },
    { src: '/images/deployment.jpeg', caption: 'Guards deployed at client site' },
  ];

  const points = [
    { icon: '🎯', title: 'Discipline & Conduct', desc: 'Punctuality, grooming, and professional behaviour standards.' },
    { icon: '🦺', title: 'Safety Protocols', desc: 'Fire safety, emergency response, access control, incident reporting.' },
    { icon: '💬', title: 'Communication', desc: 'Professional interaction with clients, supervisors and public.' },
    { icon: '🔁', title: 'Refresher Sessions', desc: 'Weekly briefings to keep skills sharp and compliance current.' },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <FadeIn direction="left">
            <div className="grid grid-cols-2 gap-4">
              {photos.map((p, i) => (
                <motion.div key={i} whileHover={{ scale: 1.03 }} className="relative rounded-xl overflow-hidden aspect-[4/3] group">
                  <img src={p.src} alt={p.caption} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e1f2f]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <p className="text-white text-xs font-inter">{p.caption}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={0.15}>
            <p className="font-inter text-[#e6a84f] font-semibold text-sm uppercase tracking-widest mb-3">Training Excellence</p>
            <h2 className="font-poppins text-4xl font-bold text-[#0d4f64] mb-5">Every Worker Trained Before Deployment</h2>
            <p className="font-inter text-[#6b7c8d] leading-relaxed mb-10">
              At Sai Saktheeswari, we supply <strong className="text-[#1a2a3a]">professionally trained, discipline-first workforce</strong>.
              Our founder personally oversees training at our Cuddalore centre — a standard maintained for 35 years.
            </p>
            <div className="space-y-5 mb-10">
              {points.map((p, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-[#e8f4f8] rounded-lg flex items-center justify-center text-lg flex-shrink-0">{p.icon}</div>
                  <div>
                    <h4 className="font-poppins font-semibold text-[#1a2a3a] mb-0.5">{p.title}</h4>
                    <p className="font-inter text-[#6b7c8d] text-sm">{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <a href="/training"
              className="inline-flex items-center gap-2 border-2 border-[#0d4f64] text-[#0d4f64] hover:bg-[#0d4f64] hover:text-white font-poppins font-semibold px-7 py-3 rounded-xl transition-all">
              View Full Training Programme →
            </a>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ─── WHY US ─── */
function WhyUsSection() {
  const points = [
    { icon: '🏆', title: '35 Years of Trust', desc: 'Established 1991 — three decades of dependable staffing and security service in South India.' },
    { icon: '🎓', title: 'Trained Before Deployment', desc: 'Rigorous training in discipline, safety, communication and professional conduct — every guard, every time.' },
    { icon: '⚖️', title: 'Full Statutory Compliance', desc: 'PF, ESI, Contract Labour Act — all handled by our in-house compliance team. Zero risk for you.' },
    { icon: '📍', title: 'Local Expert Presence', desc: 'Two offices in Cuddalore & Puducherry. We know Tamil Nadu\'s workforce landscape deeply.' },
    { icon: '👩‍💼', title: 'Female Security Staff', desc: 'Trained female security personnel for campuses, hospitals, and commercial complexes.' },
    { icon: '⚡', title: '48-72hr Deployment', desc: 'Fast mobilisation of trained staff for standard requirements — WhatsApp for urgent needs.' },
  ];

  return (
    <section className="py-24 bg-[#f8f9fa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <p className="font-inter text-[#e6a84f] font-semibold text-sm uppercase tracking-widest mb-3">Why Us</p>
          <h2 className="font-poppins text-4xl font-bold text-[#0d4f64] mb-4">Why 100+ Businesses Trust Sai Saktheeswari</h2>
        </FadeIn>
        <StaggerChildren className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" stagger={0.08}>
          {points.map((p, i) => (
            <StaggerItem key={i}>
              <motion.div whileHover={{ y: -4 }}
                className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-all text-center h-full">
                <div className="text-4xl mb-5">{p.icon}</div>
                <h3 className="font-poppins font-bold text-lg text-[#1a2a3a] mb-3">{p.title}</h3>
                <p className="font-inter text-[#6b7c8d] text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerChildren>
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
    img: '/images/dsc/campus-wide.jpg',
  },
  {
    n: '04', name: 'Industrial', headline: 'Vigilance through the night shift.',
    body: 'Large-scale industrial estates demand uninterrupted supervision. Our officers monitor perimeters, control access and patrol grounds without pause.',
    proof: ['Perimeter patrol', 'Night-shift monitoring', 'Access supervision'],
    img: '/images/dsc/guards-patrol.jpg',
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
    img: '/images/dsc/guard-post-1.jpg',
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
    <section className="relative overflow-hidden h-80 md:h-96">
      <img src="/images/dsc/formation-aerial.jpg" alt="Security formation"
        className="absolute inset-0 w-full h-full object-cover object-top" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0d4f64]/90 to-[#0e1f2f]/70" />
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <FadeIn direction="left">
            <h2 className="font-poppins text-3xl md:text-4xl font-bold text-white mb-4">
              Professionally Trained. Reliably Deployed.
            </h2>
            <p className="font-inter text-white/75 text-base mb-8 max-w-lg">
              Our guards arrive at your site disciplined, uniformed, and ready — every single time.
            </p>
            <a href="/contact"
              className="bg-[#e6a84f] hover:bg-[#c8902e] text-[#0e1f2f] font-poppins font-bold px-8 py-4 rounded-xl transition-all shadow-xl">
              Request Security Personnel →
            </a>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ─── LEAD FORM ─── */
function LeadForm() {
  const [form, setForm] = useState({ name: '', company: '', phone: '', industry: '', message: '' });
  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const sub = encodeURIComponent(`Workforce Enquiry from ${form.name} — ${form.company}`);
    const body = encodeURIComponent(`Name: ${form.name}\nCompany: ${form.company}\nPhone: ${form.phone}\nIndustry: ${form.industry}\n\nRequirement:\n${form.message}`);
    window.location.href = `mailto:${COMPANY.email}?subject=${sub}&body=${body}`;
  };

  const inputCls = "w-full border border-gray-200 rounded-xl px-4 py-3 font-inter text-sm text-[#1a2a3a] focus:outline-none focus:border-[#0d4f64] focus:ring-2 focus:ring-[#e8f4f8] transition-all bg-white";

  return (
    <section id="contact" className="py-24 bg-[#0d4f64]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14">
          <FadeIn direction="left">
            <p className="font-inter text-[#e6a84f] font-semibold text-sm uppercase tracking-widest mb-4">Get In Touch</p>
            <h2 className="font-poppins text-4xl font-bold text-white mb-6">Need Reliable Staff in Tamil Nadu?</h2>
            <p className="font-inter text-white/70 mb-10">Tell us your requirement — we respond within 24 hours with a tailored solution.</p>
            <div className="space-y-5 mb-10">
              {[
                { icon: '📞', label: 'Call Us', val: COMPANY.phone.primary, href: `tel:${COMPANY.phone.primary.replace(/\s/g, '')}` },
                { icon: '💬', label: 'WhatsApp', val: 'Chat instantly', href: `https://wa.me/${COMPANY.phone.whatsapp}` },
                { icon: '✉️', label: 'Email', val: COMPANY.email, href: `mailto:${COMPANY.email}` },
              ].map((c, i) => (
                <a key={i} href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                  className="flex items-center gap-4 group">
                  <div className="w-11 h-11 bg-white/12 group-hover:bg-[#e6a84f] rounded-xl flex items-center justify-center text-xl transition-colors">{c.icon}</div>
                  <div>
                    <p className="font-inter text-white/55 text-xs">{c.label}</p>
                    <p className="font-inter text-white font-medium text-sm">{c.val}</p>
                  </div>
                </a>
              ))}
            </div>
            <div className="bg-white/8 border border-white/15 rounded-2xl p-6 space-y-4">
              {[COMPANY.address.head, COMPANY.address.branch].map((a, i) => (
                <div key={i}>
                  <p className="font-poppins font-semibold text-white text-sm mb-1">{a.label}</p>
                  <p className="font-inter text-white/60 text-sm leading-relaxed">{a.text}</p>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={0.15}>
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl">
              <h3 className="font-poppins font-bold text-2xl text-[#1a2a3a] mb-2">Send Your Requirement</h3>
              <p className="font-inter text-[#6b7c8d] text-sm mb-8">We respond within 24 hours. Your details are confidential.</p>
              <form onSubmit={onSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="font-inter text-sm font-medium text-[#1a2a3a] mb-1.5 block">Full Name *</label>
                    <input type="text" name="name" required value={form.name} onChange={onChange} placeholder="Your name" className={inputCls} />
                  </div>
                  <div>
                    <label className="font-inter text-sm font-medium text-[#1a2a3a] mb-1.5 block">Company Name</label>
                    <input type="text" name="company" value={form.company} onChange={onChange} placeholder="Your company" className={inputCls} />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="font-inter text-sm font-medium text-[#1a2a3a] mb-1.5 block">Phone Number *</label>
                    <input type="tel" name="phone" required value={form.phone} onChange={onChange} placeholder="+91 98765 43210" className={inputCls} />
                  </div>
                  <div>
                    <label className="font-inter text-sm font-medium text-[#1a2a3a] mb-1.5 block">Industry</label>
                    <select name="industry" value={form.industry} onChange={onChange} className={inputCls}>
                      <option value="">Select industry</option>
                      {INDUSTRIES.map(i => <option key={i.name}>{i.name}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="font-inter text-sm font-medium text-[#1a2a3a] mb-1.5 block">Your Requirement</label>
                  <textarea name="message" rows={4} value={form.message} onChange={onChange}
                    placeholder="Describe your staffing requirement — number of staff, type, location, duration..."
                    className={`${inputCls} resize-none`} />
                </div>
                <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} type="submit"
                  className="w-full bg-[#e6a84f] hover:bg-[#c8902e] text-[#0e1f2f] font-poppins font-bold py-4 rounded-xl transition-all shadow-md">
                  Submit Requirement →
                </motion.button>
                <p className="font-inter text-[#6b7c8d] text-xs text-center">We do not share your information. 100% confidential.</p>
              </form>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ ─── */
function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="py-24 bg-[#f8f9fa]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <p className="font-inter text-[#e6a84f] font-semibold text-sm uppercase tracking-widest mb-3">FAQ</p>
          <h2 className="font-poppins text-4xl font-bold text-[#0d4f64] mb-4">Frequently Asked Questions</h2>
          <p className="font-inter text-[#6b7c8d]">Everything you need to know about working with Sai Saktheeswari.</p>
        </FadeIn>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {FAQS.map((faq, i) => (
            <div key={i} className="border-b border-gray-100 last:border-0">
              <button onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left py-5 px-6 flex justify-between items-start gap-4 hover:bg-[#e8f4f8]/40 transition-colors">
                <span className="font-poppins font-semibold text-[#1a2a3a] text-base">{faq.q}</span>
                <motion.span animate={{ rotate: open === i ? 45 : 0 }}
                  className="text-[#0d4f64] text-xl font-bold flex-shrink-0">+</motion.span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                    <p className="px-6 pb-5 font-inter text-[#6b7c8d] leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
        <FadeIn className="text-center mt-10">
          <a href={`https://wa.me/${COMPANY.phone.whatsapp}`} target="_blank" rel="noopener noreferrer"
            className="bg-[#e6a84f] hover:bg-[#c8902e] text-[#0e1f2f] font-poppins font-semibold px-8 py-3 rounded-xl transition-all inline-flex items-center gap-2">
            💬 Ask on WhatsApp
          </a>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer className="bg-[#060f18] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/8">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-[#e6a84f]/25">
                <img src="/images/logo.jpeg" alt="Logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-poppins font-bold text-white text-sm">Sai Saktheeswari</p>
                <p className="font-inter text-[#e6a84f] text-xs">Staffing Services</p>
              </div>
            </div>
            <p className="font-inter text-white/40 text-sm leading-relaxed mb-6">
              {COMPANY.tagline}.<br />Established {COMPANY.established}.
            </p>
            <a href={`https://wa.me/${COMPANY.phone.whatsapp}`} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600/90 hover:bg-green-600 text-white font-inter text-sm px-4 py-2.5 rounded-xl transition-all">
              💬 WhatsApp Us
            </a>
          </div>
          <div>
            <h4 className="font-poppins font-bold text-white text-sm uppercase tracking-wide mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map(l => (
                <li key={l.href}><a href={l.href} className="font-inter text-white/45 hover:text-[#e6a84f] text-sm transition-colors">{l.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-poppins font-bold text-white text-sm uppercase tracking-wide mb-5">Our Services</h4>
            <ul className="space-y-3">
              {SERVICES.map(s => (
                <li key={s.id}><a href={s.href} className="font-inter text-white/45 hover:text-[#e6a84f] text-sm transition-colors">{s.title}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-poppins font-bold text-white text-sm uppercase tracking-wide mb-5">Contact Us</h4>
            <div className="space-y-4">
              {[COMPANY.address.head, COMPANY.address.branch].map((a, i) => (
                <div key={i}>
                  <p className="font-poppins text-white/60 text-xs uppercase tracking-wide mb-1">{a.label}</p>
                  <p className="font-inter text-white/40 text-xs leading-relaxed">{a.text}</p>
                </div>
              ))}
              <div className="space-y-2 pt-2">
                {COMPANY.phone.office.map(ph => (
                  <a key={ph} href={`tel:${ph.replace(/\s/g, '')}`}
                    className="flex items-center gap-2 font-inter text-white/40 hover:text-[#e6a84f] text-xs transition-colors">
                    📞 {ph}
                  </a>
                ))}
                <a href={`mailto:${COMPANY.email}`}
                  className="flex items-center gap-2 font-inter text-white/40 hover:text-[#e6a84f] text-xs transition-colors">
                  ✉️ {COMPANY.email}
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="font-inter text-white/25 text-xs">
            © {new Date().getFullYear()} Sai Saktheeswari Staffing Services. Established 1991. All Rights Reserved.
          </p>
          <p className="font-inter text-white/20 text-xs">Cuddalore · Puducherry · Tamil Nadu</p>
        </div>
      </div>
    </footer>
  );
}

/* ─── PAGE ─── */
export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
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
          { imgUrl: '/images/training-carousel/bolero-ceremony.jpg', alt: 'Deployment ceremony' },
          { imgUrl: '/images/home/badge-uniform.jpg', alt: 'Sai Saktheeswari uniform badge' },
          { imgUrl: '/images/training-carousel/team-formation.jpg', alt: 'Team in formation' },
          { imgUrl: '/images/training-carousel/patrol-duty.jpg', alt: 'Guards on patrol duty' },
        ]} />
      </section>

      <Footer />

      {/* WhatsApp — Desktop Premium Glass CTA */}
      <motion.a
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.8, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -4, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
        href={`https://wa.me/${COMPANY.phone.whatsapp}?text=Hello, I am interested in your staffing services.`}
        target="_blank" rel="noopener noreferrer"
        className="fixed bottom-8 right-7 z-50 hidden lg:flex items-center gap-4
          px-5 py-[14px] rounded-2xl
          bg-[#060d14]/88 backdrop-blur-2xl
          border border-[#e6a84f]/18 hover:border-[#e6a84f]/42
          shadow-[0_8px_40px_rgba(0,0,0,0.55),0_1px_0_rgba(255,255,255,0.04)_inset]
          hover:shadow-[0_14px_56px_rgba(0,0,0,0.65),0_0_32px_rgba(230,168,79,0.06),0_1px_0_rgba(255,255,255,0.06)_inset]
          transition-all duration-500 ease-out group">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0
          bg-[#e6a84f]/[0.09] border border-[#e6a84f]/18
          group-hover:bg-[#e6a84f]/[0.16] group-hover:border-[#e6a84f]/35 group-hover:scale-105 group-hover:rotate-[6deg]
          transition-all duration-400 ease-out">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.38 5.06L2 22l5.07-1.33A9.96 9.96 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2z" fill="rgba(230,168,79,0.15)" stroke="rgba(230,168,79,0.6)" strokeWidth="1.2"/>
            <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.4-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.06 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35z" fill="white" fillOpacity="0.9"/>
          </svg>
        </div>
        <div>
          <p className="font-poppins font-semibold text-white text-[13px] leading-none mb-[5px] tracking-[-0.005em]">Speak With Our Team</p>
          <p className="font-inter text-[#e6a84f]/42 text-[10px] tracking-[0.3em] uppercase">WhatsApp · Fast Response</p>
        </div>
      </motion.a>

      {/* Mobile Sticky Contact Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden
        bg-[#04090f]/94 backdrop-blur-2xl border-t border-white/[0.07]
        shadow-[0_-4px_32px_rgba(0,0,0,0.5)] px-4 py-3">
        <div className="flex items-center gap-2.5">
          <a href={`tel:${COMPANY.phone.primary.replace(/\s/g, '')}`}
            className="flex-none flex items-center justify-center gap-1.5 px-4 py-[10px] rounded-xl
              bg-white/[0.05] border border-white/[0.09]
              font-inter text-white/70 text-xs font-medium tracking-[0.01em]
              transition-colors hover:bg-white/[0.09]">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" className="opacity-70">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
            Call
          </a>
          <a href={`https://wa.me/${COMPANY.phone.whatsapp}?text=Hello, I am interested in your staffing services.`}
            target="_blank" rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2.5
              py-[10px] rounded-xl
              bg-gradient-to-r from-[#f0be6a] to-[#c8902e]
              border border-[#e6a84f]/40
              text-[#0a1a24] font-poppins font-bold text-[11.5px] tracking-[0.04em]
              shadow-[0_2px_16px_rgba(230,168,79,0.22)]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.38 5.06L2 22l5.07-1.33A9.96 9.96 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2z" fill="rgba(10,26,36,0.18)"/>
              <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.4-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.06 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35z" fill="#0a1a24"/>
            </svg>
            Speak With Our Team
          </a>
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "LocalBusiness",
        "name": COMPANY.name, "foundingDate": String(COMPANY.established),
        "founder": { "@type": "Person", "name": "S. Rajasekaran" },
        "telephone": COMPANY.phone.office,
        "email": COMPANY.email,
        "areaServed": ["Cuddalore", "Puducherry", "Tamil Nadu"],
        "serviceType": SERVICES.map(s => s.title),
        "numberOfEmployees": { "@type": "QuantitativeValue", "minValue": 500 }
      })}} />
    </div>
  );
}
