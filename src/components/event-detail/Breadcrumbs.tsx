import { Link } from "react-router-dom";

export default function Breadcrumbs() {
  return (
    <nav aria-label="Ruta de navegación" className="flex items-center gap-2 text-xs text-outline mb-4">
      <Link to="/catalogo" className="hover:text-primary transition-colors flex items-center gap-1">
        <span className="material-symbols-outlined text-[16px]">home</span>
        Inicio
      </Link>
      <span className="material-symbols-outlined text-[14px]">chevron_right</span>
      <Link to="/catalogo" className="hover:text-primary transition-colors">
        Conciertos
      </Link>
      <span className="material-symbols-outlined text-[14px]">chevron_right</span>
      <span className="text-on-surface font-semibold">Lima Live Sessions 2025</span>
    </nav>
  );
}
