/**
 * Writes public/rss.xml — an RSS 2.0 feed of the Op-Ed (blog) so readers can
 * subscribe. Runs on prebuild.
 */
import fs from 'node:fs';
import path from 'node:path';
import { loadData, root } from './load-data.mjs';

const SITE = 'https://surajnandan.in';
const { posts } = await loadData();

const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));
const items = sorted
  .map((p) => {
    const url = `${SITE}/blog/${p.slug}`;
    const html = p.content
      .split(/\n\s*\n/)
      .map((para) => `<p>${esc(para.trim())}</p>`)
      .join('');
    return `    <item>
      <title>${esc(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(`${p.date}T09:00:00Z`).toUTCString()}</pubDate>
      <category>${esc(p.category)}</category>
      <description>${esc(p.excerpt)}</description>
      <content:encoded><![CDATA[${html}]]></content:encoded>
    </item>`;
  })
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>The Op-Ed — Suraj Nandan</title>
    <link>${SITE}/#blog</link>
    <atom:link href="${SITE}/rss.xml" rel="self" type="application/rss+xml" />
    <description>Case studies and technical deep-dives by Suraj Nandan, full-stack developer.</description>
    <language>en</language>
    <lastBuildDate>${new Date(`${sorted[0].date}T09:00:00Z`).toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;

fs.writeFileSync(path.join(root, 'public', 'rss.xml'), xml);
console.log(`feeds: ${posts.length} posts → public/rss.xml`);
