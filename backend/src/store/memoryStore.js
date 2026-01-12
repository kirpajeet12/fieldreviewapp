// backend/src/store/memoryStore.js

export const store = {
  projects: [],

  fieldReviews: [],

  deficiencies: [],

  disciplineConfigs: [
    {
      disciplineId: "fire_stopping",
      name: "Fire Stopping",
      stages: [
        {
          stageId: "fs_stage_1",
          name: "Site Review",
          showInReport: false
        },
        {
          stageId: "fs_stage_2",
          name: "Installation Review",
          showInReport: true
        },
        {
          stageId: "fs_stage_3",
          name: "Penetration Review",
          showInReport: true
        },
        {
          stageId: "fs_stage_4",
          name: "Final Review",
          showInReport: true
        }
      ]
    }
  ]
};
