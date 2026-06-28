/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'teal': {
          primary: '#0d4f64',
          secondary: '#2d7a97',
          light: '#e8f4f8',
        },
        'navy': '#0e1f2f',
        'gold': {
          DEFAULT: '#e6a84f',
          light: '#f0be6a',
          dark: '#c8902e',
        },
        'gold-dark': '#c8902e',
        'off-white': '#f8f9fa',
        'text-primary': '#1a2a3a',
        'text-muted': '#6b7c8d',
        /* Premium dark-surface ramp — formalised from existing section usage */
        'ink': {
          900: '#04090f',
          800: '#050d1a',
          700: '#060d1c',
          600: '#0a1422',
          500: '#0e1f2f',
        },
      },
      fontFamily: {
        poppins: ['var(--font-poppins)', 'Poppins', 'sans-serif'],
        inter: ['var(--font-inter)', 'Inter', 'sans-serif'],
        fraunces: ['var(--font-fraunces)', 'Fraunces', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, rgba(13,79,100,0.92) 0%, rgba(14,31,47,0.75) 100%)',
        'gold-gradient': 'linear-gradient(135deg, #e6a84f 0%, #c8902e 100%)',
        'gold-sheen': 'linear-gradient(135deg, #f0be6a 0%, #e6a84f 45%, #c8902e 100%)',
        'ink-fade': 'linear-gradient(180deg, #050d1a 0%, #04090f 100%)',
      },
      boxShadow: {
        'glass': '0 8px 40px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.04)',
        'float': '0 24px 70px rgba(0,0,0,0.45)',
        'gold-glow': '0 4px 24px rgba(230,168,79,0.44), inset 0 1px 0 rgba(255,255,255,0.28)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'count-up': 'countUp 2s ease-out forwards',
        'shimmer': 'shimmer 2.5s ease-in-out infinite',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%, 100%': { transform: 'translateX(-100%)' },
          '50%': { transform: 'translateX(100%)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};
