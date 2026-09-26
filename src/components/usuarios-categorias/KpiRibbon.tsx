export default function KpiRibbon({ activas, total }: { activas: number; total: number }) {
  const kpis = [
    {
      titulo: "Identidades Registradas",
      valor: "2,842",
      detalle: "● 98.4% Validadas RENIEC/SUNAT",
      detalleClase: "text-emerald-600",
      icon: "groups",
      iconClase: "bg-primary-fixed text-primary",
    },
    {
      titulo: "Staff de Puerta Activo",
      valor: "38 Operadores",
      detalle: "Costa Verde & Jockey Club",
      detalleClase: "text-primary",
      icon: "qr_code_scanner",
      iconClase: "bg-surface-container-high",
    },
    {
      titulo: "Categorías Activas",
      valor: `${activas} de ${total}`,
      detalle: "Políticas RN03 en vigor",
      detalleClase: "text-on-surface-variant",
      icon: "category",
      iconClase: "bg-tertiary-container/20 text-tertiary",
    },
    {
      titulo: "Auditoría Criptográfica",
      valor: "100% OK",
      detalle: "Integridad referencial intacta",
      detalleClase: "text-emerald-600",
      icon: "verified",
      iconClase: "bg-surface-container-high text-emerald-700",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-4">
      {kpis.map((k) => (
        <div key={k.titulo} className="bg-surface-container-lowest p-4 rounded-xl shadow-sm flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[11px] text-outline uppercase tracking-wider">{k.titulo}</span>
            <span className="font-display font-semibold text-2xl mt-1">{k.valor}</span>
            <span className={`text-xs font-semibold mt-0.5 ${k.detalleClase}`}>{k.detalle}</span>
          </div>
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${k.iconClase}`}>
            <span className="material-symbols-outlined text-[26px]">{k.icon}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
