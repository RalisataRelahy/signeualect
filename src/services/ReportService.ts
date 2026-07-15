// Ce service gère toutes les opérations Firestore liées aux signalements.
import {
  collection,
  setDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase/Config";
import { COLLECTIONS } from "../firebase/Collections";
import type { Report, CreateReportData, ReportStatus } from "../types";

/**
 * Récupère tous les signalements, triés du plus récent au plus ancien.
 */
async function getAllReports(): Promise<Report[]> {
  const reportsQuery = query(collection(db, COLLECTIONS.REPORTS), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(reportsQuery);

  return snapshot.docs.map((docItem) => docItem.data() as Report);
}

/**
 * Récupère uniquement les signalements créés par un utilisateur précis.
 */
async function getReportsByUser(userId: string): Promise<Report[]> {
  const reportsQuery = query(
    collection(db, COLLECTIONS.REPORTS),
    where("createdBy", "==", userId)
  );
  const snapshot = await getDocs(reportsQuery);

  return snapshot.docs.map((docItem) => docItem.data() as Report);
}

/**
 * Récupère un seul signalement grâce à son identifiant.
 */
async function getReportById(reportId: string): Promise<Report | null> {
  const reportDoc = await getDoc(doc(db, COLLECTIONS.REPORTS, reportId));

  if (!reportDoc.exists()) {
    return null;
  }

  return reportDoc.data() as Report;
}

/**
 * Crée un nouveau signalement dans Firestore.
 */
async function createReport(data: CreateReportData, userId: string): Promise<void> {
  const newDocRef = doc(collection(db, COLLECTIONS.REPORTS));

  const newReport: Report = {
    id: newDocRef.id,
    ...data,
    status: "pending",
    verifyCount: 0,
    createdBy: userId,
    createdAt: Date.now(),
  };

  await setDoc(newDocRef, newReport);
}

/**
 * Modifie un signalement existant (uniquement les champs fournis).
 */
async function updateReport(reportId: string, data: Partial<Report>): Promise<void> {
  await updateDoc(doc(db, COLLECTIONS.REPORTS, reportId), data);
}

/**
 * Supprime un signalement.
 */
async function deleteReport(reportId: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTIONS.REPORTS, reportId));
}

/**
 * Change le statut d'un signalement (utilisé par l'admin).
 */
async function changeStatus(reportId: string, status: ReportStatus): Promise<void> {
  await updateDoc(doc(db, COLLECTIONS.REPORTS, reportId), { status });
}

/**
 * Augmente le compteur de confirmations d'un signalement de 1.
 */
async function incrementVerifyCount(reportId: string, currentCount: number): Promise<void> {
  await updateDoc(doc(db, COLLECTIONS.REPORTS, reportId), {
    verifyCount: currentCount + 1,
  });
}

export const ReportService = {
  getAllReports,
  getReportsByUser,
  getReportById,
  createReport,
  updateReport,
  deleteReport,
  changeStatus,
  incrementVerifyCount,
};