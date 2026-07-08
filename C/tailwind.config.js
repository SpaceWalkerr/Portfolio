/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Cyanotype ground — the blueprint blue this whole universe is drawn on
        blueprint: '#0f3f78',
        'blueprint-deep': '#0a2d59',
        'blueprint-shadow': '#082343',
        'blueprint-bright': '#144c8f',
        // Cyanotype line ink (off-white, never pure white)
        ink: '#eaf2ff',
        'ink-mute': '#9fc0e8',
        'ink-faint': 'rgba(234, 242, 255, 0.4)',
        // A single warm accent, used sparingly — approvals, stamps, primary CTAs
        brass: '#c9a24a',
        'brass-soft': '#e0c789',
        // Pale accent used for callout numerals / leader-line badges
        'cyan-pale': '#bcd6f5',
      },
      fontFamily: {
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'Menlo', 'monospace'],
        sans: ['"IBM Plex Sans"', 'system-ui', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
