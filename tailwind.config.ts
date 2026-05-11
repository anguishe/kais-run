import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          black:    '#0F1117',
          charcoal: '#1A1F2E',
          teal:     '#0A5C52',
          gold:     '#C9963A',
          offwhite: '#F0EDE6',
          gray:     '#9A9590',
        },
      },
      fontFamily: {
        display: ['var(--font-bebas)', 'sans-serif'],
        body:    ['var(--font-dm-sans)', 'sans-serif'],
      },
      spacing: { section: '7rem' },
    },
  },
  plugins: [],
};
export default config;
