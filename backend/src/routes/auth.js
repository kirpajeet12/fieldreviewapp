import express from "express";
const router = express.Router();

router.post("/login", (req, res) => {
  res.json({ token: "mock", role: "field_reviewer" });
});

export default router;
