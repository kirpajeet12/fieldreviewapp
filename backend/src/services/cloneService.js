import { store } from "../store/memoryStore.js";
import { generateId } from "../utils/id.js";

export function createBaseFieldReview(projectId, disciplineId) {
  const discipline = store.disciplineConfigs.find(
    d => d.disciplineId === disciplineId
  );

  const fr = {
    id: generateId("FR"),
    projectId,
    disciplineId,
    createdAt: new Date(),
    stages: discipline.stages.map(s => ({
      stageId: s.stageId,
      status: "NOT_STARTED",
      decidedBy: null,
      decidedAt: null
    })),
    finalStatus: "NOT_QUALIFIED"
  };

  store.fieldReviews.push(fr);
  return fr;
}

export function cloneFieldReview(previousFRId) {
  const prev = store.fieldReviews.find(f => f.id === previousFRId);
  if (!prev) throw new Error("Previous FR not found");

  const cloned = {
    id: generateId("FR"),
    projectId: prev.projectId,
    disciplineId: prev.disciplineId,
    createdAt: new Date(),
    stages: prev.stages.map(s => ({ ...s })),
    finalStatus: prev.finalStatus
  };

  store.fieldReviews.push(cloned);
  carryForwardDeficiencies(prev.id, cloned.id);

  return cloned;
}

function carryForwardDeficiencies(oldFR, newFR) {
  store.deficiencies
    .filter(d => d.fieldReviewId === oldFR && d.status !== "RESOLVED")
    .forEach(d =>
      store.deficiencies.push({
        ...d,
        id: generateId("DEF"),
        fieldReviewId: newFR,
        carriedFrom: d.id,
        status: "PENDING_VERIFICATION"
      })
    );
}
