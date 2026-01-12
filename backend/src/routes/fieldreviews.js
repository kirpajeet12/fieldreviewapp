import express from "express";
import { store } from "../store/memoryStore.js";
import { cloneFieldReview } from "../services/cloneService.js";

const router = express.Router();

// Create Field Review
router.post("/", (req, res) => {
  const fr = {
    ...req.body,
    createdAt: new Date()
  };

  store.fieldReviews.push(fr);
  res.json(fr);
});

// Clone Field Review
router.post("/clone/:id", (req, res) => {
  const cloned = cloneFieldReview(req.params.id);
  res.json(cloned);
});

export default router;
