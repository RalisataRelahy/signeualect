// Ce hook charge la liste de tous les signalements depuis Firestore.
import { useEffect, useState } from "react";
import { ReportService } from "../services/ReportService";
import type { Report } from "../types";

/**
 * Charge tous les signalements et gère les états de chargement et d'erreur.
 */
export function useReports() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fonction pour recharger les données (après création, suppression, etc.).
  async function reload() {
    setLoading(true);
    setError("");
    try {
      const data = await ReportService.getAllReports();
      setReports(data);
    } catch {
      setError("Impossible de charger les signalements.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    reload();
  }, []);

  return { reports, loading, error, reload };
}