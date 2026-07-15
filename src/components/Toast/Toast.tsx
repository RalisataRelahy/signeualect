import { useEffect } from "react";
import "./Toast.css";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  onClose: () => void;
  duration?: number;
}

/**
 * Affiche une petite notification éphémère en bas ou en haut de l'écran.
 */
export function Toast({ message, type = "info", onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`toast toast-${type}`}>
      <p>{message}</p>
      <button className="toast-close" onClick={onClose}>&times;</button>
    </div>
  );
}
