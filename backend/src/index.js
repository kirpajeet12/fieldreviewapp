import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import projectRoutes from "./routes/projects.js";
import frRoutes from "./routes/fieldReviews.js";
import aiRoutes from "./routes/ai.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/projects", projectRoutes);
app.use("/api/field-reviews", frRoutes);
app.use("/api/ai", aiRoutes);

app.get("/", (req, res) => {
  res.send("Field Review API running");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
