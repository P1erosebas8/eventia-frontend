import { useMemo, useState } from "react";
import Header from "../../../shared/layouts/Header";
import Footer from "../../../shared/layouts/Footer";
import PromoTicker from "../../../shared/layouts/PromoTicker";
import CatalogToolbar from "../components/CatalogToolbar";
import EventCard from "../components/EventCard";
import FilterSidebar from "../components/FilterSidebar";
import HeroPromo from "../components/HeroPromo";
import InfoCallout from "../components/InfoCallout";
import Pagination from "../components/Pagination";
import { EVENTS, MAX_PRICE } from "../services/events.service";
import type { Category, SortKey, ViewMode } from "../types/event.types";

const PAGE_SIZE = 6;

export default function CatalogPage() {
  const [search, setSearch] = useState("");
  const [userName, setUserName] = useState("Roberto");
  const [promoOnly, setPromoOnly] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>(["Conciertos"]);
  const [maxPrice, setMaxPrice] = useState(450);
  const [sort, setSort] = useState<SortKey>("popular");
  const [view, setView] = useState<ViewMode>("grid");
  const [page, setPage] = useState(1);

  const toggleCategory = (category: Category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((item) => item !== category) : [...prev, category],
    );
    setPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleUserNameChange = (value: string) => {
    setUserName(value);
    setPage(1);
  };

  const handlePromoOnlyChange = (value: boolean) => {
    setPromoOnly(value);
    setPage(1);
  };

  const handleMaxPriceChange = (value: number) => {
    setMaxPrice(value);
    setPage(1);
  };

  const handleSortChange = (value: SortKey) => {
    setSort(value);
    setPage(1);
  };

  const clearFilters = () => {
    setSearch("");
    setUserName("");
    setPromoOnly(false);
    setSelectedCategories([]);
    setMaxPrice(MAX_PRICE);
    setSort("popular");
    setPage(1);
  };

  const query = search.trim().toLowerCase();
  const filtered = useMemo(() => {
    const result = EVENTS.filter((event) => {
      if (promoOnly && !event.isPromoEligible) return false;
      if (selectedCategories.length > 0 && !selectedCategories.includes(event.category))
        return false;
      if (event.price > maxPrice) return false;
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
  }, [promoOnly, selectedCategories, maxPrice, query, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const paged = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  return (
    <div className="min-h-screen bg-surface overflow-x-hidden">
      <Header search={search} onSearchChange={handleSearchChange} />

      <main className="w-full pt-16 min-h-screen min-w-0">
        <PromoTicker />

        <section className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 py-6 min-w-0">
          <HeroPromo userName={userName} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-start min-w-0">
            <FilterSidebar
              search={search}
              onSearchChange={handleSearchChange}
              userName={userName}
              onUserNameChange={handleUserNameChange}
              promoOnly={promoOnly}
              onPromoOnlyChange={handlePromoOnlyChange}
              selectedCategories={selectedCategories}
              onToggleCategory={toggleCategory}
              maxPrice={maxPrice}
              onMaxPriceChange={handleMaxPriceChange}
              onClear={clearFilters}
            />

            <main id="catalog-results" className="lg:col-span-8 flex flex-col gap-4 sm:gap-6 min-w-0 scroll-mt-24">
              <CatalogToolbar
                total={filtered.length}
                sort={sort}
                onSortChange={handleSortChange}
                view={view}
                onViewChange={setView}
              />

              {paged.length === 0 ? (
                <div className="bg-surface-container-lowest p-10 rounded-xl text-center shadow-sm min-w-0">
                  <span className="material-symbols-outlined text-5xl text-outline">
                    search_off
                  </span>
                  <h3 className="font-display font-bold text-xl mt-2">Sin resultados</h3>
                  <p className="text-sm text-on-surface-variant mt-1 break-words">
                    Prueba quitando el filtro de promo o pulsa “Limpiar todo”.
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
                      ? "grid grid-cols-1 sm:grid-cols-2 gap-4 min-w-0"
                      : "flex flex-col gap-4 min-w-0"
                  }
                >
                  {paged.map((event) => (
                    <EventCard key={event.id} event={event} view={view} userName={userName} />
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
            </main>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
