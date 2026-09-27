/**
 * Renders the "front page" project clippings for the GitHub profile README:
 * one newspaper card per case study, plus one for the portfolio itself.
 *
 *   node scripts/github-profile/cards.mjs <out-dir>
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import puppeteer from 'puppeteer';
import { loadData, root } from '../load-data.mjs';

const outDir = path.resolve(process.argv[2] ?? path.join(root, 'docs/brand/cards'));
fs.mkdirSync(outDir, { recursive: true });
const font = (p) => `file://${path.join(root, 'node_modules', p)}`;
const { projects, caseStudies } = await loadData();

const SLUGS = ['knot-ai', 'hospitality-ai', 'cardbridge', 'job-scheduler', 'gigshield'];
const cards = SLUGS.map((slug, i) => {
  const p = projects.find((x) => x.slug === slug);
  return {
    file: slug,
    no: String(i + 1).padStart(2, '0'),
    kicker: p.category,
    name: p.name,
    line: caseStudies[slug].thesis.replace(/`/g, ''),
    tags: p.tags.slice(0, 4),
    image: `file://${path.join(root, 'public', p.image)}`,
  };
});
// Some projects are better shown by their code than a screenshot (a login screen says nothing)
const CODE = {
  'job-scheduler': `<span style="color:#8a8578">-- claim jobs: no job ever runs twice</span>
<b>UPDATE</b> jobs <b>SET</b> status = <i>'claimed'</i>, worker_id = $1
<b>WHERE</b> id <b>IN</b> (
  <b>SELECT</b> j.id <b>FROM</b> jobs j
  <b>LEFT JOIN</b> jobs dep <b>ON</b> dep.id = j.depends_on_job_id
  <b>WHERE</b> j.status = <i>'queued'</i> <b>AND</b> j.run_at &lt;= now()
  <b>ORDER BY</b> j.priority <b>DESC</b>, j.run_at
  <b>LIMIT</b> $3
  <b>FOR UPDATE OF</b> j <b>SKIP LOCKED</b>
) <b>RETURNING</b> *;`,
};
for (const c of cards) if (CODE[c.file]) c.code = CODE[c.file];

cards.push({
  file: 'portfolio',
  no: '06',
  kicker: 'This paper',
  name: 'The Nandan Review',
  line: 'A portfolio set like a newspaper — with an AI editor, live stats and a crossword.',
  tags: ['React', 'TypeScript', 'Vercel', 'Claude API'],
  image: `file://${path.join(root, 'public', 'og-image.png')}`,
});

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'gh-cards-'));
const browser = await puppeteer.launch({ headless: 'new', args: ['--allow-file-access-from-files'] });
const page = await browser.newPage();
await page.setViewport({ width: 600, height: 470, deviceScaleFactor: 2 });

const boxes = {};
for (const c of cards) {
  const html = `<!doctype html><html><head><style>
@font-face { font-family: Archivo; src: url(${font('@fontsource-variable/archivo/files/archivo-latin-wght-normal.woff2')}); font-weight: 100 900; }
@font-face { font-family: Newsreader; font-style: italic; src: url(${font('@fontsource-variable/newsreader/files/newsreader-latin-wght-italic.woff2')}); font-weight: 200 800; }
@font-face { font-family: 'Space Mono'; src: url(${font('@fontsource/space-mono/files/space-mono-latin-400-normal.woff2')}); }
* { box-sizing: border-box; } body { margin: 0; }
.mono { font: 400 11px 'Space Mono'; letter-spacing: .2em; text-transform: uppercase; }
</style></head><body>
<div style="width:600px;height:470px;background:#e9e4d6;color:#17171a;padding:18px 22px;display:flex;flex-direction:column;position:relative;overflow:hidden">
  <div style="border-top:4px double #17171a"></div>
  <div style="display:flex;justify-content:space-between;align-items:baseline;padding:7px 0" class="mono">
    <span style="color:#8a2a2a">No. ${c.no} · ${esc(c.kicker)}</span><span style="color:#57534a">Read the case study →</span>
  </div>
  <div style="border-top:1px solid #17171a"></div>
  ${c.code
    ? `<pre style="margin:14px 0 0;height:222px;border:2px solid #17171a;background:#17171a;color:#e9e4d6;padding:16px 18px;font:400 12.5px/1.55 'Space Mono';overflow:hidden;white-space:pre">${c.code.replace(/<b>/g, '<b style="color:#e8604a;font-weight:400">').replace(/<i>/g, '<i style="color:#d8c9a3;font-style:normal">')}</pre>`
    : `<div id="shot" style="margin-top:14px;height:222px;border:2px solid #17171a;background:#17171a url('${c.image}') top center/cover;filter:grayscale(1) contrast(1.06)"></div>`}
  <h2 style="margin:14px 0 0;font:900 38px/0.95 Archivo;letter-spacing:-.025em;text-transform:uppercase">${esc(c.name)}</h2>
  <p style="margin:8px 0 0;font:italic 400 18px/1.3 Newsreader;color:#3d3a34">“${esc(c.line)}”</p>
  <div style="margin-top:auto;display:flex;gap:8px;flex-wrap:wrap">${c.tags.map((t) => `<span class="mono" style="font-size:9.5px;border:1px solid rgba(23,23,26,.35);padding:3px 7px;color:#57534a">${esc(t)}</span>`).join('')}</div>
  <div style="position:absolute;left:0;right:0;bottom:0;height:6px;background:#c6392b"></div>
</div></body></html>`;
  const file = path.join(tmp, `${c.file}.html`);
  fs.writeFileSync(file, html);
  await page.goto(`file://${file}`, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(outDir, `${c.file}.png`) });
  // Where the screenshot sits (CSS px), so animate-cards.mjs can overlay the live clip there
  const box = await page.$eval('#shot', (el) => el.getBoundingClientRect().toJSON()).catch(() => null);
  if (box) boxes[c.file] = { x: box.x, y: box.y, width: box.width, height: box.height };
  console.log(`card: ${c.file}.png`);
}
await browser.close();
fs.rmSync(tmp, { recursive: true, force: true });
fs.writeFileSync(path.join(outDir, 'boxes.json'), JSON.stringify(boxes, null, 2));
