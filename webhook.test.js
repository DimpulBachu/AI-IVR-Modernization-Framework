
const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const webhookRoutes = require('../routes/webhook');

// Create a small app instance to test
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', webhookRoutes);

describe('Webhook endpoints', () => {
  test('POST /process-speech responds with TwiML', async () => {
    const resp = await request(app)
      .post('/process-speech')
      .type('form')
      .send({ SpeechResult: 'hello test', From: '+911234567890' });

    expect(resp.status).toBe(200);
    // TwiML response contains <Say>
    expect(resp.text).toMatch(/<Say>/);
  });
});
