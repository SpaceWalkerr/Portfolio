/**
 * Records a short scroll-through clip of each project's live site.
 *
 *   npm run clips            # all projects
 *   npm run clips knot-ai    # only matching slugs
 *
 * Writes public/clips/<slug>.mp4 (silent, 960x600, ~7s, H.264) and
 * src/data/clips.json, the list of slugs that have a clip. Needs ffmpeg on
 * PATH. Sites that fail to load are skipped and keep their still screenshot.
 */
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const root = path.resolve(fileURLToPath(import.meta.url), '../..');
const outDir = path.join(root, 'public', 'clips');
const manifest = path.join(root, 'src', 'data', 'clips.json');
const VIEWPORT = { width: 1280, height: 800 };
const SETTLE_MS = 3_500;
const SCROLL_MS = 6_000;

const only = process.argv.slice(2);
const src = fs.readFileSync(path.join(root, 'src', 'data', 'projects.ts'), 'utf8');
const entries = [...src.matchAll(/slug:\s*'([^']+)'[\s\S]*?liveDemo:\s*'([^']+)'/g)]
  .map((m) => ({ slug: m[1], url: m[2] }))
  .filter((e) => (only.length ? only.includes(e.slug) : true));

fs.mkdirSync(outDir, { recursive: true });
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'clips-'));
const browser = await puppeteer.launch({
  headless: 'new',
  args: ['--no-sandbox', '--hide-scrollbars', '--force-color-profile=srgb'],
});

const recorded = new Set(fs.existsSync(manifest) ? JSON.parse(fs.readFileSync(manifest, 'utf8')) : []);

for (const { slug, url } of entries) {
  const page = await browser.newPage();
  await page.setViewport(VIEWPORT);
  const webm = path.join(tmp, `${slug}.webm`);
  process.stdout.write(`• ${slug.padEnd(22)} … `);
  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60_000 });
    await new Promise((r) => setTimeout(r, SETTLE_MS));
    // A page that barely scrolls (e.g. a login screen) makes a still video — keep the screenshot instead
    const scrollable = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
    if (scrollable < 400) throw new Error(`only ${scrollable}px to scroll`);
    const recorder = await page.screencast({ path: webm });
    // An eased scroll through up to ~2.5 screens, then a beat at the end
    await page.evaluate(async (duration) => {
      const target = Math.min(document.documentElement.scrollHeight - innerHeight, innerHeight * 2.5);
      const start = performance.now();
      await new Promise((done) => {
        const step = (now) => {
          const t = Math.min((now - start) / duration, 1);
          const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
          scrollTo(0, target * eased);
          if (t < 1) requestAnimationFrame(step);
          else setTimeout(done, 700);
        };
        requestAnimationFrame(step);
      });
    }, SCROLL_MS);
    await recorder.stop();

    const mp4 = path.join(outDir, `${slug}.mp4`);
    execFileSync('ffmpeg', [
      '-y', '-loglevel', 'error', '-i', webm,
      '-vf', 'scale=960:-2,fps=24', '-an',
      '-c:v', 'libx264', '-preset', 'slow', '-crf', '30', '-pix_fmt', 'yuv420p',
      '-movflags', '+faststart', mp4,
    ]);
    recorded.add(slug);
    console.log(`ok (${Math.round(fs.statSync(mp4).size / 1024)} KB)`);
  } catch (err) {
    recorded.delete(slug);
    fs.rmSync(path.join(outDir, `${slug}.mp4`), { force: true });
    console.log(`skipped (${err.message.split('\n')[0]})`);
  } finally {
    await page.close();
  }
}

await browser.close();
fs.rmSync(tmp, { recursive: true, force: true });
fs.writeFileSync(manifest, JSON.stringify([...recorded].sort(), null, 2) + '\n');
console.log(`\n${recorded.size} clips listed in src/data/clips.json`);
