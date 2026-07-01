'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { COMPANY, SERVICES } from '@/lib/constants';

const ease = [0.25, 0.4, 0.25, 1] as [number, number, number, number];

/* ── Per-service enrichment (SVG icon + real photography + factual points) ── */
const DETAIL: Record<
  string,
  { num: string; img: string; imgAlt: string; caption: string; points: string[]; Icon: () => React.ReactElement }
> = {
  security: {
    num: '01',
    img: '/images/services/security-personnel.webp',
    imgAlt: 'Sai Saktheeswari uniformed security guards in branded formation on corporate premises',
    caption: 'On-site formation · Cuddalore campus',
    points: [
      'Corporate campuses, factories, hospitals & events',
      'Trained, uniformed & disciplined personnel',
      'Male & female security officers',
      'Day & night shift coverage with supervision',
    ],
    Icon: () => (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2 4 5v6c0 5 3.4 8.5 8 10 4.6-1.5 8-5 8-10V5l-8-3Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  labour: {
    num: '02',
    img: '/images/services/labour-outsourcing.webp',
    imgAlt: 'Sai Saktheeswari verified labour workforce deployed at a client facility',
    caption: 'Workforce deployment · client facility',
    points: [
      'Manufacturing, construction & logistics',
      'Background-verified manpower',
      '48–72 hour deployment',
      'Seasonal scale-up fully supported',
    ],
    Icon: () => (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 20a6 6 0 0 1 12 0" />
        <circle cx="8" cy="8" r="3.2" />
        <path d="M15 20a6 6 0 0 1 7-5.8" />
        <circle cx="17.5" cy="9" r="2.6" />
      </svg>
    ),
  },
  contract: {
    num: '03',
    img: '/images/services/contract-workforce.webp',
    imgAlt: 'Sai Saktheeswari managed contract workforce in disciplined large-scale formation',
    caption: 'Managed workforce, full scale',
    points: [
      'SLA-backed long-term contracts',
      'Attendance & payroll fully managed',
      'Monthly performance monitoring',
      'A single point of accountability',
    ],
    Icon: () => (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
        <path d="M14 3v5h5" />
        <path d="M9 13h6M9 17h6" />
      </svg>
    ),
  },
  compliance: {
    num: '04',
    img: '/images/services/statutory-compliance.webp',
    imgAlt: 'Sai Saktheeswari administrative staff managing statutory compliance documentation at the head office',
    caption: 'Administration desk · head office',
    points: [
      'Provident Fund (PF) & ESI handled',
      'Bonus Act & Contract Labour Act',
      'Dedicated in-house compliance team',
      'Zero compliance risk to your business',
    ],
    Icon: () => (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v18M7 21h10" />
        <path d="M5 7h14" />
        <path d="m5 7-2.5 5a3 3 0 0 0 5 0L5 7Z" />
        <path d="m19 7-2.5 5a3 3 0 0 0 5 0L19 7Z" />
      </svg>
    ),
  },
};

/* ── GSAP scroll parallax image (matches Training section pattern) ── */
function ParallaxImage({ src, alt, className = '', intensity = 10 }: { src: string; alt: string; className?: string; intensity?: number }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!wrapRef.current || !imgRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgRef.current,
        { yPercent: -intensity },
        {
          yPercent: intensity,
          ease: 'none',
          scrollTrigger: { trigger: wrapRef.current, start: 'top bottom', end: 'bottom top', scrub: 0.6, invalidateOnRefresh: true },
        }
      );
    }, wrapRef);
    return () => ctx.revert();
  }, [intensity]);

  return (
    <div ref={wrapRef} className={`relative overflow-hidden ${className}`}>
      <img ref={imgRef} src={src} alt={alt} loading="lazy" className="absolute inset-0 left-0 w-full h-[128%] -top-[14%] object-cover" />
    </div>
  );
}

/* ── GSAP scroll-triggered numeral reveal — premium editorial weight ── */
function BigNumeral({ num }: { num: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 36, scale: 0.88 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 1.1, ease: 'power4.out',
          scrollTrigger: { trigger: ref.current, start: 'top 85%', toggleActions: 'play reverse play reverse', invalidateOnRefresh: true },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <span ref={ref} className="relative inline-block font-fraunces italic font-semibold bg-gradient-to-br from-[#f0be6a] via-[#e6a84f] to-[#c8902e] bg-clip-text text-transparent text-[5.5rem] lg:text-[7.5rem] leading-none tracking-tight">
      {num}
    </span>
  );
}

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '-80px' }}
      transition={{ duration: 0.6, ease, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
      <path d="M2 7h9.5M7.5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ServicesContent() {
  const waHref = `https://wa.me/${COMPANY.phone.whatsapp}?text=Hello, I would like to discuss a staffing requirement.`;

  return (
    <main className="bg-[#04090f]">
      {/* ── HERO ── */}
      <section className="relative min-h-[68vh] flex items-center overflow-hidden">
        <img
          src="/images/dsc/campus-deployment-2.jpg"
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover object-center scale-105 brightness-[0.42]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#04090f] via-[#050d1a]/82 to-[#050d1a]/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#04090f] via-transparent to-[#04090f]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_18%_50%,rgba(230,168,79,0.10),transparent)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-20 w-full">
          <Reveal>
            <div className="inline-flex items-center gap-2.5 bg-[#e6a84f]/[0.08] border border-[#e6a84f]/25 rounded-full pl-2.5 pr-4 py-1.5 mb-7 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#e6a84f]" />
              <span className="font-inter text-[#f0be6a] text-[11px] font-semibold tracking-[0.22em] uppercase">What We Do</span>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="font-poppins font-extrabold text-white text-4xl sm:text-5xl lg:text-6xl leading-[1.04] max-w-3xl">
              Workforce solutions
              <span className="block font-fraunces italic font-medium text-3xl sm:text-4xl lg:text-5xl mt-2 bg-gradient-to-r from-[#f0be6a] via-[#e6a84f] to-[#c8902e] bg-clip-text text-transparent pb-1">
                built on three decades of trust.
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="font-inter text-white/65 text-base lg:text-lg max-w-xl mt-6 leading-relaxed">
              Four core services, one promise — verified, trained, and accountable workforce delivered across Cuddalore, Puducherry &amp; Tamil Nadu since {COMPANY.established}.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="flex flex-col sm:flex-row gap-3.5 mt-9">
              <a href="/contact"
                className="group relative overflow-hidden inline-flex items-center justify-center gap-2.5 bg-gradient-to-br from-[#f0be6a] via-[#e6a84f] to-[#c8902e] text-[#0a1a24] font-poppins font-bold text-sm px-7 py-3.5 rounded-xl shadow-[0_8px_30px_rgba(230,168,79,0.35)] hover:shadow-[0_12px_44px_rgba(230,168,79,0.55)] hover:-translate-y-0.5 transition-all duration-300">
                <span className="relative z-10">Request Workforce</span>
                <span className="relative z-10"><ArrowIcon /></span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </a>
              <a href={waHref} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-white/[0.06] hover:bg-white/[0.12] backdrop-blur-md border border-white/20 hover:border-[#e6a84f]/50 text-white font-poppins font-semibold text-sm px-7 py-3.5 rounded-xl transition-all duration-300">
                Talk to Our Team
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SERVICE DETAIL ROWS — premium editorial composition ── */}
      <div className="bg-[#050d1a]">
        {SERVICES.map((s, i) => {
          const d = DETAIL[s.id];
          const flip = i % 2 === 1;
          return (
            <section key={s.id} id={s.id} className="relative scroll-mt-24 border-t border-white/[0.05] overflow-hidden">
              {/* low-opacity background watermark numeral for depth */}
              <span
                aria-hidden
                className={`absolute top-1/2 -translate-y-1/2 font-fraunces italic text-white/[0.025] text-[16rem] lg:text-[26rem] leading-none select-none pointer-events-none ${flip ? '-left-8 lg:-left-16' : '-right-8 lg:-right-16'}`}
              >
                {d.num}
              </span>

              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
                <div className={`flex flex-col ${flip ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-14 lg:gap-20 items-center`}>

                  {/* Image — parallax + glass overlay + hover zoom/glow */}
                  <Reveal className="w-full lg:w-[48%]">
                    <div className="group relative rounded-[2rem] overflow-hidden ring-1 ring-white/10 hover:ring-[#e6a84f]/40 shadow-[0_30px_80px_rgba(0,0,0,0.55)] transition-all duration-500">
                      <ParallaxImage src={d.img} alt={d.imgAlt} className="aspect-[4/3]" intensity={9} />
                      <div className="absolute inset-0 [transition:background-color_0.5s] group-hover:bg-black/0 bg-black/[0.02] pointer-events-none" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050d1a]/65 via-transparent to-transparent" />
                      {/* hover glow sweep */}
                      <span className="absolute inset-0 bg-gradient-to-tr from-[#e6a84f]/0 via-[#e6a84f]/0 to-[#e6a84f]/0 group-hover:from-[#e6a84f]/[0.06] group-hover:via-transparent group-hover:to-transparent transition-all duration-700 pointer-events-none" />
                      {/* icon chip */}
                      <div className="absolute top-5 left-5 w-12 h-12 rounded-2xl bg-[#04090f]/70 backdrop-blur-md border border-[#e6a84f]/25 flex items-center justify-center text-[#e6a84f] shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
                        <d.Icon />
                      </div>
                      {/* glass caption chip */}
                      <span className="absolute bottom-5 left-5 backdrop-blur-md bg-black/45 border border-white/15 rounded-full px-3.5 py-1.5 font-inter text-[10px] font-semibold tracking-[0.1em] uppercase text-white/85">
                        {d.caption}
                      </span>
                      {/* scale-on-hover sheen border */}
                      <div className="absolute inset-3 rounded-[1.5rem] border border-white/0 group-hover:border-[#e6a84f]/20 transition-colors duration-500 pointer-events-none" />
                    </div>
                  </Reveal>

                  {/* Content — premium serif title, sans description */}
                  <div className="w-full lg:w-[52%]">
                    <div className="flex items-end gap-5 mb-2">
                      <BigNumeral num={d.num} />
                      <div className="h-px flex-1 bg-gradient-to-r from-[#e6a84f]/25 to-transparent mb-7" />
                    </div>
                    <Reveal>
                      <p className="font-inter text-[#e6a84f] text-[11px] font-bold tracking-[0.32em] uppercase mb-4">{`Service ${d.num}`}</p>
                      <h2 className="font-fraunces italic font-semibold text-white text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.08] tracking-tight mb-6">
                        {s.title}
                      </h2>
                      <p className="font-inter text-white/55 text-base lg:text-[17px] leading-relaxed mb-8 max-w-lg">{s.desc}</p>
                    </Reveal>
                    <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3.5 mb-9 max-w-lg">
                      {d.points.map((pt, pi) => (
                        <Reveal key={pi} delay={0.07 * pi}>
                          <div className="group/pt flex items-start gap-2.5">
                            <span className="mt-1 flex-shrink-0 w-4 h-4 rounded-full bg-[#e6a84f]/10 border border-[#e6a84f]/30 flex items-center justify-center text-[#e6a84f] group-hover/pt:bg-[#e6a84f]/20 transition-colors duration-300">
                              <svg width="9" height="9" viewBox="0 0 14 14" fill="none"><path d="M2 7.5l3 3 7-8" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </span>
                            <span className="font-inter text-white/65 text-sm leading-snug">{pt}</span>
                          </div>
                        </Reveal>
                      ))}
                    </div>
                    <Reveal>
                      <a href="/contact" className="group inline-flex items-center gap-2 font-poppins font-semibold text-sm text-[#e6a84f] hover:text-[#f0be6a] transition-colors">
                        Request {s.title}
                        <ArrowIcon />
                      </a>
                    </Reveal>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* ── CTA BAND ── */}
      <section className="relative overflow-hidden bg-[#04090f] py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_50%_50%,rgba(230,168,79,0.08),transparent)]" />
        <Reveal className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-poppins font-extrabold text-white text-3xl lg:text-5xl leading-tight mb-5">
            Tell us what you need.
            <span className="block font-fraunces italic font-medium text-[#e6a84f] text-2xl lg:text-4xl mt-2">We&apos;ll deploy the right people.</span>
          </h2>
          <p className="font-inter text-white/55 text-base max-w-xl mx-auto mb-9">
            Standard deployment in 48–72 hours. Same-day response on WhatsApp for urgent requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-3.5 justify-center">
            <a href="/contact"
              className="group relative overflow-hidden inline-flex items-center justify-center gap-2.5 bg-gradient-to-br from-[#f0be6a] via-[#e6a84f] to-[#c8902e] text-[#0a1a24] font-poppins font-bold text-sm px-8 py-4 rounded-xl shadow-[0_8px_30px_rgba(230,168,79,0.35)] hover:shadow-[0_12px_44px_rgba(230,168,79,0.55)] hover:-translate-y-0.5 transition-all duration-300">
              <span className="relative z-10">Request Workforce</span>
              <span className="relative z-10"><ArrowIcon /></span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </a>
            <a href={`tel:${COMPANY.phone.primary.replace(/\s/g, '')}`}
              className="inline-flex items-center justify-center gap-2.5 bg-white/[0.06] hover:bg-white/[0.12] backdrop-blur-md border border-white/20 hover:border-[#e6a84f]/50 text-white font-poppins font-semibold text-sm px-8 py-4 rounded-xl transition-all duration-300">
              Call {COMPANY.phone.primary}
            </a>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
