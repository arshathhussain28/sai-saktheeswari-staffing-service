'use client';

import { COMPANY } from '@/lib/constants';
import { Reveal, GoldButton, GlassButton, CheckIcon } from '@/components/ui/motion';

const s = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

const ROLES = [
  { title: 'Security Guard', type: 'Full-time · Cuddalore / Puducherry', desc: 'Static and patrol duties at campuses, factories and commercial sites. Training provided.' },
  { title: 'Security Supervisor', type: 'Full-time · Field', desc: 'Lead and inspect guard teams, manage shifts, liaise with client site managers.' },
  { title: 'Female Security Officer', type: 'Full-time · Campuses & Hospitals', desc: 'Trained women officers for institutions, events and commercial complexes.' },
  { title: 'Housekeeping & Support Staff', type: 'Full-time · Outsourced', desc: 'Facility support roles across industrial and commercial client sites.' },
  { title: 'Field / Operations Officer', type: 'Full-time · Head Office', desc: 'Coordinate deployments, attendance and client requirements on the ground.' },
];

const BENEFITS = [
  'Structured training & certification before deployment',
  'PF, ESI & full statutory benefits',
  'Steady deployment across 100+ client sites',
  'Clear growth — guard to supervisor to officer',
];

const STEPS = [
  { n: '01', title: 'Reach Out', text: 'Call or WhatsApp us with your name, role of interest and location.' },
  { n: '02', title: 'Verification', text: 'A short interview, background and document verification.' },
  { n: '03', title: 'Training', text: 'Complete our structured discipline, safety and conduct programme.' },
  { n: '04', title: 'Deployment', text: 'Get placed at a client site with ongoing supervisor support.' },
];

export default function CareersContent() {
  const applyHref = (role?: string) =>
    `https://wa.me/${COMPANY.phone.whatsapp}?text=${encodeURIComponent(`Hello, I would like to apply for a position${role ? `: ${role}` : ''}. My name is `)}`;

  return (
    <main className="bg-[#04090f]">
      {/* HERO */}
      <section className="relative overflow-hidden pt-36 pb-16">
        <img src="/images/dsc/team-group-1.jpg" alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover object-center brightness-[0.34]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#04090f]/85 via-[#050d1a]/85 to-[#04090f]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_50%_30%,rgba(230,168,79,0.10),transparent)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2.5 bg-[#e6a84f]/[0.08] border border-[#e6a84f]/25 rounded-full pl-2.5 pr-4 py-1.5 mb-7 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#e6a84f]" />
              <span className="font-inter text-[#f0be6a] text-[11px] font-semibold tracking-[0.22em] uppercase">Careers</span>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="font-poppins font-extrabold text-white text-4xl sm:text-5xl lg:text-6xl leading-[1.05]">
              Build a career
              <span className="font-fraunces italic font-medium bg-gradient-to-r from-[#f0be6a] to-[#c8902e] bg-clip-text text-transparent"> you can be proud of.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="font-inter text-white/60 text-base lg:text-lg max-w-xl mx-auto mt-5">
              Join a team that&apos;s been deploying trusted, trained professionals across South India for 35 years.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="flex flex-col sm:flex-row gap-3.5 justify-center mt-9">
              <GoldButton href={applyHref()} external>Apply on WhatsApp</GoldButton>
              <GlassButton href={`tel:${COMPANY.phone.primary.replace(/\s/g, '')}`}>Call {COMPANY.phone.primary}</GlassButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="bg-[#050d1a] border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {BENEFITS.map((b, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <div className="h-full bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6 flex items-start gap-3">
                  <span className="mt-0.5 w-7 h-7 rounded-lg bg-[#e6a84f]/12 border border-[#e6a84f]/25 text-[#e6a84f] flex items-center justify-center flex-shrink-0"><CheckIcon /></span>
                  <p className="font-inter text-white/65 text-sm leading-snug">{b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* OPEN ROLES */}
      <section className="bg-[#04090f] py-16 lg:py-24 border-t border-white/[0.05]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-10">
            <p className="font-inter text-[#e6a84f] text-[11px] font-bold tracking-[0.3em] uppercase mb-3">We&apos;re Hiring</p>
            <h2 className="font-poppins font-extrabold text-white text-3xl lg:text-5xl">Open positions</h2>
          </Reveal>
          <div className="space-y-3.5">
            {ROLES.map((r, i) => (
              <Reveal key={r.title} delay={i * 0.05}>
                <div className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/[0.03] border border-white/[0.07] hover:border-[#e6a84f]/30 rounded-2xl p-5 sm:p-6 transition-colors duration-300">
                  <div>
                    <h3 className="font-poppins font-bold text-white text-lg">{r.title}</h3>
                    <p className="font-inter text-[#e6a84f]/70 text-[11px] uppercase tracking-wide mt-0.5 mb-1.5">{r.type}</p>
                    <p className="font-inter text-white/50 text-sm leading-relaxed max-w-xl">{r.desc}</p>
                  </div>
                  <a href={applyHref(r.title)} target="_blank" rel="noopener noreferrer"
                    className="flex-shrink-0 inline-flex items-center justify-center gap-2 bg-white/[0.06] hover:bg-gradient-to-r hover:from-[#f0be6a] hover:to-[#c8902e] border border-white/15 hover:border-transparent text-white hover:text-[#0a1a24] font-poppins font-semibold text-sm px-5 py-2.5 rounded-xl transition-all duration-300">
                    Apply
                    <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M2 7h9.5M7.5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* HOW TO APPLY */}
      <section className="bg-[#050d1a] py-16 lg:py-24 border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-12">
            <p className="font-inter text-[#e6a84f] text-[11px] font-bold tracking-[0.3em] uppercase mb-3">The Process</p>
            <h2 className="font-poppins font-extrabold text-white text-3xl lg:text-5xl">From enquiry to deployment.</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {STEPS.map((st, i) => (
              <Reveal key={st.n} delay={i * 0.07}>
                <div className="h-full bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6">
                  <p className="font-fraunces italic text-[#e6a84f] text-3xl mb-3">{st.n}</p>
                  <h3 className="font-poppins font-bold text-white text-base mb-2">{st.title}</h3>
                  <p className="font-inter text-white/50 text-sm leading-relaxed">{st.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="text-center mt-12">
            <GoldButton href={applyHref()} external>Apply on WhatsApp</GoldButton>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
