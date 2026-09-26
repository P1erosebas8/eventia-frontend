import type { CategoriaAdmin } from "../../data/usuariosRolesCategorias";

interface Props {
  categorias: CategoriaAdmin[];
  onToggle: (id: string) => void;
  onToast: (titulo: string, desc: string) => void;
}

export default function CategoryManager({ categorias, onToggle, onToast }: Props) {
  return (
    <section className="flex flex-col gap-4 mt-4">
      <div className="bg-gradient-to-r from-secondary-fixed via-surface-container-high to-primary-fixed/40 p-4 rounded-2xl shadow-sm">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-secondary text-on-secondary flex items-center justify-center shrink-0 shadow-md">
            <span className="material-symbols-outlined text-[28px]">gavel</span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded bg-secondary text-on-secondary">
                Regla de negocio crítica RN03
              </span>
              <span className="text-[11px] text-on-secondary-fixed-variant font-semibold">
                Integridad Referencial de Base de Datos
              </span>
            </div>
            <h2 className="font-display font-bold text-xl">
              Prohibición Estricta de Eliminación Física (Hard Delete)
            </h2>
            <p className="text-[0.9375rem] text-on-surface-variant max-w-4xl leading-relaxed">
              Las categorías <strong className="text-secondary font-bold">NO pueden eliminarse con DELETE</strong>.
              Desactivar es solo mutar a <strong>Inactivo (<code className="bg-surface-container px-1.5 py-0.5 rounded text-primary font-mono text-[13px]">active = false</code>)</strong> para
              preservar compras, liquidaciones y reportes.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-surface-container/40">
          <div>
            <h3 className="font-display font-semibold text-lg">Taxonomías de Eventos Registradas (RF17)</h3>
            <p className="text-xs text-outline">Catálogo usado en segmentación de tickets y búsqueda</p>
          </div>
          <div className="flex items-center gap-2 text-xs bg-surface-container-high px-3 py-1.5 rounded-lg">
            <span className="material-symbols-outlined text-primary text-[18px]">lock</span>
            <span>Protección lógica <code className="font-mono font-bold">is_deleted=false</code> activa</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[820px]">
            <thead>
              <tr className="bg-surface-container text-xs uppercase tracking-wider text-on-surface-variant">
                <th className="py-3.5 px-4 font-semibold">Categoría Oficial</th>
                <th className="py-3.5 px-4 font-semibold">Eventos</th>
                <th className="py-3.5 px-4 font-semibold">Volumen</th>
                <th className="py-3.5 px-4 font-semibold">Estado</th>
                <th className="py-3.5 px-4 font-semibold text-right">Acción Segura (RN03)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-low">
              {categorias.map((c) => (
                <tr key={c.id} className={`hover:bg-surface-container/50 transition-colors ${c.activa ? "" : "bg-surface-container-low/60 opacity-80"}`}>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary-fixed/60 text-primary flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[22px]">{c.icono}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className={`text-sm font-bold ${c.activa ? "" : "line-through text-outline"}`}>
                          {c.nombre}
                        </span>
                        <span className="text-xs text-outline">
                          Slug: <code className="font-mono text-primary font-semibold">{c.slug}</code>
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm font-bold">{c.eventos} eventos</span>
                    <span className="block text-[11px] text-emerald-600 font-semibold">{c.enVivo}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm font-bold">{c.volumen}</span>
                    <span className="block text-[11px] text-outline">Histórico protegido</span>
                  </td>
                  <td className="py-4 px-4">
                    {c.activa ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> Activa (active=true)
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface-variant text-[11px] font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-outline"></span> Inactiva (active=false)
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => {
                        onToggle(c.id);
                        onToast(
                          c.activa ? "Regla RN03 Aplicada" : "Categoría Reactivada",
                          c.activa
                            ? `"${c.nombre}" desactivada (active=false). Sin DELETE físico.`
                            : `"${c.nombre}" habilitada para cartelera.`
                        );
                      }}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold shadow-sm transition-colors ${
                        c.activa
                          ? "bg-secondary-fixed text-on-secondary-fixed hover:opacity-90"
                          : "bg-primary-fixed text-on-primary-fixed hover:opacity-90"
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        {c.activa ? "toggle_off" : "toggle_on"}
                      </span>
                      <span>{c.activa ? "Desactivar (RN03)" : "Reactivar"}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: "database", titulo: "Modelo de Persistencia", desc: "Las FK eventos.categoria_id y tickets.order_item_id quedan blindadas sin cascada." },
          { icon: "receipt_long", titulo: "Auditoría Fiscal SUNAT", desc: "Los comprobantes no pierden la metadata de categoría de la venta original." },
          { icon: "history", titulo: "Trazabilidad Completa", desc: "Cada cambio lógico emite un evento immutable para BI y bitácora." },
        ].map((b) => (
          <div key={b.titulo} className="bg-surface-container-lowest p-4 rounded-xl shadow-sm flex flex-col gap-2">
            <div className="flex items-center gap-2 text-primary text-sm font-bold">
              <span className="material-symbols-outlined text-[20px]">{b.icon}</span>
              <span>{b.titulo}</span>
            </div>
            <p className="text-sm text-on-surface-variant">{b.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
