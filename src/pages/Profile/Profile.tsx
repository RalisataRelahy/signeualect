import { useAuth } from "../../hooks/UseAuth";
import { Card } from "../../components/Card/Card";
import { formatDate } from "../../utils/FormatDate";
import "./Profile.css";

/**
 * Page de profil de l'utilisateur (Citoyen ou Admin).
 */
export function Profile() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="profile-page">
      <h1 className="text-primary mb-6">Mon Profil</h1>
      
      <Card className="profile-card">
        <div className="profile-header flex items-center gap-4 mb-6">
          <div className="profile-avatar flex items-center justify-center">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2>{user.name}</h2>
            <span className={`role-badge role-${user.role}`}>{user.role}</span>
          </div>
        </div>

        <div className="profile-details">
          <div className="detail-group">
            <label>Email</label>
            <p>{user.email}</p>
          </div>
          <div className="detail-group">
            <label>Membre depuis</label>
            <p>{formatDate(user.createdAt)}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
