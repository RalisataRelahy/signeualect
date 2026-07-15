// Type qui représente la confirmation d'un signalement par un citoyen.
export interface Verification {
  reportId: string;
  userId: string;
  createdAt?: number;
}