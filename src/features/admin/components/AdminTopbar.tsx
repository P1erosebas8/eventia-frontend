import { useEffect, useState } from "react";
import { Clock, Menu, Shield, User } from "lucide-react";
import { getLimaCurrentTime } from "../utils/adminFormatters";

interface AdminTopbarProps {
  onToggleMobileSidebar?: () => void;
}

export default function AdminTopbar({ onToggleMobileSidebar }: AdminTopbarProps) {
  const [time, setTime] = useState(getLimaCurrentTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getLimaCurrentTime());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="w-full flex items-center justify-between py-3 px-4 sm:px-8 bg-surface-container-lowest/80 backdrop-blur-md border-b border-outline-variant/20 sticky top-0 z-20">
      {/* Lado izquierdo: Botón móvil y Badge de Rol */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-2 rounded-xl text-on-surface hover:bg-surface-container transition-colors"
          aria-label="Abrir menú"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-primary-fixed/40 border border-primary-fixed/50 text-xs font-bold text-primary font-display">
          <Shield className="w-3.5 h-3.5 text-primary" />
          <span>Rol: Administrador</span>
        </div>
      </div>

      {/* Lado derecho: Reloj en vivo y Perfil del Administrador */}
      <div className="flex items-center gap-4 sm:gap-6">
        {/* Reloj dinámico con zona horaria de Lima */}
        <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-on-surface-variant bg-surface-container-low px-3 py-1.5 rounded-xl border border-outline-variant/20">
          <Clock className="w-3.5 h-3.5 text-primary" />
          <span className="font-mono">{time}</span>
        </div>

        {/* Perfil del Admin Principal */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <div className="text-xs sm:text-sm font-bold text-on-surface leading-tight font-display">
              Admin Principal
            </div>
            <div className="text-[11px] text-on-surface-variant font-medium">
              admin@eventia.pe
            </div>
          </div>

          <div className="w-9 h-9 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold shadow-xs">
            <User className="w-5 h-5" />
          </div>
        </div>
      </div>
    </header>
  );
}
