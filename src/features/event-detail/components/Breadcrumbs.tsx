import { Link } from "react-router-dom";

export default function Breadcrumbs() {
  return (
    <nav
      aria-label="Ruta de navegación"
      className="flex items-center gap-2 text-xs text-outline mb-4 min-w-0 overflow-x-auto whitespace-nowrap"
    >
      <Link
        to="/"
        className="hover:text-primary transition-colors flex items-center gap-1 shrink-0"
      >
        <span className="material-symbols-outlined text-[16px]">home</span>
        Inicio
      </Link>
      <span className="material-symbols-outlined text-[14px] shrink-0">chevron_right</span>
      <Link to="/" className="hover:text-primary transition-colors shrink-0">
        Conciertos
      </Link>
      <span className="material-symbols-outlined text-[14px] shrink-0">chevron_right</span>
      <span className="text-on-surface font-semibold truncate">Lima Live Sessions 2025</span>
    </nav>
  );
}
