const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const html = read('blog-news.html');
const pages = fs.readdirSync(root).filter(file => file.endsWith('.html'));
for (const file of pages) {
  const source = read(file);
  const nav = source.match(/<nav\b[^>]*id="main-nav"[^>]*>([\s\S]*?)<\/nav>/i);
  if (nav) assert.equal((nav[1].match(/href="blog-news.html"/g) || []).length, 1, `${file}: Blog & News navigation`);
}
assert.match(html, /href="blog-news.html" class="active" aria-current="page"/);
assert.equal((html.match(/class="publication-card"/g) || []).length, 3);
assert.equal((html.match(/class="journal-news-card"/g) || []).length, 8);
assert.equal((html.match(/data-region="zimbabwe"/g) || []).length, 4);
assert.equal((html.match(/class="journal-slide(?: is-active)?"/g) || []).length, 3);
assert.match(html, /data-slide="toggle"/);
const slugs = ['automatic-fire-sprinkler-systems', 'the-water-path-connections', 'storage-hazards-commodities-inrack'];
for (const slug of slugs) {
  const pdf = `documents/publications/${slug}.pdf`;
  assert.equal(fs.readFileSync(path.join(root, pdf)).subarray(0, 5).toString(), '%PDF-');
  assert(fs.statSync(path.join(root, `images/publications/${slug}.webp`)).size > 1000);
  assert(html.includes(`href="${pdf}" download`), `${slug}: download link`);
}
for (const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
  const target = match[1];
  if (/^(?:https?:|mailto:|tel:)/.test(target)) continue;
  assert(fs.existsSync(path.join(root, target.split(/[?#]/)[0])), `Missing local asset: ${target}`);
}
const sources = [...html.matchAll(/class="journal-source" href="([^"]+)"/g)].map(match => new URL(match[1]));
assert.equal(sources.length, 8);
for (const source of sources) assert(['www.nfpa.org', 'www.nist.gov', 'landingpage.bsigroup.com', 'cite.org.zw', 'www.heraldonline.co.zw', 'www.zbcnews.co.zw'].includes(source.hostname));
for (const match of html.matchAll(/datetime="([^"]+)"/g)) assert(match[1] <= '2026-11-20', 'Future-dated content');
assert.match(read('sitemap.xml'), /https:\/\/extremefire.co.zw\/blog-news.html/);
assert.equal((html.match(/GTM-KT2WWMKV/g) || []).length, 3);
console.log(`Blog & News verified: navigation across ${pages.length} pages, three PDFs, three background slides, four Zimbabwe and four international updates, local links and sitemap.`);
