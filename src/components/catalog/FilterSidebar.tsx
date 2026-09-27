import { CATEGORIAS, PRECIO_MAX, formatoPrecio, type Categoria } from "../../data/events";

interface Props {
  busqueda: string;
  setBusqueda: (v: string) => void;
  soloPromo: boolean;
  setSoloPromo: (v: boolean) => void;
  categorias: Categoria[];
  toggleCategoria: (c: Categoria) => void;
  precioMax: number;
  setPrecioMax: (v: number) => void;
  limpiar: () => void;
}

export default function FilterSidebar(p: Props) {
  return (
    <aside
      aria-label="Filtros del catálogo"
      className="lg:col-span-4 bg-surface-container-lowest p-6 rounded-xl shadow-sm flex flex-col gap-6 lg:sticky lg:top-24 h-fit"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[22px]">tune</span>
          <h2 className="font-display font-bold text-xl">Filtros</h2>
        </div>
        <button
          onClick={p.limpiar}
          className="text-xs font-semibold text-secondary hover:opacity-80 transition flex items-center gap-0.5"
          type="button"
        >
          <span className="material-symbols-outlined text-[16px]">restart_alt</span>
          Limpiar todo
        </button>
      </div>

      {/* Búsqueda */}
      <div className="flex flex-col gap-2">
        <label htmlFor="event-search-input" className="text-xs font-semibold uppercase tracking-wider">
          Búsqueda directa
        </label>
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-[20px] pointer-events-none">
            search
          </span>
          <input
            id="event-search-input"
            value={p.busqueda}
            onChange={(e) => p.setBusqueda(e.target.value)}
            className="w-full bg-surface-container-low text-sm pl-10 pr-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-outline"
            placeholder="Buscar artista, evento o sala..."
            type="text"
          />
        </div>
      </div>

      {/* Toggle RN01 */}
      <div className="bg-secondary-fixed/50 p-3 rounded-lg flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-sm font-bold text-on-secondary-fixed flex items-center gap-1">
            <span className="material-symbols-outlined text-[18px] text-secondary">local_activity</span>
            Promo Miércoles RN01
          </span>
          <span className="text-xs text-on-secondary-fixed-variant">Mostrar solo con 15% DCTO</span>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={p.soloPromo}
            onChange={(e) => p.setSoloPromo(e.target.checked)}
          />
          <div className="w-11 h-6 bg-surface-container-high rounded-full peer-checked:bg-secondary relative transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
        </label>
      </div>

      {/* Categorías */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider">Categorías</span>
        <div className="flex flex-col gap-1.5">
          {CATEGORIAS.map((c) => {
            const activa = p.categorias.includes(c.nombre);
            return (
              <label
                key={c.nombre}
                className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                  activa ? "bg-surface-container-high/60" : "hover:bg-surface-container-low"
                }`}
              >
                <span className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-primary"
                    checked={activa}
                    onChange={() => p.toggleCategoria(c.nombre)}
                  />
                  <span className={`text-sm ${activa ? "font-medium" : "text-on-surface-variant"}`}>
                    {c.nombre}
                  </span>
                </span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                    activa ? "bg-primary-container/20 text-primary" : "bg-surface-container-high"
                  }`}
                >
                  {c.total}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Precio */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <span className="text-xs font-semibold uppercase tracking-wider">Rango de Precio</span>
          <span className="text-xs text-primary font-bold">Máx. {formatoPrecio(PRECIO_MAX)}</span>
        </div>
        <input
          className="w-full accent-primary h-2 bg-surface-container-high rounded-lg cursor-pointer"
          max={PRECIO_MAX}
          min={0}
          type="range"
          value={p.precioMax}
          onChange={(e) => p.setPrecioMax(Number(e.target.value))}
        />
        <div className="grid grid-cols-2 gap-2 pt-1">
          <div className="bg-surface-container-low p-2 rounded-lg flex flex-col">
            <span className="text-xs text-outline">Mínimo</span>
            <span className="text-sm font-bold">S/ 0.00</span>
          </div>
          <div className="bg-surface-container-low p-2 rounded-lg flex flex-col">
            <span className="text-xs text-outline">Máximo</span>
            <span className="text-sm text-primary font-bold">{formatoPrecio(p.precioMax)}</span>
          </div>
        </div>
      </div>

      <button
        className="w-full py-3 bg-primary hover:opacity-90 text-on-primary text-sm font-bold rounded-lg shadow-md transition-all flex items-center justify-center gap-2"
        type="button"
      >
        <span className="material-symbols-outlined text-[20px]">filter_alt</span>
        Aplicar Filtros Activos
      </button>
    </aside>
  );
}
