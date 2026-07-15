// Ce contexte donne accès à l'utilisateur connecté partout dans l'application.
import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { AuthService } from "../services/AuthService";
import type { User } from "../types";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  setUser: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Ce composant enveloppe l'application et surveille l'état de connexion.
 * Il charge automatiquement le profil Firestore de l'utilisateur connecté.
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // On écoute les changements de connexion / déconnexion Firebase.
    const unsubscribe = AuthService.listenToAuthChanges(async (firebaseUser) => {
      if (firebaseUser) {
        const profile = await AuthService.getUserProfile(firebaseUser.uid);
        setUser(profile);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    // On arrête l'écoute quand le composant est démonté.
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, setUser }}>{children}</AuthContext.Provider>
  );
}