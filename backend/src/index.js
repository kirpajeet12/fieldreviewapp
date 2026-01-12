import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

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

app.options("*", cors()); // 🔑 FIXES preflight
app.use(express.json());


// ---------- SERVE FRONTEND ----------
const frontendPath = path.join(__dirname, "../../frontend");
app.use(express.static(frontendPath));

// ---------- HEALTH ----------
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// ---------- API ROUTES ----------
try {
  const auth = (await import("./routes/auth.js")).default;
  app.use("/api/auth", auth);
} catch {}

try {
  const projects = (await import("./routes/projects.js")).default;
  app.use("/api/projects", projects);
} catch {}

try {
  const fieldReviews = (await import("./routes/fieldReviews.js")).default;
  app.use("/api/field-reviews", fieldReviews);
} catch {}

try {
  const ai = (await import("./routes/ai.js")).default;
  app.use("/api/ai", ai);
} catch {}

// ---------- FALLBACK (IMPORTANT) ----------
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// ---------- START ----------
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("🚀 Server running on port", PORT);
});
