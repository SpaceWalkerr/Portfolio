/**
 * Writes the books' structured data into index.html (between the books-ld markers), generated from
 * src/data/book.ts with the same builder the book pages use (src/lib/schema.ts). The home page is
 * not prerendered, so this keeps its static <head> telling search engines exactly which books
 * Suraj Nandan wrote — titles, editions, ISBNs, ASINs and Amazon offers — without hand-copying.
 *
 * Runs on prebuild.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadData } from './load-data.mjs';

const root = path.resolve(fileURLToPath(import.meta.url), '../..');
const file = path.join(root, 'index.html');
const d = await loadData();

const graph = {
  '@context': 'https://schema.org',
  '@graph': d.books.map((b) => {
    const { '@context': _ctx, ...node } = d.bookJsonLd(b);
    return node;
  }),
};
const json = JSON.stringify(graph, null, 2)
  .split('\n')
  .map((l) => '    ' + l)
  .join('\n');

const html = fs.readFileSync(file, 'utf8');
const re = /(<!-- books-ld:start[^>]*-->)[\s\S]*?(\s*<!-- books-ld:end -->)/;
if (!re.test(html)) throw new Error('build-book-schema: books-ld markers not found in index.html');
const next = html.replace(re, `$1\n    <script type="application/ld+json">\n${json}\n    </script>$2`);
if (next !== html) fs.writeFileSync(file, next);
console.log(`book schema: ${d.books.length} books → index.html`);
