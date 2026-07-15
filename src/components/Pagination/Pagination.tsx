// Pagination simple pour naviguer entre les pages d'une liste.
import "./Pagination.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

/**
 * Affiche les boutons "Précédent", "Suivant" et le numéro de page actuel.
 */
export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="pagination">
      <button
        className="pagination-btn"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ← Précédent
      </button>

      <span className="pagination-info">
        Page {currentPage} / {totalPages}
      </span>

      <button
        className="pagination-btn"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Suivant →
      </button>
    </div>
  );
}