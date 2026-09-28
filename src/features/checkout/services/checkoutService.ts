import api from "../../../shared/services/api";
import type { CartItem } from "../types/chekout.types";

export interface UserTicket {
  id: string;
  id_order: string;
  id_user: number | string;
  event_title: string;
  ticket_name?: string;
  ticket_type: string;
  event_date: string;
  venue: string;
  qr_code: string;
  status: "VIGENTE" | "USADO" | "ANULADO";
}

export interface OrderRecord {
  id: string;
  id_user: number | string;
  order_date: string;
  payment_method: string;
  total_amount: number;
  status: string;
  order_details: {
    id_ticket_type: string | number;
    ticket_name: string;
    quantity: number;
    unit_price: number;
    discount_applied?: number;
  }[];
}

export const checkoutService = {
  /**
   * Registra la orden de compra y emite las entradas nominadas con código QR
   */
  async processCheckout(params: {
    userId: number | string;
    userName: string;
    userEmail: string;
    items: CartItem[];
    paymentMethod: string;
    totalAmount: number;
    discountAmount: number;
  }): Promise<{ order: OrderRecord; tickets: UserTicket[] }> {
    const orderId = `ord-${Date.now()}`;
    const orderDate = new Date().toISOString();

    const order: OrderRecord = {
      id: orderId,
      id_user: params.userId,
      order_date: orderDate,
      payment_method: params.paymentMethod || "CREDIT_CARD",
      total_amount: params.totalAmount,
      status: "COMPLETED",
      order_details: params.items.map((item) => ({
        id_ticket_type: item.id_ticket_type,
        ticket_name: item.ticket_name,
        quantity: item.quantity,
        unit_price: item.unit_price,
        discount_applied: params.discountAmount > 0 ? params.discountAmount : 0,
      })),
    };

    // Generar tickets individuales nominados
    const generatedTickets: UserTicket[] = [];
    params.items.forEach((item, itemIdx) => {
      for (let i = 1; i <= item.quantity; i++) {
        const ticketId = `tck-${Date.now()}-${itemIdx + 1}-${i}`;
        const qrCode = `EVT-${orderId.toUpperCase()}-${ticketId.toUpperCase()}-SECURE`;
        generatedTickets.push({
          id: ticketId,
          id_order: orderId,
          id_user: params.userId,
          event_title: item.event_name || "Evento Eventia",
          ticket_type: item.ticket_name || "General",
          event_date: item.event_date || orderDate,
          venue: item.venue || "Lugar del Evento",
          qr_code: qrCode,
          status: "VIGENTE",
        });
      }
    });

    try {
      // 1. Guardar orden en db.json
      await api.post("/orders", order);

      // 2. Guardar cada ticket en db.json
      for (const t of generatedTickets) {
        await api.post("/tickets", t).catch((err) => {
          console.warn("No se pudo guardar ticket individual vía API:", err);
        });
      }
    } catch (err) {
      console.warn("API json-server offline, guardando orden y tickets en almacenamiento local:", err);
      // Respaldo local
      try {
        const storedOrders: OrderRecord[] = JSON.parse(localStorage.getItem("eventia_orders") || "[]");
        storedOrders.unshift(order);
        localStorage.setItem("eventia_orders", JSON.stringify(storedOrders));

        const storedTickets: UserTicket[] = JSON.parse(localStorage.getItem("eventia_tickets") || "[]");
        storedTickets.unshift(...generatedTickets);
        localStorage.setItem("eventia_tickets", JSON.stringify(storedTickets));
      } catch (storageErr) {
        console.error("Error en fallback de almacenamiento local:", storageErr);
      }
    }

    return { order, tickets: generatedTickets };
  },
};
