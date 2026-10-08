require('dotenv').config();
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const OpenAI = require('openai');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '10kb' }));

// Gzip / Brotli via compression package
app.use(compression());

// Rate limiter for /api/chat — 15 req/min per IP
const chatLimiter = rateLimit({
  windowMs: 60000,
  max: 15,
  standardHeaders: true,
  legacyHeaders: false,
  message: { reply: 'Too many messages. Please wait a moment and try again.' },
});

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const KNOWLEDGE = `
COMPANY: Extreme Fire Design Inc (Salvis Trading Pvt Ltd t/a Extreme Fire Design Inc). Fire protection engineering, installation, and maintenance company in Zimbabwe. Located at 21566 Damofalls Industrial Area, Harare, Zimbabwe.

CONTACT: WhatsApp 0776 400 176 (this is the ONLY WhatsApp number for the business), Phone 0242 488 270/1/2/3, Cell 0773 688 904, Email info@extremefire.co.zw. Address: 21566 Damofalls Industrial Area, Harare, Zimbabwe. Trading hours: TODO_CONFIRM.

TAGLINE: "Safety Through Technology"

SERVICES:
1. DESIGN - AutoCAD fire protection layouts, computerized hydraulic calculations, material schedules, pipe sizing, installation details, fully dimensioned drawings.
2. INSTALLATION & COMMISSIONING - Fire detection, suppression, extinguishing, sprinkler, hydrant, hose-reel, and special hazard systems. Workshop prefabrication, testing, commissioning, as-built drawings.
3. MAINTENANCE & RAPID RESPONSE - Alterations, extensions, annual servicing, six-monthly sprinkler valve servicing, inspections, testing, audits, pipe analysis, water supply review, upgrade advice.

SYSTEMS:
1. Automatic Sprinkler & Pre-action Systems - Wet, dry, pre-action. Hydraulic calculations, installation coordination.
2. Fire Hydrant & Hose-Reel Systems - Hydrant networks, hose-reel layouts, water supply adequacy review.
3. Detection & Alarm Systems - Fire alarm, automatic detection, notification, suppression control. Device layouts, control interfaces, testing guidance.
4. Deluge & Water Spray Systems - Specialized water-based for high-hazard areas. Industrial protection, hazard-based design.
5. Gas, Foam & Dry Chemical Suppression - Special hazard suppression where water is not ideal. Gas suppression, foam systems, dry chemical.
6. Water Mist Systems - For generators, transformers, conveyors, switchgear, cable tunnels, turbine houses, boiler houses.

SCOPE OF WORK: Automatic sprinkler/pre-action, fire hydrant/hose-reel, deluge/water spray, detection/suppression control, gas suppression, foam suppression, dry chemical, compact suppression, portable extinguishers, emergency exit/safety graphics, smoke/heat venting, diesel/electric fire pumps, pipe analysis, water supply reviews, AutoCAD as-built drawings, water mist.

TEAM:
- Skeward Mwineya - Technical Support, NFPA Certified, 30+ years experience
- Ncebisi Ndlovu - Contracts Manager, HND Mechanical Engineering
- Vusumuzi Ndhlovu - Health & Safety, BEnvSci Hons Safety Health & Environmental Management
- Ian Mwineya - Procurement Manager
- Sandrah Mhungu - Administration Manager, BCom Management Accounting & Finance (Wits)
- Richard Muir - Fire Alarms & Security Systems Manager, City & Guilds Electronics

VALUES: Customer-centric service, innovative technology, superior engineering, quality workmanship, safety-first delivery.

VISION: Provide clients with reliable, cost-effective fire protection and water systems tailored to each project.
MISSION: Protect lives and property while exceeding customer expectations for quality, service, profitability, safety.
ETHICS: Work with integrity, honor commitments, build trust through professional service.

STANDARDS: NFPA 13 (Sprinkler Systems), EN 12845, ASIB Standards, Local Authority Requirements.

CLIENTS: Old Mutual, Mega-Pak Zim, Delta Co-op, Joina City, ZIMSEC, Meikles Hotel, CHEP, Mutare Bottling Company, Total Zimbabwe, African Distillers, CocaCola Zimbabwe.

PRODUCT BRANDS: FM 200, Ansul, Reliable Sprinklers, Fire Class, Globe, Grinnell, Hygood, Inbal, Kidde, Technoswitch, SafeQIP.

ADDITIONAL SERVICES: Air conditioning and refrigeration support for commercial buildings.
`;

app.post('/api/chat', chatLimiter, async (req, res) => {
  try {
    const { message } = req.body;
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: `You are the official chatbot for Extreme Fire Design Inc, a fire protection company in Zimbabwe. Use ONLY the knowledge below to answer questions. If you don't know something, say "Please contact us directly at info@extremefire.co.zw or call 0242 488 270/1/2/3 for more details." Keep responses concise, professional, and helpful.\n\n${KNOWLEDGE}` },
        { role: 'user', content: message }
      ],
      max_tokens: 400,
    });
    res.json({ reply: completion.choices[0].message.content });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ reply: 'Sorry, something went wrong. Please try again.' });
  }
});

// Static files — deny dotfiles (.env, .git, etc.), long cache for assets
app.use(express.static(__dirname, {
  dotfiles: 'deny',
  maxAge: '7d',
  etag: true,
  lastModified: true,
  index: 'index.html',
  setHeaders(res, filePath) {
    // HTML contains the cache-busted stylesheet references. Revalidate it so
    // visitors do not keep a stale page shell after a local site update.
    if (filePath.toLowerCase().endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-store');
    }
  },
}));

// 404 — must be after all routes
app.use((req, res) => {
  res.status(404).sendFile(__dirname + '/404.html');
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
