// Type qui représente un signalement de coupure d'eau ou d'électricité.
export type ReportCategory = "water" | "electricity" | "both";

export type ReportStatus = "pending" | "verified" | "rejected";

export interface Report {
  id: string;
  title: string;
  description: string;
  category: ReportCategory;
  district: string;
  city: string;
  status: ReportStatus;
  verifyCount: number;
  createdBy: string;
  createdAt: number;
}

// Données nécessaires pour créer un nouveau signalement.
export interface CreateReportData {
  title: string;
  description: string;
  category: ReportCategory;
  district: string;
  city: string;
}