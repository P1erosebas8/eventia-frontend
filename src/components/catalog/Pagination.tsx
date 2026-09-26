import { useCountdown } from "../../hooks/useCountdown";
import type { CatalogFilters } from "../../hooks/useCatalogFilters";

const PAGINAS = [1, 2, 3, 4];

export default function Pagination({ f }: { f: CatalogFilters }) {
  const timer = useCountdown(299);

  return (
    <nav
      aria-label="Navegación de páginas de eventos"
      className="bg-surface-container-lowest p-4 rounded-xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 mt-2"
    >
      <span className="text-sm text-outline">
        Mostrando <strong className="text-on-surface">1 - 6</strong> de{" "}
        <strong className="text-on-surface">24</strong> eventos activos
      </span>

      <div className="flex items-center gap-1.5">
        <button
          aria-label="Página anterior"
          disabled={f.pagina === 1}
          onClick={() => f.setPagina(Math.max(1, f.pagina - 1))}
          type="button"
          className="w-9 h-9 rounded-lg flex items-center justify-center bg-surface-container-low disabled:opacity-60 disabled:cursor-not-allowed hover:bg-surface-container-high transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">chevron_left</span>
        </button>
        {PAGINAS.map((p) => (
          <button
            key={p}
            onClick={() => f.setPagina(p)}
            type="button"
            className={`w-9 h-9 rounded-lg text-sm font-bold flex items-center justify-center transition-colors ${
              f.pagina === p ? "bg-primary text-on-primary shadow-sm" : "hover:bg-surface-container-high"
            }`}
          >
            {p}
          </button>
        ))}
        <button
          aria-label="Página siguiente"
          disabled={f.pagina === 4}
          onClick={() => f.setPagina(Math.min(4, f.pagina + 1))}
          type="button"
          className="w-9 h-9 rounded-lg flex items-center justify-center bg-surface-container-low hover:bg-surface-container-high transition-colors disabled:opacity-60"
        >
          <span className="material-symbols-outlined text-[18px]">chevron_right</span>
        </button>
      </div>

      <div className="hidden sm:flex items-center gap-1.5 text-xs text-outline">
        <span>Siguiente actualización en:</span>
        <span className="font-bold text-primary">{timer}</span>
      </div>
    </nav>
  );
}
