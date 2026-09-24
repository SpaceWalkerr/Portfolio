import fs from 'fs';
import path from 'path';

const SITE = 'https://surajnandan.in';
const today = new Date().toISOString().split('T')[0];

/** Pull every `slug: '...'` literal out of a data file. */
function slugsFrom(file) {
  const src = fs.readFileSync(path.resolve('src', 'data', file), 'utf8');
  return [...src.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]);
}

const projectSlugs = slugsFrom('projects.ts');
const postSlugs = slugsFrom('posts.ts');

const urls = [
  { loc: `${SITE}/`, changefreq: 'weekly', priority: '1.0' },
  { loc: `${SITE}/changelog`, changefreq: 'monthly', priority: '0.4' },
  ...projectSlugs.map((s) => ({
    loc: `${SITE}/projects/${s}`,
    changefreq: 'monthly',
    priority: '0.8',
  })),
  ...postSlugs.map((s) => ({
    loc: `${SITE}/blog/${s}`,
    changefreq: 'monthly',
    priority: '0.6',
  })),
];

const body = urls
  .map(
    ({ loc, changefreq, priority }) =>
      `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`
  )
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;

fs.writeFileSync(path.resolve('public', 'sitemap.xml'), xml);
console.log(
  `Wrote sitemap.xml — ${urls.length} URLs (${projectSlugs.length} projects, ${postSlugs.length} posts), lastmod ${today}`
);
