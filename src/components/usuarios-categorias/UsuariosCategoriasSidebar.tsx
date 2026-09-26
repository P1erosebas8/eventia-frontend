const NAV = [
  { icon: "monitoring", label: "Dashboard & Métricas" },
  { icon: "calendar_month", label: "Mis Eventos / Gestión" },
  { icon: "confirmation_number", label: "Tipos de Entrada" },
  { icon: "qr_code_scanner", label: "Validación Puerta QR" },
  { icon: "badge", label: "Directorio & Roles", activo: true },
];

export default function UsuariosCategoriasSidebar() {
  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-surface-container-low shadow z-50 hidden lg:flex flex-col justify-between py-4 px-4">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3 px-2">
          <div className="w-9 h-9 rounded-lg bg-primary text-on-primary flex items-center justify-center font-display font-extrabold text-xl">
            E
          </div>
          <div className="flex flex-col">
            <span className="font-display font-semibold text-lg leading-none">Eventia</span>
            <span className="text-[11px] text-primary font-bold tracking-wide uppercase mt-1">
              Gestión Perú
            </span>
          </div>
        </div>

        <div className="bg-surface-container px-3 py-2 rounded-lg flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[11px] text-outline">ROL VIGENTE</span>
            <span className="text-sm font-bold">Organizador / Admin</span>
          </div>
          <span className="material-symbols-outlined text-primary text-[20px]">verified_user</span>
        </div>

        <nav className="flex flex-col gap-1">
          {NAV.map((n) => (
            <a
              key={n.label}
              href="#"
              onClick={(e) => e.preventDefault()}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                n.activo
                  ? "bg-primary-container/20 text-primary font-semibold shadow-sm"
                  : "text-on-surface-variant hover:bg-surface-container-high"
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">{n.icon}</span>
              <span>{n.label}</span>
            </a>
          ))}
        </nav>
      </div>

      <div className="flex flex-col gap-2 pt-4">
        <div className="bg-surface-container-high p-3 rounded-lg flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[11px] text-outline">SISTEMA PUERTA</span>
            <span className="text-xs font-semibold">En Línea (Sincronizado)</span>
          </div>
          <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
        </div>
      </div>
    </aside>
  );
}
