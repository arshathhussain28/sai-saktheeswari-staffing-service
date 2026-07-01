'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS } from '@/lib/constants';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // Close mobile menu whenever the route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#04090f]/93 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_4px_40px_rgba(0,0,0,0.5)] py-3'
          : 'bg-gradient-to-b from-[#04090f]/60 via-[#04090f]/20 to-transparent backdrop-blur-[6px] py-6'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 flex items-center justify-between">

        {/* Logo */}
        <a href="/" className="flex items-center gap-3 sm:gap-4 group flex-shrink-0 min-w-0">
          <motion.div
            animate={{ scale: scrolled ? 0.86 : 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-11 h-11 sm:w-12 sm:h-12 lg:w-[52px] lg:h-[52px] flex-shrink-0 rounded-full overflow-hidden ring-1 ring-[#e6a84f]/30 group-hover:ring-[#e6a84f]/65 transition-all duration-500">
            <img
              src="/images/logo.jpeg"
              alt="Sai Saktheeswari Security & Staffing Services"
              width={104}
              height={104}
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.div animate={{ scale: scrolled ? 0.95 : 1 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="min-w-0">
            <p className="font-poppins font-bold text-white text-[15px] sm:text-[16px] lg:text-[17.5px] leading-[1.18] tracking-[-0.005em] whitespace-nowrap">Sai Saktheeswari</p>
            <p className="font-inter font-medium text-[#e6a84f]/90 text-[8.5px] sm:text-[9.5px] lg:text-[10.5px] tracking-[0.14em] sm:tracking-[0.18em] uppercase mt-1 whitespace-nowrap">Security &amp; Staffing Services</p>
          </motion.div>
        </a>

        {/* Desktop Nav Links — premium: glass pill + gold underline reveal + micro-lift */}
        <nav className="hidden lg:flex items-center gap-0.5">
          {NAV_LINKS.map((l) => {
            const active = isActive(l.href);
            return (
              <a key={l.href} href={l.href}
                aria-current={active ? 'page' : undefined}
                className={`relative group px-4 py-2 rounded-lg font-inter text-[13px] font-medium tracking-[0.015em] transition-colors duration-300 ${active ? 'text-white' : 'text-white/[0.78] hover:text-white'}`}>
                {/* subtle glass pill */}
                <span className={`absolute inset-0 rounded-lg bg-white/[0.055] transition-opacity duration-300 ${active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                {/* label with micro-lift + shadow for legibility over imagery */}
                <span className="relative z-10 inline-block transition-transform duration-300 group-hover:-translate-y-px [text-shadow:0_1px_8px_rgba(0,0,0,0.5)]">{l.label}</span>
                {/* gold-gradient underline — grows symmetrically from centre with a soft glow */}
                <span className={`absolute bottom-[5px] left-1/2 -translate-x-1/2 h-[2px] rounded-full bg-gradient-to-r from-[#f0be6a] via-[#e6a84f] to-[#c8902e] transition-all duration-[420ms] ease-out ${active ? 'w-3/5 opacity-100 shadow-[0_1px_10px_rgba(230,168,79,0.6)]' : 'w-0 opacity-0 group-hover:w-3/5 group-hover:opacity-100'}`} />
              </a>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <a href="/contact"
          className="hidden lg:flex group items-center gap-2.5 relative overflow-hidden
            bg-gradient-to-br from-[#f0be6a] via-[#e6a84f] to-[#c8902e]
            text-[#0a1a24] font-poppins font-bold text-[13px] tracking-[0.02em]
            px-[22px] py-[10px] rounded-[9px]
            shadow-[0_2px_14px_rgba(230,168,79,0.28),0_1px_0_rgba(255,255,255,0.22)_inset]
            hover:shadow-[0_4px_24px_rgba(230,168,79,0.44),0_1px_0_rgba(255,255,255,0.28)_inset]
            hover:-translate-y-[2px] transition-all duration-400 ease-out">
          <span className="relative z-10">Request Workforce</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"
            className="relative z-10 transition-transform duration-300 group-hover:translate-x-[3px] flex-shrink-0">
            <path d="M1.5 6h9M7 2.5l3.5 3.5L7 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none" />
        </a>

        {/* Mobile hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          className="lg:hidden flex flex-col gap-[5px] p-1.5">
          <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="block h-[1.5px] w-5 bg-white rounded-full origin-center" />
          <motion.span animate={{ opacity: menuOpen ? 0 : 1 }}
            transition={{ duration: 0.2 }}
            className="block h-[1.5px] w-3.5 bg-white/50 rounded-full" />
          <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="block h-[1.5px] w-5 bg-white rounded-full origin-center" />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden bg-[#04090f]/97 backdrop-blur-2xl border-t border-white/[0.06]">
            <div className="px-6 pt-5 pb-8 flex flex-col">
              {NAV_LINKS.map((l, i) => {
                const active = isActive(l.href);
                return (
                  <motion.a key={l.href} href={l.href}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 + i * 0.04, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    onClick={() => setMenuOpen(false)}
                    aria-current={active ? 'page' : undefined}
                    className={`relative font-inter text-[15px] font-medium py-3.5 border-b border-white/[0.05] last:border-0 transition-all duration-200 tracking-[0.01em] ${active ? 'text-[#f0be6a] pl-4' : 'text-white/75 hover:text-white hover:pl-1.5'}`}>
                    {active && <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-full bg-gradient-to-b from-[#f0be6a] to-[#c8902e]" />}
                    {l.label}
                  </motion.a>
                );
              })}
              <motion.a href="/contact"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="mt-6 flex items-center justify-center gap-2.5
                  bg-gradient-to-r from-[#f0be6a] to-[#c8902e] text-[#0a1a24]
                  font-poppins font-bold text-sm tracking-[0.03em]
                  py-3.5 rounded-xl shadow-[0_4px_16px_rgba(230,168,79,0.3)]">
                Request Workforce
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M2 6.5h9M7.5 3l3.5 3.5L7.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
