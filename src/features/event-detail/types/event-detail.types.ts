export type TicketTierId = "vip" | "general" | "west";

export interface TicketTier {
  id: TicketTierId;
  name: string;
  description: string;
  note: string;
  price: number;
  regularPrice: number;
  dot: string;
}

export type DetailTabId = "zones" | "info" | "policies";

export interface OrderTotals {
  count: number;
  subtotal: number;
  discount: number;
  total: number;
}
