import { FolderTree, Sparkles, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AdminPlaceholderViewProps {
  tab: "usuarios" | "categorias";
}

export default function AdminPlaceholderView({ tab }: AdminPlaceholderViewProps) {
  const navigate = useNavigate();
  const isUsers = tab === "usuarios";
  const title = isUsers ? "Gestión de Usuarios" : "Gestión de Categorías";
  const subtitle = isUsers
    ? "Administración de cuentas, roles (Organizador, Cliente, Staff, Admin) y estados de acceso."
    : "Taxonomías oficiales de eventos, categorías de tickets y configuración del catálogo.";

  const Icon = isUsers ? Users : FolderTree;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8 bg-surface-container-lowest rounded-3xl border border-outline-variant/30 shadow-xs mt-4">
      <div className="w-16 h-16 rounded-2xl bg-primary-fixed/50 text-primary flex items-center justify-center mb-4">
        <Icon className="w-8 h-8" />
      </div>

      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-xs font-bold text-primary mb-3">
        <Sparkles className="w-3.5 h-3.5" />
        <span>Módulo Administrador</span>
      </div>

      <h2 className="font-display font-extrabold text-2xl text-on-surface mb-2">{title}</h2>
      <p className="text-sm text-on-surface-variant max-w-lg mb-6 leading-relaxed">
        {subtitle}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => navigate("/admin/monitoreo")}
          className="px-5 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-sm hover:opacity-90 transition-opacity"
        >
          Volver a Panel de Monitoreo
        </button>
      </div>
    </div>
  );
}
