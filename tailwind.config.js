/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // "The Press" design system
        paper: '#E9E4D6',
        'paper-bright': '#EFEBDF',
        ink: '#17171A',
        'ink-mute': '#57534A',
        'ink-faint': '#847E70',
        oxblood: '#8A2A2A',
        vermilion: '#C6392B',
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
