/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Shared "Press" brand tokens (the multiverse is the meta-layer above the universes)
        paper: '#E9E4D6',
        'paper-bright': '#EFEBDF',
        ink: '#17171A',
        'ink-mute': '#57534A',
        oxblood: '#8A2A2A',
        vermilion: '#C6392B',
        // The void between universes
        space: '#05060A',
      },
      fontFamily: {
        display: ['"Archivo Variable"', 'Archivo', 'Arial Black', 'sans-serif'],
        editorial: ['"Newsreader Variable"', 'Newsreader', 'Georgia', 'serif'],
        monopress: ['"Space Mono"', 'ui-monospace', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [],
};
