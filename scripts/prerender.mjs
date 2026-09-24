/**
 * Post-build prerender pass.
 *
 * `vite build` ships one HTML file with an empty <div id="root">, so every
 * /projects/:slug and /blog/:slug URL would serve the generic homepage <head>
 * to crawlers and social scrapers. This script boots the built site, visits
 * each route with a headless browser, and writes the fully-rendered HTML —
 * resolved <title>, meta description, canonical, OG/Twitter tags and JSON-LD
 * from Seo.tsx — to dist/<route>/index.html. Also emits dist/404.html.
 *
 * The homepage is left as Vite built it: its static <head> in index.html is
 * already complete, and re-rendering over prerendered markup would double the
 * intro loading screen.
 */
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';
import { loadData } from './load-data.mjs';

const root = path.resolve(fileURLToPath(import.meta.url), '../..');
const distDir = path.join(root, 'dist');
const PORT = 4193;
const ORIGIN = `http://localhost:${PORT}`;

if (!fs.existsSync(path.join(distDir, 'index.html'))) {
  console.error('prerender: dist/index.html not found — run `vite build` first.');
  process.exit(1);
}

const slugsFrom = (file) =>
  [...fs.readFileSync(path.join(root, 'src', 'data', file), 'utf8').matchAll(/slug:\s*'([^']+)'/g)].map(
    (m) => m[1]
  );

const routes = [
  ...slugsFrom('projects.ts').map((s) => `/projects/${s}`),
  ...slugsFrom('posts.ts').map((s) => `/blog/${s}`),
];

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function waitForServer() {
  for (let i = 0; i < 60; i++) {
    try {
      const res = await fetch(ORIGIN + '/');
      if (res.ok) return;
    } catch {
      /* not up yet */
    }
    await wait(500);
  }
  throw new Error('prerender: preview server did not start in time');
}

// `vite preview` serves dist/ with SPA fallback, so unknown paths render the app.
const server = spawn('npm', ['run', 'preview', '--', '--port', String(PORT), '--strictPort'], {
  cwd: root,
  stdio: 'ignore',
});

let ok = 0;
let failed = 0;

/**
 * Local builds use Puppeteer's own Chrome. On Vercel, npm's allow-scripts
 * policy skips Puppeteer's postinstall, so that Chrome never downloads —
 * fall back to @sparticuz/chromium, a Chromium built for Amazon Linux
 * (Vercel's build image) that ships inside the package itself.
 */
async function launchBrowser() {
  try {
    return await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  } catch (err) {
    console.warn(`prerender: bundled Chrome unavailable (${err.message.split('\n')[0]})`);
  }
  if (process.platform === 'linux') {
    try {
      const { default: chromium } = await import('@sparticuz/chromium');
      const browser = await puppeteer.launch({
        args: await puppeteer.defaultArgs({ args: chromium.args, headless: 'shell' }),
        executablePath: await chromium.executablePath(),
        headless: 'shell',
      });
      console.log('prerender: using @sparticuz/chromium');
      return browser;
    } catch (err) {
      console.warn(`prerender: @sparticuz/chromium failed (${err.message.split('\n')[0]})`);
    }
  }
  return null;
}

try {
  await waitForServer();
  const browser = await launchBrowser();
  if (!browser) {
    // Never block a deploy over SEO snapshots: the SPA still serves every route.
    console.warn('prerender: no browser available — skipping; routes fall back to the SPA shell.');
    server.kill();
    process.exit(0);
  }

  const snapshot = async (route, outFile) => {
    const page = await browser.newPage();
    try {
      await page.goto(ORIGIN + route, { waitUntil: 'networkidle2', timeout: 45_000 });
      await page.waitForSelector('#main-content h1', { timeout: 15_000 });
      await wait(300); // let Seo.tsx flush its <head> writes
      const html = await page.content();
      if (!html.includes('<div id="root">') || html.length < 2000) {
        throw new Error(`suspicious output (${html.length} bytes)`);
      }
      fs.mkdirSync(path.dirname(outFile), { recursive: true });
      fs.writeFileSync(outFile, html);
      console.log(`  ${route.padEnd(42)} → ${path.relative(root, outFile)}`);
      ok++;
    } catch (err) {
      console.error(`  ${route.padEnd(42)} FAILED — ${err.message}`);
      failed++;
    } finally {
      await page.close();
    }
  };

  // Social cards for articles — optional; a failure here must not block the deploy
  try {
    // Social cards for articles — 1200x630, set in the site's own type
    const { posts } = await loadData();
    const css = fs.readdirSync(path.join(distDir, 'assets')).find((f) => /^index-.*\.css$/.test(f));
    const esc = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;');
    const ogDir = path.join(distDir, 'og', 'blog');
    fs.mkdirSync(ogDir, { recursive: true });
    const card = await browser.newPage();
    await card.setViewport({ width: 1200, height: 630 });
    for (const post of posts) {
      await card.setContent(
        `<!doctype html><html><head><link rel="stylesheet" href="${ORIGIN}/assets/${css}"></head>
        <body style="margin:0">
          <div style="width:1200px;height:630px;box-sizing:border-box;padding:56px 64px;background:#e9e4d6;color:#17171a;display:flex;flex-direction:column">
            <div style="border-top:6px double #17171a;padding-top:14px;display:flex;justify-content:space-between;font:400 15px 'Space Mono';letter-spacing:.24em;text-transform:uppercase">
              <span style="color:#8a2a2a">The Op-Ed</span><span style="color:#57534a">${esc(post.category)} · ${post.readTime} read</span>
            </div>
            <div style="border-top:1px solid #17171a;margin-top:14px"></div>
            <div style="flex:1;display:flex;align-items:center">
              <h1 style="margin:0;font:900 ${post.title.length > 60 ? 58 : 70}px/0.95 'Archivo Variable';letter-spacing:-.02em;text-transform:uppercase">${esc(post.title)}</h1>
            </div>
            <div style="display:flex;justify-content:space-between;align-items:flex-end;border-top:1px solid #17171a;padding-top:16px">
              <span style="font:italic 400 34px 'Newsreader Variable'">The Nandan Review</span>
              <span style="font:400 15px 'Space Mono';letter-spacing:.16em;text-transform:uppercase;color:#57534a">surajnandan.in</span>
            </div>
            <div style="height:10px;background:#c6392b;margin:18px -64px -56px"></div>
          </div>
        </body></html>`,
        { waitUntil: 'load', timeout: 20_000 }
      );
      await card.evaluate(() => document.fonts.ready);
      await card.screenshot({ path: path.join(ogDir, `${post.slug}.png`) });
    }
    await card.close();
    console.log(`prerender: ${posts.length} article cards → dist/og/blog/`);
  } catch (err) {
    console.warn(`prerender: article cards skipped (${err.message.split('\n')[0]})`);
  }

  console.log(`prerender: ${routes.length} routes + 404\n`);
  for (const route of routes) {
    await snapshot(route, path.join(distDir, route, 'index.html'));
  }
  await snapshot('/this-page-does-not-exist', path.join(distDir, '404.html'));

  await browser.close();
} finally {
  server.kill();
}

console.log(`\nprerender: ${ok} written, ${failed} failed`);
// Locally a failed route is a bug to fix; on Vercel, ship the site and leave that route to the SPA.
process.exit(failed && !process.env.VERCEL ? 1 : 0);
