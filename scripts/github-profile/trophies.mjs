/**
 * Renders the "Honours" strip for the GitHub profile README — the strongest
 * achievements from src/data/certifications.ts, each under a wax seal.
 *
 *   node scripts/github-profile/trophies.mjs <out.png>
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import puppeteer from 'puppeteer';
import { root } from '../load-data.mjs';
import { THEMES, paint, suffixed } from './theme.mjs';

const out = path.resolve(process.argv[2] ?? path.join(root, 'docs/brand/honours.png'));
const font = (p) => `file://${path.join(root, 'node_modules', p)}`;

const HONOURS = [
  { seal: 'I', rank: 'Campus Winner', title: 'ACG Pack A Pitch 2.0', note: 'Technology & Engineering · 2026' },
  { seal: 'II', rank: 'Gold Medal', title: 'NPTEL · IIT Delhi', note: 'Human Computer Interaction · 90/100' },
  { seal: 'III', rank: 'First Place', title: 'Innovate 2024', note: 'Brand Revamp · SRM IST' },
  { seal: 'IV', rank: 'Lead Coordinator', title: 'Viksit Bharat 2047', note: 'International Conference · 2025' },
  { seal: 'V', rank: 'Campus Mantri', title: 'GeeksforGeeks', note: 'Campus Ambassador · 2024–25' },
];

const esc = (s) => s.replace(/&/g, '&amp;');
const html = `<!doctype html><html><head><style>
@font-face { font-family: Archivo; src: url(${font('@fontsource-variable/archivo/files/archivo-latin-wght-normal.woff2')}); font-weight: 100 900; }
@font-face { font-family: Newsreader; font-style: italic; src: url(${font('@fontsource-variable/newsreader/files/newsreader-latin-wght-italic.woff2')}); font-weight: 200 800; }
@font-face { font-family: 'Space Mono'; src: url(${font('@fontsource/space-mono/files/space-mono-latin-400-normal.woff2')}); }
* { box-sizing: border-box; } body { margin: 0; }
.mono { font: 400 11px 'Space Mono'; letter-spacing: .22em; text-transform: uppercase; }
.seal { width: 64px; height: 64px; border-radius: 50%; margin: 0 auto;
  background: radial-gradient(circle at 35% 30%, #b8433a, #8a2a2a 55%, #5e1a1a);
  box-shadow: 0 3px 0 rgba(0,0,0,.18), inset 0 -3px 6px rgba(0,0,0,.35), inset 0 3px 5px rgba(255,255,255,.18);
  display: flex; align-items: center; justify-content: center; position: relative; }
.seal::after { content: ''; position: absolute; inset: 7px; border-radius: 50%; border: 1.5px dashed rgba(233,228,214,.55); }
.seal span { font: italic 600 22px Newsreader; color: #f1e9d8; text-shadow: 0 1px 0 rgba(0,0,0,.35); }
</style></head><body>
<div style="width:1200px;background:#e9e4d6;color:#17171a;padding:22px 30px 30px">
  <div style="border-top:5px double #17171a"></div>
  <div style="display:flex;justify-content:space-between;align-items:baseline;padding:9px 0">
    <span class="mono" style="color:#8a2a2a">The Honours List</span>
    <span style="font:italic 400 20px Newsreader">Awards &amp; distinctions, on the record</span>
    <span class="mono" style="color:#57534a">surajnandan.in</span>
  </div>
  <div style="border-top:1px solid #17171a"></div>
  <div style="display:grid;grid-template-columns:repeat(5,1fr);margin-top:24px">
    ${HONOURS.map((h, i) => `
    <div style="text-align:center;padding:0 16px;${i ? 'border-left:1px solid rgba(23,23,26,.25);' : ''}">
      <div class="seal"><span>${h.seal}</span></div>
      <div class="mono" style="margin-top:16px;color:#8a2a2a">${esc(h.rank)}</div>
      <div style="margin-top:8px;font:900 22px/1.05 Archivo;letter-spacing:-.01em;text-transform:uppercase">${esc(h.title)}</div>
      <div style="margin-top:8px;font:italic 400 15px/1.3 Newsreader;color:#57534a">${esc(h.note)}</div>
    </div>`).join('')}
  </div>
  <div style="height:6px;background:#c6392b;margin:30px -30px -30px"></div>
</div></body></html>`;

for (const theme of THEMES) {
  const tmp = path.join(os.tmpdir(), `honours-${theme}-${Date.now()}.html`);
  fs.writeFileSync(tmp, paint(html, theme));
  const browser = await puppeteer.launch({ headless: 'new', args: ['--allow-file-access-from-files'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 400, deviceScaleFactor: 2 });
  await page.goto(`file://${tmp}`, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  const el = await page.$('body > div');
  await el.screenshot({ path: suffixed(out, theme) });
  await browser.close();
  fs.rmSync(tmp);
  console.log(`honours (${theme}): ${Math.round(fs.statSync(suffixed(out, theme)).size / 1024)} KB`);
}
