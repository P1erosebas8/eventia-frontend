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

/** Porcentaje de descuento de la promo (aplica solo a elegibles). */
export const PROMO_DISCOUNT_PCT = 15;

/**
 * Normaliza un nombre para compararlo: minúsculas, sin tildes ni espacios
 * sobrantes ("Gerónimo" y "geronimo" coinciden).
 */
function normalizeName(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

/**
 * Regla de negocio 1: la promo aplica a todo usuario cuyo primer nombre
 * sea Roberto o Gerónimo.
 */
export function isPromoUser(userName: string): boolean {
  const firstName = normalizeName(userName).split(/\s+/)[0] ?? "";
  return firstName === "roberto" || firstName === "geronimo";
}

/** Precio final con la promo aplicada. */
export function getPromoPrice(price: number): number {
  return price * (1 - PROMO_DISCOUNT_PCT / 100);
}

/** Formato moneda peruana (ej. "S/ 120.00"). */
export function formatPrice(value: number): string {
  return `S/ ${value.toFixed(2)}`;
}
