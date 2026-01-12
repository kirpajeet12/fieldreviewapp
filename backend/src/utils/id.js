export function generateId(prefix = "ID") {
  return `${prefix}_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
}
