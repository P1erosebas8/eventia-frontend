/** Identificador de localidad (viene de `ticket_types` en db.json). */
export type TicketTierId = string;

/** Localidad con precios (base y regular tachado) para el checkout. */
export interface TicketTier {
  id: TicketTierId;
  name: string;
  description: string;
  note: string;
  price: number;
  regularPrice: number;
  /** Clase del punto de color en el checkout. */
  dot: string;
  maxPerPurchase?: number;
}

/** Ficha del evento armada desde db.json para el detalle. */
export interface EventDetailData {
  id: string | number;
  title: string;
  venue: string;
  city: string;
  image?: string;
  /** Fecha legible (ej. "22 Nov 2025"). */
  dateLabel: string;
  /** Mes abreviado para la insignia (ej. "NOV"). */
  month: string;
  /** Día con dos dígitos para la insignia. */
  day: string;
  tiers: TicketTier[];
}

/** Pestañas de la ficha: mapa, artistas y políticas. */
export type DetailTabId = "zones" | "info" | "policies";

/** Resumen de compra calculado en la página. */
export interface OrderTotals {
  count: number;
  subtotal: number;
  discount: number;
  total: number;
}
