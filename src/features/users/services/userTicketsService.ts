import api from "../../../shared/services/api";
import type { UserTicket } from "../../checkout/services/checkoutService";

export const userTicketsService = {
  /**
   * Obtiene la lista de tickets emitidos para el usuario
   */
  async getUserTickets(userId?: number | string): Promise<UserTicket[]> {
    try {
      const url = userId ? `/tickets?id_user=${userId}` : "/tickets";
      const response = await api.get<UserTicket[]>(url);
      if (Array.isArray(response.data) && response.data.length > 0) {
        return response.data;
      }
    } catch (err) {
      console.warn("API json-server offline o sin respuesta, cargando desde almacenamiento local:", err);
    }

    // Fallback de almacenamiento local
    try {
      const stored = localStorage.getItem("eventia_tickets");
      if (stored) {
        const list: UserTicket[] = JSON.parse(stored);
        if (userId) {
          return list.filter((t) => String(t.id_user) === String(userId));
        }
        return list;
      }
    } catch {
      // Ignorar
    }

    return [
      {
        id: "tck-5001",
        id_order: "ord-1001",
        id_user: 1,
        event_title: "Festival Rock Lima 2026",
        ticket_type: "General",
        event_date: "2026-10-15T20:00:00Z",
        venue: "Estadio Nacional",
        qr_code: "EVT-ORD1001-TCK5001-SECURE",
        status: "VIGENTE",
      },
      {
        id: "tck-5002",
        id_order: "ord-1001",
        id_user: 1,
        event_title: "Festival Rock Lima 2026",
        ticket_type: "General",
        event_date: "2026-10-15T20:00:00Z",
        venue: "Estadio Nacional",
        qr_code: "EVT-ORD1001-TCK5002-SECURE",
        status: "ANULADO",
      },
    ];
  },
};
