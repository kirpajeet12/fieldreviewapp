import express from "express";
import multer from "multer";
import { analyzeImage } from "../services/aiService.js";

const router = express.Router();

// store image in memory (best for AI)
const upload = multer({ storage: multer.memoryStorage() });

router.post("/analyze", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    const result = await analyzeImage(req.file);
    res.json(result);
  } catch (err) {
    console.error("AI ERROR:", err);
    res.status(500).json({ error: "AI analysis failed" });
  }
});

export default router;
