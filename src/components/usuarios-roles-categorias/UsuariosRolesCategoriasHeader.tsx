export default function UsuariosRolesCategoriasHeader({ onNuevoUsuario }: { onNuevoUsuario: () => void }) {
  return (
    <header className="fixed top-0 left-0 lg:left-64 right-0 h-16 bg-surface/90 backdrop-blur-xl shadow z-40 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-surface-container px-3 py-1.5 rounded-lg">
          <span className="material-symbols-outlined text-primary text-[18px]">sensors</span>
          <span className="text-xs text-on-surface-variant">
            Turno Activo: <strong className="text-on-surface">Arena 1 Costa Verde</strong>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-1.5 text-secondary text-xs">
          <span className="material-symbols-outlined text-[16px]">warning</span>
          <span>Capacidad general al 84%</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={onNuevoUsuario}
          className="hidden sm:flex items-center gap-2 bg-primary text-on-primary px-3.5 py-1.5 rounded-lg hover:opacity-90 transition text-xs font-semibold shadow-sm"
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          <span>Nuevo Evento</span>
        </button>
        <button
          aria-label="Alertas en tiempo real"
          className="w-9 h-9 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high relative"
          type="button"
        >
          <span className="material-symbols-outlined text-[20px]">notifications</span>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-secondary"></span>
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary-fixed text-primary flex items-center justify-center text-xs font-bold">
            VM
          </div>
          <div className="hidden lg:flex flex-col">
            <span className="text-xs font-semibold leading-tight">Valeria Mendoza</span>
            <span className="text-xs text-outline leading-tight">vmendoza@eventia.pe</span>
          </div>
        </div>
      </div>
    </header>
  );
}
