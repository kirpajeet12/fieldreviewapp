import OpenAI from "openai";
import fs from "fs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function analyzeImage(imagePath) {
  const imageBuffer = fs.readFileSync(imagePath);

  const response = await openai.responses.create({
    model: "gpt-4.1-mini",
    input: [
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: `
You are a professional building inspector.

Analyze the image and return JSON with:
- discipline
- stage
- deficiency
- confidence (low | medium | high)

Only return valid JSON.
            `
          },
          {
            type: "input_image",
            image_base64: imageBuffer.toString("base64")
          }
        ]
      }
    ]
  });

  const text = response.output_text;

  // Safety fallback
  try {
    return JSON.parse(text);
  } catch {
    return {
      discipline: "Unknown",
      stage: "Review Required",
      deficiency: text,
      confidence: "low"
    };
  }
}
