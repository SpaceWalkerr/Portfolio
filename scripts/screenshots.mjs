/**
 * Auto-generate project thumbnails from their live sites.
 *
 *   npm run shots            # all projects
 *   npm run shots knot-ai    # only matching slugs
 *
 * Writes public/shots/<slug>.jpg at 1280x800. Projects keep an Unsplash
 * `fallbackImage` in src/data/projects.ts, so a missing/failed shot degrades
 * gracefully via the <img onError> handlers.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const root = path.resolve(fileURLToPath(import.meta.url), '../..');
const outDir = path.join(root, 'public', 'shots');
const dataFile = path.join(root, 'src', 'data', 'projects.ts');

const VIEWPORT = { width: 1280, height: 800 };
const NAV_TIMEOUT = 45_000;
const SETTLE_MS = 3_500;

const only = process.argv.slice(2);

const src = fs.readFileSync(dataFile, 'utf8');
const entries = [...src.matchAll(/slug:\s*'([^']+)'[\s\S]*?liveDemo:\s*'([^']+)'/g)]
  .map((m) => ({ slug: m[1], url: m[2] }))
  .filter((e) => (only.length ? only.includes(e.slug) : true));

if (!entries.length) {
  console.error('No matching projects found.');
  process.exit(1);
}

fs.mkdirSync(outDir, { recursive: true });

const browser = await puppeteer.launch({
  headless: 'new',
  args: ['--no-sandbox', '--hide-scrollbars', '--force-color-profile=srgb'],
});

let ok = 0;
let failed = 0;

for (const { slug, url } of entries) {
  const page = await browser.newPage();
  await page.setViewport({ ...VIEWPORT, deviceScaleFactor: 1 });
  try {
    process.stdout.write(`• ${slug.padEnd(20)} ${url} … `);
    await page.goto(url, { waitUntil: 'networkidle2', timeout: NAV_TIMEOUT });
    await new Promise((r) => setTimeout(r, SETTLE_MS));
    await page.screenshot({
      path: path.join(outDir, `${slug}.jpg`),
      type: 'jpeg',
      quality: 82,
      clip: { x: 0, y: 0, ...VIEWPORT },
    });
    console.log('ok');
    ok++;
  } catch (err) {
    console.log(`FAILED (${err.message.split('\n')[0]})`);
    failed++;
  } finally {
    await page.close();
  }
}

await browser.close();
console.log(`\nDone — ${ok} captured, ${failed} failed, into public/shots/`);
process.exit(failed && !ok ? 1 : 0);
