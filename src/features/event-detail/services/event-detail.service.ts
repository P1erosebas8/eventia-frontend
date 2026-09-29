import type { EventDetailData, TicketTier } from "../types/event-detail.types";
import apiClient from "../../../shared/services/api";
import { getMockEvents, getMockTickets } from "../../organizer/services/organizerMock";
// Fuente temporal: luego se reemplaza por el backend real.
import db from "../../../../db.json";

/** Fila de `events` en db.json (ver diagrama ER). */
interface DbEvent {
  id_event?: number;
  id?: string | number;
  title: string;
  description?: string;
  date: string;
  start_time?: string;
  end_time?: string;
  location?: string;
  venue?: string;
  city?: string;
  capacity?: number;
  available_capacity?: number;
  status?: string;
  active?: boolean;
  created_at?: string;
  updated_at?: string;
  id_category?: string;
  category?: string;
  id_organizer?: number;
  bannerUrl?: string;
  image?: string;
}

/** Fila de `ticket_types` en db.json (ver diagrama ER). */
interface DbTicketType {
  id: string | number;
  id_event?: string | number;
  name: string;
  price: number;
  stock?: number;
  maxPerPurchase?: number;
}

/** Fila de `organizer_tickets` en db.json */
interface DbOrganizerTicket {
  id: string | number;
  eventId: string | number;
  name: string;
  zone?: string;
  pricePEN?: number;
  price?: number;
  capacity?: number;
  stock?: number;
  soldCount?: number;
  status?: string;
  maxPerPurchase?: number;
}

interface DbShape {
  events?: DbEvent[];
  ticket_types?: DbTicketType[];
  organizer_tickets?: DbOrganizerTicket[];
}

const dbData = db as DbShape;
const DB_EVENTS = dbData.events ?? [];
const DB_TICKET_TYPES = dbData.ticket_types ?? [];
const DB_ORGANIZER_TICKETS = dbData.organizer_tickets ?? [];

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
  const stock = ticket.stock ?? 500;
  return {
    id: `t-${ticket.id}`,
    name: ticket.name,
    description: `${stock} entradas disponibles`,
    note: stock < 100 ? `¡Últimas ${stock}!` : "Disponibilidad regular",
    price: ticket.price,
    regularPrice: Math.round(ticket.price / 0.85),
    dot: TIER_DOTS[index % TIER_DOTS.length],
    maxPerPurchase: ticket.maxPerPurchase ?? 4,
  };
}

function mapOrgTicket(ticket: DbOrganizerTicket, index: number, offset: number): TicketTier {
  const price = ticket.pricePEN ?? ticket.price ?? 0;
  const available = (ticket.capacity ?? 1000) - (ticket.soldCount ?? 0);
  return {
    id: `t-${ticket.id}`,
    name: ticket.name,
    description: `${available} entradas disponibles`,
    note: available < 100 ? `¡Últimas entradas!` : "Disponibilidad regular",
    price,
    regularPrice: Math.round(price / 0.85),
    dot: TIER_DOTS[(offset + index) % TIER_DOTS.length],
    maxPerPurchase: ticket.maxPerPurchase ?? 4,
  };
}

/**
 * Arma la ficha del evento desde un registro DbEvent y listas de tickets
 */
function buildEventDetail(
  row: DbEvent,
  ticketTypes: DbTicketType[],
  orgTickets: DbOrganizerTicket[]
): EventDetailData {
  const eventId = row.id ?? row.id_event ?? "";
  const date = new Date(`${row.date}T00:00:00`);
  const safeDate = !isNaN(date.getTime()) ? date : new Date();
  const day = String(safeDate.getDate()).padStart(2, "0");
  const monthIdx = safeDate.getMonth();
  const monthCode = MONTH_CODES[monthIdx] ?? "ENE";
  const monthName = MONTH_NAMES[monthIdx] ?? "Enero";
  const year = safeDate.getFullYear();

  // Filtrar tickets correspondientes
  const legacyTiers = ticketTypes
    .filter(
      (ticket) =>
        String(ticket.id_event) === String(eventId) ||
        (row.id_event && String(ticket.id_event) === String(row.id_event))
    )
    .map(mapTier);

  const orgTiers = orgTickets
    .filter(
      (ticket) =>
        (String(ticket.eventId) === String(eventId) ||
          (row.id && String(ticket.eventId) === String(row.id)) ||
          (row.id_event && String(ticket.eventId) === String(row.id_event))) &&
        ticket.status !== "inactive"
    )
    .map((t, idx) => mapOrgTicket(t, idx, legacyTiers.length));

  const allTiers = [...legacyTiers, ...orgTiers];

  // Si aún no tiene tarifas configuradas, generar una tarifa General por defecto
  if (allTiers.length === 0) {
    allTiers.push({
      id: `t-gen-${eventId}`,
      name: "Entrada General",
      description: "Acceso general al evento",
      note: "Disponibilidad regular",
      price: 50,
      regularPrice: 60,
      dot: TIER_DOTS[0],
    });
  }

  const image =
    row.bannerUrl ||
    row.image ||
    "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&auto=format&fit=crop&q=80";

  return {
    id: eventId,
    title: row.title,
    venue: row.venue || row.location || "Lugar por confirmar",
    city: row.city || "Lima",
    image,
    dateLabel: `${day} ${monthName} ${year}`,
    month: monthCode,
    day,
    tiers: allTiers,
  };
}

/**
 * Arma la ficha del evento desde db.json: evento por id (o el primero
 * activo) con sus tipos de entrada como localidades comprables.
 */
export function getEventDetail(eventId: string | number): EventDetailData | null {
  const strId = String(eventId);
  const localMockEvents = getMockEvents();
  const localMockTickets = getMockTickets();
  const allLocalTickets = Object.values(localMockTickets).flat();

  const allEventsList = [...(localMockEvents as any), ...DB_EVENTS];
  const row =
    allEventsList.find((item) => String(item.id) === strId || String(item.id_event) === strId) ??
    allEventsList.find((item) => item.active !== false) ??
    null;
  if (!row) return null;

  // Unificar tickets de db.json y de localStorage
  const ticketsMap = new Map<string, any>();
  DB_ORGANIZER_TICKETS.forEach((t) => ticketsMap.set(String(t.id), t));
  allLocalTickets.forEach((t) => ticketsMap.set(String(t.id), t));
  const mergedOrgTickets = Array.from(ticketsMap.values());

  return buildEventDetail(row, DB_TICKET_TYPES, mergedOrgTickets);
}

/**
 * Obtiene el detalle fresco del evento desde la API con respaldo local
 */
export async function fetchEventDetail(eventId: string | number): Promise<EventDetailData | null> {
  const strId = String(eventId);
  const localMockEvents = getMockEvents();
  const localMockTickets = getMockTickets();
  const allLocalTickets = Object.values(localMockTickets).flat();

  try {
    const [eventRes, ticketTypesRes, orgTicketsRes] = await Promise.allSettled([
      apiClient.get<DbEvent>(`/events/${strId}`),
      apiClient.get<DbTicketType[]>(`/ticket_types`),
      apiClient.get<DbOrganizerTicket[]>(`/organizer_tickets?eventId=${strId}`),
    ]);

    let eventRow: DbEvent | null = null;
    if (eventRes.status === "fulfilled" && eventRes.value.data) {
      eventRow = eventRes.value.data;
    } else {
      // Intentar buscar en lista completa de events
      const allEvents = await apiClient.get<DbEvent[]>("/events").catch(() => null);
      if (allEvents?.data) {
        eventRow =
          allEvents.data.find(
            (e) => String(e.id) === strId || String(e.id_event) === strId
          ) ?? null;
      }
    }

    if (!eventRow) {
      const foundInLocal = localMockEvents.find((e) => String(e.id) === strId);
      if (foundInLocal) {
        eventRow = foundInLocal as any;
      } else {
        return getEventDetail(eventId);
      }
    }

    const rawTicketTypes =
      ticketTypesRes.status === "fulfilled" ? ticketTypesRes.value.data : DB_TICKET_TYPES;

    // Unir tickets obtenidos de la API con los guardados en localStorage y db.json
    const apiOrgTickets =
      orgTicketsRes.status === "fulfilled" && Array.isArray(orgTicketsRes.value.data)
        ? orgTicketsRes.value.data
        : [];

    const ticketsMap = new Map<string, any>();
    DB_ORGANIZER_TICKETS.forEach((t) => ticketsMap.set(String(t.id), t));
    apiOrgTickets.forEach((t) => ticketsMap.set(String(t.id), t));
    allLocalTickets.forEach((t) => ticketsMap.set(String(t.id), t));
    const mergedOrgTickets = Array.from(ticketsMap.values());

    return buildEventDetail(eventRow!, rawTicketTypes, mergedOrgTickets);
  } catch (err) {
    console.warn("Fallo al obtener detalle del evento de la API, usando respaldo:", err);
    return getEventDetail(eventId);
  }
}

/** Tope antirreventa por orden de compra. */
export const MAX_TICKETS = 10;

/** Formato moneda peruana (ej. "S/ 320.00"). */
export function formatPEN(value: number): string {
  return `S/ ${value.toFixed(2)}`;
}
