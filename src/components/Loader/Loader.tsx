import "./Loader.css";

/**
 * Composant d'attente (spinner) pendant le chargement des données.
 */
export function Loader() {
  return (
    <div className="loader-container flex items-center justify-center">
      <div className="loader-spinner"></div>
    </div>
  );
}
