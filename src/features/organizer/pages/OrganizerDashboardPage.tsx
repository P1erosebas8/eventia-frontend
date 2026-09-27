import { useOrganizerDashboard } from "../hooks/useOrganizerDashboard";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardKpiGrid from "../components/dashboard/DashboardKpiGrid";
import SalesChart from "../components/dashboard/SalesChart";
import EventsTable from "../components/dashboard/EventsTable";

export default function OrganizerDashboardPage() {
  const { data, loading, refreshing, loadData } = useOrganizerDashboard();

  if (loading || !data) {
    return (
      <div className="py-20 flex flex-col items-center justify-center gap-3">
        <span className="material-symbols-outlined text-primary text-4xl animate-spin">
          sync
        </span>
        <span className="text-xs font-semibold text-outline">
          Cargando panel de control del organizador...
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-6 pt-2">
      {/* Encabezado Principal y Acciones */}
      <DashboardHeader refreshing={refreshing} onRefresh={loadData} />

      {/* Grid de Métricas Comerciales */}
      <DashboardKpiGrid kpis={data.kpis} />

      {/* Gráficos de Ventas Diarias y Distribución de Zonas */}
      <SalesChart
        dailySales={data.dailySales}
        zoneDistribution={data.zoneDistribution}
      />

      {/* Tabla de Eventos Recientes */}
      <EventsTable events={data.recentEvents} onRefresh={loadData} />
    </div>
  );
}
