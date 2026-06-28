'use client';

import { useState } from 'react';
import { COMPANY, SERVICES } from '@/lib/constants';
import { Reveal, CheckIcon } from '@/components/ui/motion';

function IconPhone() {
  return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" /></svg>);
}
function IconWhatsApp() {
  return (<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.38 5.06L2 22l5.07-1.33A9.96 9.96 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2Zm5.47 12.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.4-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.06 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35Z" /></svg>);
}
function IconMail() {
  return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></svg>);
}
function IconPin() {
  return (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" /><circle cx="12" cy="10" r="3" /></svg>);
}

export default function ContactContent() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', requirement: '', message: '' });
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [sent, setSent] = useState(false);

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const validate = () => {
    const e: Record<string, boolean> = {};
    if (!form.name.trim()) e.name = true;
    if (!/^[\d+\s-]{8,}$/.test(form.phone.trim())) e.phone = true;
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = true;
    if (!form.requirement) e.requirement = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const mailtoHref = () => {
    const subject = `Workforce enquiry — ${form.requirement}`;
    const body = `Name: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email || '—'}\nRequirement: ${form.requirement}\n\n${form.message}`;
    return `mailto:${COMPANY.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSent(true);
  };

  const waHref = () => {
    const msg = `Hello, I have a workforce requirement.%0AName: ${form.name || '—'}%0ARequirement: ${form.requirement || '—'}%0A${form.message || ''}`;
    return `https://wa.me/${COMPANY.phone.whatsapp}?text=${msg}`;
  };

  const fieldCls = (k: string) =>
    `w-full bg-white/[0.04] border rounded-xl px-4 py-3 font-inter text-sm text-white placeholder:text-white/30 outline-none transition-colors ${
      errors[k] ? 'border-red-400/60' : 'border-white/12 focus:border-[#e6a84f]/55'
    }`;

  return (
    <main className="bg-[#04090f]">
      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-36 pb-16">
        <img src="/images/dsc/formation-aerial.jpg" alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover brightness-[0.32]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#04090f]/85 via-[#050d1a]/85 to-[#04090f]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_50%_30%,rgba(230,168,79,0.10),transparent)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2.5 bg-[#e6a84f]/[0.08] border border-[#e6a84f]/25 rounded-full pl-2.5 pr-4 py-1.5 mb-7 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#e6a84f]" />
              <span className="font-inter text-[#f0be6a] text-[11px] font-semibold tracking-[0.22em] uppercase">Get In Touch</span>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="font-poppins font-extrabold text-white text-4xl sm:text-5xl lg:text-6xl leading-[1.05]">
              Let&apos;s talk
              <span className="font-fraunces italic font-medium bg-gradient-to-r from-[#f0be6a] to-[#c8902e] bg-clip-text text-transparent"> workforce.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="font-inter text-white/60 text-base lg:text-lg max-w-xl mx-auto mt-5">
              Tell us your requirement — we respond within 24 hours, with same-day WhatsApp response for urgent needs.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── FORM + INFO ── */}
      <section className="bg-[#050d1a] border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">

            {/* Form */}
            <Reveal>
              <div className="bg-white/[0.03] border border-white/[0.08] rounded-3xl p-7 sm:p-9">
                {sent ? (
                  <div className="text-center py-12">
                    <div className="w-14 h-14 rounded-2xl bg-[#e6a84f]/15 border border-[#e6a84f]/30 text-[#e6a84f] flex items-center justify-center mx-auto mb-5">
                      <CheckIcon className="w-6 h-6" />
                    </div>
                    <h2 className="font-poppins font-bold text-white text-2xl mb-2">Thank you, {form.name.split(' ')[0] || 'there'}.</h2>
                    <p className="font-inter text-white/55 text-sm max-w-sm mx-auto mb-6">
                      Choose how you&apos;d like to send your enquiry — we respond within 24 hours.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <a href={mailtoHref()}
                        className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#f0be6a] to-[#c8902e] text-[#0a1a24] font-poppins font-bold text-sm px-6 py-3 rounded-xl">
                        <span className="text-[#0a1a24]"><IconMail /></span> Send via Email
                      </a>
                      <a href={waHref()} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-white font-poppins font-semibold text-sm px-6 py-3 rounded-xl transition-colors">
                        <span className="text-[#25D366]"><IconWhatsApp /></span> Send via WhatsApp
                      </a>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={submit} noValidate>
                    <h2 className="font-poppins font-bold text-white text-2xl mb-1">Request workforce</h2>
                    <p className="font-inter text-white/45 text-sm mb-7">Fields marked <span className="text-[#e6a84f]">*</span> are required.</p>

                    <div className="space-y-4">
                      <div>
                        <label className="block font-inter text-white/70 text-xs mb-1.5">Full name <span className="text-[#e6a84f]">*</span></label>
                        <input value={form.name} onChange={(e) => set('name', e.target.value)} className={fieldCls('name')} placeholder="Your name" autoComplete="name" />
                        {errors.name && <p className="text-red-400/80 text-xs mt-1">Please enter your name.</p>}
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-inter text-white/70 text-xs mb-1.5">Phone <span className="text-[#e6a84f]">*</span></label>
                          <input type="tel" value={form.phone} onChange={(e) => set('phone', e.target.value)} className={fieldCls('phone')} placeholder="+91 …" autoComplete="tel" />
                          {errors.phone && <p className="text-red-400/80 text-xs mt-1">Enter a valid phone number.</p>}
                        </div>
                        <div>
                          <label className="block font-inter text-white/70 text-xs mb-1.5">Email</label>
                          <input type="email" value={form.email} onChange={(e) => set('email', e.target.value)} className={fieldCls('email')} placeholder="you@company.com" autoComplete="email" />
                          {errors.email && <p className="text-red-400/80 text-xs mt-1">Enter a valid email.</p>}
                        </div>
                      </div>
                      <div>
                        <label className="block font-inter text-white/70 text-xs mb-1.5">Requirement <span className="text-[#e6a84f]">*</span></label>
                        <select value={form.requirement} onChange={(e) => set('requirement', e.target.value)} className={`${fieldCls('requirement')} appearance-none cursor-pointer`}>
                          <option value="" className="bg-[#0a1422]">Select a service…</option>
                          {SERVICES.map((s) => (<option key={s.id} value={s.title} className="bg-[#0a1422]">{s.title}</option>))}
                          <option value="Other" className="bg-[#0a1422]">Other / Not sure</option>
                        </select>
                        {errors.requirement && <p className="text-red-400/80 text-xs mt-1">Please choose a requirement.</p>}
                      </div>
                      <div>
                        <label className="block font-inter text-white/70 text-xs mb-1.5">Details</label>
                        <textarea value={form.message} onChange={(e) => set('message', e.target.value)} rows={4} className={`${fieldCls('message')} resize-none`} placeholder="How many people, location, timeline…" />
                      </div>
                    </div>

                    <button type="submit"
                      className="group relative overflow-hidden w-full mt-7 inline-flex items-center justify-center gap-2.5 bg-gradient-to-br from-[#f0be6a] via-[#e6a84f] to-[#c8902e] text-[#0a1a24] font-poppins font-bold text-sm px-7 py-3.5 rounded-xl shadow-[0_8px_30px_rgba(230,168,79,0.32)] hover:shadow-[0_12px_44px_rgba(230,168,79,0.5)] hover:-translate-y-0.5 transition-all duration-300">
                      <span className="relative z-10">Send Enquiry</span>
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    </button>
                  </form>
                )}
              </div>
            </Reveal>

            {/* Info */}
            <div className="space-y-4">
              <Reveal delay={0.05}>
                <a href={`tel:${COMPANY.phone.primary.replace(/\s/g, '')}`} className="flex items-center gap-4 bg-white/[0.03] border border-white/[0.08] hover:border-[#e6a84f]/30 rounded-2xl p-5 transition-colors group">
                  <div className="w-11 h-11 rounded-xl bg-[#e6a84f]/10 border border-[#e6a84f]/20 text-[#e6a84f] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform"><IconPhone /></div>
                  <div>
                    <p className="font-inter text-white/45 text-xs uppercase tracking-wide">Call us</p>
                    <p className="font-poppins font-semibold text-white text-sm">{COMPANY.phone.primary}</p>
                  </div>
                </a>
              </Reveal>
              <Reveal delay={0.1}>
                <a href={`https://wa.me/${COMPANY.phone.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-white/[0.03] border border-white/[0.08] hover:border-[#25D366]/40 rounded-2xl p-5 transition-colors group">
                  <div className="w-11 h-11 rounded-xl bg-[#25D366]/10 border border-[#25D366]/25 text-[#25D366] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform"><IconWhatsApp /></div>
                  <div>
                    <p className="font-inter text-white/45 text-xs uppercase tracking-wide">WhatsApp</p>
                    <p className="font-poppins font-semibold text-white text-sm">Chat instantly · fast response</p>
                  </div>
                </a>
              </Reveal>
              <Reveal delay={0.15}>
                <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-4 bg-white/[0.03] border border-white/[0.08] hover:border-[#e6a84f]/30 rounded-2xl p-5 transition-colors group">
                  <div className="w-11 h-11 rounded-xl bg-[#e6a84f]/10 border border-[#e6a84f]/20 text-[#e6a84f] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform"><IconMail /></div>
                  <div>
                    <p className="font-inter text-white/45 text-xs uppercase tracking-wide">Email</p>
                    <p className="font-poppins font-semibold text-white text-sm break-all">{COMPANY.email}</p>
                  </div>
                </a>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5 space-y-4">
                  {[COMPANY.address.head, COMPANY.address.branch].map((a, i) => (
                    <div key={i} className="flex gap-3 text-white/50">
                      <span className="text-[#e6a84f]"><IconPin /></span>
                      <div>
                        <p className="font-poppins text-white/75 text-xs uppercase tracking-wide mb-1">{a.label}</p>
                        <p className="font-inter text-white/45 text-xs leading-relaxed">{a.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.25}>
                <div className="rounded-2xl overflow-hidden border border-white/10 h-48">
                  <iframe
                    title="Sai Saktheeswari Head Office — Cuddalore"
                    src="https://maps.google.com/maps?q=S.N%20Chavadi%2C%20Cuddalore%20607006&z=14&output=embed"
                    loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full grayscale-[0.2] opacity-95"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
