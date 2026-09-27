import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

interface HeaderProps {
  search?: string;
  onSearchChange?: (value: string) => void;
  action?: React.ReactNode;
}

export default function Header({ search, onSearchChange, action }: HeaderProps) {
  const navigate = useNavigate();
  const [innerSearch, setInnerSearch] = useState("");
  const controlled = typeof search === "string" && typeof onSearchChange === "function";
  const inputValue = controlled ? search : innerSearch;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/catalog");
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
              controlled ? onSearchChange(e.target.value) : setInnerSearch(e.target.value)
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
          <NavLink
            to="/mis-tickets"
            className={({ isActive }) =>
              `px-3 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors ${
                isActive
                  ? "bg-primary-container/20 text-primary"
                  : "text-on-surface-variant hover:bg-surface-container-high"
              }`
            }
          >
            Mis Tickets
          </NavLink>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {action && <div className="flex items-center gap-2 shrink-0">{action}</div>}
          <div className="hidden lg:flex items-center bg-surface-container px-3 py-1.5 rounded-lg whitespace-nowrap">
            <span className="text-[11px] font-bold text-outline mr-1.5">MONEDA</span>
            <span className="text-sm text-primary font-bold">PEN (S/)</span>
          </div>
          <button
            aria-label="Notificaciones"
            className="w-10 h-10 rounded-full hidden sm:flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors relative shrink-0"
            type="button"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-secondary"></span>
          </button>
          <Link
            to="/perfil"
            className="flex items-center gap-1 min-w-0 hover:opacity-80 transition"
            aria-label="Mi cuenta"
          >
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover bg-surface-container-high shrink-0"
              src="https://lh3.googleusercontent.com/aida/AEtjO1VKf7CB99gtPkRBu6ogP6OhU6_qlxigptLnMh5rudGjyjchCEamowbeHTqw4GYlwSR8frTtwY0pNInrPBNmBtk_yKzeLoB7P2WY53QYUpyu5n_YBFQPQ40ilJ7GICmUolNobRWZNUa2rGkfu_tMMrEeosVaC67RQDzIQToDy4RiSO9_QaFVfvTA9KwnA0uguCPXh69EplVNOdALLHfykriq12xX0z_E6KAmhMZX_II1iVFAXCwuNY5KZ2M"
            />
            <span className="hidden lg:inline-block text-sm font-semibold truncate max-w-[90px]">
              Mi Cuenta
            </span>
            <span className="material-symbols-outlined text-outline text-[18px]">expand_more</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
