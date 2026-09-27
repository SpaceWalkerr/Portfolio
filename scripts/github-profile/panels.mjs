/**
 * Section headers and text panels for the GitHub profile README, drawn as
 * SVG in the Scoreboard's style (double rule, mono kicker, italic serif,
 * vermilion foot) — one paper and one ink edition of each.
 *
 *   node scripts/github-profile/panels.mjs <out-dir>
 */
import fs from 'node:fs';
import path from 'node:path';
import { root } from '../load-data.mjs';

const outDir = path.resolve(process.argv[2] ?? path.join(root, 'docs/brand/panels'));
fs.mkdirSync(outDir, { recursive: true });

const PALETTE = {
  light: { bg: '#e9e4d6', ink: '#17171a', mute: '#57534a', faint: 'rgba(23,23,26,0.14)', accent: '#8a2a2a', rule: '#c6392b' },
  dark: { bg: '#141417', ink: '#e8e4d9', mute: '#a39f96', faint: 'rgba(232,228,217,0.14)', accent: '#e8604a', rule: '#e8604a' },
};
const W = 830;
const serif = "Georgia, 'Times New Roman', serif";
const sans = "'Helvetica Neue', Helvetica, Arial, sans-serif";
const mono = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

const frame = (t, h, label, inner) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${h}" viewBox="0 0 ${W} ${h}" role="img" aria-label="${esc(label)}">
  <rect width="${W}" height="${h}" fill="${t.bg}"/>
${inner}
</svg>
`;

/** A section masthead: double rule, section kicker, italic headline, single rule. */
const header = (t, kicker, title) =>
  frame(t, 74, title, `  <line x1="20" y1="18" x2="${W - 20}" y2="18" stroke="${t.ink}" stroke-width="1.5"/>
  <line x1="20" y1="22" x2="${W - 20}" y2="22" stroke="${t.ink}" stroke-width="1.5"/>
  <text x="20" y="50" fill="${t.accent}" font-family="${mono}" font-size="10.5" letter-spacing="2.6">${esc(kicker.toUpperCase())}</text>
  <text x="${W - 20}" y="52" fill="${t.ink}" font-family="${serif}" font-style="italic" font-size="24" text-anchor="end">${esc(title)}</text>
  <line x1="20" y1="64" x2="${W - 20}" y2="64" stroke="${t.ink}" stroke-width="1"/>`);

/** Three columns of principles, each with a roman numeral, a heading and wrapped text. */
const PRINCIPLES = [
  ['I', 'Keep the model’s job small', ['Let the LLM judge and phrase;', 'put the guarantees in code.']],
  ['II', 'The database is the referee', ['Transactions, state machines and', 'row-level security over intentions.']],
  ['III', 'Measure, then ship', ['Code-split, cached, tested — and', 'written up after, mistakes included.']],
];
const principles = (t) => {
  const colW = (W - 40) / 3;
  const cols = PRINCIPLES.map(([n, head, lines], i) => {
    const x = 20 + i * colW + (i ? 18 : 0);
    return `  ${i ? `<line x1="${20 + i * colW}" y1="20" x2="${20 + i * colW}" y2="126" stroke="${t.faint}" stroke-width="1"/>` : ''}
  <text x="${x}" y="42" fill="${t.accent}" font-family="${serif}" font-style="italic" font-size="22">${n}.</text>
  <text x="${x}" y="68" fill="${t.ink}" font-family="${sans}" font-weight="900" font-size="12.5" letter-spacing="0.3">${esc(head.toUpperCase())}</text>
  ${lines.map((l, j) => `<text x="${x}" y="${96 + j * 21}" fill="${t.mute}" font-family="${serif}" font-style="italic" font-size="14.5">${esc(l)}</text>`).join('\n  ')}`;
  }).join('\n');
  return frame(t, 150, 'How I work: keep the model’s job small; the database is the referee; measure, then ship.', `${cols}
  <rect x="0" y="145" width="${W}" height="5" fill="${t.rule}"/>`);
};

/** The toolbox as a classified-ads grid: category kicker, then the tools set in mono. */
const TOOLBOX = [
  ['Front end', ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Three.js']],
  ['Back end', ['Node.js', 'Express', 'Fastify', 'REST', 'WebSockets']],
  ['Data', ['PostgreSQL', 'Supabase', 'Prisma', 'SQLite', 'pgvector']],
  ['AI & more', ['Claude API', 'RAG', 'Python', 'Java', 'Vercel']],
];
const toolbox = (t) => {
  const colW = (W - 40) / 4;
  const cols = TOOLBOX.map(([cat, tools], i) => {
    const x = 20 + i * colW + (i ? 16 : 0);
    return `  ${i ? `<line x1="${20 + i * colW}" y1="20" x2="${20 + i * colW}" y2="170" stroke="${t.faint}" stroke-width="1"/>` : ''}
  <text x="${x}" y="40" fill="${t.accent}" font-family="${mono}" font-size="10.5" letter-spacing="2.4">${esc(cat.toUpperCase())}</text>
  ${tools.map((tool, j) => `<rect x="${x}" y="${58 + j * 23}" width="7" height="7" fill="${t.ink}"/><text x="${x + 16}" y="${65 + j * 23}" fill="${t.ink}" font-family="${mono}" font-size="12.5" letter-spacing="0.6">${esc(tool)}</text>`).join('\n  ')}`;
  }).join('\n');
  return frame(t, 190, `Toolbox: ${TOOLBOX.flatMap(([, x]) => x).join(', ')}`, `${cols}
  <rect x="0" y="185" width="${W}" height="5" fill="${t.rule}"/>`);
};

const HEADERS = {
  'front-page': ['Section A · The Front Page', 'Selected work, in clippings'],
  numbers: ['Section B · By the Numbers', 'The practice behind the portfolio'],
  oped: ['Section C · The Op-Ed', 'Latest from the writing desk'],
  work: ['Section D · How I Work', 'Three rules, set in type'],
  toolbox: ['Section E · The Toolbox', 'Filed by department'],
};

for (const [theme, t] of Object.entries(PALETTE)) {
  const sfx = theme === 'dark' ? '-dark' : '';
  for (const [name, [kicker, title]] of Object.entries(HEADERS)) {
    fs.writeFileSync(path.join(outDir, `h-${name}${sfx}.svg`), header(t, kicker, title));
  }
  fs.writeFileSync(path.join(outDir, `principles${sfx}.svg`), principles(t));
  fs.writeFileSync(path.join(outDir, `toolbox${sfx}.svg`), toolbox(t));
}
console.log(`panels: ${fs.readdirSync(outDir).length} files → ${outDir}`);
