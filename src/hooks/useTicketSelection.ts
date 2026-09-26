import { useMemo, useState } from "react";
import { DESCUENTO_RN01, MAX_TICKETS, TIERS, type TierId } from "../data/eventDetail";

const INICIAL: Record<TierId, number> = { vip: 2, general: 0, occidente: 0 };

/** Selección de entradas + totales con RN01. Límite de 10 por orden. */
export function useTicketSelection() {
  const [cantidades, setCantidades] = useState<Record<TierId, number>>(INICIAL);

  const updateQty = (tier: TierId, delta: number) => {
    setCantidades((prev) => {
      const total = Object.values(prev).reduce((a, b) => a + b, 0);
      const nuevo = prev[tier] + delta;
      if (nuevo < 0) return prev;
      if (delta > 0 && total >= MAX_TICKETS) return prev;
      return { ...prev, [tier]: nuevo };
    });
  };

  const totales = useMemo(() => {
    const count = Object.values(cantidades).reduce((a, b) => a + b, 0);
    const subtotal = TIERS.reduce((acc, t) => acc + t.precio * cantidades[t.id], 0);
    const descuento = subtotal * DESCUENTO_RN01;
    return { count, subtotal, descuento, total: subtotal - descuento };
  }, [cantidades]);

  return { cantidades, updateQty, totales };
}

export type TicketSelection = ReturnType<typeof useTicketSelection>;
