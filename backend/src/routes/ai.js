import express from "express";
import { analyzeImage } from "../services/aiService.js";

const router = express.Router();

router.post("/analyze", async (req, res) => {
  try {
    const { disciplineId, imageBase64 } = req.body;

    if (!disciplineId || !imageBase64) {
      return res.status(400).json({ error: "Missing data" });
    }

    const result = await analyzeImage({ disciplineId, imageBase64 });
    res.json(result);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI analysis failed" });
  }
});

export default router;
