import type { TicketTier } from "../types/event-detail.types";

export const TICKET_TIERS: TicketTier[] = [
  {
    id: "vip",
    name: "Campo VIP",
    description: "Frente al escenario principal",
    note: "¡Últimas 48 entradas!",
    price: 320,
    regularPrice: 376,
    dot: "bg-primary-container",
  },
  {
    id: "general",
    name: "Campo General",
    description: "Zona posterior de pista",
    note: "Acceso a pista libre",
    price: 160,
    regularPrice: 188,
    dot: "bg-tertiary",
  },
  {
    id: "west",
    name: "Tribuna Occidente",
    description: "Asiento numerado en grada",
    note: "Pocas ubicaciones",
    price: 210,
    regularPrice: 247,
    dot: "bg-primary",
  },
];

export const MAX_TICKETS = 10;

export function formatPEN(value: number): string {
  return `S/ ${value.toFixed(2)}`;
}
