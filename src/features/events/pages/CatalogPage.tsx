import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import Footer from "../../../shared/layouts/Footer";
import PromoTicker from "../../../shared/layouts/PromoTicker";
import CatalogFilterBar from "../components/CatalogFilterBar";
import CatalogToolbar from "../components/CatalogToolbar";
import EventCard from "../components/EventCard";
import HeroPromo from "../components/HeroPromo";
import InfoCallout from "../components/InfoCallout";
import Pagination from "../components/Pagination";
import { CATEGORIES, EVENTS, PRICE_RANGES } from "../services/events.service";
import type { Category, SortKey, ViewMode } from "../types/event.types";
import { isPromoUser } from "../utils/promo.utils";

/** Cantidad de eventos visibles por página. */
const PAGE_SIZE = 6;

/**
 * Página del catálogo público de eventos.
 * Filtros en barra superior (texto, fecha, ubicación, precio, categoría),
 * promo y nombre siempre desde la sesión (nunca de un input manual).
 */
export default function CatalogPage() {
  const { isAuthenticated, user } = useAuth();
  const [search, setSearch] = useState("");
  const [month, setMonth] = useState("ALL");
  const [location, setLocation] = useState("ALL");
  const [priceRangeId, setPriceRangeId] = useState("ALL");
  const [category, setCategory] = useState<Category | "ALL">("ALL");
  const [promoOnly, setPromoOnly] = useState(false);
  const [sort, setSort] = useState<SortKey>("popular");
  const [view, setView] = useState<ViewMode>("grid");
  const [page, setPage] = useState(1);

  /** Nombre de sesión o null si es visita anónima. */
  const sessionName =
    isAuthenticated && user ? `${user.firstName} ${user.lastName}`.trim() : null;
  /** Nombre efectivo para descuentos (vacío si no hay sesión). */
  const effectiveName = sessionName ?? "";
  /** El banner solo existe si la sesión cumple la promo. */
  const showPromoBanner = sessionName !== null && isPromoUser(sessionName);
  const sessionPromo = sessionName !== null && isPromoUser(sessionName);

  // Opciones derivadas de los datos (sin valores fijos).
  const months = useMemo(
    () => Array.from(new Set(EVENTS.map((event) => event.month))),
    []
  );
  const locations = useMemo(
    () => Array.from(new Set(EVENTS.map((event) => event.venue))),
    []
  );
  const priceRange =
    PRICE_RANGES.find((range) => range.id === priceRangeId) ?? PRICE_RANGES[0];

  // Cada cambio de filtro vuelve a la primera página (evita páginas vacías).
  const resetPage = () => setPage(1);

  const handleSortChange = (value: SortKey) => {
    setSort(value);
    setPage(1);
  };

  const clearFilters = () => {
    setSearch("");
    setMonth("ALL");
    setLocation("ALL");
    setPriceRangeId("ALL");
    setCategory("ALL");
    setPromoOnly(false);
    setSort("popular");
    setPage(1);
  };

  const scrollToResults = () => {
    document.getElementById("catalog-results")?.scrollIntoView({ behavior: "smooth" });
  };

  const query = search.trim().toLowerCase();
  // Filtrado + orden memorizados: solo se recalculan si cambia un filtro.
  const filtered = useMemo(() => {
    const result = EVENTS.filter((event) => {
      if (promoOnly && !event.isPromoEligible) return false;
      if (category !== "ALL" && event.category !== category) return false;
      if (month !== "ALL" && event.month !== month) return false;
      if (location !== "ALL" && event.venue !== location) return false;
      if (event.price < priceRange.min || event.price >= priceRange.max) return false;
      if (query && !`${event.title} ${event.venue} ${event.city}`.toLowerCase().includes(query))
        return false;
      return true;
    });

    return [...result].sort((a, b) => {
      if (sort === "date") return a.dateOrder - b.dateOrder;
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      return b.soldPct - a.soldPct;
    });
  }, [promoOnly, category, month, location, priceRange, query, sort]);

  // Paginación defensiva: la página actual nunca sale del rango válido.
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const paged = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  return (
    <div className="min-h-screen bg-surface overflow-x-hidden">

      <div className="w-full pt-16 min-h-screen min-w-0">
        <PromoTicker />

        {/* gap estructural: si el banner se oculta no queda hueco. */}
        <section className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 py-6 min-w-0 flex flex-col gap-4 sm:gap-6">
          {showPromoBanner && sessionName !== null && <HeroPromo userName={sessionName} />}

          <CatalogFilterBar
            search={search}
            onSearchChange={(value) => {
              setSearch(value);
              resetPage();
            }}
            month={month}
            onMonthChange={(value) => {
              setMonth(value);
              resetPage();
            }}
            months={months}
            location={location}
            onLocationChange={(value) => {
              setLocation(value);
              resetPage();
            }}
            locations={locations}
            priceRangeId={priceRangeId}
            onPriceRangeChange={(value) => {
              setPriceRangeId(value);
              resetPage();
            }}
            category={category}
            onCategoryChange={(value) => {
              setCategory(value as Category | "ALL");
              resetPage();
            }}
            categories={CATEGORIES.map((item) => item.name)}
            onSubmit={scrollToResults}
          />

          {/* Fila compacta: sesión, promo y limpiar. */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 min-w-0">
            {sessionName !== null ? (
              <span className="inline-flex items-center gap-1.5 bg-surface-container-lowest text-sm px-3 py-1.5 rounded-full shadow-sm min-w-0 max-w-full">
                <span className="material-symbols-outlined text-primary text-[18px] shrink-0">
                  verified_user
                </span>
                <span className="truncate font-semibold">{sessionName}</span>
                <span
                  className={`text-[11px] font-bold shrink-0 ${sessionPromo ? "text-primary" : "text-outline"}`}
                >
                  {sessionPromo ? "15% promo" : "Sin promo"}
                </span>
              </span>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 bg-surface-container-lowest text-sm px-3 py-1.5 rounded-full shadow-sm text-primary font-semibold hover:bg-surface-container-high transition-colors whitespace-nowrap"
              >
                <span className="material-symbols-outlined text-[18px]">login</span>
                Inicia sesión para tu descuento
              </Link>
            )}

            <label className="inline-flex items-center gap-2 bg-surface-container-lowest px-3 py-1.5 rounded-full shadow-sm cursor-pointer whitespace-nowrap">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={promoOnly}
                onChange={(e) => {
                  setPromoOnly(e.target.checked);
                  resetPage();
                }}
              />
              <span className="w-9 h-5 bg-surface-container-high rounded-full peer-checked:bg-secondary relative transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-4 shrink-0" />
              <span className="text-xs font-bold text-on-surface">Solo promo 15%</span>
            </label>

            <button
              onClick={clearFilters}
              type="button"
              className="inline-flex items-center gap-1 text-xs font-semibold text-secondary hover:opacity-80 transition ml-auto shrink-0"
            >
              <span className="material-symbols-outlined text-[16px]">restart_alt</span>
              Limpiar
            </button>
          </div>

          <div id="catalog-results" className="flex flex-col gap-4 sm:gap-6 min-w-0 scroll-mt-24">
            <CatalogToolbar
              total={filtered.length}
              sort={sort}
              onSortChange={handleSortChange}
              view={view}
              onViewChange={setView}
            />

            {paged.length === 0 ? (
              // Estado vacío con salida clara (limpiar filtros).
              <div className="bg-surface-container-lowest p-10 rounded-xl text-center shadow-sm min-w-0">
                <span className="material-symbols-outlined text-5xl text-outline">
                  search_off
                </span>
                <h3 className="font-display font-bold text-xl mt-2">Sin resultados</h3>
                <p className="text-sm text-on-surface-variant mt-1 break-words">
                  Prueba quitando filtros o pulsa “Limpiar”.
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-4 px-4 py-2 bg-primary text-on-primary text-sm font-bold rounded-lg"
                >
                  Limpiar filtros
                </button>
              </div>
            ) : (
              <div
                className={
                  view === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 min-w-0"
                    : "flex flex-col gap-4 min-w-0"
                }
              >
                {paged.map((event) => (
                  <EventCard key={event.id} event={event} view={view} userName={effectiveName} />
                ))}
              </div>
            )}

            <Pagination
              page={safePage}
              totalPages={totalPages}
              totalItems={filtered.length}
              pageSize={PAGE_SIZE}
              onPageChange={setPage}
            />
            <InfoCallout />
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
