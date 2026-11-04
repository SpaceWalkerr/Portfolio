/**
 * Tells IndexNow search engines (Bing, Yandex, Seznam, Naver…) which URLs changed.
 * Run after a deploy: `npm run indexnow`. The key file in public/ proves we own the site.
 * Google doesn't support IndexNow — use Search Console for that.
 */
import fs from 'node:fs';
import path from 'node:path';

const HOST = 'surajnandan.in';
const root = path.resolve(import.meta.dirname, '..');
const keyFile = fs.readdirSync(path.join(root, 'public')).find((f) => /^[0-9a-f]{32}\.txt$/.test(f));
if (!keyFile) throw new Error('indexnow: no <key>.txt file in public/');
const key = keyFile.replace('.txt', '');

const sitemap = fs.readFileSync(path.join(root, 'public', 'sitemap.xml'), 'utf8');
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key, keyLocation: `https://${HOST}/${keyFile}`, urlList }),
});
console.log(`indexnow: ${urlList.length} URLs → HTTP ${res.status} ${res.statusText}`);
