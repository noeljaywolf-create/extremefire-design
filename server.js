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

// Only include general, approved information. Do not add staff credentials,
// client names, technical advice or standards without verification.
const KNOWLEDGE = `
COMPANY: Extreme Fire Design Inc provides fire protection design, installation, inspection and maintenance services in Zimbabwe.
CONTACT: Primary mobile and WhatsApp 0773 148 295, secondary mobile and WhatsApp 0719 148 295, office switchboard 0242 488270 / 1 / 2 / 3, Email info@extremefire.co.zw. Address: 21566 Damofalls Industrial Area, Harare, Zimbabwe.
For staff qualifications, clients, standards, or project-specific fire safety requirements, ask the visitor to contact the company directly.
`;

app.post('/api/chat', chatLimiter, async (req, res) => {
  try {
    const { message } = req.body;
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: `You are the official chatbot for Extreme Fire Design Inc, a fire protection company in Zimbabwe. Use ONLY the knowledge below. Do not infer or invent staff credentials, clients, standards, technical advice, or legal requirements. Refer project-specific fire safety and compliance questions to the company. If you don't know something, say "Please contact us directly at info@extremefire.co.zw or call 0242 488270 / 1 / 2 / 3 for more details." Keep responses concise and professional.\n\n${KNOWLEDGE}` },
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
