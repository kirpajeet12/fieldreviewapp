import { generateId } from "../utils/id.js";

export function cloneFieldReview(lastFR, bookingInput) {
  return {
    ...lastFR,
    id: generateId("FR"),
    date: bookingInput.date,
    status: "IN_PROGRESS",
    deficiencies: lastFR.deficiencies.filter(d => d.status !== "RESOLVED")
  };
}
