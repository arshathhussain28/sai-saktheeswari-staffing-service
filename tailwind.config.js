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
        'gold': '#e6a84f',
        'gold-dark': '#c8902e',
        'off-white': '#f8f9fa',
        'text-primary': '#1a2a3a',
        'text-muted': '#6b7c8d',
      },
      fontFamily: {
        poppins: ['var(--font-poppins)', 'Poppins', 'sans-serif'],
        inter: ['var(--font-inter)', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, rgba(13,79,100,0.92) 0%, rgba(14,31,47,0.75) 100%)',
        'gold-gradient': 'linear-gradient(135deg, #e6a84f 0%, #c8902e 100%)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'count-up': 'countUp 2s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
