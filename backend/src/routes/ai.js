import express from "express";
import { analyzeImage } from "../services/aiService.js";

const router = express.Router();

router.post("/analyze", async (_, res) => {
  res.json(await analyzeImage());
});

export default router;
