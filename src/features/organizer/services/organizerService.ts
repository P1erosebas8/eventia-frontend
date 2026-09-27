import apiClient from "../../../services/api";
import type {
  OrganizerDashboardData,
  OrganizerEvent,
  DailySalesDataPoint,
  AuditLogEntry,
  TicketType,
} from "../types/organizer.types";

/**
 * Flag para alternar entre datos simulados y backend real con Axios.
 * Puede sobreescribirse mediante la variable de entorno VITE_USE_MOCK_DATA=false.
 */
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA !== "false";

const MOCK_TICKETS: Record<string, TicketType[]> = {
  "EVT-2025-LIM-9812": [
    {
      id: "TCK-9812-01",
      eventId: "EVT-2025-LIM-9812",
      name: "Campo VIP Platinum",
      zone: "VIP Platinum",
      pricePEN: 420,
      capacity: 4000,
      soldCount: 3850,
      status: "active",
      saleStartDate: "2025-08-01",
      saleEndDate: "2025-11-15",
      isPresale: false,
      maxPerPurchase: 4,
    },
    {
      id: "TCK-9812-02",
      eventId: "EVT-2025-LIM-9812",
      name: "Campo General - Fase 2",
      zone: "General",
      pricePEN: 220,
      capacity: 7000,
      soldCount: 6200,
      status: "active",
      saleStartDate: "2025-08-15",
      saleEndDate: "2025-11-15",
      isPresale: false,
      maxPerPurchase: 6,
    },
    {
      id: "TCK-9812-03",
      eventId: "EVT-2025-LIM-9812",
      name: "Tribuna Occidente Numerada",
      zone: "Tribuna",
      pricePEN: 290,
      capacity: 2000,
      soldCount: 1450,
      status: "active",
      saleStartDate: "2025-08-01",
      saleEndDate: "2025-11-15",
      isPresale: false,
      maxPerPurchase: 4,
    },
    {
      id: "TCK-9812-04",
      eventId: "EVT-2025-LIM-9812",
      name: "Tribuna Oriente",
      zone: "Tribuna",
      pricePEN: 290,
      capacity: 2000,
      soldCount: 1100,
      status: "active",
      saleStartDate: "2025-08-01",
      saleEndDate: "2025-11-15",
      isPresale: false,
      maxPerPurchase: 4,
    },
    {
      id: "TCK-9812-05",
      eventId: "EVT-2025-LIM-9812",
      name: "Early Bird - Preventa BBVA",
      zone: "General",
      pricePEN: 175,
      capacity: 1000,
      soldCount: 1000,
      status: "sold_out",
      saleStartDate: "2025-07-15",
      saleEndDate: "2025-07-31",
      isPresale: true,
      maxPerPurchase: 2,
    },
  ],
};

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
    active: false,
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
  /**
   * Obtiene la data consolidada del dashboard
   */
  async getDashboardData(): Promise<OrganizerDashboardData> {
    if (USE_MOCK_DATA) {
      await new Promise((r) => setTimeout(r, 120));

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

    const response = await apiClient.get<OrganizerDashboardData>("/organizer/dashboard");
    return response.data;
  },

  /**
   * Obtiene la lista completa de eventos del organizador
   */
  async getEvents(): Promise<OrganizerEvent[]> {
    if (USE_MOCK_DATA) {
      await new Promise((r) => setTimeout(r, 80));
      return [...MOCK_EVENTS];
    }

    const response = await apiClient.get<OrganizerEvent[]>("/organizer/events");
    return response.data;
  },

  /**
   * Obtiene el detalle de un evento por su ID
   */
  async getEventById(id: string): Promise<OrganizerEvent | null> {
    if (USE_MOCK_DATA) {
      await new Promise((r) => setTimeout(r, 60));
      const event = MOCK_EVENTS.find((e) => e.id === id);
      return event ? { ...event } : null;
    }

    const response = await apiClient.get<OrganizerEvent>(`/organizer/events/${id}`);
    return response.data;
  },

  /**
   * Cambia el estado publicado/oculto de un evento
   */
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

    const response = await apiClient.patch<OrganizerEvent>(`/organizer/events/${id}/status`, {
      status: newStatus,
    });
    return response.data;
  },

  /**
   * Inactiva un evento (soft delete)
   */
  async deactivateEvent(id: string, reason: string): Promise<OrganizerEvent> {
    if (USE_MOCK_DATA) {
      await new Promise((r) => setTimeout(r, 120));
      const index = MOCK_EVENTS.findIndex((e) => e.id === id);
      if (index !== -1) {
        MOCK_EVENTS[index].active = false;
        MOCK_EVENTS[index].status = "inactive";
        console.log(`[Soft Delete] Evento ${id} desactivado. Motivo: ${reason}`);
        return { ...MOCK_EVENTS[index] };
      }
      throw new Error("Evento no encontrado");
    }

    const response = await apiClient.patch<OrganizerEvent>(`/organizer/events/${id}/deactivate`, {
      reason,
    });
    return response.data;
  },

  /**
   * Actualiza los datos de un evento
   */
  async updateEvent(id: string, data: Partial<OrganizerEvent>): Promise<OrganizerEvent> {
    if (USE_MOCK_DATA) {
      await new Promise((r) => setTimeout(r, 150));
      const index = MOCK_EVENTS.findIndex((e) => e.id === id);
      if (index !== -1) {
        MOCK_EVENTS[index] = { ...MOCK_EVENTS[index], ...data };
        return { ...MOCK_EVENTS[index] };
      }
      throw new Error("Evento no encontrado");
    }

    const response = await apiClient.put<OrganizerEvent>(`/organizer/events/${id}`, data);
    return response.data;
  },

  /**
   * Crea un nuevo evento
   */
  async createEvent(data: {
    title: string;
    category?: string;
    venue?: string;
    city?: string;
    date?: string;
    time?: string;
    bannerUrl?: string;
    status?: OrganizerEvent["status"];
    active?: boolean;
    capacity?: number;
    featured?: boolean;
    description?: string;
  }): Promise<OrganizerEvent> {
    if (USE_MOCK_DATA) {
      await new Promise((r) => setTimeout(r, 180));
      const year = new Date().getFullYear();
      const randomCodeNum = Math.floor(1000 + Math.random() * 9000);
      const newEvent: OrganizerEvent = {
        id: `EVT-${year}-LIM-${randomCodeNum}`,
        code: `EVT-${randomCodeNum}`,
        title: data.title || "Nuevo Evento",
        category: data.category || "Música & Conciertos",
        venue: data.venue || "Arena 1 Costa Verde, San Miguel",
        city: data.city || "Lima",
        date: data.date || new Date().toISOString().split("T")[0],
        time: data.time || "20:00",
        bannerUrl:
          data.bannerUrl ||
          "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80",
        status: data.status || "published",
        active: data.active ?? true,
        capacity: data.capacity || 5000,
        ticketsSold: 0,
        totalRevenue: 0,
        featured: data.featured ?? false,
      };
      MOCK_EVENTS.unshift(newEvent);
      return newEvent;
    }

    const response = await apiClient.post<OrganizerEvent>("/organizer/events", data);
    return response.data;
  },

  /**
   * Obtiene el log de auditoría
   */
  async getAuditLog(eventId: string): Promise<AuditLogEntry[]> {
    if (USE_MOCK_DATA) {
      await new Promise((r) => setTimeout(r, 80));
      return [];
    }

    const response = await apiClient.get<AuditLogEntry[]>(`/organizer/events/${eventId}/audit-log`);
    return response.data;
  },

  /**
   * Obtiene la lista de tipos de ticket/tarifas configuradas para un evento
   */
  async getTicketsByEvent(eventId: string): Promise<TicketType[]> {
    if (USE_MOCK_DATA) {
      await new Promise((r) => setTimeout(r, 90));
      return MOCK_TICKETS[eventId] ? [...MOCK_TICKETS[eventId]] : [];
    }

    const response = await apiClient.get<TicketType[]>(`/organizer/events/${eventId}/tickets`);
    return response.data;
  },

  /**
   * Crea un nuevo tipo de ticket / tarifa para un evento
   */
  async createTicketType(ticketData: Omit<TicketType, "id" | "soldCount"> & { id?: string }): Promise<TicketType> {
    if (USE_MOCK_DATA) {
      await new Promise((r) => setTimeout(r, 120));
      const randomId = `TCK-${Math.floor(1000 + Math.random() * 9000)}`;
      const newTicket: TicketType = {
        ...ticketData,
        id: ticketData.id || randomId,
        soldCount: 0,
        status: ticketData.status || "active",
      };

      if (!MOCK_TICKETS[ticketData.eventId]) {
        MOCK_TICKETS[ticketData.eventId] = [];
      }
      MOCK_TICKETS[ticketData.eventId].push(newTicket);
      return newTicket;
    }

    const response = await apiClient.post<TicketType>(`/organizer/events/${ticketData.eventId}/tickets`, ticketData);
    return response.data;
  },

  /**
   * Actualiza una tarifa/tipo de ticket existente
   */
  async updateTicketType(eventId: string, ticketId: string, ticketData: Partial<TicketType>): Promise<TicketType> {
    if (USE_MOCK_DATA) {
      await new Promise((r) => setTimeout(r, 120));
      const list = MOCK_TICKETS[eventId] || [];
      const index = list.findIndex((t) => t.id === ticketId);
      if (index !== -1) {
        list[index] = { ...list[index], ...ticketData };
        return { ...list[index] };
      }
      throw new Error("Tarifa no encontrada");
    }

    const response = await apiClient.put<TicketType>(`/organizer/events/${eventId}/tickets/${ticketId}`, ticketData);
    return response.data;
  },

  /**
   * Cambia el estado de venta de una tarifa (activo, pausado, agotado)
   */
  async toggleTicketStatus(eventId: string, ticketId: string, newStatus: TicketType["status"]): Promise<TicketType> {
    if (USE_MOCK_DATA) {
      await new Promise((r) => setTimeout(r, 100));
      const list = MOCK_TICKETS[eventId] || [];
      const index = list.findIndex((t) => t.id === ticketId);
      if (index !== -1) {
        list[index].status = newStatus;
        return { ...list[index] };
      }
      throw new Error("Tarifa no encontrada");
    }

    const response = await apiClient.patch<TicketType>(`/organizer/events/${eventId}/tickets/${ticketId}/status`, {
      status: newStatus,
    });
    return response.data;
  },

  /**
   * Elimina un tipo de ticket si no tiene ventas registradas
   */
  async deleteTicketType(eventId: string, ticketId: string): Promise<boolean> {
    if (USE_MOCK_DATA) {
      await new Promise((r) => setTimeout(r, 100));
      if (MOCK_TICKETS[eventId]) {
        MOCK_TICKETS[eventId] = MOCK_TICKETS[eventId].filter((t) => t.id !== ticketId);
      }
      return true;
    }

    await apiClient.delete(`/organizer/events/${eventId}/tickets/${ticketId}`);
    return true;
  },
};


