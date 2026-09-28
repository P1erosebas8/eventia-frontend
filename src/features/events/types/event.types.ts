/** Categorías visibles del catálogo (etiquetas en español para la UI). */
export type Category =
  | "Conciertos"
  | "Festivales"
  | "Teatro & Artes"
  | "Tecnología & Startups"
  | "Gastronomía";

/** Evento del catálogo. `isPromoEligible` indica si admite el descuento promo. */
export interface CatalogEvent {
  id: number;
  title: string;
  category: Category;
  /** Mes abreviado para la insignia de fecha (ej. "NOV"). */
  month: string;
  /** Día para la insignia de fecha (ej. "22"). */
  day: string;
  /** Orden cronológico; se usa para ordenar por próxima fecha. */
  dateOrder: number;
  venue: string;
  city: string;
  /** Precio base en soles, sin descuento. */
  price: number;
  /** Porcentaje vendido (0-100); >= 85 se marca como urgente. */
  soldPct: number;
  image: string;
  tag?: string;
  badge?: string;
  isPromoEligible: boolean;
}

/** Criterios de orden del toolbar. */
export type SortKey = "popular" | "date" | "price-asc" | "price-desc";

/** Densidad visual de la grilla de resultados. */
export type ViewMode = "grid" | "list";
