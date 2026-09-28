import type { EventDetailData, TicketTier } from "../types/event-detail.types";
// Fuente temporal: luego se reemplaza por el backend real.
import db from "../../../../db.json";

/** Fila de `events` en db.json (ver diagrama ER). */
interface DbEvent {
  id_event: number;
  title: string;
  description: string;
  date: string;
  start_time: string;
  end_time: string;
  location: string;
  city: string;
  capacity: number;
  available_capacity: number;
  status: string;
  active: boolean;
  created_at: string;
  updated_at: string;
  id_category: string;
  id_organizer: number;
}

/** Fila de `ticket_types` en db.json (ver diagrama ER). */
interface DbTicketType {
  id: number;
  id_event: number;
  name: string;
  price: number;
  stock: number;
}

interface DbShape {
  events?: DbEvent[];
  ticket_types?: DbTicketType[];
}

const dbData = db as DbShape;
const DB_EVENTS = dbData.events ?? [];
const DB_TICKET_TYPES = dbData.ticket_types ?? [];

/** Mes abreviado para insignias y etiquetas (ej. "NOV"). */
const MONTH_CODES = [
  "ENE", "FEB", "MAR", "ABR", "MAY", "JUN",
  "JUL", "AGO", "SET", "OCT", "NOV", "DIC",
];

/** Mes completo en español para etiquetas (ej. "Noviembre"). */
const MONTH_NAMES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre",
];

/** Colores cíclicos para las localidades del checkout. */
const TIER_DOTS = ["bg-primary-container", "bg-tertiary", "bg-primary"];

/**
 * Mapea un tipo de entrada de db.json a localidad del checkout.
 * El precio regular se estima +15% sobre el base.
 */
function mapTier(ticket: DbTicketType, index: number): TicketTier {
  return {
    id: `t-${ticket.id}`,
    name: ticket.name,
    description: `${ticket.stock} entradas disponibles`,
    note: ticket.stock < 100 ? `¡Últimas ${ticket.stock}!` : "Disponibilidad regular",
    price: ticket.price,
    regularPrice: Math.round(ticket.price / 0.85),
    dot: TIER_DOTS[index % TIER_DOTS.length],
  };
}

/**
 * Arma la ficha del evento desde db.json: evento por id (o el primero
 * activo) con sus tipos de entrada como localidades comprables.
 */
export function getEventDetail(eventId: number): EventDetailData | null {
  const row =
    DB_EVENTS.find((item) => item.id_event === eventId && item.active) ??
    DB_EVENTS.find((item) => item.active) ??
    null;
  if (!row) return null;

  const date = new Date(`${row.date}T00:00:00`);
  const day = String(date.getDate()).padStart(2, "0");
  const monthCode = MONTH_CODES[date.getMonth()] ?? "";
  return {
    id: row.id_event,
    title: row.title,
    venue: row.location,
    city: row.city,
    dateLabel: `${day} ${MONTH_NAMES[date.getMonth()] ?? ""} ${date.getFullYear()}`,
    month: monthCode,
    day,
    tiers: DB_TICKET_TYPES.filter((ticket) => ticket.id_event === row.id_event).map(mapTier),
  };
}

/** Tope antirreventa por orden de compra. */
export const MAX_TICKETS = 10;

/** Formato moneda peruana (ej. "S/ 320.00"). */
export function formatPEN(value: number): string {
  return `S/ ${value.toFixed(2)}`;
}
