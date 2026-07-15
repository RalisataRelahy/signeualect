import { useState, useEffect } from "react";
import { ReportService } from "../../../services/ReportService";
import { VerificationService } from "../../../services/VerificationService";
import { useAuth } from "../../../hooks/UseAuth";
import { Loader } from "../../../components/Loader/Loader";
import { Card } from "../../../components/Card/Card";
import { Toast } from "../../../components/Toast/Toast";
import type { Report } from "../../../types";
import { formatDate } from "../../../utils/FormatDate";
import { getCategoryLabel, getStatusLabel, getStatusColor } from "../../../utils/Labels";
import "./ReportsList.css";

/**
 * Page listant tous les signalements pour les citoyens.
 * Permet de voir les signalements et de les confirmer.
 */
export function ReportsList() {
  const { user } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);
  const [confirmedIds, setConfirmedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState("");

  const fetchData = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const data = await ReportService.getAllReports();
      setReports(data);

      const confirmations = await VerificationService.getUserConfirmations(user.uid);
      setConfirmedIds(confirmations);
    } catch (error) {
      console.error(error);
      setToastMessage("Erreur de chargement.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const handleConfirm = async (reportId: string) => {
    if (!user) return;
    try {
      await VerificationService.confirmReport(reportId, user.uid);
      setToastMessage("Signalement confirmé avec succès.");
      fetchData(); // Rafraîchir pour voir le nouveau compte
    } catch (error: any) {
      setToastMessage(error.message || "Erreur lors de la confirmation.");
    }
  };

  if (loading && reports.length === 0) return <Loader />;

  return (
    <div className="reports-list-page">
      <h1 className="text-primary mb-6">Tous les signalements</h1>
      
      <div className="reports-grid">
        {reports.map(report => {
          const isConfirmed = confirmedIds.includes(report.id);
          const isMine = report.createdBy === user?.uid;

          return (
            <Card key={report.id} className="report-card flex-col">
              <div className="report-header flex items-center justify-between">
                <span className={`status-badge status-${getStatusColor(report.status)}`}>
                  {getStatusLabel(report.status)}
                </span>
                <span className="text-muted text-sm">{formatDate(report.createdAt)}</span>
              </div>
              
              <h3 className="mt-4 mb-2">{report.title}</h3>
              <p className="text-muted text-sm mb-4 line-clamp-3">{report.description}</p>
              
              <div className="report-details mb-4">
                <p><strong>Catégorie:</strong> {getCategoryLabel(report.category)}</p>
                <p><strong>Lieu:</strong> {report.city}, {report.district}</p>
                <p><strong>Confirmations:</strong> {report.verifyCount}</p>
              </div>
              
              <div className="mt-auto">
                {isMine ? (
                  <p className="text-success text-sm text-center font-bold m-0 p-2 border-dashed">
                    C'est votre signalement
                  </p>
                ) : isConfirmed ? (
                  <button className="btn-success w-100" disabled>
                    Déjà confirmé
                  </button>
                ) : (
                  <button onClick={() => handleConfirm(report.id)} className="btn-primary w-100">
                    Confirmer ce signalement
                  </button>
                )}
              </div>
            </Card>
          );
        })}
        {reports.length === 0 && <p>Aucun signalement disponible.</p>}
      </div>

      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage("")} />}
    </div>
  );
}
