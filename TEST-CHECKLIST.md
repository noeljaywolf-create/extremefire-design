# Test checklist

Run this after previewing the branch, before going live. Items marked **BLOCKED** cannot
be completed until the corresponding `[CONFIRM]` answer arrives.

## 1. Contact links

| # | Check | How | Result |
|---|---|---|---|
| 1.1 | Every phone link dials one consistent number | Click each visible number on all 16 pages | ☐ |
| 1.2 | Phone visible text matches the `tel:` value | Compare rendered text with the link target | ☐ |
| 1.3 | WhatsApp opens the right chat with the number prefilled | Click each WhatsApp link; check the number in the URL | ☐ |
| 1.4 | `mailto:` opens the confirmed address | Click each email link | ☐ |
| 1.5 | Address identical on all pages | Compare footer, contact page, privacy page, schema | ☐ |
| 1.6 | Facebook link points at the official page | Click in footer | ☐ |
| 1.7 | Changing `site-config.js` updates every page | Edit one number, hard-reload | ☐ |
| 1.8 | Dropped number `0719 148 295` appears nowhere | Search the codebase | ☐ |

**BLOCKED on #1–#3 in `CONFIRM-REQUIRED.md`** — four landline variants are still in the
source; the config centralises them but the correct value is not confirmed.

## 2. WhatsApp and lead capture

| # | Check | How | Result |
|---|---|---|---|
| 2.1 | Quote form opens WhatsApp with name, WhatsApp number, site and page | Submit the form on any landing page | ☐ |
| 2.2 | Quiz form carries the quiz result in the message | Complete the quiz, submit, check the WhatsApp text | ☐ |
| 2.3 | UTM parameters survive to the submission | Visit `index.html?utm_source=test&utm_campaign=abc`, submit a form | ☐ |
| 2.4 | UTM parameters persist across a return visit | Submit once, navigate away, submit again | ☐ |
| 2.5 | Honeypot drops spam silently | Submit with the hidden `website` field filled | ☐ |
| 2.6 | Timing trap drops instant submissions | Submit a valid form in under 2 seconds | ☐ |
| 2.7 | Consent checkbox is required | Submit with it unticked | ☐ |
| 2.8 | Privacy link present in every footer | Check all 16 pages | ☐ |

**BLOCKED:** there is no form backend. Submissions go to WhatsApp only.

## 3. Thank-you redirect

| # | Check | How | Result |
|---|---|---|---|
| 3.1 | Successful submit redirects to `thank-you.html` | Submit a valid form | ☐ |
| 3.2 | `thank-you.html` has `noindex, nofollow` | View source | ☐ |
| 3.3 | `thank-you.html` is disallowed in `robots.txt` | Read `robots.txt` | ☐ |
| 3.4 | `thank-you.html` is absent from `sitemap.xml` | Read `sitemap.xml` | ☐ |
| 3.5 | `generate_lead` fires on the thank-you page | DebugView | ☐ |

## 4. GA4 events

All seven are wired and fire only when `gtag` exists.

| # | Event | Trigger | Result |
|---|---|---|---|
| 4.1 | `click_call` | Click any `tel:` link | ☐ |
| 4.2 | `click_whatsapp` | Click any `wa.me` link | ☐ |
| 4.3 | `click_email` | Click any `mailto:` link | ☐ |
| 4.4 | `form_submit` | Submit any lead form | ☐ |
| 4.5 | `generate_lead` | After a successful submit, and on `thank-you.html` | ☐ |
| 4.6 | `quiz_complete` | Finish the compliance quiz | ☐ |
| 4.7 | `pdf_download` | Click a gated download | ☐ |
| 4.8 | All seven marked as Key Events | GA4 Admin → Events | ☐ |

**BLOCKED:** no GA4 measurement ID supplied, so these cannot be seen in DebugView yet.
`pdf_download` is also wired but there are no gated PDF downloads on the site yet.

## 5. Mobile speed

| # | Check | Target | Result |
|---|---|---|---|
| 5.1 | Homepage first load, mobile | < 1.5 MB — **measured 330 KB** | ☐ |
| 5.2 | Hero video not requested on a 768px viewport | DevTools → Network, filter `mp4` | ☐ |
| 5.3 | Hero video not requested with Save-Data on | DevTools → Network conditions | ☐ |
| 5.4 | Hero video not requested on 2G | DevTools → Network conditions | ☐ |
| 5.5 | Hero video not requested with reduced motion | Emulate `prefers-reduced-motion` | ☐ |
| 5.6 | Poster image shows instead of the video | Visual check on mobile | ☐ |
| 5.7 | No request larger than 200 KB on first load | DevTools → Network | ☐ |
| 5.8 | Lighthouse mobile score | Record before/after | ☐ |
| 5.9 | No layout shift from images | DevTools → CLS | ☐ |

## 6. Broken links

| # | Check | Result |
|---|---|---|
| 6.1 | No broken local links on any page — **automated, passes** | ☐ |
| 6.2 | Every footer link resolves on all 16 pages | ☐ |
| 6.3 | All 6 new landing pages reachable from the homepage | ☐ |
| 6.4 | `privacy.html` reachable from all 16 footers | ☐ |
| 6.5 | No internal link points at a removed page | ☐ |
| 6.6 | Run a crawler for external links | ☐ |

Automated check (already passing):

```powershell
python C:\Users\hp\AppData\Local\Temp\opencode\check.py
```

## 7. SEO and schema

| # | Check | Result |
|---|---|---|
| 7.1 | H1 is real text in the HTML source, not JS-injected | ☐ |
| 7.2 | Every page has a unique title and meta description | ☐ |
| 7.3 | Canonicals all point at the confirmed domain | ☐ |
| 7.4 | `og:url` and `og:image` use absolute URLs on the confirmed domain | ☐ |
| 7.5 | JSON-LD validates (Rich Results Test) | ☐ |
| 7.6 | LocalBusiness phone matches the visible phone | ☐ |
| 7.7 | Opening hours match the confirmed hours | ☐ |
| 7.8 | `sitemap.xml` lists all indexable pages | ☐ |
| 7.9 | No Review schema present (correct — no verified reviews) | ☐ |
| 7.10 | "Best Fire Protection Company in Zimbabwe" gone from meta keywords | ☐ |

**BLOCKED:** 7.3–7.7 depend on the final domain (#2) and hours (#3).

## 8. Fact-gated blocks (should all be correctly hidden)

| # | Check | Expected now | Result |
|---|---|---|---|
| 8.1 | Testimonials section hidden | hidden | ☐ |
| 8.2 | No star ratings anywhere | none | ☐ |
| 8.3 | Statistics section hidden | hidden | ☐ |
| 8.4 | Client logo strip hidden | hidden | ☐ |
| 8.5 | Credentials strip hidden | hidden | ☐ |
| 8.6 | "Compliant With" shows only NFPA 13 and EN 12845 | 2 badges | ☐ |
| 8.7 | No SABS, ASIB or OHS Act badges | absent | ☐ |
| 8.8 | Latest news section hidden | hidden | ☐ |
| 8.9 | Case-study blocks show no invented data | empty fields | ☐ |

## 9. Regression checks

| # | Check | Result |
|---|---|---|
| 9.1 | Header nav works on all pages | ☐ |
| 9.2 | Mobile nav toggle works | ☐ |
| 9.3 | Services carousel still slides after dedupe (7 slides) | ☐ |
| 9.4 | "Quick Answers" widget still opens | ☐ |
| 9.5 | Existing page-loader / FOUC guard still works | ☐ |
| 9.6 | 404 page still renders | ☐ |
| 9.7 | HTML balanced and no broken local links on all 16 pages | ☐ |

## 10. Accessibility spot-checks

| # | Check | Result |
|---|---|---|
| 10.1 | Single `<h1>` per page with real text | ☐ |
| 10.2 | Heading order does not skip levels | ☐ |
| 10.3 | All form inputs have labels | ☐ |
| 10.4 | Quiz is keyboard navigable | ☐ |
| 10.5 | Video has a poster, and is not the only way to get information | ☐ |
| 10.6 | Colour contrast on the accent buttons | ☐ |
