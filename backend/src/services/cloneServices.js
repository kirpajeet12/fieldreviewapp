import { store } from "../store/memoryStore.js";
import { generateId } from "../utils/id.js";

export function cloneFieldReview(originalId) {
  const original = store.fieldReviews.find(f => f.id === originalId);
  if (!original) throw new Error("Field Review not found");

  const cloned = {
    ...original,
    id: generateId(),
    clonedFrom: originalId,
    createdAt: new Date()
  };

  store.fieldReviews.push(cloned);
  return cloned;
}
