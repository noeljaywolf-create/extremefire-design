# Performance — before and after

All figures are measured from the local build, not estimated. Method: sum the bytes the
browser actually fetches on first view — the HTML, CSS, JS, and images **without**
`loading="lazy"`. Lazy images and `<a download>` targets are excluded because they are not
fetched until scrolled to or clicked.

## Homepage first load

| | Before | After | Change |
|---|---|---|---|
| HTML | 90.2 KB | 90.2 KB | — |
| CSS + JS (10 files) | 213.9 KB | 213.9 KB | — |
| Eager images | 26.1 KB | 26.1 KB | — |
| Hero video | 2,877.2 KB | **0 KB on mobile** | −2,877 KB |
| **First load, mobile** | **3,207.4 KB** | **330.3 KB** | **−89.7%** |
| **First load, desktop** | 3,207.4 KB | 3,207.4 KB | unchanged |

**Target: under 1.5 MB on first load. After: 330 KB — passes with 1.2 MB to spare on
mobile.**

Desktop still fetches the video, which is correct: on an unmetered connection it is the
hero, and stripping it would degrade the page for no benefit. If desktop load time
matters, the video needs re-encoding (see below).

## What was actually wrong

The single biggest problem was not images or CSS. It was a **2.8 MB MP4 with
`autoplay`** in the hero of three pages (`index.html`, `portfolio.html`,
`services.html`), which a Zimbabwean mobile visitor on metered data would download
before seeing anything else.

The fix strips the `<source>` element *before* the browser can begin fetching, rather
than hiding the element with CSS — so the file is never requested at all. It is skipped
when any of these is true:

- viewport ≤ 768px
- `navigator.connection.saveData` is true
- effective connection type is `2g` or `slow-2g`
- `prefers-reduced-motion: reduce`

In every case the poster image is shown instead, so the hero still looks finished.

## Carousel duplication

The services carousel had **14 slides containing 7 unique services** — every one
duplicated verbatim. Removed to 7.

- Slides: 14 → 7
- Images requested on scroll: 7 fewer

## Lazy images

All 48 below-the-fold images were already `loading="lazy"`. Total lazy payload is
**1,802 KB**, fetched progressively as the user scrolls, not on first load.

## Not done

### WebP conversion
Every image is JPEG or PNG. A WebP pass would cut the 1.8 MB lazy payload by roughly
60–70%, which matters on mobile data. **Not done in this pass** — it needs a decision on
whether to serve WebP with a JPEG fallback, and it touches ~200 files.

### width/height attributes
Adding explicit `width` and `height` prevents layout shift (CLS). Not done — it requires
reading the intrinsic size of every image.

### Video re-encoding
`Background/extreme-fire-video.mp4` is 2.8 MB. The brief asks for a WebM under 2 MB.
**Blocked: ffmpeg is not installed on this machine.** Options:
- `winget install ffmpeg` then re-encode
- Or supply a shorter, smaller clip

### PageSpeed Insights scores
**Not captured.** These need a run against a deployed URL, and this pass is not pushed.
To get them after deploying the branch:

```powershell
# Lighthouse mobile, against the live URL
npx lighthouse https://<your-preview-url>/ --preset=desktop=false --output=html
```

Expect the mobile score to be limited by `chat.js` (51.5 KB) and the CSS total
(88.7 KB across `styles.css` and `enhanced.css`), both of which are uncompressed.
Consider minifying CSS/JS and dropping the unused chat widget.

## Repo size

| | Size |
|---|---|
| Whole repo | 20.1 MB |
| `documents/extreme-fire-company-profile.pdf` | 4.4 MB |
| `Background/extreme-fire-video.mp4` | 2.8 MB |

The 4.4 MB PDF is a download link, so it does not affect page load — but it is 22% of
the repository. Consider compressing it or hosting it outside the repo.
