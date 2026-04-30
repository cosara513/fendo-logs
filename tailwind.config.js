/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'brand-red': '#8B1538',
        'brand-red-dark': '#5C0F26',
        'brand-gold': '#B8956A',
        'brand-gold-light': '#D4B896',
        'ink': '#121212',
        'ink-secondary': '#4A4A4A',
        'ink-muted': '#8C8C8C',
        'surface': '#FAFAFA',
        'surface-elevated': '#FFFFFF',
        'border-subtle': '#E5E5E5',
        'border-strong': '#D0D0D0',
      },
      fontFamily: {
        serif: ['"Noto Serif SC"', 'Georgia', 'serif'],
        sans: ['"Noto Sans SC"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
