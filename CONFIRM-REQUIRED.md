# [CONFIRM] — everything I need you to answer

Nothing below has been invented or guessed. Each item is either blocking, or currently
stopping something from being shown. Ordered by how much it affects the site.

---

## Blocking — the site is inconsistent or wrong until these are answered

### 1. What is the correct main landline?
Four variants are in circulation:

| Where | Value |
|---|---|
| Visible landing text | `0242488270/1/2/3` (488 270) |
| Every `tel:` link | `+263242488720` (488 720) |
| `contact.html` meta description | `0242 488 720` (488 720) |
| `LocalBusiness` schema | `+263-24-2488270` (488 270) |

`488 720` appears more often, and the visible `...488270` looks like a digit
transposition — but I have not changed the live `tel:` behaviour. **Which is correct?**
Also: are the `/1/2/3` extensions real, and should they be published?

### 2. What is the final production domain?
Canonicals, `og:url` and the sitemap all say `https://www.extremefiredesigninc.com`.
The site is served from **GitHub Pages**, and the contact email is
`@extremefire.co.zw`. Those are two different domains.

**Which domain is canonical?** Once answered, I fix the canonical tags, `og:url`,
absolute `og:image` URLs, `sitemap.xml`, `robots.txt` and the redirect map in one pass.

### 3. Trading hours and response promise — pick ONE of each
The site currently says all three of these:

- `contact.html`: "Monday – Sunday | 8AM – 5PM"
- `index.html`: "Fire Emergency? We Respond 24/7"
- `faq.html`: "24/7 Support" and a 24/7 emergency response claim
- `thank-you.html` (new): "usually within one business day"

**What are your real hours, and what is your real response promise?** 24/7 emergency
response is a significant commitment — I will not print it unless it is true.

### 4. Is the email `info@extremefire.co.zw`, and is it monitored?
It is domain-matched and used everywhere, but I need to know someone actually reads it,
because every fallback path and the new pages depend on it.

### 5. Is `0719 148 295` still a live number?
It appeared beside `0773 688 904` in the old footer. I dropped it rather than guess.

### 6. Which Facebook page is the official one?
The footer links to
`facebook.com/Extreme-Fire-Design-Inc-100063570455758/`, but the old schema claimed
`facebook.com/extremefiredesigninc`. I removed the schema claim. Confirm which is real.

---

## Blocking — nothing can be published until these are answered

### 7. The testimonials
I removed four five-star reviews that named real-seeming people (Katy Moyo, Governor
Masukwedza, Noel Chakwenya, Diana Smith) and linked to personal domains. **Were these
real quotes?**

- If **yes**: send me the correct names, roles, companies and wording, plus written
  permission, and I will restore them properly.
- If **no**: good — they stay removed. I would like to know how they got there.

### 8. Real statistics
The homepage claimed `500+` projects, `14+` years, `50+` industries, `200+` clients.
All removed. **What are the real numbers?** If you would rather show nothing, say so
and the section stays hidden.

Related: the schema said "Over 30 years of experience" while the homepage said 14, and
`about.html` says a named engineer has "over 30+ years". **When did the company start,
and how long has that engineer been in the trade?**

### 9. Credentials
None are shown, because none could be verified. Which of these are real, and what are
the details?

- FPIB-licensed sprinkler contractor — **licence number and expiry?**
- NFPA member — **membership number?** (Note: `about.html` claims an individual is an
  "NFPA Certified Fire Protection Specialist" — is that a real certificate?)
- Harare Fire Brigade registration — **registration number?**

### 10. The "Compliant With" badges
I removed **SABS**, **ASIB** and the **OHS Act**. SABS and ASIB are South African
bodies, not Zimbabwean regulators, so they looked wrong for a Zimbabwean site.

- **What is the Zimbabwean standard you actually design to?** SAZ? A local authority
  requirement? Something else?
- **Do you genuinely design to NFPA 13 and EN 12845?** I kept both because the site's
  copy already claims it. If that is not accurate, tell me and they come off too.

### 11. Client logos
The strip is hidden. **Which clients have given written permission for their logo to
appear?** CHEP, Cutrag, Zuva, and the trust strip (NFC, Decrend, FBC, Innscape, Meikles,
Avon) are all currently unconfirmed.

### 12. Case studies
No case study is published, because inventing one would be worse than publishing none.
For each project you want shown I need: **client name (or "Client name withheld"),
location, year, system, area, standard designed to, and one real result.**

Specifically:
- **CHEP Pallet Production Plant** — permission to name them? Any figures?
- **Cutrag Woolwich & Willowvale** — permission? Figures?
- **"Warehouse Complex"** — who is this client? Name or withhold?
- **Beitbridge Border Post** — is this a real project? Permission, scope, year?

### 13. Is air conditioning and refrigeration a real service?
There is a whole section on the homepage for it, which sits oddly beside fire
protection and reads like a template leftover. **Is it something you actually do?**
If yes I will give it its own page. If no I will remove it.

---

## Needed to finish the lead-capture work

### 14. Where should forms submit?
**GitHub Pages is static and cannot receive POSTs**, so there is nowhere for form data
to go. Right now forms open WhatsApp with the enquiry pre-filled, so no lead is lost,
but nothing is stored.

Which do you want?
- (a) WhatsApp only — simplest, already working
- (b) A form service (Formspree, Web3Forms, Basin, Google Apps Script)
- (c) A real backend — there is already a `server.js` in the repo
- (d) `mailto:` to a monitored inbox

### 15. Do you want real testimonials, and may I interview you?
Best conversion on this site will come from one or two genuine quotes. If you can get
written permission from a real client, I will build a proper testimonials section.

### 16. GA4
The events are wired (`click_whatsapp`, `click_call`, `click_email`, `form_submit`,
`quiz_complete`, `pdf_download`, `generate_lead`) and will fire as soon as `gtag` exists.
**What is the GA4 measurement ID?** I cannot verify the events in DebugView without
access to the property.

---

## Nice to have — improves the site but is not blocking

### 17. Products section
You asked me to "improve it". I removed the duplicated carousel slides (14 → 7), but I
need to know what it should actually sell:

- Do you **supply** equipment, or only design and install?
- Which brands do you supply? (There is a `CLIENT BRANDS` folder with Coca-Cola, Total,
  Delta, Old Mutual, ZIMSEC etc. — are those suppliers, or clients?)
- Should products be a separate page with a catalogue?

### 18. The PDF guides
You asked for real PDFs to be researched and written. I have not started these because
each one needs a subject and an audience. Candidates:

- Fire safety compliance checklist for Zimbabwe buildings
- Sprinkler system commissioning guide
- What to check before accepting a fire system handover
- Fire protection tender specification guide for architects and QS

**Which do you want, and do you have existing PDFs I should be correcting rather than
writing from scratch?** There is a `SYSTEMS PDF` folder and a
`documents/extreme-fire-company-profile.pdf` (4.4 MB).

### 19. Images
Many gallery photos are only **206×206 px** or 160×160 — they came that way and there
are no larger originals anywhere on the machine. **Do you have the full-size photos from
your phone or WhatsApp?** That is the only way to make the gallery sharp.

Also: is the 2.8 MB background video still the right one, and do you have a shorter or
smaller version? It cannot be re-encoded here (no ffmpeg).

### 20. News
The "Dec 13" item was removed as stale. **Do you want a news/blog section at all?** If
so, send real dated items with real destination pages.

---

## Quick answers would unblock the most work

If you only have time for a few, these give the most:

1. Correct landline (#1)
2. Final domain (#2)
3. Hours + response promise (#3)
4. Real statistics (#8)
5. The Zimbabwean standard for the badges (#10)
6. Form destination (#14)

## PPC landing pages - number confirmation (added during landing page design)

- The six service pages were landing pages for paid traffic, so the phone number matters
  more than usual. Two different landline numbers were published on the same pages:
  `0242 488 720` in the hero and `0242 488 272` in the footer contact block.
- `site-config.js` declares the canonical office number as **0242 488 720**
  (`phoneDisplay` / `phoneDial` = +263242488720), so the footer was normalised to
  0242 488 720 across all six service pages.
- **CONFIRM: is 0242 488 720 the correct, currently-live office number?** If the
  0242 488 272 number is a second real line, it should be added to site-config.js
  as the secondary number and shown deliberately rather than silently dropped.
- Secondary mobile 0773 688 904 and WhatsApp 0776 400 176 were left untouched.
- Also confirm: `info@extremefire.co.zw` is on the page but the site domain is
  `extremefiredesigninc.com` - if one is wrong it should be corrected before launch.
