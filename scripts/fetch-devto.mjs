/**
 * Refreshes src/data/devto.json — a snapshot of the author's published dev.to
 * articles, shown by the DEV feed whenever the live API is unreachable.
 *
 * Runs on prebuild and never fails the build: if dev.to can't be reached, the
 * committed snapshot is kept as it is.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(fileURLToPath(import.meta.url), '../..');
const file = path.join(root, 'src', 'data', 'devto.json');
const USERNAME = 'suraj_nandan';

try {
  const res = await fetch(`https://dev.to/api/articles?username=${USERNAME}&per_page=100`, {
    headers: { Accept: 'application/vnd.forem.api-v1+json', 'User-Agent': 'surajnandan.in build (portfolio snapshot)' },
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const list = await res.json();
  if (!Array.isArray(list) || list.length === 0) throw new Error('empty response');

  const articles = list
    .map((a) => ({
      id: a.id,
      title: a.title,
      url: a.url,
      date: a.published_at,
      tags: Array.isArray(a.tag_list) ? a.tag_list : String(a.tag_list ?? '').split(', ').filter(Boolean),
      cover: a.cover_image ?? null,
      readingTime: a.reading_time_minutes ?? 0,
      reactions: a.positive_reactions_count ?? 0,
    }))
    .sort((a, b) => b.date.localeCompare(a.date));

  fs.writeFileSync(
    file,
    JSON.stringify({ username: USERNAME, fetchedAt: new Date().toISOString(), total: articles.length, articles }, null, 2) + '\n'
  );
  console.log(`devto: ${articles.length} articles → ${path.relative(root, file)}`);
} catch (err) {
  console.warn(`devto: kept the existing snapshot (${err.message})`);
}
