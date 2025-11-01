"""
========================================================
TASK 2 — AI-ENABLED IVR FRAMEWORK SETUP
========================================================
Description:
This task establishes the foundational IVR system using
Express.js and Twilio. It handles inbound calls and uses
Twilio’s <Say> and <Gather> verbs for speech collection.
========================================================
"""

# ---------------------------------------------
# 🧱 IMPORT REQUIRED MODULES
# ---------------------------------------------
# (These correspond to Node.js require() imports)
import express
import body_parser
import twilio
from twilio.twiml.voice_response import VoiceResponse

# ---------------------------------------------
# 🚀 INITIALIZE EXPRESS APPLICATION
# ---------------------------------------------
app = express()
app.use(body_parser.urlencoded({ extended: False }))

# ---------------------------------------------
# ☎️ TASK 2: VOICE ROUTE – INITIAL CALL HANDLING
# ---------------------------------------------
@app.route('/voice', methods=['POST'])
def voice_handler(req, res):
    """
    This route is triggered by Twilio whenever an inbound call arrives.
    It greets the caller and listens for speech input.
    """
    twiml = VoiceResponse()
    
    # Gather user input as speech
    gather = twiml.gather(
        input='speech',
        timeout=5,
        speechTimeout='auto',
        action='/process-speech'
    )
    
    gather.say("Hello. Welcome to the AI IVR system. "
               "Please tell me how I can help you today.")
    
    # If no speech detected, handle gracefully
    twiml.say("Sorry, I did not hear anything. Goodbye.")
    twiml.hangup()
    
    # Return the TwiML XML
    return str(twiml)

# ---------------------------------------------
# 🏁 START THE SERVER
# ---------------------------------------------
if __name__ == "__main__":
    print("Task 2 — IVR backend server running on port 3000.")
