// Ce service gère les opérations Firestore liées aux utilisateurs.
// Utilisé principalement par la page admin "Gestion des utilisateurs".
import { collection, getDocs, doc, updateDoc, deleteDoc, query, where } from "firebase/firestore";
import { db } from "../firebase/Config";
import { COLLECTIONS } from "../firebase/Collections";
import type { User, UserRole } from "../types";

/**
 * Récupère la liste de tous les utilisateurs.
 */
async function getAllUsers(): Promise<User[]> {
  const citizenQuery=query(
    collection(db,COLLECTIONS.USERS),
    where('role','==',"citizen")
  );
  const snapshot=await getDocs(citizenQuery);
  
  return snapshot.docs.map((docItem) => docItem.data() as User);
}

/**
 * Change le rôle d'un utilisateur (citizen <-> admin).
 */
async function changeUserRole(uid: string, role: UserRole): Promise<void> {
  await updateDoc(doc(db, COLLECTIONS.USERS, uid), { role });
}

/**
 * Supprime le profil Firestore d'un utilisateur.
 * Remarque : cela ne supprime pas son compte Firebase Authentication.
 */
async function deleteUserProfile(uid: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTIONS.USERS, uid));
}

export const UserService = {
  getAllUsers,
  changeUserRole,
  deleteUserProfile,
};