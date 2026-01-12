import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import auth from "./routes/auth.js";
import projects from "./routes/projects.js";
import fieldReviews from "./routes/fieldReviews.js";
import ai from "./routes/ai.js";

dotenv.config();

const app = express();

// ---------- PATH FIX FOR ES MODULE ----------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---------- MIDDLEWARE ----------
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.options("*", cors());
app.use(express.json());

// ---------- SERVE FRONTEND ----------
const frontendPath = path.join(__dirname, "../../frontend");
app.use(express.static(frontendPath));

// ---------- HEALTH ----------
app.get("/health", (_, res) => {
  res.json({ status: "ok" });
});

// ---------- API ROUTES ----------
app.use("/api/auth", auth);
app.use("/api/projects", projects);
app.use("/api/field-reviews", fieldReviews);
app.use("/api/ai", ai);

// ---------- FALLBACK ----------
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// ---------- START ----------
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("🚀 Server running on port", PORT);
});
