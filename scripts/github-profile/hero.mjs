/**
 * Renders the animated masthead for the GitHub profile README: the name is
 * typeset letter by letter onto a newspaper front page, the rules draw in,
 * the red underline sweeps across, then the ticker runs.
 *
 *   node scripts/github-profile/hero.mjs <out.gif>
 *
 * Frames are rendered deterministically (every CSS animation is paused and
 * seeked per frame), then encoded with ffmpeg's two-pass palette for a clean GIF.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const root = path.resolve(fileURLToPath(import.meta.url), '../../..');
const out = path.resolve(process.argv[2] ?? path.join(root, 'docs/brand/github-hero.gif'));
const font = (p) => `file://${path.join(root, 'node_modules', p)}`;

const W = 1280, H = 330, FPS = 20, DURATION = 5.2, HOLD = 2.4;
const NAME = 'SURAJ NANDAN';
const TICKER = ['875+ LeetCode problems', '5 case studies', 'ACG Pack A Pitch 2.0 · Campus Winner', 'NPTEL Gold Medal', 'surajnandan.in'];

// Each letter stamps in on its own delay; the underline lives inside the surname so it always fits it
let n = 0;
const stamp = (word) =>
  [...word].map((ch) => `<span class="l" style="animation-delay:${(0.55 + n++ * 0.085).toFixed(3)}s">${ch}</span>`).join('');
const [firstName, surname] = NAME.split(' ');
const letters = `${stamp(firstName)}<span style="display:inline-block;width:.3em"></span><span class="word">${stamp(surname)}<span class="under"></span></span>`;
const tick = [...TICKER, ...TICKER].map((t) => `<span><b>✦</b>${t}</span>`).join('');

const html = `<!doctype html><html><head><style>
@font-face { font-family: Archivo; src: url(${font('@fontsource-variable/archivo/files/archivo-latin-wght-normal.woff2')}); font-weight: 100 900; }
@font-face { font-family: Newsreader; font-style: italic; src: url(${font('@fontsource-variable/newsreader/files/newsreader-latin-wght-italic.woff2')}); font-weight: 200 800; }
@font-face { font-family: 'Space Mono'; src: url(${font('@fontsource/space-mono/files/space-mono-latin-400-normal.woff2')}); }
* { box-sizing: border-box; }
body { margin: 0; }
.page { width: ${W}px; height: ${H}px; background: #e9e4d6; color: #17171a; position: relative; overflow: hidden; padding: 26px 48px 0; }
.grain { position: absolute; inset: 0; opacity: .035; background-image: radial-gradient(#000 1px, transparent 1.2px); background-size: 3px 3px; }
.mono { font: 400 13px 'Space Mono'; letter-spacing: .24em; text-transform: uppercase; }
.rule2 { border-top: 5px double #17171a; transform-origin: left; animation: draw .5s cubic-bezier(.16,1,.3,1) both; }
.rule1 { border-top: 1px solid #17171a; transform-origin: left; animation: draw .6s .15s cubic-bezier(.16,1,.3,1) both; }
.fold { display: flex; justify-content: space-between; align-items: baseline; padding: 9px 0; animation: fade .5s .2s both; }
.row { display: flex; align-items: center; justify-content: space-between; height: 186px; }
h1 { margin: 0; font: 900 96px/0.9 Archivo; letter-spacing: -.035em; white-space: nowrap; position: relative; isolation: isolate; }
.l { display: inline-block; animation: stamp .42s cubic-bezier(.2,1.4,.4,1) both; }
.word { position: relative; display: inline-block; }
.under { position: absolute; left: -.03em; right: -.03em; bottom: .02em; height: .15em; background: #c6392b; z-index: -1; transform-origin: left; animation: draw .55s 1.75s cubic-bezier(.16,1,.3,1) both; }
.side { text-align: right; white-space: nowrap; animation: fade .6s 2.15s both; }
.side .role { font: italic 400 32px/1.1 Newsreader; }
.side .mono { margin-top: 12px; color: #8a2a2a; }
.ticker { position: absolute; left: 0; right: 0; bottom: 0; height: 44px; background: #17171a; color: #e9e4d6; display: flex; align-items: center; overflow: hidden; animation: rise .45s 2.65s cubic-bezier(.16,1,.3,1) both; }
.track { display: flex; white-space: nowrap; animation: scroll 9s 2.65s linear both; }
.track span { font: 400 13px 'Space Mono'; letter-spacing: .2em; text-transform: uppercase; padding: 0 22px; }
.track b { color: #c6392b; font-weight: 400; margin-right: 22px; }
@keyframes draw { from { transform: scaleX(0) } to { transform: scaleX(1) } }
@keyframes fade { from { opacity: 0; transform: translateY(6px) } to { opacity: 1; transform: none } }
@keyframes stamp { 0% { opacity: 0; transform: translateY(-38px) scale(1.35); filter: blur(3px) } 60% { opacity: 1; filter: blur(0) } 100% { opacity: 1; transform: none } }
@keyframes rise { from { transform: translateY(100%) } to { transform: none } }
@keyframes scroll { from { transform: translateX(0) } to { transform: translateX(-620px) } }
</style></head><body>
<div class="page"><div class="grain"></div>
  <div class="rule2"></div>
  <div class="fold"><span style="font:italic 400 22px Newsreader">The Nandan Review</span><span class="mono" style="color:#8a2a2a">Extra Edition</span><span class="mono" style="color:#57534a">surajnandan.in</span></div>
  <div class="rule1"></div>
  <div class="row">
    <h1>${letters}</h1>
    <div class="side"><div class="role">Full-Stack &amp; AI Engineer</div><div class="mono">Kishanganj · India</div></div>
  </div>
  <div class="ticker"><div class="track">${tick}</div></div>
</div></body></html>`;

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'gh-hero-'));
fs.writeFileSync(path.join(tmp, 'page.html'), html);
const browser = await puppeteer.launch({ headless: 'new', args: ['--allow-file-access-from-files'] });
const page = await browser.newPage();
await page.setViewport({ width: W, height: H, deviceScaleFactor: 1 });
await page.goto(`file://${path.join(tmp, 'page.html')}`, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
await page.evaluate(() => document.getAnimations().forEach((a) => a.pause()));

const frames = Math.round(DURATION * FPS);
for (let f = 0; f < frames; f++) {
  const ms = (f / FPS) * 1000;
  await page.evaluate((t) => document.getAnimations().forEach((a) => (a.currentTime = t)), ms);
  await page.screenshot({ path: path.join(tmp, `f${String(f).padStart(4, '0')}.png`) });
}
// Hold on the finished front page before the loop restarts (identical frames cost almost nothing in a GIF)
const last = path.join(tmp, `f${String(frames - 1).padStart(4, '0')}.png`);
for (let h = 0; h < HOLD * FPS; h++) fs.copyFileSync(last, path.join(tmp, `f${String(frames + h).padStart(4, '0')}.png`));
await browser.close();

execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-framerate', String(FPS), '-i', path.join(tmp, 'f%04d.png'),
  '-vf', 'split[a][b];[a]palettegen=max_colors=96:stats_mode=diff[p];[b][p]paletteuse=dither=none:diff_mode=rectangle',
  '-loop', '0', out]);
fs.rmSync(tmp, { recursive: true, force: true });
console.log(`hero: ${Math.round(fs.statSync(out).size / 1024)} KB → ${out}`);
