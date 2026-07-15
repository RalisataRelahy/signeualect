import { Link } from "react-router-dom";
import "./NotFound.css";

/**
 * Page 404.
 */
export function NotFound() {
  return (
    <div className="not-found-container flex-col items-center justify-center">
      <h1 className="not-found-title">404</h1>
      <h2 className="not-found-subtitle">Page introuvable</h2>
      <p className="not-found-text text-muted">
        Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
      </p>
      <Link to="/" className="btn-primary mt-6">
        Retour à l'accueil
      </Link>
    </div>
  );
}
