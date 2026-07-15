import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

interface SidebarLink {
  label: string;
  path: string;
  icon?: string;
}

interface SidebarProps {
  links: SidebarLink[];
}

/**
 * Composant de navigation latérale pour les espaces connectés (Citoyen / Admin).
 */
export function Sidebar({ links }: SidebarProps) {
  const location = useLocation();

  return (
    <aside className="sidebar">
      <div className="sidebar-links flex-col">
        {links.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`sidebar-link ${isActive ? "active" : ""}`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
