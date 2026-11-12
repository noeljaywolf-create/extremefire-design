const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const excluded = new Set(['table-charm-source.html', 'tc-product.html']);
const pages = fs.readdirSync(root).filter(f => f.endsWith('.html') && !excluded.has(f));
for (const file of pages) {
  const html = read(file);
  assert(html.includes('GTM-KT2WWMKV'), `${file}: missing GTM`);
  for (const match of html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    assert.doesNotThrow(() => JSON.parse(match[1]), `${file}: invalid JSON-LD`);
  }
  for (const match of html.matchAll(/href=["']#([^"']+)["']/gi)) {
    const fragment = match[1];
    assert(html.includes(`id="${fragment}"`) || html.includes(`id='${fragment}'`), `${file}: missing #${fragment}`);
  }
}
const css = read('pages.css');
for (const match of css.matchAll(/clamp\(([^()]*)\)/g)) {
  assert.equal(match[1].split(',').length, 3, `Invalid clamp(): ${match[0]}`);
}
console.log(`Checked ${pages.length} pages: GTM, JSON-LD, local fragments and clamp() syntax.`);
