/**
 * The two editions of the profile artwork. Templates are written in the
 * paper palette; paint() swaps each paper colour for its ink-edition twin,
 * matching the Scoreboard's dark variant (#141417 ground, cream type,
 * vermilion accents). Colours that must survive both editions (e.g. the
 * code panel) use hexes that aren't in this map.
 */
export const INK = {
  '#e9e4d6': '#141417', // paper ground → ink ground
  '#17171a': '#e8e4d9', // ink type → cream type
  '#57534a': '#a39f96', // muted type
  '#8a2a2a': '#e8604a', // oxblood accent → vermilion
  '#c6392b': '#e8604a', // vermilion rule
  '#3d3a34': '#cfcac0', // quote type
  'rgba(23,23,26,.35)': 'rgba(232,228,217,.3)',
  'rgba(23,23,26,.25)': 'rgba(232,228,217,.2)',
  'radial-gradient(#000 1px': 'radial-gradient(#fff 1px',
};

export const THEMES = ['light', 'dark'];

export function paint(html, theme) {
  if (theme !== 'dark') return html;
  let out = html;
  for (const [from, to] of Object.entries(INK)) out = out.split(from).join(to);
  return out;
}

/** "out.png" → "out-dark.png" for the ink edition */
export const suffixed = (file, theme) => (theme === 'dark' ? file.replace(/(\.[a-z]+)$/i, '-dark$1') : file);
