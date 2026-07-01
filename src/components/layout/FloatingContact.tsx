'use client';

import { useEffect, useRef, useState, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { COMPANY } from '@/lib/constants';

const spring = { type: 'spring', stiffness: 420, damping: 30 } as const;
const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];
const expo = [0.16, 1, 0.3, 1] as [number, number, number, number];
const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e6a84f]/[0.55] focus-visible:ring-offset-2 focus-visible:ring-offset-[#04090f]';

/* ── Magnetic cursor-follow (GSAP quickTo) — no-ops gracefully on touch ── */
function useMagnetic(strength = 0.26) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power4.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power4.out' });
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const onLeave = () => { xTo(0); yTo(0); };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [strength]);
  return ref;
}

/* ── Scroll-aware visibility: hidden in hero, settles visible shortly after scroll stops ── */
function useScrollAware(threshold = 260) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    let idle: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      const y = window.scrollY;
      if (y < threshold) { setVisible(false); return; }
      setVisible(false);
      clearTimeout(idle);
      idle = setTimeout(() => setVisible(true), 380);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => { window.removeEventListener('scroll', onScroll); clearTimeout(idle); };
  }, [threshold]);
  return visible;
}

/* ── Escape key closes any open overlay ── */
function useEscapeClose(active: boolean, onClose: () => void) {
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, onClose]);
}

/* ── Clipboard copy with per-row "copied" confirmation state ── */
function useCopy() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const copy = async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey((k) => (k === key ? null : k)), 1700);
    } catch {
      /* clipboard unavailable — fail silently, click-to-call/email still works */
    }
  };
  return { copiedKey, copy };
}

/* ── Lightweight contained ripple, spawned at pointer-down coordinates ── */
function useRipple() {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const spawn = (e: React.PointerEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now() + Math.random();
    setRipples((r) => [...r, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 650);
  };
  const Ripples = () => (
    <>
      {ripples.map((r) => (
        <motion.span
          key={r.id}
          initial={{ width: 0, height: 0, x: 0, y: 0, opacity: 0.45 }}
          animate={{ width: 90, height: 90, x: -45, y: -45, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="absolute rounded-full bg-white pointer-events-none"
          style={{ left: r.x, top: r.y }}
        />
      ))}
    </>
  );
  return { spawn, Ripples };
}

/* ── Premium icon set — brand-accurate WhatsApp glyph, consistent enterprise line icons elsewhere ── */
function IconPhone() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}
function IconWhatsAppBrand() {
  return (
    <svg width="19" height="19" viewBox="0 0 32 32" fill="white">
      <path d="M16.04 3C9.37 3 4 8.34 4 14.97c0 2.2.6 4.27 1.64 6.05L4 29l8.2-2.15a12.9 12.9 0 0 0 3.84.58c6.67 0 12.04-5.34 12.04-11.96C28.08 8.34 22.7 3 16.04 3Zm0 21.8a9.7 9.7 0 0 1-4.95-1.36l-.35-.21-4.86 1.27 1.3-4.74-.23-.36a9.66 9.66 0 0 1-1.49-5.17c0-5.36 4.37-9.71 9.74-9.71 5.37 0 9.74 4.35 9.74 9.71 0 5.37-4.37 9.57-9.9 9.57Zm5.34-7.28c-.29-.15-1.71-.85-1.98-.94-.27-.1-.46-.15-.65.15-.2.29-.75.94-.92 1.13-.17.2-.34.22-.63.07-.29-.15-1.22-.45-2.33-1.43-.86-.77-1.44-1.71-1.61-2-.17-.29-.02-.45.13-.6.13-.13.29-.34.43-.51.15-.17.2-.29.29-.49.1-.2.05-.37-.02-.51-.07-.15-.65-1.56-.89-2.14-.23-.56-.47-.49-.65-.5h-.55c-.2 0-.51.07-.78.37-.27.29-1.02.99-1.02 2.43 0 1.43 1.04 2.82 1.18 3.01.15.2 2.04 3.12 4.96 4.38.69.3 1.23.48 1.65.61.69.22 1.32.19 1.82.12.55-.08 1.71-.7 1.95-1.38.24-.67.24-1.25.17-1.38-.07-.12-.27-.2-.56-.34Z" />
    </svg>
  );
}
function IconMail() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="3.2" />
      <path d="m22 7-10 6L2 7" />
    </svg>
  );
}
function IconArrow() {
  return (
    <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
      <path d="M2 7h9.5M7.5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconCopy() {
  return (
    <svg width="12.5" height="12.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2.4" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}
function IconCheck() {
  return (
    <svg width="12.5" height="12.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
function IconClose() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

type Channel = {
  key: string;
  label: string;
  sub: string;
  href: string;
  external: boolean;
  Icon: () => React.ReactElement;
  chipClass: string;
  copyValue?: string;
};

function buildChannels(waHref: string): Channel[] {
  return [
    {
      key: 'call', label: 'Call Us', sub: COMPANY.phone.primary,
      href: `tel:${COMPANY.phone.primary.replace(/\s/g, '')}`, external: false, Icon: IconPhone,
      chipClass: 'bg-[#e6a84f]/[0.1] border border-[#e6a84f]/25 text-[#e6a84f] group-hover:bg-[#e6a84f]/[0.2] group-hover:border-[#e6a84f]/50',
      copyValue: COMPANY.phone.primary,
    },
    {
      key: 'whatsapp', label: 'WhatsApp', sub: 'Usually replies in minutes',
      href: waHref, external: true, Icon: IconWhatsAppBrand,
      chipClass: 'bg-gradient-to-br from-[#2CC95B] to-[#128C7E] border border-[#25D366]/40 shadow-[0_4px_14px_rgba(37,211,102,0.28)] group-hover:shadow-[0_6px_20px_rgba(37,211,102,0.42)]',
    },
    {
      key: 'email', label: 'Email Us', sub: COMPANY.email,
      href: `mailto:${COMPANY.email}`, external: false, Icon: IconMail,
      chipClass: 'bg-white/[0.08] border border-white/20 text-white/[0.85] group-hover:bg-white/[0.15] group-hover:border-white/[0.35]',
      copyValue: COMPANY.email,
    },
  ];
}

function ChannelRow({ c, index, copiedKey, onCopy }: { c: Channel; index: number; copiedKey: string | null; onCopy: (key: string, value: string) => void }) {
  const { spawn, Ripples } = useRipple();
  const copied = copiedKey === c.key;
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 + index * 0.07, ease: expo }}
      className="group relative flex items-center gap-3 px-2.5 py-3 -mx-2.5 rounded-xl transition-colors duration-300 hover:bg-white/[0.045]"
    >
      <a
        href={c.href}
        {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        aria-label={`${c.label} — ${c.sub}`}
        className={`flex items-center gap-3.5 flex-1 min-w-0 rounded-lg ${focusRing}`}
      >
        <div
          onPointerDown={spawn}
          className={`relative w-11 h-11 rounded-[14px] flex items-center justify-center flex-shrink-0 overflow-hidden
            group-hover:scale-[1.08] group-hover:rotate-[4deg] transition-all duration-350 ease-out ${c.chipClass}`}
        >
          <c.Icon />
          <Ripples />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-poppins font-semibold text-white text-[13.5px] leading-none mb-[6px] tracking-[-0.005em]">{c.label}</p>
          <p className="font-inter text-white/40 text-[11px] tracking-[0.01em] truncate">{c.sub}</p>
        </div>
      </a>

      {c.copyValue && (
        <div className="relative flex-shrink-0 group/copy">
          <button
            type="button"
            onClick={() => onCopy(c.key, c.copyValue!)}
            aria-label={copied ? `${c.label} copied` : `Copy ${c.label}`}
            className={`w-7 h-7 rounded-lg flex items-center justify-center text-white/[0.35] hover:text-[#e6a84f] hover:bg-white/[0.06] transition-colors duration-250 ${focusRing}`}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={copied ? 'check' : 'copy'}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.18 }}
                className={copied ? 'text-[#6fd68a]' : ''}
              >
                {copied ? <IconCheck /> : <IconCopy />}
              </motion.span>
            </AnimatePresence>
          </button>
          {/* tooltip */}
          <span
            role="tooltip"
            className="pointer-events-none absolute -top-8 right-0 whitespace-nowrap rounded-md bg-[#0a1018] border border-white/10 px-2 py-1
              font-inter text-[10px] text-white/80 opacity-0 group-hover/copy:opacity-100 -translate-y-1 group-hover/copy:translate-y-0
              transition-all duration-200 shadow-[0_4px_14px_rgba(0,0,0,0.4)]"
          >
            {copied ? 'Copied!' : 'Copy'}
          </span>
        </div>
      )}

      <span className="flex-shrink-0 text-[#e6a84f] opacity-0 -translate-x-1.5 group-hover:opacity-80 group-hover:translate-x-0 transition-all duration-300 ease-out">
        <IconArrow />
      </span>
    </motion.div>
  );
}

function PanelHeader({ titleId, onClose }: { titleId: string; onClose?: () => void }) {
  return (
    <>
      <div className="relative flex items-center gap-3 px-5 lg:px-6 pt-5 lg:pt-6 pb-4 border-b border-white/[0.06]">
        <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0
          ring-1 ring-[#e6a84f]/[0.35] bg-white/[0.05] backdrop-blur-md shadow-[0_6px_18px_rgba(0,0,0,0.35)]">
          <img
            src="/images/logo.jpeg"
            alt="Sai Saktheeswari Security & Staffing Services"
            width={96}
            height={96}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-poppins font-bold text-white text-[13.5px] leading-tight tracking-[-0.005em]">Sai Saktheeswari</p>
          <p className="font-inter text-[#e6a84f]/80 text-[9px] tracking-[0.18em] uppercase mt-[3px]">Security &amp; Staffing</p>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close contact sheet"
            className={`w-8 h-8 rounded-lg flex items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.08] transition-colors duration-200 ${focusRing}`}
          >
            <IconClose />
          </button>
        )}
      </div>
      <div className="relative px-5 lg:px-6 pt-4 pb-2.5 overflow-hidden">
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05, ease: expo }}
          className="font-inter text-[#e6a84f] text-[10px] font-bold tracking-[0.28em] uppercase mb-2.5"
        >
          Get In Touch
        </motion.p>

        <div className="relative">
          <span
            aria-hidden
            className="pointer-events-none select-none absolute -top-6 -left-[3px] font-fraunces text-[58px] leading-none text-[#e6a84f]/[0.18]"
          >
            &ldquo;
          </span>
          <p
            id={titleId}
            className="relative pl-[3px] font-fraunces italic font-medium text-white/[0.94] text-[18px] lg:text-[19.5px] leading-snug tracking-[-0.005em]"
          >
            <QuoteReveal text="We typically reply within minutes." />
          </p>
          <motion.span
            aria-hidden
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.65, delay: 0.62, ease: expo }}
            style={{ transformOrigin: 'left' }}
            className="block h-[1.5px] w-9 bg-gradient-to-r from-[#e6a84f] to-[#e6a84f]/0 mt-3 ml-[3px]"
          />
        </div>
      </div>
    </>
  );
}

/* ── Word-by-word blur-rise reveal for the header quote — classic editorial pacing ── */
function QuoteReveal({ text }: { text: string }) {
  const words = text.split(' ');
  return (
    <>
      {words.map((word, i) => (
        <span key={i}>
          <motion.span
            initial={{ opacity: 0, y: 9, filter: 'blur(5px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.5, delay: 0.16 + i * 0.06, ease: expo }}
            className="inline-block"
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </>
  );
}

function PanelChannels({ channels, copiedKey, onCopy }: { channels: Channel[]; copiedKey: string | null; onCopy: (key: string, value: string) => void }) {
  return (
    <div className="relative px-5 lg:px-6 pt-3 pb-5 lg:pb-6">
      {channels.map((c, i) => (
        <div key={c.key}>
          <ChannelRow c={c} index={i} copiedKey={copiedKey} onCopy={onCopy} />
          {i < channels.length - 1 && <span className="block h-px bg-white/[0.06]" />}
        </div>
      ))}
    </div>
  );
}

export default function FloatingContact() {
  const waHref = `https://wa.me/${COMPANY.phone.whatsapp}?text=Hello, I am interested in your staffing services.`;
  const CHANNELS = buildChannels(waHref);

  const visible = useScrollAware();
  const [open, setOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const magneticRef = useMagnetic();
  const { copiedKey, copy } = useCopy();
  const panelTitleId = useId();
  const sheetTitleId = useId();

  useEffect(() => { if (!visible) { setOpen(false); setSheetOpen(false); } }, [visible]);
  useEscapeClose(open, () => setOpen(false));
  useEscapeClose(sheetOpen, () => setSheetOpen(false));

  return (
    <>
      {/* ── Tablet + Desktop — magnetic FAB & premium glass panel ── */}
      <div className="hidden md:block fixed bottom-7 right-6 lg:bottom-8 lg:right-7 z-50">
        <AnimatePresence>
          {visible && (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 18 }}
              transition={{ duration: 0.5, ease }}
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
              className="relative flex flex-col items-end"
            >
              <AnimatePresence>
                {open && (
                  <motion.div
                    role="dialog"
                    aria-labelledby={panelTitleId}
                    initial={{ opacity: 0, y: 14, scale: 0.94 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.96, transition: { duration: 0.22, ease } }}
                    transition={{ duration: 0.48, ease: expo }}
                    style={{ transformOrigin: 'bottom right' }}
                    className="relative w-[290px] lg:w-[324px] mb-4 rounded-[20px] lg:rounded-[24px] overflow-hidden
                      bg-[#060d14]/95 backdrop-blur-3xl border border-white/[0.08]
                      shadow-[0_24px_70px_rgba(0,0,0,0.6),0_1px_0_rgba(255,255,255,0.06)_inset,0_0_0_1px_rgba(230,168,79,0.08)]"
                  >
                    <motion.span
                      aria-hidden
                      initial={{ x: '-130%' }}
                      animate={{ x: '160%' }}
                      transition={{ duration: 1.1, ease: expo, delay: 0.12 }}
                      className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent -skew-x-12 pointer-events-none z-10"
                    />
                    <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    <span aria-hidden className="absolute -top-16 -right-10 w-44 h-44 bg-[#e6a84f]/[0.09] blur-3xl rounded-full pointer-events-none" />

                    <PanelHeader titleId={panelTitleId} />
                    <PanelChannels channels={CHANNELS} copiedKey={copiedKey} onCopy={copy} />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Magnetic FAB trigger */}
              <div ref={magneticRef} className="relative">
                <motion.span
                  aria-hidden
                  animate={open ? { opacity: 0 } : { opacity: [0.32, 0.6, 0.32], scale: [1, 1.16, 1] }}
                  transition={{ duration: 2.8, repeat: open ? 0 : Infinity, ease: 'easeInOut' }}
                  className="absolute inset-0 rounded-[20px] lg:rounded-[24px] bg-[#e6a84f]/25 blur-xl pointer-events-none"
                />
                <motion.button
                  type="button"
                  onClick={() => setOpen((o) => !o)}
                  animate={open ? { y: 0 } : { y: [0, -5, 0] }}
                  transition={open ? spring : { duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
                  whileHover={{ scale: 1.06, y: -3 }}
                  whileTap={{ scale: 0.93 }}
                  aria-label={open ? 'Close contact panel' : 'Open contact panel'}
                  aria-expanded={open}
                  className={`relative w-14 h-14 lg:w-16 lg:h-16 rounded-[20px] lg:rounded-[24px] flex items-center justify-center
                    bg-[#060d14]/[0.92] backdrop-blur-2xl border border-[#e6a84f]/25 hover:border-[#e6a84f]/[0.55]
                    shadow-[0_10px_40px_rgba(0,0,0,0.55),0_1px_0_rgba(255,255,255,0.06)_inset]
                    hover:shadow-[0_18px_54px_rgba(0,0,0,0.6),0_0_32px_rgba(230,168,79,0.2),0_1px_0_rgba(255,255,255,0.08)_inset]
                    text-[#e6a84f] overflow-hidden transition-[border-color,box-shadow] duration-400 ${focusRing}`}
                >
                  <span className="absolute inset-0 bg-gradient-to-br from-[#e6a84f]/[0.08] via-transparent to-transparent" />
                  <motion.svg
                    width="22" height="22" viewBox="0 0 24 24" fill="none"
                    animate={{ rotate: open ? 45 : 0 }}
                    transition={spring}
                    className="relative z-10"
                  >
                    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </motion.svg>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Mobile — FAB that expands into a premium bottom sheet ── */}
      <div className="md:hidden fixed bottom-6 right-5 z-50">
        <AnimatePresence>
          {visible && !sheetOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.4, ease }}
              className="relative"
            >
              <motion.span
                aria-hidden
                animate={{ opacity: [0.32, 0.6, 0.32], scale: [1, 1.16, 1] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 rounded-2xl bg-[#e6a84f]/25 blur-xl pointer-events-none"
              />
              <motion.button
                type="button"
                onClick={() => setSheetOpen(true)}
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
                whileTap={{ scale: 0.92 }}
                aria-label="Open contact options"
                aria-expanded={sheetOpen}
                className={`relative w-14 h-14 rounded-[20px] flex items-center justify-center
                  bg-[#060d14]/[0.92] backdrop-blur-2xl border border-[#e6a84f]/25
                  shadow-[0_10px_36px_rgba(0,0,0,0.55),0_1px_0_rgba(255,255,255,0.06)_inset]
                  text-[#e6a84f] overflow-hidden ${focusRing}`}
              >
                <span className="absolute inset-0 bg-gradient-to-br from-[#e6a84f]/[0.08] via-transparent to-transparent" />
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="relative z-10">
                  <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {sheetOpen && (
            <>
              <motion.div
                key="scrim"
                onClick={() => setSheetOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-[60] bg-black/[0.65] backdrop-blur-sm"
              />
              <motion.div
                key="sheet"
                role="dialog"
                aria-modal="true"
                aria-labelledby={sheetTitleId}
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ duration: 0.5, ease: expo }}
                className="fixed bottom-0 inset-x-0 z-[61] rounded-t-[28px] overflow-hidden
                  bg-[#060d14]/[0.97] backdrop-blur-3xl border-t border-white/[0.08]
                  shadow-[0_-20px_60px_rgba(0,0,0,0.6)] pb-[max(1.25rem,env(safe-area-inset-bottom))]"
              >
                <span aria-hidden className="absolute -top-10 right-0 w-40 h-40 bg-[#e6a84f]/[0.08] blur-3xl rounded-full pointer-events-none" />
                <div className="flex justify-center pt-3 pb-1">
                  <span className="w-10 h-1 rounded-full bg-white/20" />
                </div>
                <PanelHeader titleId={sheetTitleId} onClose={() => setSheetOpen(false)} />
                <PanelChannels channels={CHANNELS} copiedKey={copiedKey} onCopy={copy} />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
