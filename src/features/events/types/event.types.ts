export type Category =
  | "Conciertos"
  | "Festivales"
  | "Teatro & Artes"
  | "Tecnología & Startups"
  | "Gastronomía";

export interface CatalogEvent {
  id: number;
  title: string;
  category: Category;
  month: string;
  day: string;
  dateOrder: number;
  venue: string;
  city: string;
  price: number;
  soldPct: number;
  image: string;
  tag?: string;
  badge?: string;
  isPromoEligible: boolean;
}

export type SortKey = "popular" | "date" | "price-asc" | "price-desc";

export type ViewMode = "grid" | "list";
