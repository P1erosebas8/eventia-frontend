import { Navigate, Outlet } from "react-router-dom";
import PublicHeader from "@/shared/components/PublicHeader";
import UserHeader from "@/shared/components/UserHeader";
import { useAuth } from "@/context/AuthContext";

export default function MainLayout() {
  const { isAuthenticated, user } = useAuth();

  // Si el usuario es Administrador, se restringe a su panel de administración
  if (isAuthenticated && user?.rol === "ADMIN") {
    return <Navigate to="/admin/monitoreo" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {isAuthenticated ? <UserHeader /> : <PublicHeader />}

      <main className="pt-16">
        <Outlet />
      </main>
    </div>
  );
}