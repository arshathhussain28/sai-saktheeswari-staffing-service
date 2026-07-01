'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Reveal, GoldButton, GlassButton } from '@/components/ui/motion';

const s = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

/* ---------- GSAP parallax image ---------- */
function ParallaxImage({
  src,
  alt,
  className = '',
  intensity = 12,
  eager = false,
}: {
  src: string;
  alt: string;
  className?: string;
  intensity?: number;
  eager?: boolean;
}) {
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
          scrollTrigger: {
            trigger: wrapRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        }
      );
    }, wrapRef);
    return () => ctx.revert();
  }, [intensity]);

  return (
    <div ref={wrapRef} className={`relative overflow-hidden ${className}`}>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        className="absolute inset-0 left-0 w-full h-[130%] -top-[15%] object-cover"
      />
    </div>
  );
}

/* ---------- Static hover-zoom image card ---------- */
function ImageCard({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden group ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="w-full h-full object-cover scale-[1.04] group-hover:scale-[1.12] brightness-[0.92] group-hover:brightness-100 transition-all duration-700 ease-out"
      />
    </div>
  );
}

function Caption({ children }: { children: React.ReactNode }) {
  return (
    <span className="absolute bottom-3.5 left-3.5 backdrop-blur-md bg-black/45 border border-white/15 rounded-full px-3 py-1.5 font-inter text-[9.5px] font-semibold tracking-[0.12em] uppercase text-white/85 z-10">
      {children}
    </span>
  );
}

const FRAME = 'rounded-2xl ring-1 ring-white/10 hover:ring-[#e6a84f]/35 shadow-[0_20px_55px_rgba(0,0,0,0.45)] transition-[ring] duration-500';

/* ---------- Stage chapter header ---------- */
function StageHeader({ index, eyebrow, title, text, reverse }: { index: number; eyebrow: string; title: React.ReactNode; text: string; reverse?: boolean }) {
  const num = String(index).padStart(2, '0');
  return (
    <div className={`lg:col-span-5 relative ${reverse ? 'lg:order-2' : ''}`}>
      <span
        aria-hidden
        className="absolute -top-12 -left-1 lg:-left-3 font-fraunces italic text-white/[0.05] text-[100px] lg:text-[130px] leading-none select-none pointer-events-none"
      >
        {num}
      </span>
      <Reveal>
        <p className="relative font-inter text-[#e6a84f] text-[11px] font-bold tracking-[0.3em] uppercase mb-4">{eyebrow}</p>
        <h3 className="relative font-poppins font-extrabold text-white text-3xl lg:text-[2.5rem] leading-[1.12] mb-5">{title}</h3>
        <p className="relative font-inter text-white/55 text-[15px] leading-relaxed max-w-md">{text}</p>
      </Reveal>
    </div>
  );
}

function StageRow({ children }: { children: React.ReactNode }) {
  return <div className="relative grid lg:grid-cols-12 gap-10 lg:gap-14 items-center py-16 lg:py-24">{children}</div>;
}

/* ---------- Trust badges ---------- */
const BADGES = [
  { label: '35+ Years', Icon: () => (<svg width="17" height="17" viewBox="0 0 24 24" {...s}><path d="M12 2 4 5v6c0 5 3.4 8.5 8 10 4.6-1.5 8-5 8-10V5l-8-3Z" /><path d="m9 12 2 2 4-4" /></svg>) },
  { label: 'Professionally Trained', Icon: () => (<svg width="17" height="17" viewBox="0 0 24 24" {...s}><circle cx="12" cy="8" r="4" /><path d="M5 21v-1a7 7 0 0 1 14 0v1" /></svg>) },
  { label: 'Real Training Centre', Icon: () => (<svg width="17" height="17" viewBox="0 0 24 24" {...s}><path d="M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6" /></svg>) },
  { label: 'Certified Supervisors', Icon: () => (<svg width="17" height="17" viewBox="0 0 24 24" {...s}><circle cx="12" cy="9" r="5" /><path d="m8.5 13.5-1.5 8 5-3 5 3-1.5-8" /></svg>) },
  { label: 'Safety-First', Icon: () => (<svg width="17" height="17" viewBox="0 0 24 24" {...s}><path d="M12 2 4 5v6c0 5 3.4 8.5 8 10 4.6-1.5 8-5 8-10V5l-8-3Z" /><path d="M12 8v4M12 16h.01" /></svg>) },
  { label: 'Deployment Ready', Icon: () => (<svg width="17" height="17" viewBox="0 0 24 24" {...s}><path d="M5 12h14M13 6l6 6-6 6" /></svg>) },
  { label: 'Continuous Skill Development', Icon: () => (<svg width="17" height="17" viewBox="0 0 24 24" {...s}><path d="M21 12a9 9 0 1 1-3-6.7" /><path d="M21 4v4h-4" /></svg>) },
];

export default function TrainingContent() {
  return (
    <main className="bg-[#04090f]">
      {/* HERO */}
      <section className="relative overflow-hidden pt-36 pb-20">
        <ParallaxImage
          src="/images/training/formation-01-wide-path.webp"
          alt="Security guards in disciplined formation during outdoor training"
          className="absolute inset-0 w-full h-full brightness-[0.32]"
          intensity={9}
          eager
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#04090f]/85 via-[#050d1a]/82 to-[#04090f]" />
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
              No one reaches your site untrained. Every guard completes an eight-stage programme — drilled, assessed and signed off by our senior training team.
            </p>
          </Reveal>
        </div>

        {/* Trust badges strip */}
        <Reveal delay={0.26} className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-14">
          <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3">
            {BADGES.map((b) => (
              <div
                key={b.label}
                className="flex items-center gap-2 bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.1] hover:border-[#e6a84f]/35 backdrop-blur-md rounded-full pl-3 pr-4 py-2 transition-colors duration-300"
              >
                <span className="text-[#e6a84f] flex-shrink-0"><b.Icon /></span>
                <span className="font-inter text-white/80 text-[12px] font-medium tracking-[0.01em] whitespace-nowrap">{b.label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* STORYTELLING SPINE */}
      <section className="bg-[#050d1a] border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 divide-y divide-white/[0.05]">

          {/* 01 — Training Introduction */}
          <StageRow>
            <StageHeader
              index={1}
              eyebrow="Chapter 01 — Orientation"
              title="Every guard begins here."
              text="Before a single shift, every recruit enters a structured programme — assessed, briefed and drilled by our senior training team at our own campus facility."
            />
            <div className="lg:col-span-7 grid grid-cols-2 gap-4">
              <ParallaxImage
                src="/images/training/intro-01-formation-address.webp"
                alt="Trainer addressing rows of security guards in formation during orientation"
                className={`aspect-[3/4] ${FRAME}`}
                intensity={8}
              />
              <div className="relative">
                <ImageCard
                  src="/images/training/intro-02-building-formation.webp"
                  alt="Guards in formation in front of campus training building"
                  className={`aspect-[3/4] ${FRAME}`}
                />
                <Caption>Campus Formation</Caption>
              </div>
            </div>
          </StageRow>

          {/* 02 — Discipline & Grooming */}
          <StageRow>
            <StageHeader
              reverse
              index={2}
              eyebrow="Chapter 02 — Discipline &amp; Grooming"
              title="Bearing before duty."
              text="Posture, punctuality and presentation are inspected daily. A guard who carries themselves with discipline carries that discipline onto your site."
            />
            <div className="lg:col-span-7 lg:order-1 grid grid-cols-5 gap-4">
              <div className="col-span-3 relative">
                <ImageCard
                  src="/images/training/discipline-01-supervisor-salute.webp"
                  alt="Supervisor inspecting female security guards saluting in formation"
                  className={`aspect-[4/5] ${FRAME}`}
                />
                <Caption>Daily Inspection</Caption>
              </div>
              <div className="col-span-2 self-end">
                <ParallaxImage
                  src="/images/training/discipline-02-grooming-salute.webp"
                  alt="Female security guards in disciplined salute, uniform grooming standards"
                  className={`aspect-[3/4] ${FRAME}`}
                  intensity={8}
                />
              </div>
            </div>
          </StageRow>

          {/* 03 — Physical Security Training */}
          <StageRow>
            <StageHeader
              index={3}
              eyebrow="Chapter 03 — Physical Security Training"
              title="Drilled until it's reflex."
              text="Formation, salute protocol and post discipline are rehearsed in open drill — not once, but as a standing routine, rain or shine."
            />
            <div className="lg:col-span-7 grid grid-cols-3 gap-4">
              <div className="col-span-2 row-span-2 relative">
                <ParallaxImage
                  src="/images/training/physical-03-group-salute.webp"
                  alt="Large group of guards in disciplined formation salute drill"
                  className={`aspect-square ${FRAME}`}
                  intensity={9}
                />
                <Caption>Formation Drill</Caption>
              </div>
              <ImageCard src="/images/training/physical-01-salute-closeup.webp" alt="Close-up of guard saluting during drill" className={`aspect-square ${FRAME}`} />
              <ImageCard src="/images/training/physical-02-drill-row.webp" alt="Row of guards saluting along a marching path" className={`aspect-square ${FRAME}`} />
            </div>
          </StageRow>

          {/* 04 — Safety Protocol Training */}
          <StageRow>
            <StageHeader
              reverse
              index={4}
              eyebrow="Chapter 04 — Safety Protocol Training"
              title="Fire, hazard, response."
              text="Hands-on instruction in fire safety, equipment handling and hazard reporting — taught in the classroom, tested in the field."
            />
            <div className="lg:col-span-7 lg:order-1 grid grid-cols-3 gap-4">
              <div className="relative">
                <ImageCard src="/images/training/safety-01-equipment-demo.webp" alt="Trainer demonstrating safety equipment handling to seated guards" className={`aspect-[3/4] ${FRAME}`} />
                <Caption>Equipment Drill</Caption>
              </div>
              <div className="col-span-2">
                <ParallaxImage
                  src="/images/training/safety-03-classroom-wide.webp"
                  alt="Wide view of classroom safety briefing with seated security guards"
                  className={`aspect-[3/2] ${FRAME}`}
                  intensity={8}
                />
                <div className="mt-4">
                  <ImageCard src="/images/training/safety-02-briefing.webp" alt="Trainer addressing seated guards during safety briefing" className={`aspect-[3/1.1] ${FRAME}`} />
                </div>
              </div>
            </div>
          </StageRow>

          {/* 05 — Communication Skills */}
          <StageRow>
            <StageHeader
              index={5}
              eyebrow="Chapter 05 — Communication Skills"
              title="Calm. Clear. Courteous."
              text="Every guard is trained to interact professionally with clients, visitors and the public — measured tone under any circumstance."
            />
            <div className="lg:col-span-7 grid grid-cols-3 gap-4">
              <div className="col-span-2 relative">
                <ParallaxImage
                  src="/images/training/communication-01-classroom.webp"
                  alt="Trainer leading a communication skills session with seated security personnel"
                  className={`aspect-[3/2] ${FRAME}`}
                  intensity={8}
                />
                <Caption>Briefing Room</Caption>
              </div>
              <div className="flex flex-col gap-4">
                <ImageCard src="/images/training/communication-02-trainer-gesture.webp" alt="Trainer gesturing while addressing guards" className={`aspect-[3/2] ${FRAME}`} />
                <ImageCard src="/images/training/communication-03-trainer-booklet.webp" alt="Trainer with Sai Saktheeswari Security & Staffing Services training booklet" className={`aspect-[3/2] ${FRAME}`} />
              </div>
            </div>
          </StageRow>

          {/* 06 — Emergency Response Practice */}
          <StageRow>
            <StageHeader
              reverse
              index={6}
              eyebrow="Chapter 06 — Emergency Response Practice"
              title="Practiced, not improvised."
              text="Coordinated formation movement and rapid-response drills build the muscle memory a real incident demands."
            />
            <div className="lg:col-span-7 lg:order-1 grid grid-cols-2 gap-4">
              <ParallaxImage
                src="/images/training/formation-01-wide-path.webp"
                alt="Security guards moving in coordinated formation along a campus path"
                className={`aspect-[4/5] ${FRAME}`}
                intensity={8}
              />
              <div className="flex flex-col gap-4">
                <div className="relative">
                  <ImageCard src="/images/training/formation-02-supervisor-medal.webp" alt="Supervisor overseeing guards in response formation" className={`aspect-[4/2.3] ${FRAME}`} />
                  <Caption>Supervised Drill</Caption>
                </div>
                <ImageCard src="/images/training/formation-03-building-lineup.webp" alt="Guards lined up in formation in front of training block" className={`aspect-[4/2.3] ${FRAME}`} />
              </div>
            </div>
          </StageRow>

          {/* 07 — Field Demonstration */}
          <StageRow>
            <StageHeader
              index={7}
              eyebrow="Chapter 07 — Field Demonstration"
              title="Supervised in the field."
              text="Senior supervisors evaluate every guard on-site — identification checks, post handovers and live correction before deployment."
            />
            <div className="lg:col-span-7 grid grid-cols-5 gap-4">
              <div className="col-span-3 relative">
                <ParallaxImage
                  src="/images/training/supervisor-01-formation-salute.webp"
                  alt="Guards saluting in formation in front of training campus building"
                  className={`aspect-[4/5] ${FRAME}`}
                  intensity={8}
                />
                <Caption>On-Site Evaluation</Caption>
              </div>
              <div className="col-span-2 flex flex-col gap-4">
                <ImageCard src="/images/training/supervisor-02-staff-id.webp" alt="Two supervisory staff with identification badges" className={`aspect-square ${FRAME}`} />
                <ImageCard src="/images/training/supervisor-03-staff-portrait.webp" alt="Staff member portrait with ID badge under campus trees" className={`aspect-square ${FRAME}`} />
              </div>
            </div>
          </StageRow>

        </div>
      </section>

      {/* 08 — FINAL DEPLOYMENT READINESS — cinematic finale */}
      <section className="relative overflow-hidden bg-[#04090f] py-24 lg:py-32 border-t border-white/[0.05]">
        <ParallaxImage
          src="/images/training/deployment-02-ceremonial-detail.webp"
          alt="Close-up profile of ceremonial guard in full dress uniform"
          className="absolute inset-0 w-full h-full"
          intensity={7}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#04090f] via-[#04090f]/92 to-[#04090f]/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#04090f] via-transparent to-[#04090f]/70" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 relative">
            <span aria-hidden className="absolute -top-14 -left-1 lg:-left-3 font-fraunces italic text-white/[0.06] text-[110px] lg:text-[140px] leading-none select-none pointer-events-none">
              08
            </span>
            <Reveal>
              <p className="relative font-inter text-[#e6a84f] text-[11px] font-bold tracking-[0.3em] uppercase mb-4">Chapter 08 — Final Deployment Readiness</p>
              <h2 className="relative font-poppins font-extrabold text-white text-4xl lg:text-5xl leading-[1.08] mb-6">Ready from day one.</h2>
              <p className="relative font-inter text-white/60 text-base lg:text-lg leading-relaxed max-w-lg">
                Only guards who clear every stage are deployed. What you receive on-site is the end of this programme — not the start of one.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.1} className="grid grid-cols-2 gap-4">
              <div className="relative col-span-1">
                <ImageCard src="/images/training/deployment-01-ceremonial-guard.webp" alt="Guard in full ceremonial dress uniform standing at attention" className={`aspect-[3/4.4] ${FRAME}`} />
                <Caption>Full Dress Standard</Caption>
              </div>
              <div className="relative col-span-1 self-end">
                <ImageCard src="/images/training/deployment-03-team-ready.webp" alt="Full security team lined up outdoors, ready for deployment" className={`aspect-[3/3.6] ${FRAME}`} />
                <Caption>Deployment Ready</Caption>
              </div>
            </Reveal>
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
