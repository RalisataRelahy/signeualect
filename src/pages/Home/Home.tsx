import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/UseAuth";
import "./Home.css";

/**
 * Page d'accueil publique.
 */
export function Home() {
  const { user } = useAuth();

  return (
    <div className="home-container">
      <div className="home-hero">
        <h1 className="home-title">Sign'EauxL'Ecte</h1>
        <p className="home-subtitle">
          Plateforme citoyenne pour signaler et consulter les coupures d'eau et d'électricité.
        </p>
        
        <div className="home-actions flex items-center justify-center gap-4 mt-6">
          {!user ? (
            <>
              <Link to="/register" className="btn-primary">Créer un compte</Link>
              <Link to="/login" className="btn-outline">Se connecter</Link>
            </>
          ) : user.role === "citizen" ? (
            <Link to="/citizen/dashboard" className="btn-primary">Mon espace citoyen</Link>
          ) : (
            <Link to="/admin/dashboard" className="btn-primary">Espace administration</Link>
          )}
        </div>
      </div>

      <div className="home-features container mt-8">
        <div className="feature-card">
          <h3 className="text-primary">Signalez</h3>
          <p>Une coupure dans votre quartier ? Signalez-la rapidement pour informer les autres citoyens.</p>
        </div>
        <div className="feature-card">
          <h3 className="text-success">Confirmez</h3>
          <p>Un signalement existe déjà ? Confirmez-le pour alerter sur l'ampleur de la coupure.</p>
        </div>
        <div className="feature-card">
          <h3 className="text-danger">Consultez</h3>
          <p>Restez informés des coupures en cours et de leur état de résolution.</p>
        </div>
      </div>
    </div>
  );
}
