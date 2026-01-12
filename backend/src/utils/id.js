export function generateId(prefix = "ID") {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}
