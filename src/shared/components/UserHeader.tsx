import { Link, NavLink } from "react-router-dom";

export default function UserHeader() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm">
      <div className="h-20 max-w-[1280px] mx-auto px-6 flex items-center justify-between gap-6">
        <Link to="/app/catalogo" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xl">
            E
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg tracking-tight leading-none text-slate-900">Eventia</span>
          </div>
        </Link>

        <div className="hidden xl:flex items-center flex-1 max-w-xs relative">
          <span className="material-symbols-outlined absolute left-3 text-slate-400 text-[20px] pointer-events-none">
            search
          </span>
          <input
            className="w-full bg-slate-100 text-slate-800 text-sm pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-slate-400 transition"
            placeholder="Buscar conciertos, obras, festivales..."
            type="text"
          />
        </div>

        <nav className="hidden md:flex items-center gap-2">
          <NavLink
            to="/app/catalogo"
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
          <NavLink
            to="/mis-tickets"
            className={({ isActive }) =>
              `px-3 py-2 rounded-lg text-sm font-semibold transition ${
                isActive
                  ? "bg-indigo-50 text-indigo-600 font-bold"
                  : "text-slate-600 hover:bg-slate-100"
              }`
            }
          >
            Mis Tickets
          </NavLink>
          <NavLink
            to="/app/promociones"
            className={({ isActive }) =>
              `px-3 py-2 rounded-lg text-sm font-semibold transition ${
                isActive
                  ? "bg-indigo-50 text-indigo-600 font-bold"
                  : "text-slate-600 hover:bg-slate-100"
              }`
            }
          >
            Promociones RN01
          </NavLink>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center bg-slate-100 px-3 py-1.5 rounded-lg">
            <span className="text-[11px] font-bold text-slate-400 mr-1.5">MONEDA</span>
            <span className="text-sm text-indigo-600 font-bold">PEN (S/)</span>
          </div>
          <button
            aria-label="Notificaciones"
            className="w-10 h-10 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100 transition relative"
            type="button"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-indigo-600"></span>
          </button>
          <Link to="/perfil" className="flex items-center gap-2 hover:opacity-80 transition">
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover bg-slate-200 border border-slate-200"
              src="https://lh3.googleusercontent.com/aida/AEtjO1VKf7CB99gtPkRBu6ogP6OhU6_qlxigptLnMh5rudGjyjchCEamowbeHTqw4GYlwSR8frTtwY0pNInrPBNmBtk_yKzeLoB7P2WY53QYUpyu5n_YBFQPQ40ilJ7GICmUolNobRWZNUa2rGkfu_tMMrEeosVaC67RQDzIQToDy4RiSO9_QaFVfvTA9KwnA0uguCPXh69EplVNOdALLHfykriq12xX0z_E6KAmhMZX_II1iVFAXCwuNY5KZ2M"
            />
            <span className="hidden lg:inline-block text-sm font-semibold text-slate-800">Mi Cuenta</span>
            <span className="material-symbols-outlined text-slate-400 text-[18px]">expand_more</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
