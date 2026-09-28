/** Zonas vendibles del estadio. */
export type TicketTierId = "vip" | "general" | "west";

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
