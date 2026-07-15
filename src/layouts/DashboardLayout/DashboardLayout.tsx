import { Outlet } from "react-router-dom";
import { Navbar } from "../../components/Navbar/Navbar";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Footer } from "../../components/Footer/Footer";
import { useAuth } from "../../hooks/UseAuth";
import "./DashboardLayout.css";

/**
 * Layout utilisé pour les espaces connectés (Citoyen et Admin).
 * Affiche la Navbar, la Sidebar correspondante au rôle, et le Footer.
 */
export function DashboardLayout() {
  const { user } = useAuth();

  const citizenLinks = [
    { label: "Dashboard", path: "/citizen/dashboard" },
    { label: "Tous les signalements", path: "/citizen/reports" },
    { label: "Créer un signalement", path: "/citizen/reports/create" },
    { label: "Mes signalements", path: "/citizen/my-reports" },
    { label: "Profil", path: "/citizen/profile" },
  ];

  const adminLinks = [
    { label: "Dashboard", path: "/admin/dashboard" },
    { label: "Gestion des signalements", path: "/admin/reports" },
    { label: "Gestion des utilisateurs", path: "/admin/users" },
    { label: "Profil", path: "/admin/profile" },
  ];

  const links = user?.role === "admin" ? adminLinks : citizenLinks;

  return (
    <div className="layout flex-col" style={{ minHeight: "100vh" }}>
      <Navbar />
      <div className="dashboard-container">
        <Sidebar links={links} />
        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}
