import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function analyzeImage(imageBase64) {
  // placeholder (safe + cheap for now)
  return {
    discipline: "Fire Stopping",
    stage: "FS Stage 2",
    suggestedChecklist: [
      "Approved fire stopping listing",
      "Penetrations sealed",
      "ULC compliance visible"
    ],
    suggestedDeficiency: "Seal around pipe penetration"
  };
}
