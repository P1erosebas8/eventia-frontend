import type { CatalogFilters, Orden, Vista } from "../../hooks/useCatalogFilters";

interface Props {
  f: CatalogFilters;
  total: number;
}

export default function CatalogToolbar({ f, total }: Props) {
  const setOrden = (v: string) => f.setOrden(v as Orden);
  const setVista = (v: Vista) => f.setVista(v);

  return (
    <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <h2 className="font-display font-bold text-xl">{total} eventos encontrados</h2>
        <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-outline"></span>
        <span className="text-xs text-outline">Lima y provincias</span>
      </div>

      <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
        <div className="flex items-center gap-1.5">
          <label htmlFor="sort-select" className="text-xs text-outline whitespace-nowrap">
            ORDENAR:
          </label>
          <select
            id="sort-select"
            value={f.orden}
            onChange={(e) => setOrden(e.target.value)}
            className="bg-surface-container-low text-sm font-medium px-3 py-1.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="populares">Más populares</option>
            <option value="fecha">Próxima fecha</option>
            <option value="menor-precio">Menor precio (S/)</option>
            <option value="mayor-precio">Mayor precio (S/)</option>
          </select>
        </div>

        <div className="flex items-center bg-surface-container-low p-1 rounded-lg">
          <button
            aria-label="Vista cuadrícula"
            onClick={() => setVista("grid")}
            type="button"
            className={`p-1.5 rounded-md ${f.vista === "grid" ? "bg-white text-primary shadow-sm" : "text-outline hover:text-on-surface"}`}
          >
            <span className="material-symbols-outlined text-[18px]">grid_view</span>
          </button>
          <button
            aria-label="Vista lista"
            onClick={() => setVista("lista")}
            type="button"
            className={`p-1.5 rounded-md ${f.vista === "lista" ? "bg-white text-primary shadow-sm" : "text-outline hover:text-on-surface"}`}
          >
            <span className="material-symbols-outlined text-[18px]">format_list_bulleted</span>
          </button>
        </div>
      </div>
    </div>
  );
}
