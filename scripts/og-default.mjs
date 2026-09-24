/**
 * Renders public/og-image.png — the 1200x630 card shown when surajnandan.in is
 * shared. Name first, in the paper's own type. Re-run after changing the headline:
 *   node scripts/og-default.mjs
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const root = path.resolve(fileURLToPath(import.meta.url), '../..');
const font = (p) => `file://${path.join(root, 'node_modules', p)}`;
const photo = `file://${path.join(root, 'public', 'profile.webp')}`;

const html = `<!doctype html><html><head><style>
@font-face { font-family: Archivo; src: url(${font('@fontsource-variable/archivo/files/archivo-latin-wght-normal.woff2')}); font-weight: 100 900; }
@font-face { font-family: Newsreader; font-style: italic; src: url(${font('@fontsource-variable/newsreader/files/newsreader-latin-wght-italic.woff2')}); font-weight: 200 800; }
@font-face { font-family: 'Space Mono'; src: url(${font('@fontsource/space-mono/files/space-mono-latin-400-normal.woff2')}); }
body { margin: 0; }
.card { width: 1200px; height: 630px; box-sizing: border-box; padding: 52px 60px 0; background: #e9e4d6; color: #17171a; display: flex; flex-direction: column; position: relative; overflow: hidden; }
.mono { font: 400 15px 'Space Mono'; letter-spacing: .22em; text-transform: uppercase; }
</style></head><body>
<div class="card">
  <div style="border-top:6px double #17171a;padding-top:12px;display:flex;justify-content:space-between;align-items:baseline">
    <span style="font:italic 400 30px Newsreader">The Nandan Review</span>
    <span class="mono" style="color:#57534a">surajnandan.in</span>
  </div>
  <div style="border-top:1px solid #17171a;margin-top:12px"></div>
  <div style="flex:1;display:flex;gap:44px;align-items:center">
    <div style="flex:1">
      <div class="mono" style="color:#8a2a2a;letter-spacing:.3em">Portfolio · Case Studies · Writing</div>
      <h1 style="isolation:isolate;margin:14px 0 0;font:900 124px/0.86 Archivo;letter-spacing:-.035em;text-transform:uppercase">Suraj<br><span style="position:relative;display:inline-block">Nandan<span style="position:absolute;left:-4px;right:-4px;bottom:8px;height:18px;background:#c6392b;z-index:-1"></span></span></h1>
      <p style="margin:26px 0 0;font:italic 400 36px/1.15 Newsreader;color:#17171a">Full-Stack &amp; AI Engineer</p>
      <p style="margin:10px 0 0;font:italic 400 22px/1.35 Newsreader;color:#57534a">Reliable web products and grounded AI systems, built end to end.</p>
    </div>
    <div style="width:330px;height:390px;border:2px solid #17171a;flex-shrink:0;background:#efebdf url('${photo}') center/cover;filter:grayscale(1) contrast(1.08)"></div>
  </div>
  <div style="height:12px;background:#c6392b;margin:0 -60px"></div>
</div>
</body></html>`;

const tmp = path.join(os.tmpdir(), `og-default-${Date.now()}.html`);
fs.writeFileSync(tmp, html);
const browser = await puppeteer.launch({ headless: 'new', args: ['--allow-file-access-from-files'] });
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630 });
await page.goto(`file://${tmp}`, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: path.join(root, 'public', 'og-image.png') });
await browser.close();
fs.rmSync(tmp);
console.log('og-image.png written');
