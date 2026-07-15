import { collection, doc, setDoc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/Config";
import { COLLECTIONS } from "../firebase/Collections";
import { ReportService } from "./ReportService";
import type { Verification } from "../types";

/**
 * Permet à un utilisateur de confirmer un signalement.
 * Vérifie d'abord s'il ne l'a pas déjà confirmé.
 */
async function confirmReport(reportId: string, userId: string): Promise<boolean> {
  const verificationId = `${reportId}_${userId}`;
  const verificationRef = doc(db, COLLECTIONS.REPORT_VERIFICATIONS, verificationId);
  
  // Vérifie si la confirmation existe déjà
  const existingDoc = await getDoc(verificationRef);
  if (existingDoc.exists()) {
    throw new Error("Vous avez déjà confirmé ce signalement.");
  }

  const newVerification: Verification = {
    reportId,
    userId,
    createdAt: Date.now()
  };

  // Ajoute la confirmation
  await setDoc(verificationRef, newVerification);

  // Met à jour le compteur du signalement
  const report = await ReportService.getReportById(reportId);
  if (report) {
    await ReportService.incrementVerifyCount(reportId, report.verifyCount);
  }

  return true;
}

/**
 * Vérifie si un utilisateur a déjà confirmé un signalement spécifique.
 */
async function hasUserConfirmed(reportId: string, userId: string): Promise<boolean> {
  const verificationId = `${reportId}_${userId}`;
  const verificationRef = doc(db, COLLECTIONS.REPORT_VERIFICATIONS, verificationId);
  
  const existingDoc = await getDoc(verificationRef);
  return existingDoc.exists();
}

/**
 * Récupère les IDs de tous les signalements confirmés par un utilisateur.
 */
async function getUserConfirmations(userId: string): Promise<string[]> {
  const q = query(
    collection(db, COLLECTIONS.REPORT_VERIFICATIONS),
    where("userId", "==", userId)
  );
  const snapshot = await getDocs(q);
  
  return snapshot.docs.map(doc => doc.data().reportId as string);
}

export const VerificationService = {
  confirmReport,
  hasUserConfirmed,
  getUserConfirmations
};
