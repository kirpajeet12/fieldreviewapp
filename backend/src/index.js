import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import projectRoutes from "./routes/projects.js";
import fieldReviewRoutes from "./routes/fieldReviews.js";
import aiRoutes from "./routes/ai.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Health check (VERY important for Render)
app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "field-review-backend" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/field-reviews", fieldReviewRoutes);
app.use("/api/ai", aiRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
