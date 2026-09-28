import api from "../../../shared/services/api";
import db from "../../../../db.json";
import { getStoredUsers } from "../../../shared/services/mockUserStorage";
import type {
  ActiveEvent,
  KpiMetric,
  MonthlyTicket,
  MonitoringDashboardData,
  SalesTrend,
} from "../types/admin.types";

/**
 * Servicio encargado de la comunicación con la API dummy (json-server / db.json)
 * y cálculo dinámico de KPIs y métricas operativas de la plataforma.
 */
export const adminMonitoringService = {
  /**
   * Obtiene la data consolidada y dinámica del panel de monitoreo
   */
  async getDashboardData(): Promise<MonitoringDashboardData> {
    try {
      const [ordersRes, ticketsRes, usersRes, eventsRes] = await Promise.allSettled([
        api.get<any[]>("/orders"),
        api.get<any[]>("/tickets"),
        api.get<any[]>("/admin_users"),
        api.get<any[]>("/events"),
      ]);

      const rawOrders: any[] =
        ordersRes.status === "fulfilled" && Array.isArray(ordersRes.value.data)
          ? ordersRes.value.data
          : (db as any).orders || [];

      const rawTickets: any[] =
        ticketsRes.status === "fulfilled" && Array.isArray(ticketsRes.value.data)
          ? ticketsRes.value.data
          : (db as any).tickets || [];

      const rawUsers: any[] =
        usersRes.status === "fulfilled" && Array.isArray(usersRes.value.data)
          ? usersRes.value.data
          : (db as any).admin_users || getStoredUsers();

      const rawEvents: any[] =
        eventsRes.status === "fulfilled" && Array.isArray(eventsRes.value.data)
          ? eventsRes.value.data
          : (db as any).events || [];

      // 1. Cálculos reales de KPIs
      const totalRevenue = rawOrders.reduce(
        (acc, ord) => acc + (typeof ord.total_amount === "number" ? ord.total_amount : 0),
        0
      );
      const totalOrdersCount = rawOrders.length;
      const totalTicketsCount = rawTickets.length;
      const totalUsersCount = rawUsers.length;

      const kpis: KpiMetric[] = [
        {
          id: "kpi-ingresos",
          label: "INGRESOS TOTALES",
          value: `S/ ${totalRevenue.toLocaleString("es-PE", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`,
          badge: {
            text: `${totalOrdersCount} transacciones`,
            positive: true,
          },
          iconName: "wallet",
          colorVariant: "indigo",
        },
        {
          id: "kpi-ordenes",
          label: "ÓRDENES REGISTRADAS",
          value: totalOrdersCount.toLocaleString("es-PE"),
          subtext: "Compras procesadas en plataforma",
          iconName: "receipt",
          colorVariant: "blue",
        },
        {
          id: "kpi-tickets",
          label: "TICKETS EMITIDOS",
          value: totalTicketsCount.toLocaleString("es-PE"),
          subtext: "Entradas con QR generadas",
          iconName: "ticket",
          colorVariant: "purple",
        },
        {
          id: "kpi-usuarios",
          label: "USUARIOS ACTIVOS",
          value: totalUsersCount.toLocaleString("es-PE"),
          subtext: "Organizadores y clientes registrados",
          iconName: "users",
          colorVariant: "rose",
        },
      ];

      // 2. Mapeo de eventos activos en la plataforma
      const activeEvents: ActiveEvent[] = rawEvents
        .filter((e) => e.active !== false)
        .map((e) => {
          const sold = e.ticketsSold || 0;
          const capacity = e.capacity || 1000;
          const revenue = e.totalRevenue || sold * 100;
          const comisionRate = 0.08;
          const comision = Math.round(revenue * comisionRate);

          let estado: ActiveEvent["estado"] = "Activo";
          if (sold >= capacity * 0.9) estado = "En Curso";
          else if (e.status === "inactive" || e.active === false) estado = "Finalizado";
          else estado = "Activo";

          return {
            id: String(e.id || e.id_event),
            titulo: e.title || "Evento Eventia",
            categoria: e.category || "Conciertos",
            organizador: e.venue || "Organizador Autorizado",
            ruc: "20601948231",
            entradasVendidas: sold,
            aforoTotal: capacity,
            recaudacion: revenue,
            tasaComision: comisionRate,
            comision,
            estado,
          };
        });

      // 3. Tendencia de ventas
      const salesTrend: SalesTrend[] = [
        { day: "Día 1", ingresos: Math.round(totalRevenue * 0.05), formatted: `S/ ${Math.round(totalRevenue * 0.05).toLocaleString()}` },
        { day: "Día 7", ingresos: Math.round(totalRevenue * 0.12), formatted: `S/ ${Math.round(totalRevenue * 0.12).toLocaleString()}` },
        { day: "Día 14", ingresos: Math.round(totalRevenue * 0.28), formatted: `S/ ${Math.round(totalRevenue * 0.28).toLocaleString()}` },
        { day: "Día 21", ingresos: Math.round(totalRevenue * 0.55), formatted: `S/ ${Math.round(totalRevenue * 0.55).toLocaleString()}` },
        { day: "Día 30", ingresos: totalRevenue, formatted: `S/ ${totalRevenue.toLocaleString()}` },
      ];

      // 4. Emisión mensual de tickets
      const monthlyTickets: MonthlyTicket[] = [
        { month: "Ene", tickets: Math.round(totalTicketsCount * 0.1) || 10, displayLabel: `${Math.round(totalTicketsCount * 0.1) || 10}` },
        { month: "Feb", tickets: Math.round(totalTicketsCount * 0.2) || 25, displayLabel: `${Math.round(totalTicketsCount * 0.2) || 25}` },
        { month: "Mar", tickets: Math.round(totalTicketsCount * 0.35) || 50, displayLabel: `${Math.round(totalTicketsCount * 0.35) || 50}` },
        { month: "Abr", tickets: Math.round(totalTicketsCount * 0.6) || 80, displayLabel: `${Math.round(totalTicketsCount * 0.6) || 80}` },
        { month: "May", tickets: totalTicketsCount, displayLabel: `${totalTicketsCount}`, highlight: true },
      ];

      return {
        kpis,
        salesTrend,
        monthlyTickets,
        activeEvents,
        totalActiveEventsCount: activeEvents.length,
      };
    } catch (err) {
      console.warn("Error al calcular datos dinámicos de monitoreo:", err);
      return {
        kpis: [],
        salesTrend: [],
        monthlyTickets: [],
        activeEvents: [],
        totalActiveEventsCount: 0,
      };
    }
  },
};
