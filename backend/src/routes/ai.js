import express from "express";
import multer from "multer";
import { analyzeImage } from "../services/aiService.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/analyze", upload.single("image"), async (req, res) => {
  try {
    const { projectId, disciplineId } = req.body;

    if (!projectId || !disciplineId) {
      return res.status(400).json({ error: "projectId and disciplineId required" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "Image required" });
    }

    const result = await analyzeImage({
      imageBuffer: req.file.buffer,
      disciplineId
    });

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI analysis failed" });
  }
});

export default router;   // 🔑 REQUIRED
