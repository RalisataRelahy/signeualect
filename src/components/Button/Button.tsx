// Bouton réutilisable avec plusieurs variantes de couleur.
import type { ButtonHTMLAttributes, ReactNode } from "react";
import "./Button.css";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

/**
 * Affiche un bouton stylé selon la variante choisie.
 */
export function Button({
  children,
  variant = "primary",
  fullWidth = false,
  className = "",
  ...rest
}: ButtonProps) {
  const classes = `btn btn-${variant} ${fullWidth ? "btn-full" : ""} ${className}`;

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}