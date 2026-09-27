import type {
  OrganizerDashboardData,
  OrganizerEvent,
  DailySalesDataPoint,
} from "../types/organizer.types";

const USE_MOCK_DATA = true;

const MOCK_EVENTS: OrganizerEvent[] = [
  {
    id: "EVT-2025-LIM-9812",
    code: "EVT-9812",
    title: "Lima Live Sessions 2025",
    category: "Conciertos",
    venue: "Arena 1 Costa Verde",
    city: "Lima",
    date: "2025-11-15",
    time: "20:00",
    bannerUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80",
    status: "published",
    active: true,
    capacity: 15000,
    ticketsSold: 12600,
    totalRevenue: 3420000,
    featured: true,
  },
  {
    id: "EVT-2025-AQP-4410",
    code: "EVT-4410",
    title: "Festival Gastronómico Sabores del Sur",
    category: "Festivales",
    venue: "Jardín de la Cerveza",
    city: "Arequipa",
    date: "2025-10-28",
    time: "12:00",
    bannerUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=80",
    status: "almost_sold_out",
    active: true,
    capacity: 8000,
    ticketsSold: 7420,
    totalRevenue: 890400,
    featured: false,
  },
  {
    id: "EVT-2025-CUS-1022",
    code: "EVT-1022",
    title: "Cusco Electro Andino Fest",
    category: "Música Electrónica",
    venue: "Valle Sagrado Soundpark",
    city: "Cusco",
    date: "2025-12-05",
    time: "18:00",
    bannerUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&auto=format&fit=crop&q=80",
    status: "published",
    active: true,
    capacity: 5000,
    ticketsSold: 3100,
    totalRevenue: 620000,
    featured: false,
  },
  {
    id: "EVT-2025-LIM-3321",
    code: "EVT-3321",
    title: "Conferencia Internacional Tech Horizons Perú",
    category: "Conferencias & Tech",
    venue: "Centro de Convenciones de Lima",
    city: "Lima",
    date: "2025-09-30",
    time: "09:00",
    bannerUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&auto=format&fit=crop&q=80",
    status: "sold_out",
    active: true,
    capacity: 2500,
    ticketsSold: 2500,
    totalRevenue: 1250000,
    featured: false,
  },
  {
    id: "EVT-2025-TRU-7729",
    code: "EVT-7729",
    title: "Noche de Gala Marinera Trujillana",
    category: "Cultura & Danza",
    venue: "Coliseo Gran Chimú",
    city: "Trujillo",
    date: "2025-11-20",
    time: "19:30",
    bannerUrl: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&auto=format&fit=crop&q=80",
    status: "draft",
    active: true,
    capacity: 4000,
    ticketsSold: 0,
    totalRevenue: 0,
    featured: false,
  },
  {
    id: "EVT-2025-LIM-0091",
    code: "EVT-0091",
    title: "Expo Comic & Anime Fest",
    category: "Convenciones",
    venue: "Parque de la Exposición",
    city: "Lima",
    date: "2025-08-10",
    time: "10:00",
    bannerUrl: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80",
    status: "inactive",
    active: false, // RN04 Soft delete
    capacity: 6000,
    ticketsSold: 1200,
    totalRevenue: 96000,
    featured: false,
  },
];

const MOCK_DAILY_SALES: DailySalesDataPoint[] = [
  { day: "Lun", date: "20 Sep", totalPEN: 180000, ticketsSold: 890 },
  { day: "Mar", date: "21 Sep", totalPEN: 243000, ticketsSold: 1120 },
  { day: "Mié", date: "22 Sep", totalPEN: 337000, ticketsSold: 1540 },
  { day: "Jue", date: "23 Sep", totalPEN: 432000, ticketsSold: 1980 },
  { day: "Vie", date: "24 Sep", totalPEN: 725000, ticketsSold: 3210 },
  { day: "Sáb", date: "25 Sep", totalPEN: 878000, ticketsSold: 3890 },
  { day: "Dom", date: "26 Sep", totalPEN: 590000, ticketsSold: 2650 },
];

export const organizerService = {
  async getDashboardData(): Promise<OrganizerDashboardData> {
    if (USE_MOCK_DATA) {
      await new Promise((r) => setTimeout(r, 120));

      // Solo eventos activos y publicados entran en el aforo real
      const activeEventsList = MOCK_EVENTS.filter((e) => e.active && e.status !== "draft");
      const totalTicketsSold = activeEventsList.reduce((acc, e) => acc + e.ticketsSold, 0);
      const totalCapacity = activeEventsList.reduce((acc, e) => acc + e.capacity, 0);
      const totalRevenuePEN = activeEventsList.reduce((acc, e) => acc + e.totalRevenue, 0);
      const occupancyRate = totalCapacity > 0 ? Math.round((totalTicketsSold / totalCapacity) * 100) : 0;

      return {
        kpis: {
          activeEvents: activeEventsList.length,
          activeEventsChange: 14.3,
          ticketsSold: totalTicketsSold,
          ticketsSoldChange: 22.8,
          totalRevenuePEN,
          totalRevenueChange: 18.5,
          occupancyRate,
          occupancyRateChange: 6.2,
        },
        dailySales: MOCK_DAILY_SALES,
        zoneDistribution: [
          { zoneName: "Campo VIP Platinum", soldCount: 3850, totalCapacity: 4000, percentage: 96, color: "#3525cd" },
          { zoneName: "Campo General", soldCount: 6200, totalCapacity: 7000, percentage: 88, color: "#571ac0" },
          { zoneName: "Tribuna Oriente / Occidente", soldCount: 2550, totalCapacity: 4000, percentage: 63, color: "#4f46e5" },
        ],
        recentEvents: MOCK_EVENTS,
        activeShift: {
          venue: "Arena 1 Costa Verde",
          gateSystemStatus: "online",
          generalCapacityWarning: "Capacidad general al 84%",
        },
      };
    }

    throw new Error("API mode not configured yet");
  },

  async getEvents(): Promise<OrganizerEvent[]> {
    if (USE_MOCK_DATA) {
      await new Promise((r) => setTimeout(r, 80));
      return [...MOCK_EVENTS];
    }
    throw new Error("API mode not configured yet");
  },

  async getEventById(id: string): Promise<OrganizerEvent | null> {
    if (USE_MOCK_DATA) {
      await new Promise((r) => setTimeout(r, 60));
      const event = MOCK_EVENTS.find((e) => e.id === id);
      return event ? { ...event } : null;
    }
    throw new Error("API mode not configured yet");
  },

  async toggleEventStatus(id: string, newStatus: OrganizerEvent["status"]): Promise<OrganizerEvent> {
    if (USE_MOCK_DATA) {
      await new Promise((r) => setTimeout(r, 100));
      const index = MOCK_EVENTS.findIndex((e) => e.id === id);
      if (index !== -1) {
        MOCK_EVENTS[index].status = newStatus;
        return { ...MOCK_EVENTS[index] };
      }
      throw new Error("Evento no encontrado");
    }
    throw new Error("API mode not configured yet");
  },

  async deactivateEvent(id: string, reason: string): Promise<OrganizerEvent> {
    if (USE_MOCK_DATA) {
      await new Promise((r) => setTimeout(r, 120));
      const index = MOCK_EVENTS.findIndex((e) => e.id === id);
      if (index !== -1) {
        MOCK_EVENTS[index].active = false;
        MOCK_EVENTS[index].status = "inactive";
        console.log(`[RN04 Soft Delete] Evento ${id} desactivado. Motivo: ${reason}`);
        return { ...MOCK_EVENTS[index] };
      }
      throw new Error("Evento no encontrado");
    }
    throw new Error("API mode not configured yet");
  },
};
