import { Link, NavLink } from "react-router-dom";

export default function PublicHeader() {
  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center px-6">

        {/* Logo / Home */}
        <Link
          to="/"
          className="text-xl font-extrabold text-indigo-600"
        >
          Eventia
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

      <nav className="ml-auto hidden md:flex items-center gap-3">
  <NavLink
    to="/catalog"
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
    to="/login"
    className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
  >
    Iniciar Sesión
  </NavLink>

  <NavLink
    to="/register"
    className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
  >
    Registrarse
  </NavLink>
</nav>

      </div>
    </header>
  );
}