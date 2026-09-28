import { LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function OrganizerTopbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const fullName = user ? `${user.firstName} ${user.lastName}`.trim() : "Organizador";
  const email = user?.email || "organizador@eventia.pe";
  const initials = user
    ? `${user.firstName?.charAt(0) || ""}${user.lastName?.charAt(0) || ""}`.toUpperCase()
    : "OR";

  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-end px-6 lg:px-8 border-b border-outline-variant/20 transition-all">
      <div className="flex items-center gap-3.5">
        {/* User Profile */}
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-white shadow-xs">
            {initials}
          </span>
          <div className="hidden lg:flex flex-col text-left">
            <span className="text-xs font-bold text-on-surface leading-tight">
              {fullName}
            </span>
            <span className="text-[11px] text-outline leading-tight">
              {email}
            </span>
          </div>
        </div>


        {/* Botón de Cerrar Sesión */}
        <button
          type="button"
          onClick={handleLogout}
          title="Cerrar sesión"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200/60 transition-colors cursor-pointer ml-2"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Cerrar sesión</span>
        </button>
      </div>
    </header>
  );
}
