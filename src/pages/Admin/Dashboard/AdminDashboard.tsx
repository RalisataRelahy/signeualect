import { useState, useEffect } from "react";
import { ReportService } from "../../../services/ReportService";
import { UserService } from "../../../services/UserService";
import { StatCard } from "../../../components/StatCard/StatCard";
import { DashboardCard } from "../../../components/DashboardCard/DashboardCard";
import { Loader } from "../../../components/Loader/Loader";
import { Card } from "../../../components/Card/Card";
import type { Report } from "../../../types";
import "./AdminDashboard.css";

/**
 * Tableau de bord de l'administrateur avec statistiques globales.
 */
export function AdminDashboard() {
  const [reports, setReports] = useState<Report[]>([]);
  const [usersCount, setUsersCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedReports = await ReportService.getAllReports();
        const fetchedUsers = await UserService.getAllUsers();
        
        setReports(fetchedReports);
        setUsersCount(fetchedUsers.length);
      } catch (error) {
        console.error("Erreur lors de la récupération des données", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);

  if (loading) return <Loader />;

  // Calcul des statistiques
  const total = reports.length;
  const verified = reports.filter(r => r.status === "verified").length;
  const rejected = reports.filter(r => r.status === "rejected").length;
  const pending = reports.filter(r => r.status === "pending").length;
  
  // Signalements aujourd'hui
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayReports = reports.filter(r => r.createdAt >= today.getTime()).length;

  return (
    <div className="admin-dashboard">
      <h1 className="text-primary mb-6">Tableau de bord Administrateur</h1>
      
      <div className="stats-grid mb-8">
        <StatCard title="Total Signalements" value={total} color="primary" />
        <StatCard title="Aujourd'hui" value={todayReports} />
        <StatCard title="En attente" value={pending} color="primary" />
        <StatCard title="Certifiés" value={verified} color="success" />
        <StatCard title="Rejetés" value={rejected} color="danger" />
        <StatCard title="Utilisateurs" value={usersCount} />
      </div>

      <DashboardCard title="Derniers signalements (5 récents)">
        <div className="reports-list">
          {reports.slice(0, 5).map(report => (
            <Card key={report.id} className="mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4>{report.title}</h4>
                  <p className="text-muted text-sm">{report.city} - {report.district}</p>
                </div>
                <div className={`status-badge status-${report.status}`}>
                  {report.status}
                </div>
              </div>
            </Card>
          ))}
          {reports.length === 0 && <p className="text-muted">Aucun signalement.</p>}
        </div>
      </DashboardCard>
    </div>
  );
}
