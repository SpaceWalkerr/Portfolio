/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // "The Press" design system — mapped to CSS variables for theme switching
        paper: 'var(--color-paper)',
        'paper-bright': 'var(--color-paper-bright)',
        ink: 'var(--color-ink)',
        'ink-mute': 'var(--color-ink-mute)',
        'ink-faint': 'var(--color-ink-faint)',
        oxblood: 'var(--color-oxblood)',
        vermilion: 'var(--color-vermilion)',
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
