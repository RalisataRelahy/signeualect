// Champ de saisie réutilisable avec label et message d'erreur optionnel.
import type { InputHTMLAttributes } from "react";
import "./Input.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

/**
 * Affiche un champ de formulaire avec son label et une erreur si besoin.
 */
export function Input({ label, error, id, ...rest }: InputProps) {
  return (
    <div className="input-group">
      <label htmlFor={id} className="input-label">
        {label}
      </label>
      <input id={id} className={`input-field ${error ? "input-error" : ""}`} {...rest} />
      {error && <span className="input-error-text">{error}</span>}
    </div>
  );
}