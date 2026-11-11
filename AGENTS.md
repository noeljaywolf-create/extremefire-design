# AGENTS.md — Extreme Fire Design Inc website

Static marketing site (plain HTML/CSS/JS) for a Zimbabwean fire protection
business, plus an optional Node.js chat server. No build step: HTML files are
hand-authored and served as-is.

## Hard constraints — never break these

- **Google Tag Manager container `GTM-KT2WWMKV`** is installed in the `<head>`
  (with `dataLayer` init) and as a `<noscript>` iframe immediately after
  `<body>` on every tracked page. It must stay byte-identical. A quick check:
  `grep -c GTM-KT2WWMKV *.html` returns `3` for every page (comment + script +
  noscript).
- **The site is live and indexed on Google.** Do not change URLs, `<link
  rel="canonical">`, `og:url` or existing redirect targets. `sitemap.xml` and
  `robots.txt` are live. Add pages, never rename live ones.
- **Canonical origin is `https://extremefire.co.zw`** (see `site-config.js` →
  `canonicalOrigin`). GitHub Pages hosts the repo, but canonical/OG/sitemap all
  use the `.co.zw` domain.

## Fact-gating policy (important)

The site deliberately publishes **no** invented statistics, client names,
testimonials, prices, licence numbers or credentials. Content that is not
confirmed stays hidden or omitted. Before adding any such claim, check
`CONFIRM-REQUIRED.md` and `site-config.js` (`TODO_CONFIRM` markers). When in
doubt, phrase copy to describe the service and invite a scoped enquiry rather
than asserting a figure.

## Shared facts

- `site-config.js` is the single source of truth for contact details and
  fact-gated blocks; `site-render.js` renders them into elements carrying
  `data-efd="..."` attributes. Change a phone number in one place only.
- Structured data: each page has a hand-authored
  `<script type="application/ld+json">` block; the "core" pages also have a
  `data-seo="page"` JSON-LD block. Keep `FAQPage` schema and the **visible** FAQ
  text identical — Google requires it.

## SEO / AEO

- `SEO-KEYWORD-MAP.md` maps keywords → page → title/meta/intent, including the
  buyer-segment matrix (cars, homes, schools, offices × supply/service/refill)
  and the training keyword cluster.
- `llms.txt` is the plain-text summary for answer engines. Keep it in step with
  the service pages.
- One primary keyword per page; titles ~60 chars, descriptions ~155.
- **Service pages** (system/offer pages such as
  `fire-sprinkler-systems-zimbabwe.html`, `fire-safety-training-zimbabwe.html`,
  `fire-safety-compliance-zimbabwe.html`,
  `fire-extinguisher-services-zimbabwe.html`) share one template: hero,
  breadcrumbs, "why us" benefits, "what we do" grid, numbered steps, a
  practical-advice block, quote section with the shared lead form, an
  illustrative (non-client) case study, a FAQ grid whose text matches the
  `FAQPage` schema exactly, related links, and the standard footer. When adding
  one, mirror an existing service page, keep the GTM block byte-identical, and
  register it in `sitemap.xml`, `SITEMAP.md`, `SEO-KEYWORD-MAP.md` and
  `llms.txt`. Add the footer "Service Pages" link to every page and the
  related-links entry on the other service and city pages. A service page may
  also add the main-nav item; `fire-sprinkler-systems-zimbabwe.html` is the
  current example of a page in the main nav on every page.
- **Location pages** follow a fixed template (`fire-protection-bulawayo.html` is
  the origin). To add a city: copy that file, then replace the slug
  (`fire-protection-<slug>.html`) and the city name. Keep Harare and Bulawayo
  named as existing service areas in the hero and FAQ, and give the regional
  paragraph a real local context line so pages are not near-duplicates. Register
  the new page in `sitemap.xml`, `SITEMAP.md`, `SEO-KEYWORD-MAP.md` and
  `llms.txt`, and add it to the `service-areas.html` hub. Footers link to the
  hub, not to every city.
- `service-areas.html` is the city index (CollectionPage + ItemList schema),
  grouped by province.

## Headings

- Every heading and heading container is centred site-wide. The final layer is
  section 40 of `pages.css` (`text-align: center !important` on h1-h6 and their
  containers, plus `margin-inline: auto` so a heading capped by the global
  `max-width: 30ch` measure sits on the centre axis instead of the left edge).
  Body copy stays left-aligned for readability. Do not add `text-align: left`
  to a heading.

## Verify after editing

```bash
# all JSON-LD parses
python3 - <<'PY'
import re, json, glob
for f in glob.glob('*.html'):
    for m in re.finditer(r'<script type="application/ld\+json"[^>]*>(.*?)</script>', open(f).read(), re.S):
        json.loads(m.group(1))
print('ok')
PY
# sitemap is well-formed
python3 -c "import xml.dom.minidom;xml.dom.minidom.parse('sitemap.xml')"
```

## Run locally

`npm install` then `npm start` (serves on port 3000; `OPENAI_API_KEY` needed
only for `/api/chat`). For static-only checks, `python3 -m http.server 8000`.
