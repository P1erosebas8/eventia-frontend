import { UserPlus } from "lucide-react";

interface UsersHeaderProps {
  onNuevoUsuario: () => void;
}

export default function UsersHeader({ onNuevoUsuario }: UsersHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 pt-2">
      <div>
        <h1 className="font-display font-black text-2xl lg:text-3xl text-on-surface tracking-tight">
          Gestión de Usuarios y Accesos
        </h1>
        <p className="text-xs sm:text-sm text-on-surface-variant font-medium mt-1">
          Control de cuentas y permisos de acceso para{" "}
          <span className="text-primary font-semibold">Organizadores</span> y{" "}
          <span className="text-primary font-semibold">Clientes</span> (Users).
        </p>
      </div>

      <button
        type="button"
        onClick={onNuevoUsuario}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-on-primary text-sm font-bold hover:opacity-90 transition-opacity shrink-0 self-start"
      >
        <UserPlus className="w-4 h-4" />
        <span>Nuevo Usuario</span>
      </button>
    </div>
  );
}
