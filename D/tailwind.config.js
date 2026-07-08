/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // The void this whole cockpit floats in
        void: '#0b0416',
        'void-deep': '#050208',
        'void-bright': '#150a2e',
        // Terminal readout ink
        ink: '#e8f9ff',
        'ink-mute': '#8fa8c2',
        // Neon signage
        'neon-pink': '#ff5ea8',
        'neon-cyan': '#5eecff',
        'neon-cyan-bright': '#7bf0ff',
        'neon-violet': '#c23fda',
        'neon-amber': '#ffd15e',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'ui-monospace', 'Menlo', 'monospace'],
        display: ['"Orbitron"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
