// backend/src/services/reportService.js

import { store } from "../store/memoryStore.js";

export function generateReport(fieldReviewId) {
  const fr = store.fieldReviews.find(f => f.id === fieldReviewId);
  const discipline = store.disciplineConfigs.find(
    d => d.disciplineId === fr.disciplineId
  );

  const reportStages = fr.stages
    .filter(stage =>
      discipline.stages.find(
        s => s.stageId === stage.stageId && s.showInReport
      )
    )
    .map(stage => ({
      stageId: stage.stageId,
      status: stage.status
    }));

  const reportDeficiencies = store.deficiencies.filter(
    d => d.fieldReviewId === fieldReviewId
  );

  return {
    discipline: discipline.name,
    stages: reportStages,
    deficiencies: reportDeficiencies,
    finalStatus: fr.finalStatus
  };
}
