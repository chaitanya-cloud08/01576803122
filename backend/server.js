const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const FILE = path.join(__dirname, 'urls.json');

app.use(cors());
app.use(express.json());

// Load existing URLs from file or empty
let urlMap = {};
if (fs.existsSync(FILE)) {
  try {
    urlMap = JSON.parse(fs.readFileSync(FILE));
  } catch (err) {
    console.error('Error reading urls.json:', err);
    urlMap = {};
  }
}

// Save to file
const saveToFile = () => {
  fs.writeFileSync(FILE, JSON.stringify(urlMap, null, 2));
};

// POST /api/shorten
app.post('/api/shorten', (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  const code = Math.random().toString(36).substring(2, 7);
  const shortUrl = `http://localhost:${PORT}/${code}`;

  urlMap[code] = url;
  saveToFile();

  res.json({
    original_url: url,
    shortened_url: shortUrl,
  });
});

// GET /:code → redirect
app.get('/:code', (req, res) => {
  const code = req.params.code;
  const originalUrl = urlMap[code];

  if (originalUrl) {
    res.redirect(originalUrl);
  } else {
    res.status(404).send('Short URL not found');
  }
});

app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
