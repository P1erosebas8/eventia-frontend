import { useEffect, useState } from "react";
import ActiveEventsTable from "../components/ActiveEventsTable";
import KpiCard from "../components/KpiCard";
import MonthlyTicketsChart from "../components/MonthlyTicketsChart";
import MonitoringHeader from "../components/MonitoringHeader";
import SalesTrendChart from "../components/SalesTrendChart";
import { adminMonitoringService } from "../services/adminMonitoringService";
import type { MonitoringDashboardData } from "../types/admin.types";

export default function AdminMonitoringPage() {
  const [data, setData] = useState<MonitoringDashboardData | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    adminMonitoringService.getDashboardData().then(setData);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    adminMonitoringService.getDashboardData().then((res) => {
      setData(res);
      setTimeout(() => setIsRefreshing(false), 600);
    });
  };

  if (!data) {
    return (
      <div className="py-24 flex flex-col items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mb-3" />
        <p className="text-sm font-semibold text-on-surface-variant">
          Cargando métricas en tiempo real...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full pb-12 space-y-6">
      {/* Cabecera con título y botón de sincronización */}
      <MonitoringHeader onRefresh={handleRefresh} isRefreshing={isRefreshing} />

      {/* Tarjetas de KPIs principales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-5">
        {data.kpis.map((metric) => (
          <KpiCard key={metric.id} metric={metric} />
        ))}
      </div>

      {/* Gráficos interactivos de ventas y emisión */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
        <SalesTrendChart data={data.salesTrend} />
        <MonthlyTicketsChart data={data.monthlyTickets} />
      </div>

      {/* Tabla de rendimiento y supervisión de eventos */}
      <ActiveEventsTable
        events={data.activeEvents}
        totalCount={data.totalActiveEventsCount}
      />
    </div>
  );
}
