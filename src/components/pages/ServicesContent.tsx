'use client';

import { motion } from 'framer-motion';
import { COMPANY, SERVICES } from '@/lib/constants';

const ease = [0.25, 0.4, 0.25, 1] as [number, number, number, number];

/* ── Per-service enrichment (SVG icon + image + factual points) ── */
const DETAIL: Record<
  string,
  { num: string; img: string; imgAlt: string; points: string[]; Icon: () => React.ReactElement }
> = {
  security: {
    num: '01',
    img: '/images/dsc/guard-lineup-1.jpg',
    imgAlt: 'Sai Saktheeswari uniformed security guards in branded formation',
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
    img: '/images/dsc/team-outdoor-1.jpg',
    imgAlt: 'Sai Saktheeswari deployed workforce team outdoors',
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
    img: '/images/dsc/team-group-1.jpg',
    imgAlt: 'Sai Saktheeswari managed contract workforce group',
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
    img: '/images/dsc/campus-patrol-1.jpg',
    imgAlt: 'Sai Saktheeswari workforce operating under full statutory HR compliance',
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

      {/* ── SERVICE DETAIL ROWS ── */}
      <div className="bg-[#050d1a]">
        {SERVICES.map((s, i) => {
          const d = DETAIL[s.id];
          const flip = i % 2 === 1;
          return (
            <section key={s.id} id={s.id} className="scroll-mt-24 border-t border-white/[0.05]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
                <div className={`flex flex-col ${flip ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-20 items-center`}>
                  {/* Image */}
                  <Reveal className="w-full lg:w-[48%]">
                    <div className="relative rounded-3xl overflow-hidden ring-1 ring-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
                      <img src={d.img} alt={d.imgAlt} className="w-full aspect-[4/3] object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050d1a]/55 via-transparent to-transparent" />
                      <div className="absolute top-5 left-5 w-12 h-12 rounded-2xl bg-[#04090f]/70 backdrop-blur-md border border-[#e6a84f]/25 flex items-center justify-center text-[#e6a84f]">
                        <d.Icon />
                      </div>
                    </div>
                  </Reveal>

                  {/* Content */}
                  <div className="w-full lg:w-[52%]">
                    <Reveal>
                      <p className="font-poppins text-[#e6a84f]/35 font-extrabold text-5xl leading-none mb-4 select-none">{d.num}</p>
                      <h2 className="font-poppins font-extrabold text-white text-3xl lg:text-4xl mb-4">{s.title}</h2>
                      <p className="font-inter text-white/55 text-base leading-relaxed mb-7 max-w-lg">{s.desc}</p>
                    </Reveal>
                    <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3.5 mb-8 max-w-lg">
                      {d.points.map((pt, pi) => (
                        <Reveal key={pi} delay={0.05 * pi}>
                          <div className="flex items-start gap-2.5">
                            <span className="mt-1 flex-shrink-0 text-[#e6a84f]">
                              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7.5l3 3 7-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
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
