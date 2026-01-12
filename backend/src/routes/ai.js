import express from "express";
import multer from "multer";
import { analyzeImage } from "../services/aiService.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/analyze", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    const result = await analyzeImage(req.file);

    res.json(result);
  } catch (err) {
    console.error("AI analyze error:", err);
    res.status(500).json({ error: "AI analysis failed" });
  }
});

export default router;
