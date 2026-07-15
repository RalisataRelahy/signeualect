import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";

// Layouts
import { MainLayout } from "../layouts/MainLayout/MainLayout";
import { DashboardLayout } from "../layouts/DashboardLayout/DashboardLayout";

// Public Pages
import { Home } from "../pages/Home/Home";
import { Login } from "../pages/Login/Login";
import { Register } from "../pages/Register/Register";
import { NotFound } from "../pages/NotFound/NotFound";

// Citizen Pages
import { CitizenDashboard } from "../pages/Citizen/Dashboard/CitizenDashboard";
import { ReportsList } from "../pages/Citizen/ReportsList/ReportsList";
import { CreateReport } from "../pages/Citizen/CreateReport/CreateReport";
import { MyReports } from "../pages/Citizen/MyReports/MyReports";

// Admin Pages
import { AdminDashboard } from "../pages/Admin/Dashboard/AdminDashboard";
import { ManageReports } from "../pages/Admin/ManageReports/ManageReports";
import { ManageUsers } from "../pages/Admin/ManageUsers/ManageUsers";

// Shared Pages
import { Profile } from "../pages/Profile/Profile";

// Protection
import { ProtectedRoute } from "./ProtectedRoute";

/**
 * Composant de routage principal.
 */
export function AppRouter() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Routes Publiques avec Navbar et Footer */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Routes Citoyen (protégées) */}
          <Route element={<ProtectedRoute allowedRoles={["citizen"]} />}>
            <Route path="/citizen" element={<DashboardLayout />}>
              <Route path="dashboard" element={<CitizenDashboard />} />
              <Route path="reports" element={<ReportsList />} />
              <Route path="reports/create" element={<CreateReport />} />
              <Route path="my-reports" element={<MyReports />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Route>

          {/* Routes Admin (protégées) */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/admin" element={<DashboardLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="reports" element={<ManageReports />} />
              <Route path="users" element={<ManageUsers />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
