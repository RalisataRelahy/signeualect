import "./DashboardCard.css";

interface DashboardCardProps {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}

/**
 * Conteneur principal pour une section du dashboard (ex: "Derniers signalements").
 */
export function DashboardCard({ title, children, action }: DashboardCardProps) {
  return (
    <div className="dashboard-card">
      <div className="dashboard-card-header flex items-center justify-between">
        <h3 className="dashboard-card-title">{title}</h3>
        {action && <div className="dashboard-card-action">{action}</div>}
      </div>
      <div className="dashboard-card-body">
        {children}
      </div>
    </div>
  );
}
