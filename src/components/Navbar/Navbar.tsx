import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/UseAuth";
import { AuthService } from "../../services/AuthService";
import "./Navbar.css";

/**
 * Composant de navigation principal.
 * Affiche les liens selon que l'utilisateur est connecté et selon son rôle.
 */
export function Navbar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await AuthService.logout();
      navigate("/");
    } catch (error) {
      console.error("Erreur lors de la déconnexion", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container container flex items-center justify-between">
        <Link to="/" className="navbar-logo">
          Sign'EauxL'Ecte
        </Link>
        
        <div className="navbar-links flex items-center gap-4">
          {!user && (
            <>
              <Link to="/login" className="navbar-link">Connexion</Link>
              <Link to="/register" className="btn-primary">Inscription</Link>
            </>
          )}

          {user && user.role === "citizen" && (
            <>
              <Link to="/citizen/dashboard" className="navbar-link">Dashboard</Link>
              <Link to="/citizen/reports/create" className="btn-primary">Signaler</Link>
              <button onClick={handleLogout} className="btn-outline">Déconnexion</button>
            </>
          )}

          {user && user.role === "admin" && (
            <>
              <Link to="/admin/dashboard" className="navbar-link">Administration</Link>
              <button onClick={handleLogout} className="btn-outline">Déconnexion</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
