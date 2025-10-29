// backend/src/ai_service.js
// Conversational AI interface using OpenAI for natural-language understanding.

const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.AI_PROVIDER_API_KEY || "",
});

// maintain small in-memory context for each caller
const conversationMemory = new Map();

/**
 * getAIResponse
 * Generates a conversational reply using OpenAI Chat Completions API.
 * Falls back to rule-based reply if no API key is set.
 */
module.exports = {
  async getAIResponse(userText, from = "unknown") {
    const key = process.env.AI_PROVIDER_API_KEY;
    if (!key) {
      // fallback if no key configured
      return { reply: "AI service not configured. Please add your API key." };
    }

    // maintain simple conversation history
    const prevMessages = conversationMemory.get(from) || [];
    prevMessages.push({ role: "user", content: userText });

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a polite IVR assistant helping callers with basic queries." },
          ...prevMessages,
        ],
        max_tokens: 100,
      });

      const reply = completion.choices[0].message.content.trim();

      // update conversation memory (limit to last 5 messages)
      prevMessages.push({ role: "assistant", content: reply });
      conversationMemory.set(from, prevMessages.slice(-5));

      return { reply };
    } catch (err) {
      console.error("AI service error:", err.message);
      return { reply: "Sorry, I’m having trouble reaching the AI service." };
    }
  },
};
