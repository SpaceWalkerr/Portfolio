/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Mission control void
        void: '#080b12',
        'void-deep': '#04060a',
        'void-bright': '#111726',
        // Telemetry readout ink
        ink: '#dce8f5',
        'ink-mute': '#6b7d94',
        // The one accent — warning-light amber
        amber: '#ffb020',
        'amber-bright': '#ffc95c',
      },
      fontFamily: {
        display: ['"Michroma"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"Share Tech Mono"', 'ui-monospace', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [],
};
