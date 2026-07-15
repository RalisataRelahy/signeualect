import { useState, useEffect } from "react";
import { ReportService } from "../../../services/ReportService";
import { Loader } from "../../../components/Loader/Loader";
import { Card } from "../../../components/Card/Card";
import { ConfirmDialog } from "../../../components/ConfirmDialog/ConfirmDialog";
import { Toast } from "../../../components/Toast/Toast";
import type { Report, ReportStatus } from "../../../types";
import { formatDate } from "../../../utils/FormatDate";
import { getCategoryLabel, getStatusLabel } from "../../../utils/Labels";
import "./ManageReports.css";

/**
 * Page de gestion des signalements par l'administrateur.
 */
export function ManageReports() {
  const [reports, setReports] = useState<Report[]>([]);
  const [filteredReports, setFilteredReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filtres
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | ReportStatus>("all");

  // Actions
  const [reportToDelete, setReportToDelete] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState("");

  const fetchReports = async () => {
    setLoading(true);
    try {
      const data = await ReportService.getAllReports();
      setReports(data);
      setFilteredReports(data);
    } catch (error) {
      console.error(error);
      setToastMessage("Erreur de chargement des signalements.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // Appliquer les filtres
  useEffect(() => {
    let result = reports;
    if (statusFilter !== "all") {
      result = result.filter(r => r.status === statusFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(r => 
        r.title.toLowerCase().includes(q) || 
        r.city.toLowerCase().includes(q) ||
        r.district.toLowerCase().includes(q)
      );
    }
    setFilteredReports(result);
  }, [reports, statusFilter, searchQuery]);

  const handleStatusChange = async (reportId: string, status: ReportStatus) => {
    try {
      await ReportService.changeStatus(reportId, status);
      setToastMessage(`Statut mis à jour (${status})`);
      fetchReports();
    } catch (error) {
      setToastMessage("Erreur lors de la mise à jour.");
    }
  };

  const handleDelete = async () => {
    if (!reportToDelete) return;
    try {
      await ReportService.deleteReport(reportToDelete);
      setToastMessage("Signalement supprimé.");
      fetchReports();
    } catch (error) {
      setToastMessage("Erreur lors de la suppression.");
    } finally {
      setReportToDelete(null);
    }
  };

  if (loading && reports.length === 0) return <Loader />;

  return (
    <div className="manage-reports">
      <h1 className="text-primary mb-6">Gestion des signalements</h1>
      
      <div className="filters-bar flex gap-4 mb-6">
        <input 
          type="text" 
          placeholder="Rechercher par titre, ville..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <select 
          value={statusFilter} 
          onChange={(e) => setStatusFilter(e.target.value as any)}
          className="filter-select"
        >
          <option value="all">Tous les statuts</option>
          <option value="pending">En attente</option>
          <option value="verified">Certifiés</option>
          <option value="rejected">Rejetés</option>
        </select>
      </div>

      <div className="reports-grid">
        {filteredReports.map(report => (
          <Card key={report.id} className="report-admin-card flex-col">
            <div className="report-header flex items-center justify-between">
              <span className={`status-badge status-${report.status}`}>{getStatusLabel(report.status)}</span>
              <span className="text-muted text-sm">{formatDate(report.createdAt)}</span>
            </div>
            
            <h3 className="mt-4 mb-2">{report.title}</h3>
            <p className="text-muted text-sm mb-4 line-clamp-2">{report.description}</p>
            
            <div className="report-details mb-4">
              <p><strong>Catégorie:</strong> {getCategoryLabel(report.category)}</p>
              <p><strong>Lieu:</strong> {report.city}, {report.district}</p>
              <p><strong>Confirmations:</strong> {report.verifyCount}</p>
            </div>
            
            <div className="report-actions mt-auto flex items-center gap-2">
              {report.status === "pending" && (
                <>
                  <button onClick={() => handleStatusChange(report.id, "verified")} className="btn-success">Certifier</button>
                  <button onClick={() => handleStatusChange(report.id, "rejected")} className="btn-warning">Rejeter</button>
                </>
              )}
              <button onClick={() => setReportToDelete(report.id)} className="btn-danger ml-auto">Supprimer</button>
            </div>
          </Card>
        ))}
        {filteredReports.length === 0 && <p>Aucun signalement trouvé.</p>}
      </div>

      <ConfirmDialog 
        isOpen={!!reportToDelete}
        onClose={() => setReportToDelete(null)}
        onConfirm={handleDelete}
        title="Supprimer le signalement"
        message="Êtes-vous sûr de vouloir supprimer définitivement ce signalement ?"
        type="danger"
      />

      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage("")} />}
    </div>
  );
}
