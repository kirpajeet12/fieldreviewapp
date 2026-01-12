import express from "express";
import multer from "multer";
import { analyzeImage } from "../services/aiService.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/("/analyze", upload.single("image"), async (req, res) => {
  try {
    const { projectId, disciplineId } = req.body;

    if (!projectId || !disciplineId) {
      return res.status(400).json({ error: "Project and discipline required" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "Image required" });
    }

    const aiResult = await analyzeImage({
      imageBuffer: req.file.buffer,
      disciplineId
    });

    res.json({
      success: true,
      aiResult
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI analysis failed" });
  }
});

export default router;
