import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function PublicHeader({
  search,
  onSearchChange,
}: {
  search?: string;
  onSearchChange?: (value: string) => void;
}) {
  const navigate = useNavigate();
  const [innerQuery, setInnerQuery] = useState("");
  const controlled = typeof search === "string" && typeof onSearchChange === "function";
  const inputValue = controlled ? search : innerQuery;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!controlled) navigate("/catalog");
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-16 max-w-[1280px] mx-auto px-4 sm:px-6 flex items-center justify-between gap-3 sm:gap-4">
        <Link to="/catalog" className="flex items-center gap-2.5 shrink-0 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-primary text-on-primary flex items-center justify-center font-display font-extrabold text-xl shrink-0">
            E
          </div>
          <div className="flex-col hidden sm:flex min-w-0">
            <span className="font-display font-semibold text-lg tracking-tight leading-none truncate">
              Eventia
            </span>
            <span className="text-[11px] font-bold text-outline tracking-wider uppercase mt-0.5">
              Perú S.A.C.
            </span>
          </div>
        </Link>

        <form
          onSubmit={handleSearchSubmit}
          className="hidden xl:flex items-center flex-1 max-w-xs relative min-w-0"
          role="search"
        >
          <span className="material-symbols-outlined absolute left-3 text-outline text-[20px] pointer-events-none">
            search
          </span>
          <input
            value={inputValue}
            onChange={(e) =>
              controlled ? onSearchChange(e.target.value) : setInnerQuery(e.target.value)
            }
            className="w-full bg-surface-container-low text-on-surface text-sm pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-outline min-w-0"
            placeholder="Buscar conciertos, obras, festivales..."
            type="text"
            aria-label="Buscar eventos"
          />
        </form>

        <nav className="hidden md:flex items-center gap-1 min-w-0 overflow-hidden">
          <NavLink
            to="/catalog"
            className={({ isActive }) =>
              `px-3 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors ${
                isActive
                  ? "bg-primary-container/20 text-primary"
                  : "text-on-surface-variant hover:bg-surface-container-high"
              }`
            }
          >
            Explorar Eventos
          </NavLink>
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            to="/login"
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-on-surface-variant hover:bg-surface-container-high transition whitespace-nowrap"
          >
            Iniciar Sesión
          </Link>
          <Link
            to="/register"
            className="px-3.5 py-1.5 rounded-lg bg-primary text-on-primary text-xs font-semibold shadow-sm hover:opacity-90 transition whitespace-nowrap"
          >
            Registrarse
          </Link>
        </div>
      </div>
    </header>
  );
}
