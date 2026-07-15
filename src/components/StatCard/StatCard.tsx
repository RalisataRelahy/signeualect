import "./StatCard.css";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  color?: "primary" | "success" | "danger" | "default";
}

/**
 * Affiche une statistique simple dans une carte (pour les tableaux de bord).
 */
export function StatCard({ title, value, icon, color = "default" }: StatCardProps) {
  return (
    <div className={`stat-card stat-card-${color}`}>
      <div className="stat-content">
        <h4 className="stat-title">{title}</h4>
        <p className="stat-value">{value}</p>
      </div>
      {icon && <div className="stat-icon">{icon}</div>}
    </div>
  );
}
