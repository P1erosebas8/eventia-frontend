import type { EstadoCuenta, Rol, Usuario } from "../../data/usuariosCategorias";

const ROL_PILL: Record<Rol, string> = {
  Administrador: "bg-primary-fixed text-primary",
  Organizador: "bg-tertiary-container/20 text-tertiary",
  Staff: "bg-surface-container-high text-on-surface",
  Cliente: "bg-surface-container text-on-surface-variant",
};

const ROL_ICON: Record<Rol, string> = {
  Administrador: "shield_person",
  Organizador: "campaign",
  Staff: "qr_code_scanner",
  Cliente: "shopping_bag",
};

interface Props {
  usuarios: Usuario[];
  busqueda: string;
  setBusqueda: (v: string) => void;
  rol: Rol | "ALL";
  setRol: (v: Rol | "ALL") => void;
  estado: EstadoCuenta | "ALL";
  setEstado: (v: EstadoCuenta | "ALL") => void;
  onToggleEstado: (id: string) => void;
  onToast: (titulo: string, desc: string) => void;
}

export default function UserDirectory(p: Props) {
  return (
    <section className="flex flex-col gap-4 mt-4">
      <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        <div className="flex flex-1 items-center gap-3 bg-surface-container px-3.5 py-2 rounded-lg">
          <span className="material-symbols-outlined text-outline text-[22px]">search</span>
          <input
            value={p.busqueda}
            onChange={(e) => p.setBusqueda(e.target.value)}
            className="bg-transparent text-[0.9375rem] placeholder:text-outline focus:outline-none w-full"
            placeholder="Buscar por Nombre, DNI/RUC peruano o Correo institucional..."
            type="text"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <label className="flex items-center gap-2 bg-surface-container px-3 py-2 rounded-lg text-xs">
            <span className="text-outline">Rol RBAC:</span>
            <select
              value={p.rol}
              onChange={(e) => p.setRol(e.target.value as Rol | "ALL")}
              className="bg-transparent text-xs font-semibold focus:outline-none cursor-pointer"
            >
              <option value="ALL">Todos los Roles</option>
              <option value="Cliente">Cliente (Comprador)</option>
              <option value="Organizador">Organizador / Productor</option>
              <option value="Staff">Personal de Puerta / Staff</option>
              <option value="Administrador">Administrador del Sistema</option>
            </select>
          </label>
          <label className="flex items-center gap-2 bg-surface-container px-3 py-2 rounded-lg text-xs">
            <span className="text-outline">Estado:</span>
            <select
              value={p.estado}
              onChange={(e) => p.setEstado(e.target.value as EstadoCuenta | "ALL")}
              className="bg-transparent text-xs font-semibold focus:outline-none cursor-pointer"
            >
              <option value="ALL">Todos</option>
              <option value="Activo">Activos</option>
              <option value="Suspendido">Suspendidos</option>
            </select>
          </label>
          <button
            type="button"
            onClick={() => p.onToast("Reporte Generado", "Descarga de matriz de usuarios iniciada.")}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface-container-high text-xs font-semibold hover:bg-surface-variant transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">file_download</span>
            <span>Exportar Auditoría</span>
          </button>
        </div>
      </div>

      <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[820px]">
            <thead>
              <tr className="bg-surface-container text-xs uppercase tracking-wider text-on-surface-variant">
                <th className="py-3.5 px-4 font-semibold">Identidad / Usuario</th>
                <th className="py-3.5 px-4 font-semibold">Rol Asignado</th>
                <th className="py-3.5 px-4 font-semibold">Validación RENIEC / SUNAT</th>
                <th className="py-3.5 px-4 font-semibold">Estado</th>
                <th className="py-3.5 px-4 font-semibold text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-low">
              {p.usuarios.map((u) => (
                <tr key={u.id} className="hover:bg-surface-container/50 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary-fixed/60 text-primary flex items-center justify-center font-bold text-sm shrink-0">
                        {u.iniciales}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-bold truncate">{u.nombre}</span>
                        <span className="text-xs text-on-surface-variant truncate">{u.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${ROL_PILL[u.rol]}`}>
                      <span className="material-symbols-outlined text-[14px]">{ROL_ICON[u.rol]}</span>
                      {u.rol === "Staff" ? "Personal de Puerta" : u.rol}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold flex items-center gap-1">
                        <span className="material-symbols-outlined text-emerald-600 text-[16px]">verified</span>
                        {u.docEtiqueta}
                      </span>
                      <span className="text-xs text-outline">{u.docDetalle}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    {u.estado === "Activo" ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> Activo
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-error-container text-on-error-container text-[11px] font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-error"></span> Suspendido
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        title="Cambiar Rol RBAC"
                        type="button"
                        onClick={() => p.onToast("Auditoría RBAC", `Privilegios de ${u.nombre} re-firmados.`)}
                        className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-primary transition-colors"
                      >
                        <span className="material-symbols-outlined text-[18px]">manage_accounts</span>
                      </button>
                      <button
                        title={u.estado === "Activo" ? "Suspender Cuenta" : "Reactivar Cuenta"}
                        type="button"
                        onClick={() => {
                          p.onToggleEstado(u.id);
                          p.onToast(
                            u.estado === "Activo" ? "Cuenta Suspendida" : "Cuenta Reactivada",
                            `${u.nombre}: ${u.estado === "Activo" ? "revocación temporal aplicada." : "acceso restablecido."}`
                          );
                        }}
                        className="p-1.5 rounded-lg text-on-surface-variant hover:bg-error-container hover:text-error transition-colors"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          {u.estado === "Activo" ? "block" : "check_circle"}
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {p.usuarios.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 px-4 text-center text-sm text-outline">
                    Sin resultados para los filtros aplicados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="p-4 bg-surface-container/30 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-on-surface-variant">
          <span>Mostrando {p.usuarios.length} usuarios bajo política RBAC de Perú</span>
          <div className="flex items-center gap-1">
            <button type="button" disabled className="px-3 py-1.5 rounded-lg bg-surface-container font-semibold disabled:opacity-40">Anterior</button>
            <button type="button" className="px-3 py-1.5 rounded-lg bg-primary text-on-primary font-bold">1</button>
            <button type="button" className="px-3 py-1.5 rounded-lg bg-surface-container font-semibold">Siguiente</button>
          </div>
        </div>
      </div>
    </section>
  );
}
