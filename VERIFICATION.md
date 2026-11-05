# End-to-end verification

Run against a local preview first and repeat the production checks after an approved deployment. Record the date, URL, browser/device, commit and results. Do not send real enquiries or alter production data without permission.

## Release checklist

1. **Routes:** open every page in [SITEMAP.md](SITEMAP.md), plus `404.html` and `thank-you.html`; inspect navigation, footer, images and downloads. On the Express server request a nonexistent URL and confirm a 404 response and the error page. Hosting providers may handle 404s differently.
2. **Responsive and accessible:** check desktop and mobile widths; use keyboard navigation, mobile menu, forms, FAQ controls and visible focus. Inspect console and network errors. Check that video has a useful fallback and mobile layout does not overflow.
3. **Contact and enquiry:** check phone, email and WhatsApp links against confirmed details. Test the contact page's separate email-draft form. Fill a test `data-lead-form`, check required fields and consent where present, and verify that the WhatsApp draft contains the test details and any UTM parameters. Do not press Send unless authorized. Confirm the handoff message says the enquiry is not yet sent; test the fallback link when pop-ups are blocked. Test the honeypot without sending a message. A draft opening is not proof of delivery, and no thank-you redirect is expected for this flow.
4. **Interactive features:** exercise FAQs, navigation, carousel and fire safety checklist. Confirm the result is advisory, not a guarantee of compliance. Check fact-gated statistics, testimonials, credentials and clients remain hidden unless confirmed.
5. **SEO:** parse `sitemap.xml` and each JSON-LD block; verify sitemap URLs exist, intended indexable pages have one H1, unique titles and correct canonicals. Check `robots.txt`, `llms.txt`, noindex pages and links. Validate structured data with an external validator when available. Confirm the final domain before changing canonical URLs.
6. **Optional services:** if the Express chat service is deployed and approved, review its knowledge for unverified claims, use a test API key/environment, then check a normal answer, errors and rate limiting. GitHub Pages alone cannot run this endpoint. If analytics is configured, verify events in GA4 DebugView; do not assume a form handoff means a completed lead.
7. **Production:** verify the correct branch and Pages build, fetch the live pages, compare expected changes and perform a hard refresh. Check any separately hosted custom domain independently. Review any CDN caching or deployment failures.

## Verification record — 4 November 2026

### Contact update follow-up

The downloadable `documents/extreme-fire-company-profile.pdf` is a separate 36-page
document. Text extraction found an older office number in its page headers. It also
contains phone numbers belonging to external references and a third party; those
must not be replaced with company contact details. The original profile needs a
corrected export and visual review before the PDF can be considered updated.

- Automated local source inspection: 16 tracked HTML pages, 17 JSON-LD blocks and 14 sitemap entries. JSON-LD and XML parsed; sitemap files existed; each page had one H1 and a unique title. These checks do not validate schema semantics, page rendering or all links.
- All 16 tracked HTML pages and `robots.txt`, `sitemap.xml` and `llms.txt` returned HTTP 200 on GitHub Pages; a nonexistent path returned 404. Source inspection found 137 distinct relative `href`/`src` paths and no missing local targets (not an external-link or CSS-asset crawl).
- The homepage FAQ expanded and the statistics and credentials sections were hidden. On the sprinkler landing page, a simulated submission intercepted `window.open`: the WhatsApp draft contained the test fields and UTM values, the blocked-popup fallback appeared, and the honeypot blocked a submission. No message was sent; this does not verify delivery or other forms.
- The homepage initially reported connection-closed errors for a background image and video; a later HEAD request for both returned 200. Full asset downloads and cause of the earlier errors remain unverified.
- Homepage Lighthouse reported accessibility 93, best practices 100 and SEO 100; it flagged insufficient text contrast and small or closely spaced touch targets. This audit did not measure performance or emulate mobile.
- **Chat issue found on the live site:** the browser-side chat returned unverified staff credentials. The local candidate now replaces the old response database with limited general answers; a browser test of the staff question returned a contact referral instead. The optional server knowledge was also restricted, but its API has not been tested with OpenAI. The live site remains unchanged until deployed.
- **Services hero:** local browser inspection confirmed the sprinkler background URL and HTTP 200 response. Homepage CSS was adjusted for the previously flagged contrast and touch-target issues; a complete accessibility re-audit is still needed.
- Real WhatsApp/email delivery, contact form handoff, mobile/keyboard testing, external schema validation, analytics and chat API were **not verified** in this run.

The older `TEST-CHECKLIST.md` includes historical assumptions (including an automatic thank-you redirect and a time-based spam trap) that do not match the current `leads.js`; use this document for the current handoff flow.
