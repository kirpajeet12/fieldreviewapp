import { store } from "../store/memoryStore.js";

export function generateReport(fieldReviewId) {
  const fr = store.fieldReviews.find(f => f.id === fieldReviewId);
  const discipline = store.disciplineConfigs.find(
    d => d.disciplineId === fr.disciplineId
  );

  return {
    discipline: discipline.name,
    stages: fr.stages
      .filter(s =>
        discipline.stages.find(
          ds => ds.stageId === s.stageId && ds.showInReport
        )
      )
      .map(s => ({ stageId: s.stageId, status: s.status })),
    deficiencies: store.deficiencies.filter(
      d => d.fieldReviewId === fieldReviewId
    ),
    finalStatus: fr.finalStatus
  };
}
