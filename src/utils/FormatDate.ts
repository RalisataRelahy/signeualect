/**
 * Transforme un timestamp (nombre) en date lisible, format français.
 * Exemple : 12 juillet 2026 à 14:30
 */
export function formatDate(timestamp: number): string {
  const date = new Date(timestamp);

  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}