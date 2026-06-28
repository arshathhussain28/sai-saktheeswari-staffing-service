'use client';

import { INDUSTRIES, COMPANY } from '@/lib/constants';
import { Reveal, GoldButton, GlassButton } from '@/components/ui/motion';

const s = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

const DETAIL: Record<string, { img: string; Icon: () => React.ReactElement }> = {
  Manufacturing: {
    img: '/images/dsc/formation-aerial.jpg',
    Icon: () => (<svg width="22" height="22" viewBox="0 0 24 24" {...s}><path d="M2 20h20M4 20V9l5 4V9l5 4V4l5 16" /></svg>),
  },
  Logistics: {
    img: '/images/dsc/team-outdoor-1.jpg',
    Icon: () => (<svg width="22" height="22" viewBox="0 0 24 24" {...s}><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7" /><circle cx="7" cy="18" r="1.6" /><circle cx="17.5" cy="18" r="1.6" /></svg>),
  },
  Construction: {
    img: '/images/home/guards-march.jpg',
    Icon: () => (<svg width="22" height="22" viewBox="0 0 24 24" {...s}><path d="M3 21h18M5 21V10l7-4 7 4v11" /><path d="M9 21v-5h6v5" /></svg>),
  },
  'Commercial Facilities': {
    img: '/images/dsc/team-group-1.jpg',
    Icon: () => (<svg width="22" height="22" viewBox="0 0 24 24" {...s}><path d="M3 21h18M5 21V7l7-4 7 4v14" /><path d="M9 10h.01M15 10h.01M9 14h.01M15 14h.01" /></svg>),
  },
  'Corporate Offices': {
    img: '/images/dsc/supervisors-duo.jpg',
    Icon: () => (<svg width="22" height="22" viewBox="0 0 24 24" {...s}><rect x="4" y="3" width="16" height="18" rx="1" /><path d="M9 7h.01M15 7h.01M9 11h.01M15 11h.01M9 15h.01M15 15h.01M10 21v-3h4v3" /></svg>),
  },
  'Educational Institutions': {
    img: '/images/dsc/female-guards-salute.jpg',
    Icon: () => (<svg width="22" height="22" viewBox="0 0 24 24" {...s}><path d="M22 9 12 5 2 9l10 4 10-4Z" /><path d="M6 11v5c0 1 2.7 2.5 6 2.5s6-1.5 6-2.5v-5" /></svg>),
  },
};

export default function IndustriesContent() {
  return (
    <main className="bg-[#04090f]">
      {/* HERO */}
      <section className="relative overflow-hidden pt-36 pb-16">
        <img src="/images/dsc/guard-lineup-3.jpg" alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover brightness-[0.34]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#04090f]/85 via-[#050d1a]/85 to-[#04090f]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_50%_30%,rgba(230,168,79,0.10),transparent)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2.5 bg-[#e6a84f]/[0.08] border border-[#e6a84f]/25 rounded-full pl-2.5 pr-4 py-1.5 mb-7 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#e6a84f]" />
              <span className="font-inter text-[#f0be6a] text-[11px] font-semibold tracking-[0.22em] uppercase">Industries We Serve</span>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="font-poppins font-extrabold text-white text-4xl sm:text-5xl lg:text-6xl leading-[1.05]">
              Trusted across
              <span className="font-fraunces italic font-medium bg-gradient-to-r from-[#f0be6a] to-[#c8902e] bg-clip-text text-transparent"> every sector.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="font-inter text-white/60 text-base lg:text-lg max-w-xl mx-auto mt-5">
              From factory floors to college campuses — trained, verified workforce matched to the demands of your industry since {COMPANY.established}.
            </p>
          </Reveal>
        </div>
      </section>

      {/* GRID */}
      <section className="bg-[#050d1a] border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {INDUSTRIES.map((ind, i) => {
              const d = DETAIL[ind.name];
              return (
                <Reveal key={ind.name} delay={(i % 3) * 0.08}>
                  <a href="/contact" className="group relative block rounded-3xl overflow-hidden h-72 ring-1 ring-white/10 hover:ring-[#e6a84f]/40 transition-all duration-500">
                    <img src={d?.img} alt={`Sai Saktheeswari workforce serving ${ind.name}`} className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700 brightness-[0.55] group-hover:brightness-[0.45]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#04090f] via-[#04090f]/40 to-transparent" />
                    <div className="relative h-full flex flex-col justify-end p-6">
                      <div className="w-11 h-11 rounded-2xl bg-[#04090f]/70 backdrop-blur-md border border-[#e6a84f]/25 text-[#e6a84f] flex items-center justify-center mb-4 group-hover:scale-105 group-hover:border-[#e6a84f]/50 transition-all duration-300">
                        {d?.Icon ? <d.Icon /> : null}
                      </div>
                      <h2 className="font-poppins font-bold text-white text-xl mb-1.5">{ind.name}</h2>
                      <p className="font-inter text-white/55 text-sm leading-relaxed">{ind.desc}</p>
                      <span className="mt-4 inline-flex items-center gap-1.5 font-poppins font-semibold text-[#e6a84f] text-xs opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                        Request workforce
                        <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M2 7h9.5M7.5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </span>
                    </div>
                  </a>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-[#04090f] py-24 border-t border-white/[0.05]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_50%_50%,rgba(230,168,79,0.08),transparent)]" />
        <Reveal className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-poppins font-extrabold text-white text-3xl lg:text-5xl leading-tight mb-5">
            Don&apos;t see your sector?
            <span className="block font-fraunces italic font-medium text-[#e6a84f] text-2xl lg:text-4xl mt-2">We&apos;ve almost certainly served it.</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-3.5 justify-center mt-8">
            <GoldButton href="/contact">Request Workforce</GoldButton>
            <GlassButton href="/services">Explore Services</GlassButton>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
