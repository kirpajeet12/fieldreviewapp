import express from "express";
import { store } from "../store/memoryStore.js";
import { generateId } from "../utils/id.js";

const router = express.Router();

// Create project
router.post("/", (req, res) => {
  const project = {
    id: generateId(),
    ...req.body,
    createdAt: new Date()
  };

  store.projects.push(project);
  res.json(project);
});

// List projects
router.get("/", (req, res) => {
  res.json(store.projects);
});

export default router;
