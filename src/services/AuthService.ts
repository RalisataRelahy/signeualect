// Ce service gère tout ce qui concerne l'authentification des utilisateurs.
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User as FirebaseUser,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/Config";
import { COLLECTIONS } from "../firebase/Collections";
import type { User } from "../types";

/**
 * Crée un compte utilisateur avec email et mot de passe,
 * puis enregistre son profil dans Firestore avec le rôle "citizen".
 */
async function register(name: string, email: string, password: string): Promise<User> {
  // liste des users qui sont admin
  const emailAdmin:string[]=["nekena@gmail.com","narindra@gmail.com","elio@gmail.com","kanto@gmail.com","dina@gmail.com","carolinah@gmail.com"];

  const credentials = await createUserWithEmailAndPassword(auth, email, password);
  const uid = credentials.user.uid;
  const role=emailAdmin.includes(email)?"admin":"citizen";
  
  const newUser: User = {
    uid,
    name,
    email,
    role: role,
    createdAt: Date.now(),
  };

  // On enregistre le profil dans la collection "users".
  await setDoc(doc(db, COLLECTIONS.USERS, uid), newUser);

  return newUser;
}

/**
 * Connecte un utilisateur existant avec email et mot de passe.
 */
async function login(email: string, password: string): Promise<void> {
  await signInWithEmailAndPassword(auth, email, password);
}

/**
 * Déconnecte l'utilisateur actuellement connecté.
 */
async function logout(): Promise<void> {
  await signOut(auth);
}

/**
 * Récupère le profil Firestore d'un utilisateur à partir de son uid.
 */
async function getUserProfile(uid: string): Promise<User | null> {
  const userDoc = await getDoc(doc(db, COLLECTIONS.USERS, uid));

  if (!userDoc.exists()) {
    return null;
  }

  return userDoc.data() as User;
}

/**
 * Permet d'écouter les changements d'état de connexion (connecté / déconnecté).
 */
function listenToAuthChanges(callback: (firebaseUser: FirebaseUser | null) => void) {
  return onAuthStateChanged(auth, callback);
}

export const AuthService = {
  register,
  login,
  logout,
  getUserProfile,
  listenToAuthChanges,
};