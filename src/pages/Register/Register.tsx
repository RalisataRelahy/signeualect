import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthService } from "../../services/AuthService";
import { useAuth } from "../../hooks/UseAuth";
import "../Login/Auth.css"; // On réutilise le CSS de l'auth

/**
 * Page d'inscription.
 */
export function Register() {
  const [name, setName] = useState("");
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
    
    if (password.length < 6) {
      setError("Le mot de passe doit faire au moins 6 caractères.");
      return;
    }

    setLoading(true);

    try {
      await AuthService.register(name, email, password);
      // Redirection automatique via l'AuthContext
    } catch (err: any) {
      console.error(err);
      setError("Erreur lors de l'inscription. L'email est peut-être déjà utilisé.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="text-primary text-center">Inscription</h2>
        
        {error && <div className="auth-error">{error}</div>}
        
        <form onSubmit={handleSubmit} className="auth-form flex-col gap-4">
          <div className="form-group">
            <label htmlFor="name">Nom complet</label>
            <input 
              type="text" 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </div>

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
            {loading ? "Inscription en cours..." : "S'inscrire"}
          </button>
        </form>
        
        <p className="auth-redirect text-center mt-4">
          Déjà un compte ? <Link to="/login">Se connecter</Link>
        </p>
      </div>
    </div>
  );
}
