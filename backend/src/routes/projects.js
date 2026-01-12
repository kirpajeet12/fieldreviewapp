import express from "express";
import { store } from "../store/memoryStore.js";
import { generateId } from "../utils/id.js";

const router = express.Router();

/**
 * GET all projects
 */
router.get("/", (req, res) => {
  res.json(store.projects);
});

/**
 * CREATE new project
 */
router.post("/", (req, res) => {
  const {
    name,
    clientName,
    disciplines = []
  } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Project name required" });
  }

  const project = {
    id: generateId("proj"),
    name,
    clientName: clientName || "",
    disciplines,
    createdAt: new Date().toISOString()
  };

  // ✅ THIS LINE WAS BROKEN BEFORE
  store.projects.push(project);

  res.json(project);
});

export default router;
