// Ce hook simplifie l'accès à l'utilisateur connecté depuis n'importe quel composant.
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

/**
 * Retourne l'utilisateur connecté, son état de chargement et le setter.
 */
export function useAuth() {
  return useContext(AuthContext);
}