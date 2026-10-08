# [CONFIRM] — everything I need you to answer

Nothing below has been invented or guessed. Each item is either blocking, or currently
stopping something from being shown. Ordered by how much it affects the site.

---

## Blocking — the site is inconsistent or wrong until these are answered

### 1. ~~What is the correct main landline?~~ RESOLVED
**Confirmed by the client: the office line is a switchboard.**

| Where | Value now |
|---|---|
| Visible landing text | `0242 488 270/1/2/3` |
| Every `tel:` link | `+263242488270` (base line of the switchboard) |
| `LocalBusiness` / `ContactPoint` schema | `+263242488270` |

The previously published `0242 488 720` was wrong and has been removed site-wide.
`site-config.js` now records `phoneDisplay` / `phoneDial` as CONFIRMED.

### 2. What is the final production domain?
Canonicals, `og:url` and the sitemap all say `https://www.extremefiredesigninc.com`.
The site is served from **GitHub Pages**, and the contact email is
`@extremefire.co.zw`. Those are two different domains.

**Which domain is canonical?** Once answered, I fix the canonical tags, `og:url`,
absolute `og:image` URLs, `sitemap.xml`, `robots.txt` and the redirect map in one pass.

### 3. ~~Trading hours and response promise~~ RESOLVED — hours only
**Confirmed by the client: office hours are Monday to Friday, 7:30am – 4:30pm.**

Applied to:
- `contact.html` → "Trading hours: Monday - Friday | 7:30AM - 4:30PM"
- `index.html` JSON-LD → `OpeningHoursSpecification`, Mo–Fr 07:30–16:30
- `site-config.js` → `hours.weekday / opens / closes`

**Still open — the response promise.** The 24/7 claims have been removed because
they contradicted the office hours above, and I will not print an out-of-hours
service that has not been confirmed. So the remaining question is narrow:

> Is there an out-of-hours number or on-call arrangement for genuine fire
> emergencies? If yes, give me the wording and the number and I will print it
> clearly distinguished from the office hours. If no, the site now correctly
> promises a reply during office hours only.

### 4. ~~Is the email `info@extremefire.co.zw`?~~ CONFIRMED — one question remains
**Confirmed by the client: `info@extremefire.co.zw` is the correct address.**
It is the only address on the site and is marked CONFIRMED in `site-config.js`.

Remaining: **is it actively monitored, and how often?** Every fallback path — the
lead forms, the quote flow and the contact band — depends on someone reading it.

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

## PPC landing pages - number confirmation — RESOLVED

Raised during the landing page redesign because a wrong number on a paid page
costs leads. The client has since confirmed all three facts:

- **Office line: switchboard `0242 488 270/1/2/3`.** The three conflicting values
  found earlier — `...488720` in the hero and footer, and `...488272` in the footer
  contact block — were all wrong. All are gone. `tel:` links now dial
  `+263242488270`, the base line of the switchboard. 76 display and 85 dial
  references updated across all 16 pages, plus `site-config.js`, `chat.js`,
  `server.js` and the JSON-LD.
- **Office hours: Monday to Friday, 7:30am – 4:30pm.** The contradictory
  "24 hours a day" / "available every day" wording has been removed rather than
  left to disagree with the hours. The narrower out-of-hours question is tracked
  at #3.
- **Email `info@extremefire.co.zw` confirmed** as the correct address.

Unchanged and still correct: mobile `0773 688 904`, WhatsApp `0776 400 176`.
Still open from this section: the canonical domain (#2), since the contact email
is on `extremefire.co.zw` while the site is served from `extremefiredesigninc.com`.
