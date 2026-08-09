import fs from 'fs';
import path from 'path';

const sitemapPath = path.resolve('public', 'sitemap.xml');
let sitemap = fs.readFileSync(sitemapPath, 'utf8');

const today = new Date().toISOString().split('T')[0];
sitemap = sitemap.replace(/<lastmod>.*?<\/lastmod>/, `<lastmod>${today}</lastmod>`);

fs.writeFileSync(sitemapPath, sitemap);
console.log(`Updated sitemap.xml with lastmod date: ${today}`);
