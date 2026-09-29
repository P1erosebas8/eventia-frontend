import apiClient from "../../../shared/services/api";
import type { TicketType } from "../types/organizer.types";
import { USE_MOCK_DATA, getMockTickets, saveMockTickets } from "./organizerMock";

export const ticketsService = {
  /**
   * Obtiene la lista de tipos de ticket/tarifas configuradas para un evento
   */
  async getTicketsByEvent(eventId: string): Promise<TicketType[]> {
    if (USE_MOCK_DATA) {
      await new Promise((r) => setTimeout(r, 90));
      const ticketsMap = getMockTickets();
      return ticketsMap[eventId] ? [...ticketsMap[eventId]] : [];
    }

    try {
      const response = await apiClient.get<TicketType[]>(`/organizer_tickets?eventId=${eventId}`);
      return response.data;
    } catch (err) {
      console.warn("API offline, cargando tarifas persistidas locales:", err);
      const ticketsMap = getMockTickets();
      return ticketsMap[eventId] ? [...ticketsMap[eventId]] : [];
    }
  },

  /**
   * Crea un nuevo tipo de ticket / tarifa para un evento
   */
  async createTicketType(
    ticketData: Omit<TicketType, "id" | "soldCount"> & { id?: string }
  ): Promise<TicketType> {
    const randomId = `TCK-${Math.floor(1000 + Math.random() * 9000)}`;
    const newTicket: TicketType = {
      ...ticketData,
      id: ticketData.id || randomId,
      soldCount: 0,
      status: ticketData.status || "active",
    };

    if (USE_MOCK_DATA) {
      await new Promise((r) => setTimeout(r, 120));
      const ticketsMap = getMockTickets();
      if (!ticketsMap[ticketData.eventId]) {
        ticketsMap[ticketData.eventId] = [];
      }
      ticketsMap[ticketData.eventId].push(newTicket);
      saveMockTickets(ticketsMap);
      return newTicket;
    }

    try {
      const response = await apiClient.post<TicketType>("/organizer_tickets", newTicket);
      const ticketsMap = getMockTickets();
      if (!ticketsMap[ticketData.eventId]) {
        ticketsMap[ticketData.eventId] = [];
      }
      ticketsMap[ticketData.eventId].push(response.data);
      saveMockTickets(ticketsMap);
      return response.data;
    } catch {
      const ticketsMap = getMockTickets();
      if (!ticketsMap[ticketData.eventId]) {
        ticketsMap[ticketData.eventId] = [];
      }
      ticketsMap[ticketData.eventId].push(newTicket);
      saveMockTickets(ticketsMap);
      return newTicket;
    }
  },

  /**
   * Actualiza una tarifa/tipo de ticket existente
   */
  async updateTicketType(
    eventId: string,
    ticketId: string,
    ticketData: Partial<TicketType>
  ): Promise<TicketType> {
    if (USE_MOCK_DATA) {
      await new Promise((r) => setTimeout(r, 120));
      const ticketsMap = getMockTickets();
      const list = ticketsMap[eventId] || [];
      const index = list.findIndex((t) => t.id === ticketId);
      if (index !== -1) {
        list[index] = { ...list[index], ...ticketData };
        ticketsMap[eventId] = list;
        saveMockTickets(ticketsMap);
        return { ...list[index] };
      }
      throw new Error("Tarifa no encontrada");
    }

    try {
      const response = await apiClient.patch<TicketType>(
        `/organizer_tickets/${ticketId}`,
        ticketData
      );
      return response.data;
    } catch {
      const ticketsMap = getMockTickets();
      const list = ticketsMap[eventId] || [];
      const index = list.findIndex((t) => t.id === ticketId);
      if (index !== -1) {
        list[index] = { ...list[index], ...ticketData };
        ticketsMap[eventId] = list;
        saveMockTickets(ticketsMap);
        return { ...list[index] };
      }
      throw new Error("Tarifa no encontrada");
    }
  },

  /**
   * Cambia el estado de venta de una tarifa (activo, pausado, agotado)
   */
  async toggleTicketStatus(
    eventId: string,
    ticketId: string,
    newStatus: TicketType["status"]
  ): Promise<TicketType> {
    if (USE_MOCK_DATA) {
      await new Promise((r) => setTimeout(r, 100));
      const ticketsMap = getMockTickets();
      const list = ticketsMap[eventId] || [];
      const index = list.findIndex((t) => t.id === ticketId);
      if (index !== -1) {
        list[index].status = newStatus;
        ticketsMap[eventId] = list;
        saveMockTickets(ticketsMap);
        return { ...list[index] };
      }
      throw new Error("Tarifa no encontrada");
    }

    try {
      const response = await apiClient.patch<TicketType>(
        `/organizer_tickets/${ticketId}`,
        {
          status: newStatus,
        }
      );
      return response.data;
    } catch {
      const ticketsMap = getMockTickets();
      const list = ticketsMap[eventId] || [];
      const index = list.findIndex((t) => t.id === ticketId);
      if (index !== -1) {
        list[index].status = newStatus;
        ticketsMap[eventId] = list;
        saveMockTickets(ticketsMap);
        return { ...list[index] };
      }
      throw new Error("Tarifa no encontrada");
    }
  },

  /**
   * Elimina un tipo de ticket si no tiene ventas registradas
   */
  async deleteTicketType(eventId: string, ticketId: string): Promise<boolean> {
    if (USE_MOCK_DATA) {
      await new Promise((r) => setTimeout(r, 100));
      const ticketsMap = getMockTickets();
      if (ticketsMap[eventId]) {
        ticketsMap[eventId] = ticketsMap[eventId].filter((t) => t.id !== ticketId);
        saveMockTickets(ticketsMap);
      }
      return true;
    }

    try {
      await apiClient.delete(`/organizer_tickets/${ticketId}`);
      return true;
    } catch {
      const ticketsMap = getMockTickets();
      if (ticketsMap[eventId]) {
        ticketsMap[eventId] = ticketsMap[eventId].filter((t) => t.id !== ticketId);
        saveMockTickets(ticketsMap);
      }
      return true;
    }
  },
};

