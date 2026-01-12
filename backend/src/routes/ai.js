import express from "express";
import { analyzeImage } from "../services/aiService.js";

const router = express.Router();

// AI checklist suggestion
router.post("/analyze", async (req, res) => {
  const { imageBase64 } = req.body;

  const result = await analyzeImage(imageBase64);
  res.json(result);
});

export default router;
