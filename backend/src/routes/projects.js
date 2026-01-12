import express from "express";
import { store } from "../store/memoryStore.js";
import { generateId } from "../utils/id.js";

const router = express.Router();

router.post("/", (req, res) => {
  const project = { id: generateId("PRJ"), ...req.body };
  store.projects.push(project);
  res.json(project);
});

router.get("/", (_, res) => res.json(store.projects));

export default router;
