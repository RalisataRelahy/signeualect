// Petite étiquette colorée pour afficher un statut ou une catégorie.
import type { ReactNode } from "react";
import "./Badge.css";

type BadgeColor = "orange" | "green" | "red" | "gray";

interface BadgeProps {
  children: ReactNode;
  color?: BadgeColor;
}

/**
 * Affiche un badge coloré, par exemple pour un statut de signalement.
 */
export function Badge({ children, color = "gray" }: BadgeProps) {
  return <span className={`badge badge-${color}`}>{children}</span>;
}