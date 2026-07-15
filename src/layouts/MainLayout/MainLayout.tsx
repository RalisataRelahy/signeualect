import { Outlet } from "react-router-dom";
import { Navbar } from "../../components/Navbar/Navbar";
import { Footer } from "../../components/Footer/Footer";

/**
 * Layout principal utilisé pour les pages publiques.
 */
export function MainLayout() {
  return (
    <div className="layout flex-col" style={{ minHeight: "100vh" }}>
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
