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
 * CREATE project
 */
router.post("/", (req, res) => {
  const { name, client, disciplines } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Project name required" });
  }

  const project = {
    id: generateId("PRJ"),
    name,
    client,
    disciplines: disciplines || [],
    createdAt: new Date().toISOString()
  };

  store.projects.push(projec
