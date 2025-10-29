
const axios = require('axios');

module.exports = {
  /**
   * handleSpeech
   * Input: { text, from }
   * Output: { handled: boolean, responseText: string }
   *
   * If ACS/BAP can handle the request (intent recognized), return handled:true and responseText.
   * Otherwise return handled:false to let fallback AI handle it.
   */
  async handleSpeech({ text, from }) {
    // Simple mock decision: if user says "transfer" or "agent" then ACS/BAP would handle.
    const t = (text || '').toLowerCase();

    // QUICK RULES: seen keywords
    if (t.includes('transfer') || t.includes('agent') || t.includes('representative')) {
      // Example of what a real ACS/BAP call might look like:
      // const resp = await axios.post(process.env.ACS_BAP_ENDPOINT, { text, from }, { headers: { Authorization: `Bearer ${process.env.ACS_BAP_KEY}` }});
      // return { handled: true, responseText: resp.data.reply };

      // Mock response when recognized:
      return { handled: true, responseText: 'I will transfer you to a human agent. Please hold.' };
    }

    // Not handled — return false so fallback AI can respond
    return { handled: false, responseText: '' };
  },
};
