'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { COMPANY } from '@/lib/constants';

const ease = [0.25, 0.4, 0.25, 1] as [number, number, number, number];

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1600;
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return <span ref={ref}>{n}{suffix}</span>;
}

const MILESTONES = [
  { year: '1991', title: 'The Beginning', text: 'Founded in Cuddalore with a single conviction — dependable, disciplined manpower businesses can trust.' },
  { year: '2000s', title: 'Regional Growth', text: 'Expanded across Tamil Nadu — security, labour outsourcing and HR compliance brought under one accountable roof.' },
  { year: '2010s', title: 'Puducherry & Process', text: 'Opened our Puducherry branch and formalised structured training and end-to-end statutory compliance.' },
  { year: 'Today', title: '35 Years Strong', text: '500+ workforce deployed across 100+ businesses — one of South India’s most trusted staffing institutions.' },
];

const METRICS = [
  { to: 35, suffix: '+', label: 'Years in Business' },
  { to: 500, suffix: '+', label: 'Workforce Deployed' },
  { to: 100, suffix: '+', label: 'Partner Businesses' },
  { to: 2, suffix: '', label: 'Office Locations' },
  { to: 5, suffix: '', label: 'Industries Served' },
];

const VALUES = [
  {
    title: 'Discipline First',
    text: 'Punctuality, grooming and professional conduct — drilled before every deployment, audited after.',
    Icon: () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 4 5v6c0 5 3.4 8.5 8 10 4.6-1.5 8-5 8-10V5l-8-3Z" /><path d="m9 12 2 2 4-4" /></svg>),
  },
  {
    title: 'Verified People',
    text: 'Background checks, medical fitness and skills evaluation before anyone reaches your site.',
    Icon: () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4" /><path d="M5.5 21a7 7 0 0 1 13 0" /></svg>),
  },
  {
    title: 'Zero-Risk Compliance',
    text: 'PF, ESI, Bonus Act and Contract Labour Act handled in-house — never your burden.',
    Icon: () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v18M7 21h10M5 7h14" /><path d="m5 7-2.5 5a3 3 0 0 0 5 0L5 7Z" /><path d="m19 7-2.5 5a3 3 0 0 0 5 0L19 7Z" /></svg>),
  },
  {
    title: 'Workforce Continuity',
    text: 'Monitoring, monthly reviews and replacement guarantees so your operations never miss a beat.',
    Icon: () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-3-6.7" /><path d="M21 4v4h-4" /></svg>),
  },
];

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
      <path d="M2 7h9.5M7.5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function AboutContent() {
  return (
    <main className="bg-[#04090f]">
      {/* ── HERO ── */}
      <section className="relative min-h-[64vh] flex items-center overflow-hidden">
        <img src="/images/dsc/formation-aerial.jpg" alt="" aria-hidden
          className="absolute inset-0 w-full h-full object-cover object-center scale-110 brightness-[0.4]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#04090f] via-[#050d1a]/82 to-[#050d1a]/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#04090f] via-transparent to-[#04090f]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_18%_50%,rgba(230,168,79,0.10),transparent)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-20 w-full">
          <Reveal>
            <div className="inline-flex items-center gap-2.5 bg-[#e6a84f]/[0.08] border border-[#e6a84f]/25 rounded-full pl-2.5 pr-4 py-1.5 mb-7 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#e6a84f]" />
              <span className="font-inter text-[#f0be6a] text-[11px] font-semibold tracking-[0.22em] uppercase">Our Story</span>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="font-poppins font-extrabold text-white text-4xl sm:text-5xl lg:text-6xl leading-[1.04] max-w-3xl">
              35 years of trust,
              <span className="block font-fraunces italic font-medium text-3xl sm:text-4xl lg:text-5xl mt-2 bg-gradient-to-r from-[#f0be6a] via-[#e6a84f] to-[#c8902e] bg-clip-text text-transparent pb-1">
                built one deployment at a time.
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="font-inter text-white/65 text-base lg:text-lg max-w-xl mt-6 leading-relaxed">
              Since {COMPANY.established}, Sai Saktheeswari has grown from a single conviction into one of South India&apos;s most dependable staffing institutions.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── METRICS BAND ── */}
      <section className="relative bg-[#050d1a] border-y border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-y-10 gap-x-6">
            {METRICS.map((m, i) => (
              <Reveal key={m.label} delay={i * 0.06} className="text-center">
                <p className="font-poppins font-extrabold text-[#e6a84f] text-4xl lg:text-5xl mb-2 drop-shadow-[0_2px_14px_rgba(230,168,79,0.25)]">
                  <Counter to={m.to} suffix={m.suffix} />
                </p>
                <p className="font-inter text-white/55 text-[11px] lg:text-xs uppercase tracking-[0.16em]">{m.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR COMMITMENT ── */}
      <section className="bg-[#04090f] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
            <Reveal className="w-full lg:w-[42%]">
              <div className="relative rounded-3xl overflow-hidden ring-1 ring-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
                <img src="/images/dsc/guard-lineup-1.jpg" alt="Sai Saktheeswari trained security workforce in disciplined formation"
                  className="w-full aspect-[4/5] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#04090f]/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="font-poppins font-bold text-white text-xl">Trained Before Deployment</p>
                  <p className="font-inter text-[#e6a84f] text-xs tracking-[0.18em] uppercase mt-1">The Standard · Since 1991</p>
                </div>
              </div>
            </Reveal>
            <div className="w-full lg:w-[58%]">
              <Reveal>
                <p className="font-inter text-[#e6a84f] text-[11px] font-bold tracking-[0.3em] uppercase mb-4">Our Commitment</p>
                <h2 className="font-poppins font-extrabold text-white text-3xl lg:text-5xl leading-tight mb-6">
                  A vision that became a legacy.
                </h2>
                <p className="font-inter text-white/60 text-base lg:text-lg leading-relaxed mb-5">
                  Since 1991, Sai Saktheeswari has been built on one belief — that businesses deserve a workforce they can trust without watching over it. Three decades on, that belief still runs every deployment.
                </p>
                <blockquote className="border-l-2 border-[#e6a84f]/50 pl-5 my-7">
                  <p className="font-fraunces italic text-white/80 text-lg lg:text-xl leading-relaxed">
                    &ldquo;We don&apos;t just supply people. We stand behind every one of them.&rdquo;
                  </p>
                </blockquote>
                <p className="font-inter text-white/55 text-base leading-relaxed">
                  Training is overseen by our senior supervisors — discipline, safety, communication and conduct, instilled before any guard or worker reaches your site.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── MILESTONES ── */}
      <section className="bg-[#050d1a] py-20 lg:py-28 border-t border-white/[0.05]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-14">
            <p className="font-inter text-[#e6a84f] text-[11px] font-bold tracking-[0.3em] uppercase mb-3">The Journey</p>
            <h2 className="font-poppins font-extrabold text-white text-3xl lg:text-5xl">Three decades, four chapters.</h2>
          </Reveal>
          <div className="relative">
            <div className="absolute left-[19px] sm:left-1/2 top-2 bottom-2 w-px bg-gradient-to-b from-[#e6a84f]/40 via-[#e6a84f]/15 to-transparent sm:-translate-x-px" />
            <div className="space-y-10">
              {MILESTONES.map((m, i) => (
                <Reveal key={m.year} delay={i * 0.05}>
                  <div className={`relative flex items-start gap-6 sm:gap-0 ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>
                    <div className="hidden sm:block sm:w-1/2" />
                    <div className="absolute left-[12px] sm:left-1/2 top-1.5 w-3.5 h-3.5 rounded-full bg-[#e6a84f] ring-4 ring-[#050d1a] sm:-translate-x-1/2 shadow-[0_0_16px_rgba(230,168,79,0.6)]" />
                    <div className={`pl-12 sm:pl-0 sm:w-1/2 ${i % 2 === 0 ? 'sm:pl-12' : 'sm:pr-12 sm:text-right'}`}>
                      <p className="font-fraunces italic text-[#e6a84f] text-2xl lg:text-3xl mb-1">{m.year}</p>
                      <p className="font-poppins font-bold text-white text-lg mb-2">{m.title}</p>
                      <p className="font-inter text-white/55 text-sm leading-relaxed">{m.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="bg-[#04090f] py-20 lg:py-28 border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-12 max-w-2xl">
            <p className="font-inter text-[#e6a84f] text-[11px] font-bold tracking-[0.3em] uppercase mb-3">What We Stand For</p>
            <h2 className="font-poppins font-extrabold text-white text-3xl lg:text-5xl leading-tight">The standards behind every placement.</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.07}>
                <div className="h-full bg-white/[0.03] border border-white/[0.07] hover:border-[#e6a84f]/30 rounded-2xl p-6 transition-colors duration-300 group">
                  <div className="w-12 h-12 rounded-2xl bg-[#e6a84f]/[0.1] border border-[#e6a84f]/20 flex items-center justify-center text-[#e6a84f] mb-5 group-hover:scale-105 transition-transform duration-300">
                    <v.Icon />
                  </div>
                  <h3 className="font-poppins font-bold text-white text-lg mb-2.5">{v.title}</h3>
                  <p className="font-inter text-white/50 text-sm leading-relaxed">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden bg-[#050d1a] py-24 border-t border-white/[0.05]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_50%_50%,rgba(230,168,79,0.08),transparent)]" />
        <Reveal className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-poppins font-extrabold text-white text-3xl lg:text-5xl leading-tight mb-5">
            35 years of trust.
            <span className="block font-fraunces italic font-medium text-[#e6a84f] text-2xl lg:text-4xl mt-2">Let&apos;s build yours next.</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-3.5 justify-center mt-8">
            <a href="/contact"
              className="group relative overflow-hidden inline-flex items-center justify-center gap-2.5 bg-gradient-to-br from-[#f0be6a] via-[#e6a84f] to-[#c8902e] text-[#0a1a24] font-poppins font-bold text-sm px-8 py-4 rounded-xl shadow-[0_8px_30px_rgba(230,168,79,0.35)] hover:shadow-[0_12px_44px_rgba(230,168,79,0.55)] hover:-translate-y-0.5 transition-all duration-300">
              <span className="relative z-10">Request Workforce</span>
              <span className="relative z-10"><ArrowIcon /></span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </a>
            <a href="/services"
              className="inline-flex items-center justify-center gap-2.5 bg-white/[0.06] hover:bg-white/[0.12] backdrop-blur-md border border-white/20 hover:border-[#e6a84f]/50 text-white font-poppins font-semibold text-sm px-8 py-4 rounded-xl transition-all duration-300">
              Explore Our Services
            </a>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
