'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useScroll } from 'framer-motion';
import { COMPANY } from '@/lib/constants';

const ease = [0.25, 0.4, 0.25, 1] as [number, number, number, number];

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

function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-40px' });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) { setN(0); return; }
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
  {
    year: '1991',
    title: 'The Foundation',
    text: 'Sai Saktheeswari Security & Staffing Services was founded in Cuddalore with one conviction — that South Indian businesses deserved dependable, disciplined manpower they could genuinely trust. Starting with a focused team of trained security personnel, the foundation of every standard we hold today was laid in this year.',
  },
  {
    year: '2000s',
    title: 'Regional Expansion',
    text: 'Through the 2000s, we expanded across Tamil Nadu — extending beyond security into labour outsourcing and HR statutory compliance. All services were brought under one accountable roof, giving clients a single point of contact for their entire workforce requirement.',
  },
  {
    year: '2010s',
    title: 'Puducherry & Process',
    text: 'We opened our Puducherry branch office and formalised structured training protocols and end-to-end statutory compliance management. A dedicated in-house compliance team was established, handling PF, ESI, Bonus Act and Contract Labour Act obligations — ensuring zero compliance risk for our clients.',
  },
  {
    year: 'Today',
    title: '35 Years Strong',
    text: 'Over 500 workforce deployed across 100+ partner businesses in Cuddalore, Puducherry and Tamil Nadu. Sai Saktheeswari is now one of South India\'s most trusted staffing institutions — a legacy built on discipline, accountability, and unwavering standards.',
  },
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
    text: 'Punctuality, grooming and professional conduct — drilled before every deployment, audited after. Every guard and worker meets our conduct standard before they reach your site.',
    Icon: () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 4 5v6c0 5 3.4 8.5 8 10 4.6-1.5 8-5 8-10V5l-8-3Z" /><path d="m9 12 2 2 4-4" /></svg>),
  },
  {
    title: 'Verified People',
    text: 'Background checks, medical fitness and skills evaluation before anyone reaches your site. Our verification process ensures only qualified, trustworthy personnel are deployed.',
    Icon: () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4" /><path d="M5.5 21a7 7 0 0 1 13 0" /></svg>),
  },
  {
    title: 'Zero-Risk Compliance',
    text: 'PF, ESI, Bonus Act and Contract Labour Act handled entirely in-house — never your burden. Our dedicated compliance team ensures every statutory obligation is met on time, every time.',
    Icon: () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v18M7 21h10M5 7h14" /><path d="m5 7-2.5 5a3 3 0 0 0 5 0L5 7Z" /><path d="m19 7-2.5 5a3 3 0 0 0 5 0L19 7Z" /></svg>),
  },
  {
    title: 'Workforce Continuity',
    text: 'Monthly monitoring, performance reviews and replacement guarantees so your operations never miss a beat. We stand behind every deployment — not just at the start, but throughout.',
    Icon: () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-3-6.7" /><path d="M21 4v4h-4" /></svg>),
  },
];

const REGISTRATIONS = [
  { label: 'Provident Fund (PF)', sub: 'EPFO registered — all staff covered' },
  { label: 'Employee State Insurance (ESI)', sub: 'Full ESI compliance for every deployment' },
  { label: 'Contract Labour Act', sub: 'Licensed contractor under CLA 1970' },
  { label: 'Bonus Act Compliance', sub: 'Statutory bonus handled in-house' },
  { label: 'Licensed & Registered', sub: 'Government-licensed staffing agency' },
  { label: 'Shops & Establishment Act', sub: 'Both Cuddalore & Puducherry offices registered' },
];

/* ── Journey timeline — alternating zig-zag on desktop, premium editorial cards on mobile ── */
function MilestoneTimeline() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start 78%', 'end 65%'] });

  return (
    <div ref={trackRef} className="relative">
      <div className="absolute left-[19px] sm:left-1/2 top-2 bottom-2 w-px bg-white/[0.06] sm:-translate-x-px" />
      <motion.div
        style={{ scaleY: scrollYProgress, transformOrigin: 'top' }}
        className="absolute left-[19px] sm:left-1/2 top-2 bottom-2 w-px bg-gradient-to-b from-[#e6a84f] via-[#e6a84f]/50 to-[#e6a84f]/10 sm:-translate-x-px"
      />
      <div className="space-y-6 sm:space-y-10">
        {MILESTONES.map((m, i) => (
          <Reveal key={m.year} delay={i * 0.05}>
            <div className={`relative flex items-start gap-6 sm:gap-0 ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>
              <div className="hidden sm:block sm:w-1/2" />
              <div className="absolute left-[12px] sm:left-1/2 top-6 sm:top-1.5 w-3.5 h-3.5 rounded-full bg-[#e6a84f] ring-4 ring-[#04090f] sm:-translate-x-1/2 shadow-[0_0_16px_rgba(230,168,79,0.6)] z-10" />
              <div className={`pl-12 sm:pl-0 sm:w-1/2 ${i % 2 === 0 ? 'sm:pl-12' : 'sm:pr-12 sm:text-right'}`}>
                <div
                  className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-md p-6
                    active:scale-[0.98] transition-transform duration-200
                    sm:rounded-none sm:border-0 sm:bg-transparent sm:backdrop-blur-none sm:p-0 sm:active:scale-100"
                >
                  <span
                    aria-hidden
                    className="sm:hidden pointer-events-none select-none absolute -top-4 -right-2 font-poppins font-extrabold text-white/[0.05] text-[86px] leading-none"
                  >
                    0{i + 1}
                  </span>
                  <p className="relative font-fraunces italic text-[#e6a84f] text-2xl lg:text-3xl mb-1">{m.year}</p>
                  <p className="relative font-poppins font-bold text-white text-lg mb-2">{m.title}</p>
                  <p className="relative font-inter text-white/55 text-sm leading-relaxed">{m.text}</p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

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
              Since {COMPANY.established}, Sai Saktheeswari has grown from a single conviction into one of South India&apos;s most dependable staffing institutions — serving security, labour, compliance and contract workforce needs across Tamil Nadu &amp; Puducherry.
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <div className="flex flex-wrap gap-4 mt-8">
              {['Licensed & Registered', 'PF & ESI Compliant', '500+ Deployed', '35 Years Operating'].map((tag) => (
                <span key={tag} className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/10 rounded-full px-4 py-1.5 font-inter text-white/70 text-xs tracking-wide">
                  <span className="w-1 h-1 rounded-full bg-[#e6a84f]" />{tag}
                </span>
              ))}
            </div>
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

      {/* ── OUR LEGACY ── */}
      <section className="bg-[#04090f] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">

            {/* Legacy image */}
            <Reveal className="w-full lg:w-[40%]">
              <div className="relative rounded-3xl overflow-hidden ring-1 ring-[#e6a84f]/20 shadow-[0_30px_80px_rgba(0,0,0,0.55),0_0_0_1px_rgba(230,168,79,0.08)]">
                <img
                  src="/images/dsc/team-group-1.jpg"
                  alt="Sai Saktheeswari Security & Staffing Services — deployed workforce team"
                  className="w-full aspect-[4/5] object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#04090f]/90 via-[#04090f]/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-[#e6a84f]/15">
                  <p className="font-poppins font-bold text-white text-lg">Sai Saktheeswari Security &amp; Staffing Services</p>
                  <p className="font-inter text-[#e6a84f] text-xs tracking-[0.2em] uppercase mt-0.5">Est. 1991 · Cuddalore</p>
                </div>
              </div>
            </Reveal>

            {/* Legacy story */}
            <div className="w-full lg:w-[60%]">
              <Reveal>
                <p className="font-inter text-[#e6a84f] text-[11px] font-bold tracking-[0.3em] uppercase mb-4">Our Legacy</p>
                <h2 className="font-poppins font-extrabold text-white text-3xl lg:text-4xl leading-tight mb-6">
                  One conviction.<br />
                  <span className="font-fraunces italic font-medium text-[#e6a84f]">Three decades of delivery.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.07}>
                <p className="font-inter text-white/60 text-base leading-relaxed mb-5">
                  Founded in Cuddalore in 1991, Sai Saktheeswari Security & Staffing Services was built on a simple but powerful belief: businesses across South India deserved workforce partners who were truly accountable — not just suppliers, but guarantors of quality.
                </p>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="font-inter text-white/55 text-base leading-relaxed mb-7">
                  Starting with trained security personnel and a company-wide commitment to every client, we built our standards on direct accountability. Every deployment was — and still is — a reflection of the Sai Saktheeswari standard established from day one.
                </p>
              </Reveal>
              <Reveal delay={0.17}>
                <blockquote className="border-l-2 border-[#e6a84f]/50 pl-5 mb-8">
                  <p className="font-fraunces italic text-white/80 text-lg lg:text-xl leading-relaxed">
                    &ldquo;We don&apos;t just supply people. We stand behind every one of them.&rdquo;
                  </p>
                  <p className="font-inter text-[#e6a84f]/70 text-xs tracking-[0.15em] uppercase mt-3">— Sai Saktheeswari Security &amp; Staffing Services</p>
                </blockquote>
              </Reveal>

              {/* Office locations */}
              <Reveal delay={0.22}>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { city: 'Cuddalore', role: 'Head Office', addr: '#16A Nellikuppam Main Road, S.N Chavadi, Cuddalore – 607006' },
                    { city: 'Puducherry', role: 'Branch Office', addr: '#18, First Floor, 100 Feet Road, Ellaipillaichavadi, Puducherry – 5' },
                  ].map((loc) => (
                    <div key={loc.city} className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e6a84f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 10c0 6-8 13-8 13s-8-7-8-13a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
                        </svg>
                        <span className="font-poppins font-bold text-white text-sm">{loc.city}</span>
                        <span className="font-inter text-[#e6a84f] text-[10px] tracking-[0.15em] uppercase bg-[#e6a84f]/10 px-2 py-0.5 rounded-full">{loc.role}</span>
                      </div>
                      <p className="font-inter text-white/45 text-xs leading-relaxed">{loc.addr}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── BRAND IDENTITY ── */}
      <section className="bg-[#050d1a] py-20 lg:py-28 border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row-reverse gap-12 lg:gap-20 items-center">

            {/* Brand image */}
            <Reveal className="w-full lg:w-[42%]">
              <div className="relative rounded-3xl overflow-hidden ring-1 ring-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
                <img
                  src="/images/dsc/ceremonial-portrait.jpg"
                  alt="Sai Saktheeswari ceremonial guard of honour — the standard of deployment"
                  className="w-full aspect-[4/5] object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050d1a]/85 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="font-poppins font-bold text-white text-lg">The Standard of Deployment</p>
                  <p className="font-inter text-[#e6a84f] text-xs tracking-[0.18em] uppercase mt-1">Ceremonial Guard of Honour · Since 1991</p>
                </div>
              </div>
            </Reveal>

            {/* Brand detail */}
            <div className="w-full lg:w-[58%]">
              <Reveal>
                <p className="font-inter text-[#e6a84f] text-[11px] font-bold tracking-[0.3em] uppercase mb-4">What We Represent</p>
                <h2 className="font-poppins font-extrabold text-white text-3xl lg:text-5xl leading-tight mb-6">
                  A brand built on<br />
                  <span className="font-fraunces italic font-medium text-[#e6a84f]">discipline &amp; dependability.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.07}>
                <p className="font-inter text-white/60 text-base leading-relaxed mb-5">
                  The Sai Saktheeswari brand is defined by one thing: the standard of every person we deploy. From the ceremonial guard at your gate to the contractual workforce on your floor — every individual carries our name, our badge, and our commitment.
                </p>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="font-inter text-white/55 text-base leading-relaxed mb-8">
                  Our brand identity is simple: verified people, trained before deployment, managed throughout — delivered with full statutory compliance and accountability at every level of the company. That&apos;s the Sai Saktheeswari promise.
                </p>
              </Reveal>

              {/* Differentiators */}
              <div className="space-y-3.5">
                {[
                  { title: 'Direct accountability', desc: 'Standards are overseen in-house at every site — no franchise, no middlemen, no excuses.' },
                  { title: '48–72 hour deployment', desc: 'Standard deployment turnaround. Same-day WhatsApp response for urgent needs.' },
                  { title: 'In-house compliance team', desc: 'PF, ESI, Bonus Act and Contract Labour Act managed entirely by us — never outsourced.' },
                  { title: 'Trained, not just recruited', desc: 'Structured training in discipline, safety, communication and conduct before every placement.' },
                ].map((item, i) => (
                  <Reveal key={item.title} delay={i * 0.06}>
                    <div className="flex items-start gap-4 bg-white/[0.025] border border-white/[0.06] rounded-xl p-4 hover:border-[#e6a84f]/25 transition-colors duration-300">
                      <span className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full bg-[#e6a84f]/15 flex items-center justify-center">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6.5l2.5 2.5 5.5-6" stroke="#e6a84f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </span>
                      <div>
                        <p className="font-poppins font-semibold text-white text-sm">{item.title}</p>
                        <p className="font-inter text-white/50 text-xs leading-relaxed mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MILESTONES ── */}
      <section className="bg-[#04090f] py-20 lg:py-28 border-t border-white/[0.05]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-14">
            <p className="font-inter text-[#e6a84f] text-[11px] font-bold tracking-[0.3em] uppercase mb-3">The Journey</p>
            <h2 className="font-poppins font-extrabold text-white text-3xl lg:text-5xl">Three decades, four chapters.</h2>
          </Reveal>
          <MilestoneTimeline />
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="bg-[#050d1a] py-20 lg:py-28 border-t border-white/[0.05]">
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

      {/* ── REGISTRATIONS & COMPLIANCE ── */}
      <section className="bg-[#04090f] py-20 lg:py-24 border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-12">
            <p className="font-inter text-[#e6a84f] text-[11px] font-bold tracking-[0.3em] uppercase mb-3">Registrations & Licences</p>
            <h2 className="font-poppins font-extrabold text-white text-3xl lg:text-4xl">Fully licensed. Fully compliant.</h2>
            <p className="font-inter text-white/50 text-base mt-4 max-w-xl mx-auto">Every regulatory obligation is handled in-house — your business carries zero compliance risk.</p>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {REGISTRATIONS.map((r, i) => (
              <Reveal key={r.label} delay={i * 0.05}>
                <div className="flex items-start gap-4 bg-white/[0.025] border border-white/[0.07] hover:border-[#e6a84f]/25 rounded-2xl p-5 transition-colors duration-300">
                  <span className="flex-shrink-0 w-8 h-8 rounded-xl bg-[#e6a84f]/10 border border-[#e6a84f]/20 flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e6a84f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2 4 5v6c0 5 3.4 8.5 8 10 4.6-1.5 8-5 8-10V5l-8-3Z" /><path d="m9 12 2 2 4-4" />
                    </svg>
                  </span>
                  <div>
                    <p className="font-poppins font-semibold text-white text-sm">{r.label}</p>
                    <p className="font-inter text-white/45 text-xs mt-0.5">{r.sub}</p>
                  </div>
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
          <p className="font-inter text-white/50 text-base max-w-xl mx-auto mb-8">
            Reach us by phone, WhatsApp or our contact form — same-day response guaranteed.
          </p>
          <div className="flex flex-col sm:flex-row gap-3.5 justify-center">
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
