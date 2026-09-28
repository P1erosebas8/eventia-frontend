import axios from "axios";
import type {
  ActiveEvent,
  KpiMetric,
  MonthlyTicket,
  MonitoringDashboardData,
  SalesTrend,
} from "../types/admin.types";

/* false cuando el backend esté disponible. */
const USE_MOCK_DATA = true;
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1";

/* DATOS DE PRUEBA LOCALES */
const MOCK_KPIS: KpiMetric[] = [
  {
    id: "kpi-ingresos",
    label: "INGRESOS TOTALES",
    value: "S/ 142,850.00",
    badge: {
      text: "+12.4% vs. mes anterior",
      positive: true,
    },
    iconName: "wallet",
    colorVariant: "indigo",
  },
  {
    id: "kpi-ordenes",
    label: "ÓRDENES REGISTRADAS",
    value: "3,842",
    subtext: "Total compras en plataforma",
    iconName: "receipt",
    colorVariant: "blue",
  },
  {
    id: "kpi-tickets",
    label: "TICKETS EMITIDOS",
    value: "8,490",
    subtext: "Entradas digitales generadas",
    iconName: "ticket",
    colorVariant: "purple",
  },
  {
    id: "kpi-usuarios",
    label: "USUARIOS ACTIVOS",
    value: "4,120",
    subtext: "Clientes y organizadores activos",
    iconName: "users",
    colorVariant: "rose",
  },
];

const MOCK_SALES_TREND: SalesTrend[] = [
  { day: "Día 1", ingresos: 1250, formatted: "S/ 1,250" },
  { day: "Día 3", ingresos: 1480, formatted: "S/ 1,480" },
  { day: "Día 5", ingresos: 1720, formatted: "S/ 1,720" },
  { day: "Día 7", ingresos: 2310, formatted: "S/ 2,310" },
  { day: "Día 10", ingresos: 2190, formatted: "S/ 2,190" },
  { day: "Día 12", ingresos: 2840, formatted: "S/ 2,840" },
  { day: "Día 15", ingresos: 3200, formatted: "S/ 3,200" },
  { day: "Día 18", ingresos: 3650, formatted: "S/ 3,650" },
  { day: "Día 20", ingresos: 4420, formatted: "S/ 4,420" },
  { day: "Día 22", ingresos: 4300, formatted: "S/ 4,300" },
  { day: "Día 25", ingresos: 5120, formatted: "S/ 5,120" },
  { day: "Día 28", ingresos: 5410, formatted: "S/ 5,410" },
  { day: "Día 30", ingresos: 5850, formatted: "S/ 5,850" },
];

const MOCK_MONTHLY_TICKETS: MonthlyTicket[] = [
  { month: "Ene", tickets: 840, displayLabel: "840", highlight: false },
  { month: "Feb", tickets: 1100, displayLabel: "1.1k", highlight: false },
  { month: "Mar", tickets: 1300, displayLabel: "1.3k", highlight: false },
  { month: "Abr", tickets: 1700, displayLabel: "1.7k", highlight: false },
  { month: "May", tickets: 1900, displayLabel: "1.9k", highlight: true },
  { month: "Jun", tickets: 1600, displayLabel: "1.6k", highlight: false },
];

const MOCK_ACTIVE_EVENTS: ActiveEvent[] = [
  {
    id: "EVT-01",
    titulo: "Lima Live Fest 2024",
    categoria: "Festival Musical",
    organizador: "Live Nation Perú S.A.C.",
    ruc: "20601839211",
    entradasVendidas: 4250,
    aforoTotal: 5000,
    recaudacion: 382500,
    tasaComision: 0.1,
    comision: 38250,
    estado: "En Curso",
  },
  {
    id: "EVT-02",
    titulo: "Noche de Jazz en el Olivar",
    categoria: "Concierto Acústico",
    organizador: "Cultural San Isidro",
    ruc: "20549210084",
    entradasVendidas: 780,
    aforoTotal: 800,
    recaudacion: 62400,
    tasaComision: 0.1,
    comision: 6240,
    estado: "Activo",
  },
  {
    id: "EVT-03",
    titulo: "Cumbre de Innovación & Startups",
    categoria: "Congreso & Networking",
    organizador: "TechVentures Hub",
    ruc: "20603418902",
    entradasVendidas: 1120,
    aforoTotal: 1500,
    recaudacion: 168000,
    tasaComision: 0.1,
    comision: 16800,
    estado: "Activo",
  },
  {
    id: "EVT-04",
    titulo: "Hamlet: Adaptación Contemporánea",
    categoria: "Teatro & Artes",
    organizador: "Asociación Teatral La Plaza",
    ruc: "20512839401",
    entradasVendidas: 420,
    aforoTotal: 600,
    recaudacion: 33600,
    tasaComision: 0.1,
    comision: 3360,
    estado: "Próximo",
  },
  {
    id: "EVT-05",
    titulo: "GastroFest Sabores Peruanos",
    categoria: "Feria Gastronómica",
    organizador: "Acurio & Asociados Eventos",
    ruc: "20491028472",
    entradasVendidas: 2850,
    aforoTotal: 3000,
    recaudacion: 142500,
    tasaComision: 0.1,
    comision: 14250,
    estado: "En Curso",
  },
  {
    id: "EVT-06",
    titulo: "Sinfonía Andina: Homenaje a Yma Sumac",
    categoria: "Música Clásica",
    organizador: "Filarmónica Juvenil del Perú",
    ruc: "20556781290",
    entradasVendidas: 1450,
    aforoTotal: 1800,
    recaudacion: 116000,
    tasaComision: 0.1,
    comision: 11600,
    estado: "Activo",
  },
  {
    id: "EVT-07",
    titulo: "Expo Tech AI & Robotics 2024",
    categoria: "Tecnología",
    organizador: "Comunidad Tech Lima",
    ruc: "20608912345",
    entradasVendidas: 2100,
    aforoTotal: 2500,
    recaudacion: 189000,
    tasaComision: 0.1,
    comision: 18900,
    estado: "Próximo",
  },
  {
    id: "EVT-08",
    titulo: "Maratón Nocturna Costa Verde 15K",
    categoria: "Deportes",
    organizador: "Perú Runners Asociación",
    ruc: "20511234567",
    entradasVendidas: 3200,
    aforoTotal: 3500,
    recaudacion: 192000,
    tasaComision: 0.1,
    comision: 19200,
    estado: "Activo",
  },
  {
    id: "EVT-09",
    titulo: "Stand Up: Noche de Risas Criollas",
    categoria: "Comedia & Stand Up",
    organizador: "Producciones El Barranco",
    ruc: "20603344551",
    entradasVendidas: 380,
    aforoTotal: 400,
    recaudacion: 26600,
    tasaComision: 0.1,
    comision: 2660,
    estado: "En Curso",
  },
  {
    id: "EVT-10",
    titulo: "Festival del Café y Cacao Peruano",
    categoria: "Feria Gastronómica",
    organizador: "Cámara Peruana del Café",
    ruc: "20100456789",
    entradasVendidas: 4100,
    aforoTotal: 5000,
    recaudacion: 123000,
    tasaComision: 0.1,
    comision: 12300,
    estado: "Activo",
  },
];

/* SERVICIO DE MONITOREO */

export const adminMonitoringService = {
  async getDashboardData(): Promise<MonitoringDashboardData> {
    if (USE_MOCK_DATA) {
      return Promise.resolve({
        kpis: MOCK_KPIS,
        salesTrend: MOCK_SALES_TREND,
        monthlyTickets: MOCK_MONTHLY_TICKETS,
        activeEvents: MOCK_ACTIVE_EVENTS,
        totalActiveEventsCount: 42,
      });
    }

    const { data } = await axios.get<MonitoringDashboardData>(
      `${API_URL}/admin/monitoring/dashboard`
    );
    return data;
  },

  async getActiveEvents(
    page = 0,
    size = 10
  ): Promise<{ content: ActiveEvent[]; total: number }> {
    if (USE_MOCK_DATA) {
      const start = page * size;
      const content = MOCK_ACTIVE_EVENTS.slice(start, start + size);
      return Promise.resolve({
        content,
        total: MOCK_ACTIVE_EVENTS.length,
      });
    }

    const { data } = await axios.get<{ content: ActiveEvent[]; totalElements: number }>(
      `${API_URL}/admin/monitoring/events?page=${page}&size=${size}`
    );
    return {
      content: data.content,
      total: data.totalElements,
    };
  },
};
