/* ── Gestión de Categorías ── */

export type CategoryStatus = "Activa" | "Inactiva";

export interface AdminCategory {
  id: string;
  numeroId: number;
  nombre: string;
  descripcion: string;
  estado: CategoryStatus;
  ultimaActualizacion: string;
}

export interface CategoryFormData {
  nombre: string;
  descripcion: string;
  estado: CategoryStatus;
}

/* ── Gestión de Usuarios ── */

export type UserRole = "Organizador" | "Cliente";
export type UserStatus = "Activo" | "Inactivo";

export interface AdminUser {
  id: string;
  codigo: string;
  nombre: string;
  email: string;
  iniciales: string;
  dni: string;
  telefono: string;
  rol: UserRole;
  fechaRegistro: string;
  estado: UserStatus;
}

export interface UserFormData {
  nombre: string;
  email: string;
  dni: string;
  telefono: string;
  rol: UserRole;
}

/* ── Monitoreo ── */

export type MetricColorVariant = "indigo" | "blue" | "purple" | "rose";
export type EventStatus = "En Curso" | "Activo" | "Próximo" | "Finalizado";

export interface KpiMetric {
  id: string;
  label: string;
  value: string;
  subtext?: string;
  badge?: {
    text: string;
    positive: boolean;
  };
  iconName: "wallet" | "receipt" | "ticket" | "users";
  colorVariant: MetricColorVariant;
}

export interface SalesTrend {
  day: string;
  ingresos: number;
  formatted: string;
}

export interface MonthlyTicket {
  month: string;
  tickets: number;
  displayLabel: string;
  highlight?: boolean;
}

export interface ActiveEvent {
  id: string;
  titulo: string;
  categoria: string;
  organizador: string;
  ruc: string;
  entradasVendidas: number;
  aforoTotal: number;
  recaudacion: number;
  tasaComision: number;
  comision: number;
  estado: EventStatus;
}

export interface MonitoringDashboardData {
  kpis: KpiMetric[];
  salesTrend: SalesTrend[];
  monthlyTickets: MonthlyTicket[];
  activeEvents: ActiveEvent[];
  totalActiveEventsCount: number;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

// Aliases para compatibilidad interna
export type SalesDataPoint = SalesTrend;
export type MonthlyTicketData = MonthlyTicket;
