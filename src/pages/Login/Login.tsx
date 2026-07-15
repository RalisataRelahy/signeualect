import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthService } from "../../services/AuthService";
import { useAuth } from "../../hooks/UseAuth";
import "./Auth.css"; // Un seul fichier CSS pour Login et Register

/**
 * Page de connexion.
 */
export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { user } = useAuth();
  const navigate = useNavigate();

  // Si déjà connecté, on redirige
  if (user) {
    navigate(user.role === "admin" ? "/admin/dashboard" : "/citizen/dashboard");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await AuthService.login(email, password);
      // La redirection se fera automatiquement via l'AuthContext et le hook useAuth
      // Mais on peut forcer la navigation selon le rôle si besoin.
    } catch (err: any) {
      setError("Identifiants incorrects ou erreur de connexion.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="text-primary text-center">Connexion</h2>
        
        {error && <div className="auth-error">{error}</div>}
        
        <form onSubmit={handleSubmit} className="auth-form flex-col gap-4">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input 
              type="password" 
              id="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          
          <button type="submit" className="btn-primary mt-4" disabled={loading}>
            {loading ? "Connexion en cours..." : "Se connecter"}
          </button>
        </form>
        
        <p className="auth-redirect text-center mt-4">
          Pas encore de compte ? <Link to="/register">S'inscrire</Link>
        </p>
      </div>
    </div>
  );
}
