/**
 * Refreshes src/data/youtube.json — a snapshot of the channel's latest public
 * videos, read from YouTube's own RSS feed (no API key needed; the feed lists
 * the 15 newest uploads).
 *
 * Runs on prebuild and never fails the build: if YouTube can't be reached, the
 * committed snapshot is kept as it is.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(fileURLToPath(import.meta.url), '../..');
const file = path.join(root, 'src', 'data', 'youtube.json');
const CHANNEL_ID = 'UClkjgDM8ymmQdIFb8mxAZ4Q';

const decode = (s) =>
  s
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
const pick = (block, re) => block.match(re)?.[1];

try {
  const res = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`, {
    headers: { 'User-Agent': 'surajnandan.in build (portfolio snapshot)' },
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const xml = await res.text();

  const channelName = decode(pick(xml.split('<entry>')[0], /<author>\s*<name>([^<]+)<\/name>/) ?? 'Suraj Nandan');
  const videos = xml
    .split('<entry>')
    .slice(1)
    .map((block) => ({
      id: pick(block, /<yt:videoId>([^<]+)<\/yt:videoId>/),
      title: decode(pick(block, /<title>([^<]+)<\/title>/) ?? ''),
      published: pick(block, /<published>([^<]+)<\/published>/),
      views: Number(pick(block, /<media:statistics views="(\d+)"/) ?? 0),
    }))
    .filter((v) => v.id && v.title && v.published);
  if (videos.length === 0) throw new Error('no entries in the feed');

  fs.writeFileSync(
    file,
    JSON.stringify({ channelId: CHANNEL_ID, channelName, fetchedAt: new Date().toISOString(), videos }, null, 2) + '\n'
  );
  console.log(`youtube: ${videos.length} videos → ${path.relative(root, file)}`);
} catch (err) {
  console.warn(`youtube: kept the existing snapshot (${err.message})`);
}
