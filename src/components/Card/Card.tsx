// Carte générique utilisée comme conteneur visuel dans toute l'application.
import type { ReactNode } from "react";
import "./Card.css";

interface CardProps {
  children: ReactNode;
  className?: string;
}

/**
 * Affiche un conteneur avec fond gris foncé, coins arrondis et ombre légère.
 */
export function Card({ children, className = "" }: CardProps) {
  return <div className={`card ${className}`}>{children}</div>;
}