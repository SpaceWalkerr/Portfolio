/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Aged case-file manila
        paper: '#e4ddc8',
        'paper-deep': '#d6cca9',
        'paper-dark': '#c4b790',
        // Typewriter ink
        ink: '#1c1815',
        'ink-mute': '#5c5347',
        'ink-faint': 'rgba(28, 24, 21, 0.45)',
        // The one accent — case-stamp red
        blood: '#8a1f1f',
        'blood-bright': '#b32b2b',
        redaction: '#111010',
      },
      fontFamily: {
        display: ['"Special Elite"', '"Courier New"', 'monospace'],
        mono: ['"Courier Prime"', '"Courier New"', 'monospace'],
      },
    },
  },
  plugins: [],
};
