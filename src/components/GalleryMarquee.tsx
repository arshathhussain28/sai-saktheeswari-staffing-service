'use client';

import { motion } from 'framer-motion';
import { GALLERY_IMAGES } from '@/lib/gallery';

const easeExpo = [0.16, 1, 0.3, 1] as [number, number, number, number];
const DURATIONS = ['78s', '94s', '84s'];

export default function GalleryMarquee() {
  // distribute all images across 3 rows
  const rows: string[][] = [[], [], []];
  GALLERY_IMAGES.forEach((src, i) => rows[i % 3].push(src));

  return (
    <section className="relative bg-[#04090f] py-20 lg:py-28 overflow-hidden border-t border-white/[0.05]">
      {/* ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_50%_0%,rgba(230,168,79,0.07),transparent)] pointer-events-none" />

      {/* header */}
      <motion.div
        initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: easeExpo }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-14 lg:mb-16">
        <div className="inline-flex items-center gap-2.5 mb-6">
          <span className="w-8 h-px bg-[#e6a84f]" />
          <span className="font-inter text-[#f0be6a] text-[11px] tracking-[0.4em] uppercase">Our People · In Frame</span>
          <span className="w-8 h-px bg-[#e6a84f]" />
        </div>
        <h2 className="font-poppins font-extrabold text-white text-4xl lg:text-6xl leading-[1.04]">
          Thirty-five years,
          <span className="block font-fraunces italic font-medium bg-gradient-to-r from-[#f7d99a] to-[#c8902e] bg-clip-text text-transparent mt-1">in pictures.</span>
        </h2>
        <p className="font-inter text-white/60 text-base lg:text-lg max-w-xl mx-auto mt-5">
          {GALLERY_IMAGES.length} real moments from the field — training, ceremony and deployment. Hover to pause.
        </p>
      </motion.div>

      {/* marquee rows */}
      <div className="relative space-y-4 lg:space-y-5">
        {rows.map((row, r) => (
          <div key={r} className="marquee-row relative flex overflow-hidden">
            <div
              className={`marquee-track flex gap-4 lg:gap-5 ${r % 2 ? 'rev' : ''}`}
              style={{ ['--dur' as string]: DURATIONS[r] }}
            >
              {[...row, ...row].map((src, i) => (
                <div
                  key={`${r}-${i}`}
                  className="group relative flex-shrink-0 w-56 h-40 lg:w-72 lg:h-48 rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-[0_14px_34px_rgba(0,0,0,0.45)]
                    transition-[box-shadow,transform] duration-500 hover:ring-[#e6a84f]/40 hover:shadow-[0_22px_50px_rgba(0,0,0,0.6)]"
                >
                  <img
                    src={src}
                    alt="Sai Saktheeswari workforce — real deployment moment"
                    loading="lazy"
                    className="w-full h-full object-cover brightness-[0.92] transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-110"
                  />
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/[0.06]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#04090f]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* edge fades */}
      <div className="absolute inset-y-0 left-0 w-20 sm:w-28 lg:w-44 bg-gradient-to-r from-[#04090f] via-[#04090f]/80 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-20 sm:w-28 lg:w-44 bg-gradient-to-l from-[#04090f] via-[#04090f]/80 to-transparent pointer-events-none z-10" />
    </section>
  );
}
