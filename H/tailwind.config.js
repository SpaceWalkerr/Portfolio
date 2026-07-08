/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // The cabinet void
        void: '#14132b',
        'void-deep': '#0b0a1c',
        'void-bright': '#1e1d3d',
        // Pixel ink
        ink: '#eef0fb',
        'ink-mute': '#8c8ab0',
        // Player 1 — the primary accent
        gold: '#ffcc00',
        'gold-bright': '#ffe066',
        // Player 2 — a sparing secondary, tags/badges only
        cyan: '#4fd1e8',
      },
      fontFamily: {
        display: ['"Press Start 2P"', 'monospace'],
        mono: ['"VT323"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};
