import CatalogToolbar from "../../components/catalog/CatalogToolbar";
import EventCard from "../../components/catalog/EventCard";
import FilterSidebar from "../../components/catalog/FilterSidebar";
import HeroPromo from "../../components/catalog/HeroPromo";
import Pagination from "../../components/catalog/Pagination";
import RuleCallout from "../../components/catalog/RuleCallout";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import PromoTicker from "../../components/layout/PromoTicker";
import { useCatalogFilters } from "../../hooks/useCatalogFilters";

export default function CatalogPage() {
  const f = useCatalogFilters();

  return (
    <div className="min-h-screen bg-surface">
      <Header />

      <main className="w-full pt-20 min-h-screen">
        <PromoTicker />

        <section className="max-w-[1280px] w-full mx-auto px-6 py-6">
          <HeroPromo />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <FilterSidebar f={f} />

            <main className="lg:col-span-8 flex flex-col gap-6">
              <CatalogToolbar f={f} total={f.eventos.length} />

              {f.eventos.length === 0 ? (
                <div className="bg-surface-container-lowest p-10 rounded-xl text-center shadow-sm">
                  <span className="material-symbols-outlined text-5xl text-outline">search_off</span>
                  <h3 className="font-display font-bold text-xl mt-2">Sin resultados</h3>
                  <p className="text-sm text-on-surface-variant mt-1">
                    Prueba quitando el filtro RN01 o pulsa “Limpiar todo”.
                  </p>
                  <button
                    onClick={f.limpiar}
                    className="mt-4 px-4 py-2 bg-primary text-on-primary text-sm font-bold rounded-lg"
                  >
                    Limpiar filtros
                  </button>
                </div>
              ) : (
                <div
                  className={
                    f.vista === "grid"
                      ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
                      : "flex flex-col gap-4"
                  }
                >
                  {f.eventos.map((e) => (
                    <EventCard key={e.id} evento={e} vista={f.vista} />
                  ))}
                </div>
              )}

              <Pagination f={f} />
              <RuleCallout />
            </main>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
