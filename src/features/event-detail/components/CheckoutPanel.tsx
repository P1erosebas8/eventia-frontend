import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TICKET_TIERS, formatPEN, MAX_TICKETS } from "../services/event-detail.service";
import type { OrderTotals, TicketTierId } from "../types/event-detail.types";
import { isPromoUser, PROMO_DISCOUNT_PCT } from "../../events/utils/promo.utils";

/** Reserva simulada: 15 minutos para completar la compra. */
const HOLD_SECONDS = 15 * 60;

/** Formatea segundos a "MM:SS". */
function formatCountdown(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

interface CheckoutPanelProps {
  quantities: Record<TicketTierId, number>;
  onUpdateQuantity: (tier: TicketTierId, delta: number) => void;
  totals: OrderTotals;
  highlightedTier: TicketTierId | null;
  /** Nombre de sesión o null si es visita anónima (sin input manual). */
  sessionName: string | null;
}

/** Panel de compra: cantidades, resumen y pago. El nombre viene de la sesión. */
export default function CheckoutPanel({
  quantities,
  onUpdateQuantity,
  totals,
  highlightedTier,
  sessionName,
}: CheckoutPanelProps) {
  const empty = totals.count === 0;
  const promoUser = sessionName !== null && isPromoUser(sessionName);
  const [secondsLeft, setSecondsLeft] = useState(HOLD_SECONDS);

  // Reloj en vivo con limpieza al desmontar (evita timers huérfanos).
  useEffect(() => {
    const timer = window.setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-md p-5 sm:p-6 flex flex-col gap-4 min-w-0">
      <div className="flex items-center justify-between gap-2 pb-3 border-b border-outline-variant/40 min-w-0">
        <div className="min-w-0">
          <span className="text-[11px] text-outline uppercase tracking-wider block">Paso 1 de 4</span>
          <h2 className="font-display font-semibold text-xl truncate">Selección de Entradas</h2>
        </div>
        <div className="flex items-center gap-1 text-secondary bg-secondary-fixed/30 px-2.5 py-1 rounded-full text-xs font-bold shrink-0 whitespace-nowrap">
          <span className="material-symbols-outlined text-[16px]">timer</span>
          <span>{formatCountdown(secondsLeft)} min</span>
        </div>
      </div>

      <div className="bg-surface-container p-3 rounded-lg flex items-center gap-2.5 min-w-0">
        <span className="material-symbols-outlined text-primary text-[20px] shrink-0">info</span>
        <span className="text-xs font-medium break-words">
          Máximo {MAX_TICKETS} tickets por orden de compra (límite antirreventa).
        </span>
      </div>

      <div className="flex flex-col gap-2 min-w-0">
        <span className="text-xs font-semibold uppercase tracking-wider">Comprador</span>
        {sessionName !== null ? (
          <div className="flex items-center gap-2 bg-surface-container-low text-sm pl-3 pr-4 py-2.5 rounded-lg min-w-0">
            <span className="material-symbols-outlined text-primary text-[20px] shrink-0">
              verified_user
            </span>
            <span className="truncate font-semibold">{sessionName}</span>
            <span className="text-[11px] text-outline shrink-0">(sesión)</span>
          </div>
        ) : (
          <Link
            to="/login"
            className="flex items-center gap-2 bg-surface-container-low text-sm px-3 py-2.5 rounded-lg text-primary font-semibold hover:bg-surface-container-high transition-colors min-w-0"
          >
            <span className="material-symbols-outlined text-[20px] shrink-0">login</span>
            <span className="truncate">Inicia sesión para validar tu descuento</span>
          </Link>
        )}
        {sessionName !== null && (
          <p className={`text-xs ${promoUser ? "text-primary font-semibold" : "text-outline"}`}>
            {promoUser
              ? "Tu sesión tiene 15% de descuento aplicado en el resumen."
              : "La promo de 15% solo aplica para Roberto o Gerónimo."}
          </p>
        )}
      </div>

      {TICKET_TIERS.map((tier) => (
        <div
          key={tier.id}
          id={`tier-${tier.id}-container`}
          className={`p-3.5 rounded-lg bg-surface-container-low transition-all flex flex-col gap-2 scroll-mt-28 min-w-0 ${
            highlightedTier === tier.id ? "ring-2 ring-primary bg-surface-container-high" : ""
          }`}
        >
          <div className="flex justify-between items-start gap-2 min-w-0">
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${tier.dot}`}></span>
                <span className="text-sm font-bold truncate">{tier.name}</span>
              </div>
              <span className={`text-xs block mt-0.5 truncate ${tier.id === "general" ? "text-outline" : "text-secondary font-semibold"}`}>
                {tier.note}
              </span>
            </div>
            <div className="text-right shrink-0">
              <span className="text-sm font-extrabold text-primary whitespace-nowrap">{formatPEN(tier.price)}</span>
              <span className="block text-xs text-outline line-through whitespace-nowrap">{formatPEN(tier.regularPrice)}</span>
            </div>
          </div>
          <div className="flex items-center justify-between gap-2 pt-1 min-w-0">
            <span className="text-sm text-outline truncate">{tier.description}</span>
            <div className="flex items-center bg-white rounded-lg shadow-sm p-0.5 shrink-0">
              <button
                aria-label={`Disminuir ${tier.name}`}
                onClick={() => onUpdateQuantity(tier.id, -1)}
                type="button"
                className="w-8 h-8 rounded flex items-center justify-center hover:bg-surface-container-high transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">remove</span>
              </button>
              <span className="w-8 text-center text-sm font-bold" aria-live="polite">{quantities[tier.id]}</span>
              <button
                aria-label={`Aumentar ${tier.name}`}
                onClick={() => onUpdateQuantity(tier.id, 1)}
                type="button"
                className="w-8 h-8 rounded flex items-center justify-center hover:bg-surface-container-high transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
              </button>
            </div>
          </div>
        </div>
      ))}

      <div className="p-4 rounded-xl bg-surface-container flex flex-col gap-2 min-w-0">
        <div className="flex justify-between gap-2 text-sm text-on-surface-variant">
          <span className="truncate">Subtotal regular ({totals.count} entradas)</span>
          <span className="font-semibold text-on-surface whitespace-nowrap">{formatPEN(totals.subtotal)}</span>
        </div>
        {promoUser ? (
          <div className="flex justify-between gap-2 text-sm text-secondary font-medium">
            <span className="flex items-center gap-1 min-w-0">
              <span className="material-symbols-outlined text-[16px] shrink-0">sell</span>
              <span className="truncate">Descuento promo (-{PROMO_DISCOUNT_PCT}%)</span>
            </span>
            <span className="font-bold whitespace-nowrap">- {formatPEN(totals.discount)}</span>
          </div>
        ) : (
          <div className="flex justify-between gap-2 text-sm text-outline">
            <span className="truncate">Descuento promo (Roberto o Gerónimo)</span>
            <span className="font-semibold whitespace-nowrap">—</span>
          </div>
        )}
        <div className="flex justify-between gap-2 text-sm text-on-surface-variant">
          <span className="truncate">Comisión de emisión e impuestos</span>
          <span className="font-semibold text-on-surface whitespace-nowrap">Incluido</span>
        </div>
        <div className="pt-2 mt-1 border-t border-outline-variant/40 flex justify-between items-baseline gap-2">
          <div className="min-w-0">
            <span className="text-sm font-bold">Total Estimado</span>
            <span className="block text-[11px] text-outline">Moneda oficial Soles (PEN)</span>
          </div>
          <span className="font-display font-extrabold text-2xl sm:text-[1.75rem] text-primary whitespace-nowrap">
            {formatPEN(totals.total)}
          </span>
        </div>
      </div>

      <button
        disabled={empty}
        type="button"
        className={`w-full py-3.5 px-4 rounded-xl font-bold shadow-md transition-all flex items-center justify-center gap-2 min-w-0 ${
          empty ? "bg-primary/50 text-white cursor-not-allowed" : "bg-primary text-on-primary hover:opacity-90"
        }`}
      >
        <span className="truncate">
          {empty
            ? "Selecciona al menos 1 entrada"
            : `Continuar al Pago Seguro (${totals.count} ${totals.count === 1 ? "entrada" : "entradas"})`}
        </span>
        {!empty && <span className="material-symbols-outlined text-[20px] shrink-0">arrow_forward</span>}
      </button>

      <div className="grid grid-cols-3 gap-2 text-center pt-2">
        {[
          { icon: "lock", label: "Pago Seguro SSL" },
          { icon: "qr_code_scanner", label: "QR Oficial" },
          { icon: "assignment_turned_in", label: "Compra Garantizada" },
        ].map((badge) => (
          <div key={badge.label} className="flex flex-col items-center min-w-0">
            <span className="material-symbols-outlined text-primary text-[20px]">{badge.icon}</span>
            <span className="text-[11px] text-on-surface-variant mt-0.5 break-words">{badge.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
