'use client';

import { motion } from 'framer-motion';
import { COMPANY } from '@/lib/constants';

export default function FloatingContact() {
  const waHref = `https://wa.me/${COMPANY.phone.whatsapp}?text=Hello, I am interested in your staffing services.`;

  return (
    <>
      {/* WhatsApp — Desktop Premium Glass CTA */}
      <motion.a
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -4, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
        href={waHref}
        target="_blank" rel="noopener noreferrer"
        className="fixed bottom-8 right-7 z-50 hidden lg:flex items-center gap-4
          px-5 py-[14px] rounded-2xl
          bg-[#060d14]/88 backdrop-blur-2xl
          border border-[#e6a84f]/18 hover:border-[#e6a84f]/42
          shadow-[0_8px_40px_rgba(0,0,0,0.55),0_1px_0_rgba(255,255,255,0.04)_inset]
          hover:shadow-[0_14px_56px_rgba(0,0,0,0.65),0_0_32px_rgba(230,168,79,0.06),0_1px_0_rgba(255,255,255,0.06)_inset]
          transition-all duration-500 ease-out group">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0
          bg-[#e6a84f]/[0.09] border border-[#e6a84f]/18
          group-hover:bg-[#e6a84f]/[0.16] group-hover:border-[#e6a84f]/35 group-hover:scale-105 group-hover:rotate-[6deg]
          transition-all duration-400 ease-out">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.38 5.06L2 22l5.07-1.33A9.96 9.96 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2z" fill="rgba(230,168,79,0.15)" stroke="rgba(230,168,79,0.6)" strokeWidth="1.2"/>
            <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.4-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.06 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35z" fill="white" fillOpacity="0.9"/>
          </svg>
        </div>
        <div>
          <p className="font-poppins font-semibold text-white text-[13px] leading-none mb-[5px] tracking-[-0.005em]">Speak With Our Team</p>
          <p className="font-inter text-[#e6a84f]/42 text-[10px] tracking-[0.3em] uppercase">WhatsApp · Fast Response</p>
        </div>
      </motion.a>

      {/* Mobile Sticky Contact Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden
        bg-[#04090f]/94 backdrop-blur-2xl border-t border-white/[0.07]
        shadow-[0_-4px_32px_rgba(0,0,0,0.5)] px-4 py-3">
        <div className="flex items-center gap-2.5">
          <a href={`tel:${COMPANY.phone.primary.replace(/\s/g, '')}`}
            className="flex-none flex items-center justify-center gap-1.5 px-4 py-[10px] rounded-xl
              bg-white/[0.05] border border-white/[0.09]
              font-inter text-white/70 text-xs font-medium tracking-[0.01em]
              transition-colors hover:bg-white/[0.09]">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" className="opacity-70">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
            Call
          </a>
          <a href={waHref}
            target="_blank" rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2.5
              py-[10px] rounded-xl
              bg-gradient-to-r from-[#f0be6a] to-[#c8902e]
              border border-[#e6a84f]/40
              text-[#0a1a24] font-poppins font-bold text-[11.5px] tracking-[0.04em]
              shadow-[0_2px_16px_rgba(230,168,79,0.22)]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.38 5.06L2 22l5.07-1.33A9.96 9.96 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2z" fill="rgba(10,26,36,0.18)"/>
              <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.4-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.06 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35z" fill="#0a1a24"/>
            </svg>
            Speak With Our Team
          </a>
        </div>
      </div>
    </>
  );
}
