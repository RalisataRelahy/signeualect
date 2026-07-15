import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/UseAuth";
import { Loader } from "../components/Loader/Loader";
import type { UserRole } from "../types";

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
}

/**
 * Composant qui protège les routes nécessitant une connexion.
 * Redirige vers /login si non connecté ou si le rôle n'est pas autorisé.
 */
export function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Si l'utilisateur n'a pas le bon rôle, on le renvoie vers son dashboard approprié
    return <Navigate to={user.role === "admin" ? "/admin/dashboard" : "/citizen/dashboard"} replace />;
  }

  return <Outlet />;
}
