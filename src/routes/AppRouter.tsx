import { Navigate, Route, Routes } from "react-router-dom";
import UsuariosRolesCategoriasPage from "../features/usuarios-roles-categorias/UsuariosRolesCategoriasPage";
import CatalogPage from "../features/catalog/CatalogPage";
import EventDetailPage from "../features/event-detail/EventDetailPage";

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-2 bg-surface">
      <h1 className="font-display font-extrabold text-4xl">404</h1>
      <p className="text-sm text-on-surface-variant">Página no encontrada</p>
      <a href="/catalogo" className="mt-2 px-4 py-2 bg-primary text-on-primary text-sm font-bold rounded-lg">
        Volver al catálogo
      </a>
    </div>
  );
}

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/catalogo" replace />} />
      <Route path="/catalogo" element={<CatalogPage />} />
      <Route path="/usuarios-roles-categorias" element={<UsuariosRolesCategoriasPage />} />
      <Route path="/evento" element={<EventDetailPage />} />
      <Route path="/evento/:id" element={<EventDetailPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
