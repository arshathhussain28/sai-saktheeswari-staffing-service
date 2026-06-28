'use client';

import { Reveal, GoldButton, GlassButton } from '@/components/ui/motion';

const s = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

const PILLARS = [
  {
    title: 'Discipline & Conduct',
    text: 'Punctuality, grooming and professional behaviour standards — the foundation of every deployment.',
    Icon: () => (<svg width="24" height="24" viewBox="0 0 24 24" {...s}><circle cx="12" cy="8" r="5" /><path d="m8.5 12.5-1.5 8 5-3 5 3-1.5-8" /></svg>),
  },
  {
    title: 'Safety Protocols',
    text: 'Fire safety, emergency response, access control and incident reporting — drilled until reflexive.',
    Icon: () => (<svg width="24" height="24" viewBox="0 0 24 24" {...s}><path d="M12 2 4 5v6c0 5 3.4 8.5 8 10 4.6-1.5 8-5 8-10V5l-8-3Z" /><path d="M12 8v4M12 16h.01" /></svg>),
  },
  {
    title: 'Communication',
    text: 'Professional interaction with clients, supervisors and the public — clear, calm and courteous.',
    Icon: () => (<svg width="24" height="24" viewBox="0 0 24 24" {...s}><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4L3 21l1.1-3.9A8.4 8.4 0 1 1 21 11.5Z" /></svg>),
  },
  {
    title: 'Refresher Sessions',
    text: 'Weekly briefings keep skills sharp and statutory compliance current — long after day one.',
    Icon: () => (<svg width="24" height="24" viewBox="0 0 24 24" {...s}><path d="M21 12a9 9 0 1 1-3-6.7" /><path d="M21 4v4h-4" /></svg>),
  },
];

const GALLERY = [
  { src: '/images/training-carousel/guards-salute.jpg', alt: 'Guards in formation salute during training' },
  { src: '/images/training-carousel/female-guards.jpg', alt: 'Female security personnel in training' },
  { src: '/images/training-carousel/team-formation.jpg', alt: 'Security team in disciplined formation' },
  { src: '/images/training-carousel/ceremonial-guard.jpg', alt: 'Guard at ceremonial post' },
  { src: '/images/training-carousel/patrol-duty.jpg', alt: 'Guards on patrol duty drill' },
  { src: '/images/training-carousel/campus-deployment.jpg', alt: 'Ceremonial guards at campus deployment' },
  { src: '/images/training-carousel/guards-outdoor.jpg', alt: 'Guards training outdoors' },
  { src: '/images/training-carousel/team-lineup.jpg', alt: 'Team line-up inspection' },
];

export default function TrainingContent() {
  return (
    <main className="bg-[#04090f]">
      {/* HERO */}
      <section className="relative overflow-hidden pt-36 pb-16">
        <img src="/images/home/guards-march.jpg" alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover object-center brightness-[0.34]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#04090f]/85 via-[#050d1a]/85 to-[#04090f]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_50%_30%,rgba(230,168,79,0.10),transparent)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2.5 bg-[#e6a84f]/[0.08] border border-[#e6a84f]/25 rounded-full pl-2.5 pr-4 py-1.5 mb-7 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#e6a84f]" />
              <span className="font-inter text-[#f0be6a] text-[11px] font-semibold tracking-[0.22em] uppercase">Training Excellence</span>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="font-poppins font-extrabold text-white text-4xl sm:text-5xl lg:text-6xl leading-[1.05]">
              Trained before
              <span className="font-fraunces italic font-medium bg-gradient-to-r from-[#f0be6a] to-[#c8902e] bg-clip-text text-transparent"> every deployment.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="font-inter text-white/60 text-base lg:text-lg max-w-xl mx-auto mt-5">
              No one reaches your site untrained. Every guard completes a structured programme — overseen by our senior training team.
            </p>
          </Reveal>
        </div>
      </section>

      {/* PILLARS */}
      <section className="bg-[#050d1a] border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.07}>
                <div className="h-full bg-white/[0.03] border border-white/[0.07] hover:border-[#e6a84f]/30 rounded-2xl p-6 transition-colors duration-300 group">
                  <div className="w-12 h-12 rounded-2xl bg-[#e6a84f]/[0.1] border border-[#e6a84f]/20 flex items-center justify-center text-[#e6a84f] mb-5 group-hover:scale-105 transition-transform duration-300">
                    <p.Icon />
                  </div>
                  <h3 className="font-poppins font-bold text-white text-lg mb-2.5">{p.title}</h3>
                  <p className="font-inter text-white/50 text-sm leading-relaxed">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="bg-[#04090f] py-16 lg:py-24 border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-12">
            <p className="font-inter text-[#e6a84f] text-[11px] font-bold tracking-[0.3em] uppercase mb-3">Real Sessions</p>
            <h2 className="font-poppins font-extrabold text-white text-3xl lg:text-5xl">Real guards. Real results.</h2>
          </Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {GALLERY.map((g, i) => (
              <Reveal key={g.src} delay={(i % 4) * 0.06}>
                <div className={`relative rounded-2xl overflow-hidden ring-1 ring-white/10 group ${i % 5 === 0 ? 'aspect-[3/4]' : 'aspect-square'}`}>
                  <img src={g.src} alt={g.alt} loading="lazy" className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700 brightness-90 group-hover:brightness-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#04090f]/40 to-transparent" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* COMMITMENT NOTE */}
      <section className="bg-[#050d1a] py-16 border-t border-white/[0.05]">
        <Reveal className="max-w-4xl mx-auto px-4 text-center">
          <blockquote className="font-fraunces italic text-white/85 text-2xl lg:text-3xl leading-relaxed">
            &ldquo;Discipline isn&apos;t taught once. It&apos;s rehearsed every week, before every shift.&rdquo;
          </blockquote>
          <p className="font-inter text-[#e6a84f] text-xs tracking-[0.18em] uppercase mt-5">Training overseen by our senior supervisors</p>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-[#04090f] py-24 border-t border-white/[0.05]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_50%_50%,rgba(230,168,79,0.08),transparent)]" />
        <Reveal className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-poppins font-extrabold text-white text-3xl lg:text-5xl leading-tight mb-8">
            Deploy a workforce that&apos;s
            <span className="block font-fraunces italic font-medium text-[#e6a84f] text-2xl lg:text-4xl mt-2">ready from day one.</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-3.5 justify-center">
            <GoldButton href="/contact">Request Workforce</GoldButton>
            <GlassButton href="/about">Our Story</GlassButton>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
