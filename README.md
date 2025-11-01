# 🤖 AI-Enabled IVR Conversational Modernization Framework

## 🧩 Overview
This project demonstrates a next-generation **AI-driven Interactive Voice Response (IVR)** framework that modernizes traditional telephony systems using artificial intelligence, speech recognition, and natural language response generation.  
The solution integrates **Twilio**, **Node.js**, and **Render** for real-time conversational automation.

---

## 🚀 Key Features
- ☎️ **Inbound Call Handling:** Automatically receives and processes calls via Twilio.
- 🗣️ **Speech-to-Text (STT):** Converts the caller’s voice input into text for analysis.
- 🧠 **AI-Based Understanding:** Interprets user intent and generates contextual responses.
- 🔊 **Text-to-Speech (TTS):** Responds to the caller using natural synthesized voice.
- 🔗 **ACS/BAP Adapter Integration:** Bridges legacy IVR logic with modern AI workflows.
- ☁️ **Cloud-Deployed Backend:** Fully deployed on Render for global access.
- 🪵 **Logging System:** Tracks speech, AI responses, and call sessions.

---

## 🏗️ System Architecture
Caller → Twilio Voice API → Express.js Server → AI Service → Twilio Response → Caller

**Core Modules:**
- `src/index.js` – Entry point, Express server setup  
- `routes/voice.js` – Handles Twilio voice webhooks (`/voice`, `/process-speech`)  
- `ai_service.js` – AI response generator (uses OpenAI or rule-based logic)  
- `acs_bap_adapter.js` – Integration layer for legacy system handoff  
- `utils/logger.js` – Call and response logging utility  

---

## ⚙️ Tech Stack
| Layer | Technology |
|-------|-------------|
| **Backend Framework** | Node.js (Express.js) |
| **Telephony** | Twilio Programmable Voice |
| **AI/NLP** | OpenAI API (configurable via `.env`) |
| **Deployment** | Render Cloud Platform |
| **Version Control** | GitHub |
| **Environment Variables** | dotenv |

---

## 🔧 Setup & Configuration

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/DimpulBachu/AI-IVR-Modernization-Framework.git
cd AI-IVR-Modernization-Framework
2️⃣ Install Dependencies
npm start
3️⃣ Configure Environment Variables

Create a .env file and fill in your credentials:
PORT=3000
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=+12192495739
AI_PROVIDER_API_KEY=your_openai_key_here
ACS_BAP_ENDPOINT=https://placeholder.local/acs-bap
4️⃣ Run Locally
npm start

