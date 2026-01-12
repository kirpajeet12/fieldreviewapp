import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/**
 * SYSTEM KNOWLEDGE (ENGINEER RULE BASE)
 */
const knowledgeBase = {
  fs: {
    discipline: "Fire Stopping",
    expectedStages: ["FS Stage 1", "FS Stage 2", "FS Stage 3"],
    commonIssues: [
      "Missing fire stopping seal",
      "Improper fire-rated material",
      "Incomplete penetration sealing"
    ]
  },
  be: {
    discipline: "Building Envelope",
    expectedStages: ["BE Stage 1", "BE Stage 2"],
    commonIssues: [
      "Missing flashing",
      "Improper membrane overlap",
      "Unsealed window perimeter"
    ]
  }
};

/**
 * OPENAI VISION ANALYSIS
 */
async function openAIAnalyze(imageBase64, disciplineId) {
  const systemContext = knowledgeBase[disciplineId];

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `
You are a professional building field reviewer.
Analyze construction site images.
Only describe visible construction deficiencies.
Do NOT guess codes.
`
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `
Discipline: ${systemContext.discipline}
Common issues: ${systemContext.commonIssues.join(", ")}

Analyze the image and suggest:
- Observed issue
- Likely stage
`
          },
          {
            type: "image_url",
            image_url: {
              url: imageBase64
            }
          }
        ]
      }
    ]
  });

  return response.choices[0].message.content;
}

/**
 * FINAL MERGED ANALYSIS
 */
export async function analyzeImage({ disciplineId, imageBase64 }) {
  const system = knowledgeBase[disciplineId];

  if (!system) {
    throw new Error("Unknown discipline");
  }

  const aiResult = await openAIAnalyze(imageBase64, disciplineId);

  return {
    discipline: system.discipline,
    systemExpectedStages: system.expectedStages,
    aiObservation: aiResult,
    confidence: "medium",
    editable: true,          // 🔑 reviewer can edit
    source: {
      system: true,
      ai: true
    }
  };
}
