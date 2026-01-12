import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import auth from "./routes/auth.js";
import projects from "./routes/projects.js";
import fieldReviews from "./routes/fieldReviews.js";
import ai from "./routes/ai.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_, res) => res.json({ status: "ok" }));

app.use("/api/auth", auth);
app.use("/api/projects", projects);
app.use("/api/field-reviews", fieldReviews);
app.use("/api/ai", ai);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log("✅ Server running on", PORT));
