import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { ReportService } from "../../../services/ReportService";
import { useAuth } from "../../../hooks/UseAuth";
import { StatCard } from "../../../components/StatCard/StatCard";
import { DashboardCard } from "../../../components/DashboardCard/DashboardCard";
import { Loader } from "../../../components/Loader/Loader";
import { Card } from "../../../components/Card/Card";

import type { Report } from "../../../types";

import { formatDate } from "../../../utils/FormatDate";
import { getStatusLabel, getStatusColor } from "../../../utils/Labels";

import "./CitizenDashboard.css";

/**
 * Tableau de bord du citoyen.
 */
export function CitizenDashboard() {
  const { user } = useAuth();

  const [myReports, setMyReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const reports = await ReportService.getReportsByUser(user.uid);
        setMyReports(reports);
      } catch (error) {
        console.error("Erreur lors du chargement des signalements :", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [user]);

  if (loading) {
    return <Loader />;
  }

  const total = myReports.length;
  const pending = myReports.filter((r) => r.status === "pending").length;
  const verified = myReports.filter((r) => r.status === "verified").length;
  const rejected = myReports.filter((r) => r.status === "rejected").length;

  return (
    <div className="citizen-dashboard">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-primary m-0">Mon Tableau de bord</h1>
        <Link to="/citizen/reports/create" className="btn-primary">
          Nouveau Signalement
        </Link>
      </div>

      <div className="stats-grid mb-8">
        <StatCard
          title="Mes signalements"
          value={total}
          color="primary"
        />
        <StatCard
          title="En attente"
          value={pending}
          color="primary"
        />
        <StatCard
          title="Certifiés"
          value={verified}
          color="success"
        />
        <StatCard
          title="Rejetés"
          value={rejected}
          color="danger"
        />
      </div>

      <DashboardCard
        title="Mes derniers signalements"
        action={
          <Link to="/citizen/my-reports">
            Voir tout
          </Link>
        }
      >
        <div className="reports-list">
          {myReports.length > 0 ? (
            myReports.slice(0, 5).map((report) => (
              <Card key={report.id} className="mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4>{report.title}</h4>
                    <p className="text-muted text-sm">
                      {formatDate(report.createdAt)}
                    </p>
                  </div>
                  <div className={`status-badge status-${getStatusColor(report.status)}`}>
                    {getStatusLabel(report.status)}
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <p className="text-muted">
              Vous n'avez créé aucun signalement.
            </p>
          )}
        </div>
      </DashboardCard>
    </div>
  );
}