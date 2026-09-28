import type {
  OrganizerEvent,
  DailySalesDataPoint,
  TicketType,
} from "../types/organizer.types";
import db from "../../../../db.json";

export const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA !== "false";

const EVENTS_STORAGE_KEY = "eventia_organizer_events";
const TICKETS_STORAGE_KEY = "eventia_organizer_tickets";

// Inicializar eventos semilla directamente desde db.json
const rawDbEvents: any[] = (db as any).events || [];
export const INITIAL_EVENTS: OrganizerEvent[] = rawDbEvents.map((e: any) => ({
  id: String(e.id || e.id_event),
  code: e.code || `EVT-${e.id || e.id_event}`,
  title: e.title,
  category: e.category || "Música & Conciertos",
  venue: e.venue || e.location || "Lima",
  city: e.city || "Lima",
  date: e.date,
  time: e.time || e.start_time || "20:00",
  bannerUrl:
    e.bannerUrl ||
    e.image ||
    "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80",
  status: (e.status as any) || "published",
  active: e.active ?? true,
  capacity: e.capacity || 5000,
  ticketsSold: e.ticketsSold || 0,
  totalRevenue: e.totalRevenue || 0,
  featured: e.featured ?? false,
  id_organizer: e.id_organizer,
  organizerId: e.organizerId || e.id_organizer,
}));

export const MOCK_DAILY_SALES: DailySalesDataPoint[] = (db as any).dailySales || [
  { day: "Lun", date: "20 Sep", totalPEN: 180000, ticketsSold: 890 },
  { day: "Mar", date: "21 Sep", totalPEN: 243000, ticketsSold: 1120 },
  { day: "Mié", date: "22 Sep", totalPEN: 337000, ticketsSold: 1540 },
  { day: "Jue", date: "23 Sep", totalPEN: 432000, ticketsSold: 1980 },
  { day: "Vie", date: "24 Sep", totalPEN: 725000, ticketsSold: 3210 },
  { day: "Sáb", date: "25 Sep", totalPEN: 878000, ticketsSold: 3890 },
  { day: "Dom", date: "26 Sep", totalPEN: 590000, ticketsSold: 2650 },
];

// Agrupar tickets iniciales por eventId desde db.json
const rawDbTickets: any[] = (db as any).organizer_tickets || [];
const initialTicketsMap: Record<string, TicketType[]> = {};
for (const t of rawDbTickets) {
  const evtId = String(t.eventId);
  if (!initialTicketsMap[evtId]) {
    initialTicketsMap[evtId] = [];
  }
  initialTicketsMap[evtId].push({
    id: String(t.id),
    eventId: evtId,
    name: t.name,
    zone: t.zone || t.name,
    pricePEN: t.pricePEN ?? t.price ?? 100,
    capacity: t.capacity || 1000,
    soldCount: t.soldCount || 0,
    status: t.status || "active",
    saleStartDate: t.saleStartDate || "2025-08-01",
    saleEndDate: t.saleEndDate || "2025-11-15",
    isPresale: t.isPresale ?? false,
    maxPerPurchase: t.maxPerPurchase || 4,
  });
}

export const INITIAL_TICKETS: Record<string, TicketType[]> = initialTicketsMap;

export function getMockEvents(): OrganizerEvent[] {
  if (typeof window === "undefined") return [...INITIAL_EVENTS];
  try {
    const stored = localStorage.getItem(EVENTS_STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(INITIAL_EVENTS));
      return [...INITIAL_EVENTS];
    }
    return JSON.parse(stored);
  } catch {
    return [...INITIAL_EVENTS];
  }
}

export function saveMockEvents(events: OrganizerEvent[]): void {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(events));
    } catch (e) {
      console.warn("Error saving mock events to localStorage:", e);
    }
  }
}

export function getMockTickets(): Record<string, TicketType[]> {
  if (typeof window === "undefined") return { ...INITIAL_TICKETS };
  try {
    const stored = localStorage.getItem(TICKETS_STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(TICKETS_STORAGE_KEY, JSON.stringify(INITIAL_TICKETS));
      return { ...INITIAL_TICKETS };
    }
    return JSON.parse(stored);
  } catch {
    return { ...INITIAL_TICKETS };
  }
}

export function saveMockTickets(tickets: Record<string, TicketType[]>): void {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(TICKETS_STORAGE_KEY, JSON.stringify(tickets));
    } catch (e) {
      console.warn("Error saving mock tickets to localStorage:", e);
    }
  }
}

export const MOCK_EVENTS = getMockEvents();
export const MOCK_TICKETS = getMockTickets();

