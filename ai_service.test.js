const aiService = require("../ai_service");

describe("AI Service", () => {
  test("returns reply string", async () => {
    const res = await aiService.getAIResponse("Hello", "+911234567890");
    expect(typeof res.reply).toBe("string");
    expect(res.reply.length).toBeGreaterThan(0);
  });
});
