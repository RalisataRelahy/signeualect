import "./Footer.css";

/**
 * Pied de page de l'application.
 */
export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container text-center text-muted">
        <p>&copy; {currentYear} Sign'EauxL'Ecte. Tous droits réservés.</p>
        <p className="mt-2" style={{ fontSize: "0.85rem" }}>
          Plateforme citoyenne pour le signalement des coupures d'eau et d'électricité.
        </p>
      </div>
    </footer>
  );
}
