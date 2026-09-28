import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface ProtectedRouteProps {
  allowedRoles?: Array<"USER" | "ORGANIZER" | "ADMIN">;
}

/**
 * Componente de protección de rutas basado en autenticación y roles de usuario.
 */
export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  // 1. Validar autenticación
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. Validar roles requeridos
  if (allowedRoles && allowedRoles.length > 0) {
    const userRole = (user.rol?.toUpperCase() || "USER") as "USER" | "ORGANIZER" | "ADMIN";
    const hasAccess = allowedRoles.includes(userRole);

    if (!hasAccess) {
      if (userRole === "ADMIN") {
        return <Navigate to="/admin/monitoreo" replace />;
      }
      return <Navigate to="/" replace />;
    }
  }

  return <Outlet />;
}
