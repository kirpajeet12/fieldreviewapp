import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function analyzeImage(base64Image) {
  // FOR NOW — stub response (safe)
  return {
    suggestedChecklist: [
      "Fire stopping material present",
      "Penetration sealed"
    ],
    suggestedDeficiency: "Possible missing fire-stop sealant",
    suggestedComment: "Verify fire-rated sealant at pipe penetration"
  };
}
