import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function UserHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm">
      <div className="h-16 max-w-[1280px] mx-auto px-6 flex items-center justify-between gap-6">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xl">
            E
          </div>

          <div className="flex flex-col">
            <span className="font-extrabold text-lg tracking-tight leading-none text-slate-900">
              Eventia
            </span>
          </div>
        </Link>

        {/* Navegación */}
        <nav className="hidden md:flex items-center gap-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-3 py-2 rounded-lg text-sm font-semibold transition ${
                isActive
                  ? "bg-indigo-50 text-indigo-600 font-bold"
                  : "text-slate-600 hover:bg-slate-100"
              }`
            }
          >
            Explorar Eventos
          </NavLink>
        </nav>

        {/* Cuenta */}
        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setIsMenuOpen((previous) => !previous)}
            className="flex items-center gap-2 hover:opacity-80 transition"
            aria-expanded={isMenuOpen}
            aria-haspopup="menu"
          >
            <span className="hidden lg:inline-block text-sm font-semibold text-slate-800">
              Mi Cuenta
            </span>

            <span
              className={`material-symbols-outlined text-slate-400 text-[18px] transition-transform ${
                isMenuOpen ? "rotate-180" : ""
              }`}
            >
              expand_more
            </span>
          </button>

          {/* Menú desplegable */}
          {isMenuOpen && (
            <div className="absolute right-0 top-full mt-3 w-48 bg-white border border-slate-200 rounded-xl shadow-lg py-2 z-50">
              <Link
                to="/mis-tickets"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
              >
                <span className="material-symbols-outlined text-[20px] text-slate-500">
                  confirmation_number
                </span>
                Mis entradas
              </Link>

              <div className="my-1 border-t border-slate-100" />

              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition"
              >
                <span className="material-symbols-outlined text-[20px]">
                  logout
                </span>
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}