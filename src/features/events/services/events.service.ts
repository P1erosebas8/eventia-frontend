import type { CatalogEvent, Category } from "../types/event.types";
// Fuente temporal: luego se reemplaza por el backend real.
import db from "../../../../db.json";

/** Orden fijo de categorías en los filtros. */
export const CATEGORY_ORDER: Category[] = [
  "Conciertos",
  "Festivales",
  "Teatro & Artes",
  "Tecnología & Startups",
  "Gastronomía",
];

/** Eventos leídos desde db.json (fuente temporal hasta el backend real). */
export const EVENTS: CatalogEvent[] = (db as { events?: CatalogEvent[] }).events ?? [];

/** Rango de precio del filtro (montos en soles). */
export interface PriceRange {
  id: string;
  label: string;
  min: number;
  max: number;
}

/** Rangos de precio del filtro (montos en soles). */
export const PRICE_RANGES: PriceRange[] = [
  { id: "ALL", label: "Todos", min: 0, max: Number.POSITIVE_INFINITY },
  { id: "UNDER_60", label: "Menos de S/ 60", min: 0, max: 60 },
  { id: "BETWEEN_60_120", label: "S/ 60 – S/ 120", min: 60, max: 121 },
  { id: "BETWEEN_120_200", label: "S/ 120 – S/ 200", min: 120, max: 201 },
  { id: "OVER_200", label: "Más de S/ 200", min: 200, max: Number.POSITIVE_INFINITY },
];

/** Meses presentes en el catálogo (código → etiqueta). */
export const MONTH_LABELS: Record<string, string> = {
  ENE: "Enero",
  NOV: "Noviembre",
  DIC: "Diciembre",
};

/** Formato moneda peruana (ej. "S/ 120.00"). */
export function formatPrice(value: number): string {
  return `S/ ${value.toFixed(2)}`;
}
