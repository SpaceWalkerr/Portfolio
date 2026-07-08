/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Aged parchment ground
        paper: '#f2ead2',
        'paper-deep': '#e7dcbc',
        'paper-dark': '#d8c99e',
        // Sepia ink
        ink: '#2e2a1f',
        'ink-mute': '#6b6250',
        'ink-faint': 'rgba(46, 42, 31, 0.45)',
        // The one accent — herbarium green
        forest: '#3f5c33',
        'forest-bright': '#5c7a4a',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        serif: ['"EB Garamond"', 'Georgia', 'serif'],
        hand: ['"Caveat"', 'cursive'],
      },
    },
  },
  plugins: [],
};
