import type { CatalogEvent, Category } from "../types/event.types";
import apiClient from "../../../shared/services/api";
import { getMockEvents, getMockTickets } from "../../organizer/services/organizerMock";
// Fuente temporal: luego se reemplaza por el backend real.
import db from "../../../../db.json";

/** Fila de `categories` en db.json (ver diagrama ER). */
interface DbCategory {
  id_category: string;
  name: string;
  description: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

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
}

interface DbShape {
  categories?: DbCategory[];
  events?: DbEvent[];
  ticket_types?: DbTicketType[];
  organizer_tickets?: DbOrganizerTicket[];
}

const dbData = db as DbShape;
const DB_CATEGORIES = dbData.categories ?? [];
const DB_EVENTS = dbData.events ?? [];
const DB_TICKET_TYPES = dbData.ticket_types ?? [];
const DB_ORGANIZER_TICKETS = dbData.organizer_tickets ?? [];

/** Mes abreviado para la insignia de fecha (ej. "NOV"). */
const MONTH_CODES = [
  "ENE", "FEB", "MAR", "ABR", "MAY", "JUN",
  "JUL", "AGO", "SET", "OCT", "NOV", "DIC",
];

/** Etiqueta corta de tarjeta por categoría. */
const TAG_BY_CATEGORY: Record<string, string> = {
  Conciertos: "Concierto",
  Festivales: "Festival",
  "Teatro & Artes": "Teatro",
  "Gastronomía & Ferias": "Gastronomía",
  "Tecnología & Startups": "Tecnología",
  "Festivales & Open Air": "Festival",
  "Música & Conciertos": "Concierto",
};

/** Insignia según aforo vendido (derivado, sin texto fijo por evento). */
function badgeFor(soldPct: number): string | undefined {
  if (soldPct >= 90) return "¡Casi Agotado!";
  if (soldPct >= 80) return "Últimas entradas";
  return undefined;
}

/**
 * Normaliza y mapea una fila de evento y sus tipos de entrada al modelo del catálogo
 */
export function mapEventItem(
  row: DbEvent,
  categoriesList: DbCategory[] = DB_CATEGORIES,
  ticketTypesList: DbTicketType[] = DB_TICKET_TYPES,
  orgTicketsList: DbOrganizerTicket[] = DB_ORGANIZER_TICKETS
): CatalogEvent {
  const eventId = row.id ?? row.id_event ?? 0;
  const date = new Date(`${row.date}T00:00:00`);
  const safeDate = !isNaN(date.getTime()) ? date : new Date();

  // Buscar tickets asociados tanto en ticket_types como en organizer_tickets
  const legacyTickets = ticketTypesList.filter(
    (ticket) => String(ticket.id_event) === String(eventId) || (row.id_event && String(ticket.id_event) === String(row.id_event))
  );
  const orgTickets = orgTicketsList.filter(
    (ticket) => String(ticket.eventId) === String(eventId) || (row.id && String(ticket.eventId) === String(row.id))
  );

  const prices: number[] = [
    ...legacyTickets.map((t) => t.price),
    ...orgTickets.map((t) => t.pricePEN ?? t.price ?? 0),
  ].filter((p) => p > 0);

  // Categoría
  let categoryName: Category = "Conciertos";
  if (row.id_category) {
    const found = categoriesList.find((item) => item.id_category === row.id_category);
    if (found) categoryName = found.name as Category;
  } else if (row.category) {
    if (row.category.includes("Festiv")) categoryName = "Festivales";
    else if (row.category.includes("Teatro")) categoryName = "Teatro & Artes";
    else if (row.category.includes("Tecno") || row.category.includes("Startup")) categoryName = "Tecnología & Startups";
    else if (row.category.includes("Gastro") || row.category.includes("Feria")) categoryName = "Gastronomía & Ferias";
    else categoryName = "Conciertos";
  }

  const capacity = row.capacity ?? 1000;
  const available = row.available_capacity ?? capacity;
  const soldPct =
    capacity > 0 ? Math.round(((capacity - available) / capacity) * 100) : 0;

  const image =
    row.bannerUrl ||
    row.image ||
    "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80";

  const venue = row.venue || row.location || "Lugar por confirmar";
  const city = row.city || "Lima";

  return {
    id: eventId,
    title: row.title,
    category: categoryName,
    month: MONTH_CODES[safeDate.getMonth()] ?? "ENE",
    day: String(safeDate.getDate()).padStart(2, "0"),
    dateOrder: safeDate.getTime(),
    venue,
    city,
    price: prices.length > 0 ? Math.min(...prices) : 50,
    soldPct,
    image,
    tag: TAG_BY_CATEGORY[row.category ?? categoryName] ?? categoryName,
    badge: badgeFor(soldPct),
  };
}

/** Eventos leídos desde db.json (fuente inicial). */
export const EVENTS: CatalogEvent[] = DB_EVENTS.filter(
  (row) => row.active !== false && row.status !== "draft" && row.status !== "inactive"
).map((row) => mapEventItem(row, DB_CATEGORIES, DB_TICKET_TYPES, DB_ORGANIZER_TICKETS));

/**
 * Consulta dinámica a la API para obtener eventos y sus tarifas actualizadas
 */
export async function fetchCatalogEvents(): Promise<CatalogEvent[]> {
  const localMockEvents = getMockEvents();
  const localMockTickets = getMockTickets();
  const allLocalOrgTickets = Object.values(localMockTickets).flat();

  try {
    const [eventsRes, ticketTypesRes, orgTicketsRes] = await Promise.allSettled([
      apiClient.get<DbEvent[]>("/events"),
      apiClient.get<DbTicketType[]>("/ticket_types"),
      apiClient.get<DbOrganizerTicket[]>("/organizer_tickets"),
    ]);

    const apiEvents =
      eventsRes.status === "fulfilled" && Array.isArray(eventsRes.value.data) && eventsRes.value.data.length > 0
        ? eventsRes.value.data
        : DB_EVENTS;

    // Agregar eventos adicionales creados por el organizador en sesión
    const baseEventIds = new Set(apiEvents.map((e: any) => String(e.id || e.id_event)));
    const customLocalEvents = (localMockEvents as any).filter(
      (e: any) => !baseEventIds.has(String(e.id))
    );
    const mergedEvents = [...apiEvents, ...customLocalEvents];

    const rawTicketTypes =
      ticketTypesRes.status === "fulfilled" && Array.isArray(ticketTypesRes.value.data) && ticketTypesRes.value.data.length > 0
        ? ticketTypesRes.value.data
        : DB_TICKET_TYPES;

    const rawOrgTickets =
      orgTicketsRes.status === "fulfilled" && Array.isArray(orgTicketsRes.value.data) && orgTicketsRes.value.data.length > 0
        ? orgTicketsRes.value.data
        : (allLocalOrgTickets.length > 0 ? (allLocalOrgTickets as any) : DB_ORGANIZER_TICKETS);

    return mergedEvents
      .filter((row: any) => row.active !== false && row.status !== "draft" && row.status !== "inactive")
      .map((row: any) => mapEventItem(row, DB_CATEGORIES, rawTicketTypes, rawOrgTickets));
  } catch (err) {
    console.warn("No se pudo obtener eventos en vivo, usando eventos persistidos locales:", err);
    const baseEventIds = new Set(DB_EVENTS.map((e: any) => String(e.id || e.id_event)));
    const customLocalEvents = (localMockEvents as any).filter(
      (e: any) => !baseEventIds.has(String(e.id))
    );
    const mergedEvents = [...DB_EVENTS, ...customLocalEvents];

    return mergedEvents
      .filter((row: any) => row.active !== false && row.status !== "draft" && row.status !== "inactive")
      .map((row: any) =>
        mapEventItem(
          row,
          DB_CATEGORIES,
          DB_TICKET_TYPES,
          allLocalOrgTickets.length > 0 ? (allLocalOrgTickets as any) : DB_ORGANIZER_TICKETS
        )
      );
  }
}

/** Porcentaje de descuento de la promo (aplica solo a elegibles). */
export const PROMO_DISCOUNT_PCT = 15;

/**
 * Normaliza un nombre para compararlo: minúsculas, sin tildes ni espacios
 * sobrantes ("Gerónimo" y "geronimo" coinciden).
 */
function normalizeName(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

/**
 * Regla de negocio 1: la promo aplica a todo usuario cuyo primer nombre
 * sea Roberto o Gerónimo.
 */
export function isPromoUser(userName: string): boolean {
  const firstName = normalizeName(userName).split(/\s+/)[0] ?? "";
  return firstName === "roberto" || firstName === "geronimo";
}

/** Precio final con la promo aplicada. */
export function getPromoPrice(price: number): number {
  return price * (1 - PROMO_DISCOUNT_PCT / 100);
}

/** Orden fijo de categorías en los filtros. */
export const CATEGORY_ORDER: Category[] = [
  "Conciertos",
  "Festivales",
  "Teatro & Artes",
  "Tecnología & Startups",
  "Gastronomía & Ferias",
];

/** Rango de precio del filtro (montos en soles). */
export interface PriceRange {
  id: string;
  label: string;
  min: number;
  max: number;
}

/** Rangos de precio del filtro (montos en soles). */
export const PRICE_RANGES: PriceRange[] = [
  { id: "ALL", label: "Todos", min: 0, max: Number.POSITIVE_INFINITY },
  { id: "UNDER_60", label: "Menos de S/ 60", min: 0, max: 60 },
  { id: "BETWEEN_60_120", label: "S/ 60 – S/ 120", min: 60, max: 121 },
  { id: "BETWEEN_120_200", label: "S/ 120 – S/ 200", min: 120, max: 201 },
  { id: "OVER_200", label: "Más de S/ 200", min: 200, max: Number.POSITIVE_INFINITY },
];

/** Meses presentes en el catálogo (código → etiqueta). */
export const MONTH_LABELS: Record<string, string> = {
  ENE: "Enero",
  NOV: "Noviembre",
  DIC: "Diciembre",
};

/** Formato moneda peruana (ej. "S/ 120.00"). */
export function formatPrice(value: number): string {
  return `S/ ${value.toFixed(2)}`;
}
