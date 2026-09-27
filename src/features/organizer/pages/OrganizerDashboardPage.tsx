import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { organizerService } from "../services/organizerService";
import type { OrganizerDashboardData } from "../types/organizer.types";
import KpiCard from "../components/KpiCard";
import SalesChart from "../components/SalesChart";
import EventsTable from "../components/EventsTable";
import { formatPEN, formatNumber } from "../utils/organizerFormatters";

export default function OrganizerDashboardPage() {
  const [data, setData] = useState<OrganizerDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    try {
      setRefreshing(true);
      const res = await organizerService.getDashboardData();
      setData(res);
    } catch (err) {
      console.error("Error loading organizer dashboard:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

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
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-xs text-outline font-medium">
              Eventia
            </span>
          </div>
          <h1 className="font-display text-2xl lg:text-3xl font-bold text-on-surface tracking-tight">
            Dashboard General de Eventos
          </h1>
          <p className="text-xs text-on-surface-variant max-w-3xl">
            Centro de control comercial, aforo sincronizado y recaudaciones por canal en soles peruanos.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={loadData}
            disabled={refreshing}
            className="flex items-center gap-1.5 bg-surface-container-high hover:bg-surface-container-highest text-on-surface px-3 py-2 rounded-lg text-xs font-semibold transition-colors disabled:opacity-50"
          >
            <span className={`material-symbols-outlined text-[18px] ${refreshing ? "animate-spin" : ""}`}>
              refresh
            </span>
            <span>{refreshing ? "Actualizando..." : "Actualizar"}</span>
          </button>

          <Link
            to="/organizador/eventos/nuevo"
            className="flex items-center gap-1.5 bg-primary hover:bg-primary-container text-on-primary px-3.5 py-2 rounded-lg text-xs font-bold transition-colors shadow-xs"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>Crear Evento</span>
          </Link>
        </div>
      </div>

      {/* 4 KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KpiCard
          label="Recaudación Total"
          value={formatPEN(data.kpis.totalRevenuePEN, false)}
          iconName="payments"
          changeValue={data.kpis.totalRevenueChange}
          highlight
          currencyHighlight
        />

        <KpiCard
          label="Entradas Emitidas / Vendidas"
          value={formatNumber(data.kpis.ticketsSold)}
          iconName="confirmation_number"
          changeValue={data.kpis.ticketsSoldChange}
        />

        <KpiCard
          label="Tasa de Ocupación Global"
          value={`${data.kpis.occupancyRate}%`}
          iconName="event_seat"
          changeValue={data.kpis.occupancyRateChange}
          progressBar={{
            current: data.kpis.ticketsSold,
            max: 40500,
            percentage: data.kpis.occupancyRate,
            label: "Ocupación vs Aforo Total",
          }}
        />

        <KpiCard
          label="Eventos Activos en Cartelera"
          value={data.kpis.activeEvents}
          iconName="calendar_month"
          changeValue={data.kpis.activeEventsChange}
        />
      </div>

      <SalesChart
        dailySales={data.dailySales}
        zoneDistribution={data.zoneDistribution}
      />

      <EventsTable events={data.recentEvents} onRefresh={loadData} />
    </div>
  );
}
