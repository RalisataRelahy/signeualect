import { useState, useEffect } from "react";
import { UserService } from "../../../services/UserService";
import { Loader } from "../../../components/Loader/Loader";
import { ConfirmDialog } from "../../../components/ConfirmDialog/ConfirmDialog";
import { Toast } from "../../../components/Toast/Toast";
import type { User, UserRole } from "../../../types";
import { formatDate } from "../../../utils/FormatDate";
import "./ManageUsers.css";

/**
 * Page de gestion des utilisateurs par l'administrateur.
 */
export function ManageUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Actions
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await UserService.getAllUsers();
      // On peut trier par date d'inscription
      data.sort((a, b) => b.createdAt - a.createdAt);
      setUsers(data);
    } catch (error) {
      console.error(error);
      setToastMessage("Erreur de chargement des utilisateurs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (uid: string, currentRole: UserRole) => {
    const newRole = currentRole === "admin" ? "citizen" : "admin";
    try {
      await UserService.changeUserRole(uid, newRole);
      setToastMessage(`Rôle mis à jour (${newRole})`);
      fetchUsers();
    } catch (error) {
      setToastMessage("Erreur lors de la mise à jour.");
    }
  };

  const handleDelete = async () => {
    if (!userToDelete) return;
    try {
      await UserService.deleteUserProfile(userToDelete);
      setToastMessage("Utilisateur supprimé (profil).");
      fetchUsers();
    } catch (error) {
      setToastMessage("Erreur lors de la suppression.");
    } finally {
      setUserToDelete(null);
    }
  };

  if (loading && users.length === 0) return <Loader />;

  return (
    <div className="manage-users">
      <h1 className="text-primary mb-6">Gestion des utilisateurs</h1>

      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Rôle</th>
              <th>Inscription</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.uid}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`role-badge role-${user.role}`}>
                    {user.role}
                  </span>
                </td>
                <td>{formatDate(user.createdAt)}</td>
                <td className="actions-cell">
                  <button 
                    onClick={() => handleRoleChange(user.uid, user.role)}
                    className="btn-outline btn-sm"
                  >
                    Rendre {user.role === "admin" ? "Citoyen" : "Admin"}
                  </button>
                  <button 
                    onClick={() => setUserToDelete(user.uid)}
                    className="btn-danger btn-sm"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {users.length === 0 && <p className="text-center mt-4">Aucun utilisateur.</p>}
      </div>

      <ConfirmDialog 
        isOpen={!!userToDelete}
        onClose={() => setUserToDelete(null)}
        onConfirm={handleDelete}
        title="Supprimer l'utilisateur"
        message="Êtes-vous sûr de vouloir supprimer le profil de cet utilisateur ? Cette action est irréversible."
        type="danger"
      />

      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage("")} />}
    </div>
  );
}
