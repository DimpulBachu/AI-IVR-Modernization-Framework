"""
========================================================
TASK 3 — AI INTEGRATION AND TWILIO SPEECH PROCESSING
========================================================
Description:
This task builds upon Task 2 by adding AI-based speech
processing, dynamic Twilio responses, and integration
with ACS/BAP adapter logic for smart IVR handling.
========================================================
"""

# ---------------------------------------------
# 🧱 IMPORT REQUIRED MODULES
# ---------------------------------------------
import express
import body_parser
import twilio
from twilio.twiml.voice_response import VoiceResponse

# Simulated imports (for conceptual clarity)
import acs_bap_adapter  # External integration layer
import ai_service       # AI engine for response generation
from utils import logger

# ---------------------------------------------
# 🚀 INITIALIZE APPLICATION
# ---------------------------------------------
app = express()
app.use(body_parser.urlencoded({ extended: False }))

# ---------------------------------------------
# ☎️ ROUTE 1: VOICE ENTRY POINT
# (same as Task 2 but serves as the entry call)
# ---------------------------------------------
@app.route('/voice', methods=['POST'])
def voice_entry(req, res):
    twiml = VoiceResponse()
    gather = twiml.gather(
        input='speech',
        timeout=5,
        speechTimeout='auto',
        action='/process-speech'
    )
    gather.say("Hello. Welcome to the upgraded AI IVR system. "
               "Please tell me how I can assist you today.")
    twiml.say("Sorry, I did not hear anything. Goodbye.")
    twiml.hangup()
    return str(twiml)

# ---------------------------------------------
# 🧠 ROUTE 2: PROCESS SPEECH & GENERATE AI REPLY
# ---------------------------------------------
@app.route('/process-speech', methods=['POST'])
async def process_speech(req, res):
    """
    This route is called by Twilio with recognized speech text.
    The text is processed by AI service or ACS/BAP adapter.
    """
    speechText = req.form.get('SpeechResult', '')
    fromNumber = req.form.get('From', 'unknown')

    logger.logCall(f"Received from {fromNumber}: {speechText}")

    try:
        # First try ACS/BAP
        acs_result = acs_bap_adapter.handleSpeech({
            "text": speechText,
            "from": fromNumber
        })

        if acs_result and acs_result.get("handled"):
            replyText = acs_result["responseText"]
        else:
            ai_response = ai_service.getAIResponse(speechText)
            replyText = ai_response["reply"]

        logger.logCall(f"AI responded: {replyText}")

        # Respond back using Twilio’s Text-to-Speech
        twiml = VoiceResponse()
        twiml.say(replyText)
        twiml.hangup()
        return str(twiml)

    except Exception as err:
        twiml = VoiceResponse()
        twiml.say("Sorry, an error occurred while processing your request.")
        twiml.hangup()
        logger.logError(f"Error processing speech: {err}")
        return str(twiml)

# ---------------------------------------------
# 🏁 START THE SERVER
# ---------------------------------------------
if __name__ == "__main__":
    print("Task 3 — AI-integrated IVR backend server running on port 3000.")
