/**
 * Refreshes src/data/medium.json — a snapshot of the author's Medium stories,
 * read from Medium's public RSS feed (no API key needed; the feed carries the
 * 10 newest stories, each with its cover image, a one-line snippet and the
 * publication it ran in).
 *
 * Runs on prebuild and never fails the build: if Medium can't be reached, the
 * committed snapshot is kept as it is.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(fileURLToPath(import.meta.url), '../..');
const file = path.join(root, 'src', 'data', 'medium.json');
const USERNAME = 'suraj-nandan';

const decode = (s) =>
  s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
const cdata = (s) =>
  (s ?? '')
    .replace(/^<!\[CDATA\[/, '')
    .replace(/\]\]>$/, '')
    .trim();
const pick = (block, re) => block.match(re)?.[1];
const text = (html) =>
  decode(html.replace(/<[^>]+>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim();

try {
  const res = await fetch(`https://medium.com/feed/@${USERNAME}`, {
    headers: {
      'User-Agent': 'surajnandan.in build (portfolio snapshot)',
      Accept: 'application/rss+xml',
    },
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const xml = await res.text();

  const stories = xml
    .split('<item>')
    .slice(1)
    .map((block) => {
      const desc = cdata(pick(block, /<description>([\s\S]*?)<\/description>/));
      const link = cdata(pick(block, /<link>([\s\S]*?)<\/link>/)).split('?')[0];
      const venue = decode(pick(desc, /Continue reading on ([^<]+?) »/) ?? 'Medium');
      return {
        id:
          cdata(pick(block, /<guid[^>]*>([\s\S]*?)<\/guid>/))
            .split('/')
            .pop() || link,
        title: decode(cdata(pick(block, /<title>([\s\S]*?)<\/title>/))),
        url: link,
        date: new Date(cdata(pick(block, /<pubDate>([\s\S]*?)<\/pubDate>/))).toISOString(),
        tags: [...block.matchAll(/<category>([\s\S]*?)<\/category>/g)].map((m) => decode(cdata(m[1]))),
        cover: pick(desc, /<img[^>]+src="([^"]+)"/) ?? null,
        excerpt: text(pick(desc, /<p class="medium-feed-snippet">([\s\S]*?)<\/p>/) ?? ''),
        // Stories in a publication (e.g. Coinmonks) run under its name; the rest on the author's own page
        publication: venue === 'Medium' ? null : venue,
      };
    })
    .filter((s) => s.title && s.url && s.date)
    .sort((a, b) => b.date.localeCompare(a.date));
  if (stories.length === 0) throw new Error('no items in the feed');

  fs.writeFileSync(
    file,
    JSON.stringify({ username: USERNAME, fetchedAt: new Date().toISOString(), stories }, null, 2) + '\n'
  );
  console.log(`medium: ${stories.length} stories → ${path.relative(root, file)}`);
} catch (err) {
  console.warn(`medium: kept the existing snapshot (${err.message})`);
}
