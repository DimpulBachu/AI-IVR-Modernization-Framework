const express = require('express');
const router = express.Router();
const twilio = require('twilio');
const acsBapAdapter = require('../acs_bap_adapter');
const aiService = require('../ai_service');
const { logCall } = require('../utils/logger'); // ✅ added logger import

// Endpoint Twilio will call when a call arrives.
// It returns TwiML instructing Twilio to ask the user a question and gather speech.
router.post('/voice', (req, res) => {
  // Create a TwiML response
  const twiml = new twilio.twiml.VoiceResponse();

  // <Gather input="speech"> will let Twilio listen and transcribe.
  const gather = twiml.gather({
    input: 'speech',
    timeout: 5,
    speechTimeout: 'auto',
    action: '/process-speech', // Twilio will POST recognition result here
  });

  // Use <Say> for TTS
  gather.say('Hello. Welcome to the AI IVR system. Please tell me how I can help you today.');

  // If gather fails (no speech), provide fallback and hang up
  twiml.say('Sorry, I did not hear anything. Goodbye.');
  twiml.hangup();

  res.type('text/xml').send(twiml.toString());
});

// Twilio will POST SpeechResult here after the user speaks.
// Example payload contains: SpeechResult, Confidence, etc.
router.post('/process-speech', async (req, res) => {
  // Twilio sends form-encoded data; SpeechResult is a key field.
  const speechText = req.body.SpeechResult || '';
  const fromNumber = req.body.From || 'unknown';
  console.log(`[process-speech] from=${fromNumber} speech="${speechText}"`);

  try {
    // --- Integration layer: route transcription to ACS/BAP or AI as needed ---
    const acsResult = await acsBapAdapter.handleSpeech({ text: speechText, from: fromNumber });
    let replyText = '';

    if (acsResult && acsResult.handled) {
      // ACS/BAP handled it and provided a response
      replyText = acsResult.responseText;
    } else {
      // Fallback: route to local AI service (OpenAI or simple rule)
      const aiResp = await aiService.getAIResponse(speechText);
      replyText = aiResp.reply;
    }

    // ✅ Log the full interaction
    logCall(`From: ${fromNumber} | Heard: "${speechText}" | Reply: "${replyText}"`);
    console.log(`AI service responded: ${replyText}`);

    // Respond with TwiML that speaks the replyText
    const twiml = new twilio.twiml.VoiceResponse();
    twiml.say(replyText);
    twiml.hangup();

    res.type('text/xml').send(twiml.toString());
  } catch (err) {
    console.error('Error in /process-speech:', err);
    const twiml = new twilio.twiml.VoiceResponse();
    twiml.say('Sorry, an error occurred while processing your request. Please try again later.');
    twiml.hangup();
    res.type('text/xml').send(twiml.toString());
  }
});

module.exports = router;
