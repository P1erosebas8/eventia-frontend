import { useState } from "react";
import CatalogToolbar from "../../components/catalog/CatalogToolbar";
import EventCard from "../../components/catalog/EventCard";
import FilterSidebar from "../../components/catalog/FilterSidebar";
import HeroPromo from "../../components/catalog/HeroPromo";
import Pagination from "../../components/catalog/Pagination";
import RuleCallout from "../../components/catalog/RuleCallout";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import PromoTicker from "../../components/layout/PromoTicker";
import { EVENTOS, PRECIO_MAX, type Categoria } from "../../data/events";

export default function CatalogPage() {
  const [busqueda, setBusqueda] = useState("");
  const [soloPromo, setSoloPromo] = useState(true);
  const [categorias, setCategorias] = useState<Categoria[]>(["Conciertos"]);
  const [precioMax, setPrecioMax] = useState(450);
  const [orden, setOrden] = useState("populares");
  const [vista, setVista] = useState<"grid" | "lista">("grid");
  const [pagina, setPagina] = useState(1);

  const toggleCategoria = (cat: Categoria) => {
    setCategorias((prev) => (prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]));
    setPagina(1);
  };

  const limpiar = () => {
    setBusqueda("");
    setSoloPromo(false);
    setCategorias([]);
    setPrecioMax(PRECIO_MAX);
    setOrden("populares");
    setPagina(1);
  };

  const q = busqueda.trim().toLowerCase();
  const filtrados = EVENTOS.filter((e) => {
    if (soloPromo && !e.rn01) return false;
    if (categorias.length > 0 && !categorias.includes(e.categoria)) return false;
    if (e.precio > precioMax) return false;
    if (q && !`${e.titulo} ${e.recinto} ${e.ciudad}`.toLowerCase().includes(q)) return false;
    return true;
  });

  const eventos = [...filtrados].sort((a, b) => {
    if (orden === "fecha") return a.ordenFecha - b.ordenFecha;
    if (orden === "menor-precio") return a.precio - b.precio;
    if (orden === "mayor-precio") return b.precio - a.precio;
    return b.vendidoPct - a.vendidoPct;
  });

  return (
    <div className="min-h-screen bg-surface">
      <Header />

      <main className="w-full pt-20 min-h-screen">
        <PromoTicker />

        <section className="max-w-[1280px] w-full mx-auto px-6 py-6">
          <HeroPromo />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <FilterSidebar
              busqueda={busqueda}
              setBusqueda={setBusqueda}
              soloPromo={soloPromo}
              setSoloPromo={setSoloPromo}
              categorias={categorias}
              toggleCategoria={toggleCategoria}
              precioMax={precioMax}
              setPrecioMax={setPrecioMax}
              limpiar={limpiar}
            />

            <main className="lg:col-span-8 flex flex-col gap-6">
              <CatalogToolbar total={eventos.length} orden={orden} setOrden={setOrden} vista={vista} setVista={setVista} />

              {eventos.length === 0 ? (
                <div className="bg-surface-container-lowest p-10 rounded-xl text-center shadow-sm">
                  <span className="material-symbols-outlined text-5xl text-outline">search_off</span>
                  <h3 className="font-display font-bold text-xl mt-2">Sin resultados</h3>
                  <p className="text-sm text-on-surface-variant mt-1">
                    Prueba quitando el filtro RN01 o pulsa “Limpiar todo”.
                  </p>
                  <button
                    onClick={limpiar}
                    className="mt-4 px-4 py-2 bg-primary text-on-primary text-sm font-bold rounded-lg"
                  >
                    Limpiar filtros
                  </button>
                </div>
              ) : (
                <div
                  className={
                    vista === "grid"
                      ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
                      : "flex flex-col gap-4"
                  }
                >
                  {eventos.map((e) => (
                    <EventCard key={e.id} evento={e} vista={vista} />
                  ))}
                </div>
              )}

              <Pagination pagina={pagina} setPagina={setPagina} />
              <RuleCallout />
            </main>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
