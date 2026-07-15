// Type qui représente un utilisateur de l'application.
export type UserRole = "citizen" | "admin";

export interface User {
  uid: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: number;
}