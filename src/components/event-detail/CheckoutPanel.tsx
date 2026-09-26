import { TIERS, formatoPEN, type TierId } from "../../data/eventDetail";

interface Totales {
  count: number;
  subtotal: number;
  descuento: number;
  total: number;
}

interface Props {
  cantidades: Record<TierId, number>;
  updateQty: (t: TierId, d: number) => void;
  totales: Totales;
  resaltada: TierId | null;
}

export default function CheckoutPanel({ cantidades, updateQty, totales, resaltada }: Props) {
  const vacio = totales.count === 0;

  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-md p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between pb-3 border-b border-outline-variant/40">
        <div>
          <span className="text-[11px] text-outline uppercase tracking-wider block">Paso 1 de 4</span>
          <h2 className="font-display font-semibold text-xl">Selección de Entradas</h2>
        </div>
        <div className="flex items-center gap-1 text-secondary bg-secondary-fixed/30 px-2.5 py-1 rounded-full text-xs font-bold">
          <span className="material-symbols-outlined text-[16px]">timer</span>
          <span>14:59 min</span>
        </div>
      </div>

      <div className="bg-surface-container p-3 rounded-lg flex items-center gap-2.5">
        <span className="material-symbols-outlined text-primary text-[20px]">info</span>
        <span className="text-xs font-medium">Máximo 10 tickets por orden de compra (Límite antirreventa).</span>
      </div>

      {TIERS.map((t) => (
        <div
          key={t.id}
          id={`tier-${t.id}-container`}
          className={`p-3.5 rounded-lg bg-surface-container-low transition-all flex flex-col gap-2 scroll-mt-28 ${
            resaltada === t.id ? "ring-2 ring-primary bg-surface-container-high" : ""
          }`}
        >
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-1.5">
                <span className={`w-2.5 h-2.5 rounded-full ${t.dot}`}></span>
                <span className="text-sm font-bold">{t.nombre}</span>
              </div>
              <span className={`text-xs block mt-0.5 ${t.id === "general" ? "text-outline" : "text-secondary font-semibold"}`}>
                {t.nota}
              </span>
            </div>
            <div className="text-right">
              <span className="text-sm font-extrabold text-primary">{formatoPEN(t.precio)}</span>
              <span className="block text-xs text-outline line-through">{formatoPEN(t.precioRegular)}</span>
            </div>
          </div>
          <div className="flex items-center justify-between pt-1">
            <span className="text-sm text-outline">{t.descripcion}</span>
            <div className="flex items-center bg-white rounded-lg shadow-sm p-0.5">
              <button
                aria-label={`Disminuir ${t.nombre}`}
                onClick={() => updateQty(t.id, -1)}
                type="button"
                className="w-8 h-8 rounded flex items-center justify-center hover:bg-surface-container-high transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">remove</span>
              </button>
              <span className="w-8 text-center text-sm font-bold">{cantidades[t.id]}</span>
              <button
                aria-label={`Aumentar ${t.nombre}`}
                onClick={() => updateQty(t.id, 1)}
                type="button"
                className="w-8 h-8 rounded flex items-center justify-center hover:bg-surface-container-high transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
              </button>
            </div>
          </div>
        </div>
      ))}

      <div className="p-4 rounded-xl bg-surface-container flex flex-col gap-2">
        <div className="flex justify-between text-sm text-on-surface-variant">
          <span>Subtotal regular ({totales.count} entradas)</span>
          <span className="font-semibold text-on-surface">{formatoPEN(totales.subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm text-secondary font-medium">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">sell</span>
            Descuento Miércoles (RN01 -15%)
          </span>
          <span className="font-bold">- {formatoPEN(totales.descuento)}</span>
        </div>
        <div className="flex justify-between text-sm text-on-surface-variant">
          <span>Comisión de emisión e impuestos</span>
          <span className="font-semibold text-on-surface">Incluido</span>
        </div>
        <div className="pt-2 mt-1 border-t border-outline-variant/40 flex justify-between items-baseline">
          <div>
            <span className="text-sm font-bold">Total Estimado</span>
            <span className="block text-[11px] text-outline">Moneda oficial Soles (PEN)</span>
          </div>
          <span className="font-display font-extrabold text-[1.75rem] text-primary">
            {formatoPEN(totales.total)}
          </span>
        </div>
      </div>

      <button
        disabled={vacio}
        type="button"
        className={`w-full py-3.5 px-4 rounded-xl font-bold shadow-md transition-all flex items-center justify-center gap-2 ${
          vacio ? "bg-primary/50 text-white cursor-not-allowed" : "bg-primary text-on-primary hover:opacity-90"
        }`}
      >
        <span>
          {vacio
            ? "Selecciona al menos 1 entrada"
            : `Continuar al Pago Seguro (${totales.count} ${totales.count === 1 ? "entrada" : "entradas"})`}
        </span>
        {!vacio && <span className="material-symbols-outlined text-[20px]">arrow_forward</span>}
      </button>

      <div className="grid grid-cols-3 gap-2 text-center pt-2">
        {[
          { icon: "lock", label: "Pago Seguro SSL" },
          { icon: "qr_code_scanner", label: "QR SUNAT Oficial" },
          { icon: "assignment_turned_in", label: "Garantía RN02" },
        ].map((b) => (
          <div key={b.label} className="flex flex-col items-center">
            <span className="material-symbols-outlined text-primary text-[20px]">{b.icon}</span>
            <span className="text-[11px] text-on-surface-variant mt-0.5">{b.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
