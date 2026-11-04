import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const SITE = 'https://surajnandan.in';
const today = new Date().toISOString().split('T')[0];

/** Pull every `slug: '...'` literal out of a data file. */
function slugsFrom(file) {
  const src = fs.readFileSync(path.resolve('src', 'data', file), 'utf8');
  return [...src.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]);
}

/**
 * Date of the last commit touching these files. Search engines discount a sitemap
 * where every <lastmod> is "today", so each URL gets the date its content really changed.
 * Falls back to today when git history isn't available (e.g. a shallow clone).
 */
function lastModified(...files) {
  try {
    const out = execSync(`git log -1 --format=%cs -- ${files.join(' ')}`, { stdio: ['ignore', 'pipe', 'ignore'] })
      .toString()
      .trim();
    return out || today;
  } catch {
    return today;
  }
}

const projectSlugs = slugsFrom('projects.ts');
const postSlugs = slugsFrom('posts.ts');

const home = lastModified('index.html', 'src/components', 'src/data');
const urls = [
  { loc: `${SITE}/`, lastmod: home, changefreq: 'weekly', priority: '1.0', images: ['/profile.webp', '/book/unscrolled-cover.jpg'] },
  {
    loc: `${SITE}/book`,
    lastmod: lastModified('src/data/book.ts', 'src/pages/BookPage.tsx'),
    changefreq: 'monthly',
    priority: '0.9',
    images: ['/book/unscrolled-cover.jpg', '/book/unscrolled-paperback.jpg'],
  },
  { loc: `${SITE}/changelog`, lastmod: lastModified('src/data/changelog.ts'), changefreq: 'monthly', priority: '0.4' },
  ...projectSlugs.map((s) => ({
    loc: `${SITE}/projects/${s}`,
    lastmod: lastModified('src/data/projects.ts', 'src/data/caseStudies.ts'),
    changefreq: 'monthly',
    priority: '0.8',
  })),
  ...postSlugs.map((s) => ({
    loc: `${SITE}/blog/${s}`,
    lastmod: lastModified('src/data/posts.ts'),
    changefreq: 'monthly',
    priority: '0.6',
  })),
];

const body = urls
  .map(({ loc, lastmod, changefreq, priority, images = [] }) =>
    [
      '  <url>',
      `    <loc>${loc}</loc>`,
      `    <lastmod>${lastmod}</lastmod>`,
      `    <changefreq>${changefreq}</changefreq>`,
      `    <priority>${priority}</priority>`,
      ...images.map((img) => `    <image:image><image:loc>${SITE}${img}</image:loc></image:image>`),
      '  </url>',
    ].join('\n')
  )
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${body}\n</urlset>\n`;

fs.writeFileSync(path.resolve('public', 'sitemap.xml'), xml);
console.log(
  `Wrote sitemap.xml — ${urls.length} URLs (${projectSlugs.length} projects, ${postSlugs.length} posts)`
);
