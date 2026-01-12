// backend/src/services/cloneService.js

import { store } from "../store/memoryStore.js";
import { generateId } from "../utils/id.js";

export function cloneFieldReview(previousFRId) {
  const previousFR = store.fieldReviews.find(fr => fr.id === previousFRId);
  if (!previousFR) throw new Error("Previous Field Review not found");

  const clonedFR = {
    id: generateId(),
    projectId: previousFR.projectId,
    disciplineId: previousFR.disciplineId,
    createdAt: new Date(),

    stages: previousFR.stages.map(stage => ({
      stageId: stage.stageId,
      status: stage.status,
      decidedBy: stage.decidedBy,
      decidedAt: stage.decidedAt
    })),

    finalStatus: previousFR.finalStatus
  };

  store.fieldReviews.push(clonedFR);
  return clonedFR;
}
