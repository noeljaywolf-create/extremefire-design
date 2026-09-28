# CHANGELOG

Branch: `lead-gen-rebuild` — **not pushed to production.** See "Preview" at the bottom.

Every change is numbered to match the brief. Anything that could not be verified is
marked `TODO_CONFIRM` in the code and listed in `CONFIRM-REQUIRED.md`.

---

## 0. Blocking trust issue found during the audit

The homepage carried four five-star testimonials attributed to named individuals —
Katy Moyo, Governor Masukwedza, Noel Chakwenya, Diana Smith — each linking to a
personal domain (`katymoyo.co.zw`, `governormasukwedza.co.zw`, `noeljay.co.zw`,
`dianasmith.co.zw`). These could not be verified and read as generated filler.
Publishing invented reviews under real names is a legal and reputational risk, so
they were **removed** and replaced with a data-driven block that renders nothing
until a genuine, permission-confirmed quote is supplied (item 2).

---

## 1. Contact details

- Found the site was carrying **four different phone numbers** and **two different
  WhatsApp numbers** in different places:

  | Where | Value |
  |---|---|
  | Visible landing text | `0242488270/1/2/3` (488 270) |
  | Every `tel:` link | `+263242488720` (488 720) |
  | `contact.html` meta description | `0242 488 720` (488 720) |
  | `Organization` schema | `+263-242-488-720` (488 720) |
  | `LocalBusiness` schema | `+263-24-2488270` (488 270) |
  | Header/footer mobile | `+263 773 688 904` |
  | Old footer, extra mobile | `0719 148 295` (dropped) |
  | WhatsApp (header/footer/floats) | `+263 773 688 904` |
  | WhatsApp (FAQ) | `+263 776 400 176` |

- Created **`site-config.js`** as a single source of truth. 39 contact anchors across
  all 16 pages now carry `data-efd` attributes and are rewritten from that one file,
  so a number can only ever be changed in one place.
- The provisional landline is the value already present in every `tel:` link, so
  tap-to-call behaviour is unchanged. The visible `0242488270/1/2/3` looks like a
  digit transposition and is the likely typo. **Awaiting confirmation.**
- Address, email, Facebook page and WhatsApp all centralised. WhatsApp set to
  `+263 776 400 176` as supplied.
- Trading hours contradicted themselves three ways: `contact.html` said
  "Monday–Sunday 8AM–5PM", `index.html` said "Respond 24/7", `faq.html` said "24/7
  Support". Left as `TODO_CONFIRM` rather than picking one.

## 2. Testimonials and trust

- Removed the four unverifiable testimonials and all star ratings.
- Added `testimonials.js`: reads `site-config.js → testimonials[]`, renders **nothing**
  unless an entry has `permissionConfirmed: true`, and only then emits `Review`
  structured data. No star ratings anywhere.
- Stat counters (`500+` projects, `14+` years, `50+` industries, `200+` clients) were
  unverified. Now driven from config and **hidden** until real figures are supplied.
- Client logo strip now renders nothing by default; entries need `permissionConfirmed`.

## 3. Registrations and standards

- Removed **SABS**, **ASIB** and the **OHS Act** from the "Compliant With" strip.
  SABS and ASIB are South African bodies, not Zimbabwean regulators, and no evidence
  of certification or membership was supplied.
- Kept **NFPA 13** and **EN 12845**, which the site's engineering copy already claims.
- Added a **Credentials strip** to the homepage (and available on every page) that
  renders nothing until an item is marked confirmed. FPIB licence, NFPA membership and
  Harare Fire Brigade registration are all unconfirmed, so nothing is asserted.
- Flagged `about.html` — a named engineer's bio claims "NFPA Certified Fire Protection
  Specialist" and "over 30+ years", which contradicts the homepage's former "14+ years".
  Not deleted (it is real staff content) but marked for confirmation.

## 4. Case studies

- **Nothing published.** Client permission has not been confirmed for CHEP Pallet Plant,
  Cutrag Woolwich or the "Warehouse Complex", and no areas, standards or results have
  been verified. Each landing page carries a case-study block with every field marked
  `TODO_CONFIRM` rather than invented content. The "Warehouse Complex" client is not named.

## 5. Products section

- Service carousel went from 14 slides to 7: every one of the 7 services was duplicated
  verbatim. Removed the duplicates.

## 6. Stale content and legal

- Removed the **"Dec 13"** news item. It had no year and its "Read More" link pointed at
  `services.html`, not an article. The section is now hidden pending real dated news.
- Created **`privacy.html`** — plain-language, covering form data, WhatsApp, cookies,
  analytics, UTM parameters, retention, rights and security. Marked for legal review;
  the governing legislation is cited generically rather than by name until confirmed.
- Created **`thank-you.html`**, set to `noindex, nofollow`, fires the `generate_lead`
  key event.
- Added a consent line under every new form and download gate.
- Linked `privacy.html` from the footer of **all 16 pages**.
- Removed **"Best Fire Protection Company in Zimbabwe"** from `index.html` meta keywords.
- **Air Conditioning & Refrigeration** block left in place and flagged, not moved or
  removed — that is a real-service question only the client can answer.

## 7. New landing pages

Created 6 pages, each with a unique title and meta description carrying the city, a hero
with Call and WhatsApp buttons, a short quote form, 3 FAQs, a case-study block, a
credentials strip and internal links:

- `fire-sprinkler-installation-harare.html`
- `fire-alarm-detection-systems-harare.html`
- `fire-hydrant-hose-reel-systems.html`
- `gas-fire-suppression-fm200.html`
- `fire-safety-compliance-zimbabwe.html`
- `fire-protection-bulawayo.html`

Repointed 5 "Learn More" links to the matching page instead of `services.html`. The two
that still point to `services.html` (Equipment Supply, Maintenance & Training) have no
dedicated landing page.

## 8. Lead capture

- Added `leads.js`: UTM capture into hidden fields (persisted to session then local
  storage so a return visit still attributes), honeypot spam trap, a 2-second timing
  trap, `form_submit` and `generate_lead` events, thank-you redirect.
- **No form backend exists.** GitHub Pages is static and cannot accept POSTs. Rather
  than let forms fail silently, submissions currently open WhatsApp with the enquiry
  pre-filled. **Needs a backend decision.**
- Added a 6-question **compliance quiz** on the Zimbabwe compliance page. Scores into
  Ready / Needs attention / High risk, then asks for name and WhatsApp to send the
  result. Wording deliberately avoids claiming legal compliance.
- Relabelled **"Chat Bot"** → "Quick Answers". The widget is a local rule-based script
  with no human handover, so calling it a bot overpromised. (It also carries
  off-target "Middle East / GCC" answers — flagged, not rewritten.)

## 9. Analytics

- GA4 events wired: `click_whatsapp`, `click_call`, `click_email`, `form_submit`,
  `quiz_complete`, `pdf_download`, `generate_lead`.
- `efdTrack()` is a no-op when `gtag` is absent, so nothing breaks before GA4 is added.
- UTM parameters captured into hidden form fields.
- **Could not verify events in DebugView** — that needs access to the GA4 property.

## 10. Performance

Measured before and after (see `PERFORMANCE.md` for the full table):

- **Hero video no longer loads on mobile.** A 2.8 MB MP4 was autoplaying on three
  pages. It is now skipped entirely on viewports ≤768px, on `Save-Data`, on 2G, and
  when `prefers-reduced-motion` is set — the `<source>` is stripped *before* the browser
  can fetch it, and the poster frame is shown instead.
- Homepage first load: **3,207 KB → 330 KB**. Now well inside the 1.5 MB target.
- Carousel duplicates removed (item 5), cutting the lazy-image payload.
- All 48 below-the-fold images were already `loading="lazy"`.
- **Not done:** WebP conversion, explicit `width`/`height` on every image, and MP4/WebM
  re-encoding. ffmpeg is not installed on this machine and a full WebP pass over
  ~200 images was out of scope for this pass.
- **PageSpeed Insights scores not captured** — needs a run against a deployed build.

## 11. Domain and SEO

- Canonicals, `og:url` and the sitemap all point at
  `https://www.extremefiredesigninc.com`, but the site is served from **GitHub Pages**
  and the contact email is `@extremefire.co.zw`. This is unresolved and is the single
  highest-impact SEO item. Everything is centralised in
  `site-config.js → canonicalOrigin` so one edit fixes it.
- Rewrote `sitemap.xml` with all 16 pages; `thank-you.html` deliberately excluded.
- Tightened `robots.txt` to disallow `thank-you.html` and `404.html`.
- Wrote `REDIRECTS.md` (auditable map) and `_redirects.template` (Netlify/Apache) for
  the old spaced-filename URLs. **GitHub Pages cannot serve redirects** — these only
  take effect behind Cloudflare/Netlify/Vercel/a normal host.
- Replaced two conflicting JSON-LD blocks with one `@graph` containing consistent
  `Organization` + `LocalBusiness`. Removed the unverifiable "Over 30 years of
  experience" claim and the `sameAs` links that pointed at a Facebook page the site
  never uses.

## 12. Copy

- **The homepage H1 was empty in the HTML.** It was filled in by a JavaScript typewriter,
  so search engines and screen readers saw a blank heading. Replaced with a real static
  H1: *"Engineered fire protection for Harare and Bulawayo buildings"*. The typewriter
  now runs on a supporting line beneath it.
- Rewrote the hero to lead with engineering (hydraulic calculations, NFPA/EN standards)
  rather than "extinguisher shop" positioning, and added a service-area line.
- Replaced 4 generic marketing lines ("Our Passion Is Helping You Protect Your People &
  Property") with 5 factual statements of what the firm actually does. No fear tactics.
- Removed the unverifiable "30+ years" claim from `about.html`'s meta description.

---

## Files changed

**New**
```
site-config.js                       single source of truth for all shared facts
site-render.js                       renders fact-gated blocks + contact details
testimonials.js                      data-driven testimonials, renders nothing
leads.js                             UTM capture, spam traps, forms, quiz scoring
privacy.html                         privacy notice
thank-you.html                       post-conversion page (noindex)
fire-sprinkler-installation-harare.html
fire-alarm-detection-systems-harare.html
fire-hydrant-hose-reel-systems.html
gas-fire-suppression-fm200.html
fire-safety-compliance-zimbabwe.html
fire-protection-bulawayo.html
REDIRECTS.md                         301 map, human-readable
_redirects.template                  Netlify/Apache redirect rules
PERFORMANCE.md                       before/after weight measurements
CHANGELOG.md                         this file
CONFIRM-REQUIRED.md                 every question that needs an answer
```

**Modified:** `index.html`, `about.html`, `contact.html`, `faq.html`, `services.html`,
`systems.html`, `portfolio.html`, `404.html`, `script.js`, `sitemap.xml`, `robots.txt`,
`.gitignore`

---

## Preview

Not pushed. To preview locally:

```powershell
cd C:\Users\hp\ExtremeFireDesignInc
python -m http.server 8000
# then open http://localhost:8000/
```

To preview the branch on GitHub (Pages builds from a branch you select in
**Settings → Pages → Build and deployment → Source**):

```powershell
git push -u origin lead-gen-rebuild
```

Then set the Pages source branch to `lead-gen-rebuild` in the repo settings. **Do not
leave it pointed at the branch when you are ready to go live** — switch it back to
`main`.

## Known limitations

1. **No form backend.** Forms fall back to WhatsApp. Nothing is lost, but nothing is
   stored server-side either.
2. **Canonical domain unresolved** — the biggest open SEO risk.
3. **No case studies or testimonials published**, because nothing is confirmed.
4. **Images not converted to WebP**; video not re-encoded.
5. **GA4 not installed.** Events are wired and will fire once `gtag` exists.
6. **Air conditioning block** still on the homepage, pending a decision.
