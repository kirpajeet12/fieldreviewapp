import express from "express";
import {
  createBaseFieldReview,
  cloneFieldReview
} from "../services/cloneService.js";
import { generateReport } from "../services/reportService.js";

const router = express.Router();

router.post("/base", (req, res) => {
  const { projectId, disciplineId } = req.body;
  res.json(createBaseFieldReview(projectId, disciplineId));
});

router.post("/clone/:id", (req, res) => {
  res.json(cloneFieldReview(req.params.id));
});

router.get("/report/:id", (req, res) => {
  res.json(generateReport(req.params.id));
});

export default router;
