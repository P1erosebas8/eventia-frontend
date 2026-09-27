import { Link } from "react-router-dom";
import { CATEGORIES, MAX_PRICE, formatPrice } from "../services/events.service";
import type { Category } from "../types/event.types";
import { isPromoUser, PROMO_DISCOUNT_PCT } from "../utils/promo.utils";

interface FilterSidebarProps {
  search: string;
  onSearchChange: (value: string) => void;
  sessionName: string | null;
  promoOnly: boolean;
  onPromoOnlyChange: (value: boolean) => void;
  selectedCategories: Category[];
  onToggleCategory: (category: Category) => void;
  maxPrice: number;
  onMaxPriceChange: (value: number) => void;
  onClear: () => void;
}

export default function FilterSidebar(props: FilterSidebarProps) {
  const {
    search,
    onSearchChange,
    sessionName,
    promoOnly,
    onPromoOnlyChange,
    selectedCategories,
    onToggleCategory,
    maxPrice,
    onMaxPriceChange,
    onClear,
  } = props;

  const promoUser = sessionName !== null && isPromoUser(sessionName);

  const scrollToResults = () => {
    document.getElementById("catalog-results")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <aside
      aria-label="Filtros del catálogo"
      className="lg:col-span-4 w-full min-w-0 bg-surface-container-lowest p-5 rounded-xl shadow-sm flex flex-col gap-5 lg:sticky lg:top-20 h-fit"
    >
      <div className="flex items-center justify-between gap-2 min-w-0">
        <div className="flex items-center gap-2 min-w-0">
          <span className="material-symbols-outlined text-primary text-[22px] shrink-0">tune</span>
          <h2 className="font-display font-bold text-xl truncate">Filtros</h2>
        </div>
        <button
          onClick={onClear}
          className="text-xs font-semibold text-secondary hover:opacity-80 transition flex items-center gap-0.5 shrink-0"
          type="button"
        >
          <span className="material-symbols-outlined text-[16px]">restart_alt</span>
          Limpiar todo
        </button>
      </div>

      <div className="flex flex-col gap-2 min-w-0">
        <label
          htmlFor="event-search-input"
          className="text-xs font-semibold uppercase tracking-wider"
        >
          Búsqueda directa
        </label>
        <div className="relative min-w-0">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-[20px] pointer-events-none">
            search
          </span>
          <input
            id="event-search-input"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-surface-container-low text-sm pl-10 pr-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-outline min-w-0"
            placeholder="Buscar artista, evento o sala..."
            type="text"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 min-w-0">
        <span className="text-xs font-semibold uppercase tracking-wider">Tu nombre</span>
        {sessionName !== null ? (
          <div className="flex items-center gap-2 bg-surface-container-low text-sm pl-3 pr-4 py-2.5 rounded-lg min-w-0">
            <span className="material-symbols-outlined text-primary text-[20px] shrink-0">
              verified_user
            </span>
            <span className="truncate font-semibold">{sessionName}</span>
            <span className="text-[11px] text-outline shrink-0">(sesión)</span>
          </div>
        ) : (
          <Link
            to="/login"
            className="flex items-center gap-2 bg-surface-container-low text-sm px-3 py-2.5 rounded-lg text-primary font-semibold hover:bg-surface-container-high transition-colors min-w-0"
          >
            <span className="material-symbols-outlined text-[20px] shrink-0">login</span>
            <span className="truncate">Inicia sesión para validar tu descuento</span>
          </Link>
        )}
        {sessionName !== null && (
          <p className={`text-xs ${promoUser ? "text-primary font-semibold" : "text-outline"}`}>
            {promoUser
              ? "Tu sesión tiene 15% de descuento en eventos seleccionados."
              : "Esta promo solo aplica para Roberto o Gerónimo."}
          </p>
        )}
      </div>

      <div className="bg-secondary-fixed/50 p-3 rounded-lg flex items-center justify-between gap-2 min-w-0">
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-bold text-on-secondary-fixed flex items-center gap-1 truncate">
            <span className="material-symbols-outlined text-[18px] text-secondary shrink-0">
              local_activity
            </span>
            <span className="truncate">Promo Roberto & Gerónimo</span>
          </span>
          <span className="text-xs text-on-secondary-fixed-variant">
            Solo eventos con {PROMO_DISCOUNT_PCT}% de descuento
          </span>
        </div>
        <label className="relative inline-flex items-center cursor-pointer shrink-0">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={promoOnly}
            onChange={(e) => onPromoOnlyChange(e.target.checked)}
          />
          <div className="w-11 h-6 bg-surface-container-high rounded-full peer-checked:bg-secondary relative transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
        </label>
      </div>

      <div className="flex flex-col gap-2 min-w-0">
        <span className="text-xs font-semibold uppercase tracking-wider">Categorías</span>
        <div className="flex flex-col gap-1.5 min-w-0">
          {CATEGORIES.map((item) => {
            const active = selectedCategories.includes(item.name);
            return (
              <label
                key={item.name}
                className={`flex items-center justify-between gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors min-w-0 ${
                  active ? "bg-surface-container-high/60" : "hover:bg-surface-container-low"
                }`}
              >
                <span className="flex items-center gap-2 min-w-0">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-primary shrink-0"
                    checked={active}
                    onChange={() => onToggleCategory(item.name)}
                  />
                  <span
                    className={`text-sm truncate ${active ? "font-medium" : "text-on-surface-variant"}`}
                  >
                    {item.name}
                  </span>
                </span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-bold shrink-0 ${
                    active ? "bg-primary-container/20 text-primary" : "bg-surface-container-high"
                  }`}
                >
                  {item.total}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-2 min-w-0">
        <div className="flex justify-between items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider">Rango de Precio</span>
          <span className="text-xs text-primary font-bold whitespace-nowrap">
            Máx. {formatPrice(MAX_PRICE)}
          </span>
        </div>
        <input
          className="w-full accent-primary h-2 bg-surface-container-high rounded-lg cursor-pointer"
          max={MAX_PRICE}
          min={0}
          type="range"
          value={maxPrice}
          onChange={(e) => onMaxPriceChange(Number(e.target.value))}
          aria-label="Precio máximo"
        />
        <div className="grid grid-cols-2 gap-2 pt-1 min-w-0">
          <div className="bg-surface-container-low p-2 rounded-lg flex flex-col min-w-0">
            <span className="text-xs text-outline">Mínimo</span>
            <span className="text-sm font-bold">S/ 0.00</span>
          </div>
          <div className="bg-surface-container-low p-2 rounded-lg flex flex-col min-w-0">
            <span className="text-xs text-outline">Máximo</span>
            <span className="text-sm text-primary font-bold truncate">{formatPrice(maxPrice)}</span>
          </div>
        </div>
      </div>

      <button
        onClick={scrollToResults}
        className="w-full py-3 bg-primary hover:opacity-90 text-on-primary text-sm font-bold rounded-lg shadow-md transition-all flex items-center justify-center gap-2"
        type="button"
      >
        <span className="material-symbols-outlined text-[20px]">filter_alt</span>
        Ver resultados
      </button>
    </aside>
  );
}
