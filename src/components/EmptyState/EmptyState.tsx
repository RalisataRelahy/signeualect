// Message affiché quand une liste ne contient aucune donnée.
import "./EmptyState.css";

interface EmptyStateProps {
  message: string;
  icon?: string;
}

/**
 * Affiche une icône et un message quand il n'y a rien à afficher.
 */
export function EmptyState({ message, icon = "📭" }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <span className="empty-icon">{icon}</span>
      <p className="empty-message">{message}</p>
    </div>
  );
}