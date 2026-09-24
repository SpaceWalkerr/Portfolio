/**
 * Renders docs/brand/github-banner.png — the header for the GitHub profile
 * README (github.com/SpaceWalkerr), in the site's own type. 2x for sharp
 * retina display. Re-run after changing the headline:
 *   node scripts/github-banner.mjs
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const root = path.resolve(fileURLToPath(import.meta.url), '../..');
const font = (p) => `file://${path.join(root, 'node_modules', p)}`;

const html = `<!doctype html><html><head><style>
@font-face { font-family: Archivo; src: url(${font('@fontsource-variable/archivo/files/archivo-latin-wght-normal.woff2')}); font-weight: 100 900; }
@font-face { font-family: Newsreader; font-style: italic; src: url(${font('@fontsource-variable/newsreader/files/newsreader-latin-wght-italic.woff2')}); font-weight: 200 800; }
@font-face { font-family: 'Space Mono'; src: url(${font('@fontsource/space-mono/files/space-mono-latin-400-normal.woff2')}); }
body { margin: 0; }
.mono { font: 400 13px 'Space Mono'; letter-spacing: .24em; text-transform: uppercase; }
</style></head><body>
<div style="width:1280px;height:300px;box-sizing:border-box;padding:28px 48px 0;background:#e9e4d6;color:#17171a;display:flex;flex-direction:column">
  <div style="border-top:5px double #17171a;padding-top:9px;display:flex;justify-content:space-between;align-items:baseline">
    <span style="font:italic 400 22px Newsreader">The Nandan Review</span>
    <span class="mono" style="color:#57534a">surajnandan.in</span>
  </div>
  <div style="border-top:1px solid #17171a;margin-top:9px"></div>
  <div style="flex:1;display:flex;align-items:center;justify-content:space-between;gap:40px">
    <h1 style="isolation:isolate;margin:0;font:900 88px/0.9 Archivo;letter-spacing:-.035em;text-transform:uppercase;white-space:nowrap">Suraj <span style="position:relative;display:inline-block">Nandan<span style="position:absolute;left:-3px;right:-3px;bottom:5px;height:13px;background:#c6392b;z-index:-1"></span></span></h1>
    <div style="text-align:right;flex-shrink:0">
      <div style="font:italic 400 30px/1.1 Newsreader">Full-Stack &amp; AI Engineer</div>
      <div class="mono" style="margin-top:10px;color:#8a2a2a">Kishanganj · India</div>
    </div>
  </div>
  <div style="height:9px;background:#c6392b;margin:0 -48px"></div>
</div>
</body></html>`;

const tmp = path.join(os.tmpdir(), `gh-banner-${Date.now()}.html`);
fs.writeFileSync(tmp, html);
const browser = await puppeteer.launch({ headless: 'new', args: ['--allow-file-access-from-files'] });
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 300, deviceScaleFactor: 2 });
await page.goto(`file://${tmp}`, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: path.join(root, 'docs', 'brand', 'github-banner.png') });
await browser.close();
fs.rmSync(tmp);
console.log('github-banner.png written');
