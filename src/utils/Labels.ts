// Ce fichier traduit les valeurs techniques (anglais) en texte affiché (français).
import type { ReportCategory, ReportStatus } from "../types";

/**
 * Retourne le libellé français d'une catégorie de signalement.
 */
export function getCategoryLabel(category: ReportCategory): string {
  const labels: Record<ReportCategory, string> = {
    water: "Eau",
    electricity: "Électricité",
    both: "Eau et électricité",
  };
  return labels[category];
}

/**
 * Retourne le libellé français d'un statut de signalement.
 */
export function getStatusLabel(status: ReportStatus): string {
  const labels: Record<ReportStatus, string> = {
    pending: "En attente",
    verified: "Certifié",
    rejected: "Rejeté",
  };
  return labels[status];
}

/**
 * Retourne la couleur de badge associée à un statut de signalement.
 */
export function getStatusColor(status: ReportStatus): "orange" | "green" | "red" {
  const colors: Record<ReportStatus, "orange" | "green" | "red"> = {
    pending: "orange",
    verified: "green",
    rejected: "red",
  };
  return colors[status];
}