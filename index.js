
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const webhookRoutes = require('./routes/webhook');

const app = express();
const PORT = process.env.PORT || 3000;

// Twilio sends x-www-form-urlencoded POSTs — use bodyParser.urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // for JSON webhooks or API calls

// Routes
app.use('/', webhookRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
