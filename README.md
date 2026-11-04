# Extreme Fire Design Inc website

Static website for a Zimbabwean fire protection business, with an optional Node.js chat server. See [SITEMAP.md](SITEMAP.md) for the page inventory and [VERIFICATION.md](VERIFICATION.md) for the release and end-to-end verification plan.

## Run locally

Requires Node.js and npm. Install dependencies with `npm install`, then run `npm start` and open `http://localhost:3000/`. The server uses port 3000 unless `PORT` is set. `OPENAI_API_KEY` must be set in the environment or a local `.env` file for the server's chat integration; do not commit secrets. Do not use a real API key when only testing static pages: a static HTTP server can serve the files instead, for example `python -m http.server 8000`.

## How it works

- HTML pages, CSS, JavaScript, images and documents are served as static files.
- `site-config.js` contains shared contact details and fact-gated content; `site-render.js` renders shared data. Keep unverified claims unpublished and check hard-coded fallback text and structured data when changing contact details.
- `leads.js` opens a WhatsApp draft for forms marked `data-lead-form`. The visitor must press Send in WhatsApp; opening the draft is not a completed enquiry. The contact page has a separate email-draft form. There is no form-submission backend.
- `server.js` serves the static files and provides `POST /api/chat` using OpenAI. GitHub Pages does not run Node.js or provide this API. Its knowledge text is restricted to general information; review and test any independently deployed AI service before enabling it.
- `chat.js` is a separate browser-side chat widget. Its replies are limited to general information and direct visitors to the company for staff credentials, clients and technical advice.
- `sitemap.xml`, `robots.txt`, `llms.txt` and page metadata support discovery. `_redirects.template` is a reference, not an active GitHub Pages redirect configuration.

## Deployment

The GitHub Pages site was last verified at <https://noeljaywolf-create.github.io/extremefire-design/> and configured to deploy from the root of the `main` branch. Changes pushed only to `lead-gen-rebuild` do not update that site. Review changes and verify the intended target before deploying; confirm the Pages settings again if they change.

The site's canonical URLs and XML sitemap currently use `https://www.extremefiredesigninc.com`. The GitHub Pages configuration previously reported no custom domain. Confirm the production domain and its hosting before changing DNS, canonicals or deploying to another host.

## Testing

`npm test` is currently a placeholder and intentionally fails; it is not an automated test suite. Follow [VERIFICATION.md](VERIFICATION.md) and record actual results. [TEST-CHECKLIST.md](TEST-CHECKLIST.md) is a historical checklist with some outdated expectations.
