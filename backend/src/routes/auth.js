import express from "express";
import { generateId } from "../utils/id.js";

const router = express.Router();

// TEMP login (no DB yet)
router.post("/login", (req, res) => {
  const { email } = req.body;

  res.json({
    token: "mock-token",
    user: {
      id: generateId(),
      email,
      role: "field_reviewer"
    }
  });
});

export default router;
