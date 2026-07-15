import { useState, useEffect } from "react";
import { ReportService } from "../../../services/ReportService";
import { useAuth } from "../../../hooks/UseAuth";
import { Loader } from "../../../components/Loader/Loader";
import { Card } from "../../../components/Card/Card";
import { ConfirmDialog } from "../../../components/ConfirmDialog/ConfirmDialog";
import { Toast } from "../../../components/Toast/Toast";
import type { Report } from "../../../types";
import { formatDate } from "../../../utils/FormatDate";
import { getCategoryLabel, getStatusLabel, getStatusColor } from "../../../utils/Labels";

/**
 * Page listant uniquement les signalements de l'utilisateur connecté.
 * Permet de les modifier (si en attente) ou de les supprimer.
 */
export function MyReports() {
  const { user } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState("");
  const [reportToDelete, setReportToDelete] = useState<string | null>(null);

  const fetchReports = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const data = await ReportService.getReportsByUser(user.uid);
      setReports(data);
    } catch (error) {
      setToastMessage("Erreur de chargement.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [user]);

  const handleDelete = async () => {
    if (!reportToDelete) return;
    try {
      await ReportService.deleteReport(reportToDelete);
      setToastMessage("Signalement supprimé avec succès.");
      fetchReports();
    } catch (error) {
      setToastMessage("Erreur lors de la suppression.");
    } finally {
      setReportToDelete(null);
    }
  };

  if (loading && reports.length === 0) return <Loader />;

  return (
    <div className="my-reports-page">
      <h1 className="text-primary mb-6">Mes signalements</h1>
      
      <div className="reports-grid">
        {reports.map(report => (
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
            
            <div className="mt-auto flex gap-2">
              <button 
                onClick={() => setReportToDelete(report.id)} 
                className="btn-outline text-danger w-100"
                style={{ borderColor: "var(--danger)" }}
              >
                Supprimer
              </button>
            </div>
          </Card>
        ))}
        {reports.length === 0 && <p>Vous n'avez créé aucun signalement.</p>}
      </div>

      <ConfirmDialog 
        isOpen={!!reportToDelete}
        onClose={() => setReportToDelete(null)}
        onConfirm={handleDelete}
        title="Supprimer mon signalement"
        message="Êtes-vous sûr de vouloir supprimer définitivement ce signalement ?"
        type="danger"
      />

      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage("")} />}
    </div>
  );
}
