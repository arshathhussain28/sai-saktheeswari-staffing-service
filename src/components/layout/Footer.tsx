'use client';

import { useState } from 'react';
import { COMPANY, SERVICES, NAV_LINKS } from '@/lib/constants';

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

function IconWhatsApp() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.38 5.06L2 22l5.07-1.33A9.96 9.96 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2Zm5.47 12.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.4-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.06 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35Z"/>
    </svg>
  );
}
function IconPhone() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" {...stroke}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"/>
    </svg>
  );
}
function IconMail() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" {...stroke}>
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <path d="m22 7-10 6L2 7"/>
    </svg>
  );
}
function IconPin() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" {...stroke} className="flex-shrink-0 mt-0.5">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  );
}
function IconArrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" {...stroke}>
      <path d="M2 7h9.5M7.5 3l4 4-4 4"/>
    </svg>
  );
}

export default function Footer() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const waHref = `https://wa.me/${COMPANY.phone.whatsapp}?text=Hello, I would like to discuss a workforce requirement.`;

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    // No backend yet — route the lead to the business inbox via the user's mail client.
    window.location.href = `mailto:${COMPANY.email}?subject=Workforce%20enquiry%20%26%20updates&body=Please%20add%20me%20to%20your%20updates%20and%20contact%20me%20at%3A%20${encodeURIComponent(email)}`;
    setSent(true);
  };

  return (
    <footer className="relative bg-[#04090f] border-t border-white/[0.06] overflow-hidden">
      {/* ambient gold glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#e6a84f]/30 to-transparent" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(230,168,79,0.06),transparent_70%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Enquiry CTA band ── */}
        <div className="py-12 lg:py-14 border-b border-white/[0.06]">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-7">
            <div>
              <p className="font-inter text-[#e6a84f] text-[11px] font-bold tracking-[0.3em] uppercase mb-3">Get Started Today</p>
              <h2 className="font-fraunces italic text-3xl lg:text-[2.6rem] leading-[1.05] text-white">
                Ready to strengthen<br className="hidden sm:block" /> your workforce?
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-3.5">
              <a href="/contact"
                className="group relative overflow-hidden inline-flex items-center justify-center gap-2.5
                  bg-gradient-to-br from-[#f0be6a] via-[#e6a84f] to-[#c8902e] text-[#0a1a24]
                  font-poppins font-bold text-sm px-7 py-3.5 rounded-xl
                  shadow-[0_8px_30px_rgba(230,168,79,0.32)] hover:shadow-[0_12px_44px_rgba(230,168,79,0.5)]
                  hover:-translate-y-0.5 transition-all duration-300">
                <span className="relative z-10">Request Workforce</span>
                <span className="relative z-10"><IconArrow /></span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </a>
              <a href={waHref} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5
                  bg-white/[0.06] hover:bg-white/[0.12] backdrop-blur-md border border-white/15 hover:border-[#e6a84f]/45
                  text-white font-poppins font-semibold text-sm px-7 py-3.5 rounded-xl transition-all duration-300">
                <span className="text-[#25D366]"><IconWhatsApp /></span>
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 py-14">

          {/* Brand + newsletter */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-[#e6a84f]/25">
                <img src="/images/logo.jpeg" alt="Sai Saktheeswari Security & Staffing Services" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-poppins font-bold text-white text-sm leading-tight">Sai Saktheeswari</p>
                <p className="font-inter text-[#e6a84f]/80 text-[11px] tracking-[0.18em] uppercase mt-0.5">Security &amp; Staffing Services</p>
              </div>
            </div>
            <p className="font-inter text-white/45 text-sm leading-relaxed mb-6 max-w-xs">
              {COMPANY.tagline}. Established {COMPANY.established} — 35 years of trusted security &amp; manpower staffing across Tamil Nadu &amp; Puducherry.
            </p>

            {/* Connect icons (real, working) */}
            <div className="flex items-center gap-2.5 mb-7">
              <a href={waHref} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
                className="w-9 h-9 rounded-xl flex items-center justify-center bg-white/[0.05] border border-white/10 text-white/70 hover:text-[#25D366] hover:border-[#25D366]/40 transition-all"><IconWhatsApp /></a>
              <a href={`tel:${COMPANY.phone.primary.replace(/\s/g, '')}`} aria-label="Call us"
                className="w-9 h-9 rounded-xl flex items-center justify-center bg-white/[0.05] border border-white/10 text-white/70 hover:text-[#e6a84f] hover:border-[#e6a84f]/40 transition-all"><IconPhone /></a>
              <a href={`mailto:${COMPANY.email}`} aria-label="Email us"
                className="w-9 h-9 rounded-xl flex items-center justify-center bg-white/[0.05] border border-white/10 text-white/70 hover:text-[#e6a84f] hover:border-[#e6a84f]/40 transition-all"><IconMail /></a>
            </div>

            {/* Newsletter / updates */}
            <p className="font-poppins text-white/80 text-xs font-semibold uppercase tracking-[0.15em] mb-3">Workforce Updates</p>
            {sent ? (
              <p className="font-inter text-[#e6a84f] text-sm">Thank you — we&apos;ll be in touch shortly.</p>
            ) : (
              <form onSubmit={subscribe} className="flex items-center gap-2 max-w-xs">
                <input
                  type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  aria-label="Email address for updates"
                  className="flex-1 bg-white/[0.05] border border-white/12 focus:border-[#e6a84f]/50 rounded-xl px-4 py-2.5 font-inter text-sm text-white placeholder:text-white/30 outline-none transition-colors"
                />
                <button type="submit" aria-label="Subscribe"
                  className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#f0be6a] to-[#c8902e] text-[#0a1a24] hover:-translate-y-0.5 transition-transform">
                  <IconArrow />
                </button>
              </form>
            )}
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="font-poppins font-bold text-white text-xs uppercase tracking-[0.18em] mb-5">Company</h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="font-inter text-white/45 hover:text-[#e6a84f] text-sm transition-colors">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h3 className="font-poppins font-bold text-white text-xs uppercase tracking-[0.18em] mb-5">Our Services</h3>
            <ul className="space-y-3">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <a href={`/services#${s.id}`} className="font-inter text-white/45 hover:text-[#e6a84f] text-sm transition-colors">{s.title}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Offices + map */}
          <div className="lg:col-span-3">
            <h3 className="font-poppins font-bold text-white text-xs uppercase tracking-[0.18em] mb-5">Visit Us</h3>
            <div className="space-y-4 mb-5">
              {[COMPANY.address.head, COMPANY.address.branch].map((a, i) => (
                <div key={i} className="flex gap-2.5 text-white/45">
                  <span className="text-[#e6a84f]"><IconPin /></span>
                  <div>
                    <p className="font-poppins text-white/70 text-[11px] uppercase tracking-wide mb-1">{a.label}</p>
                    <p className="font-inter text-white/40 text-xs leading-relaxed">{a.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-xl overflow-hidden border border-white/10 h-28">
              <iframe
                title="Sai Saktheeswari Head Office — Cuddalore"
                src="https://maps.google.com/maps?q=S.N%20Chavadi%2C%20Cuddalore%20607006&z=14&output=embed"
                loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale-[0.3] opacity-90"
              />
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="py-7 border-t border-white/[0.06] flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="font-inter text-white/30 text-xs">
            © {new Date().getFullYear()} Sai Saktheeswari Security &amp; Staffing Services · Established 1991 · All Rights Reserved.
          </p>
          <p className="font-inter text-white/25 text-xs tracking-wide">Cuddalore · Puducherry · Tamil Nadu</p>
        </div>
      </div>
    </footer>
  );
}
