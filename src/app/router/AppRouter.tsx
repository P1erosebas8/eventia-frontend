import { Navigate, Route, Routes } from "react-router-dom";
import CategoriesPage from "../../features/categories/pages/CategoriesPage";
import CatalogPage from "../../features/events/pages/CatalogPage";
import UsersPage from "../../features/users/pages/UsersPage";

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-2 bg-surface px-4 text-center">
      <h1 className="font-display font-extrabold text-4xl">404</h1>
      <p className="text-sm text-on-surface-variant">Página no encontrada</p>
      <a
        href="/catalog"
        className="mt-2 px-4 py-2 bg-primary text-on-primary text-sm font-bold rounded-lg"
      >
        Volver al catálogo
      </a>
    </div>
  );
}

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/catalog" replace />} />
      <Route path="/catalog" element={<CatalogPage />} />
      <Route path="/catalogo" element={<Navigate to="/catalog" replace />} />
      <Route path="/admin/users" element={<UsersPage />} />
      <Route path="/admin/categories" element={<CategoriesPage />} />
      <Route path="/admin" element={<Navigate to="/admin/users" replace />} />
      <Route path="/usuarios-roles-categorias" element={<Navigate to="/admin/users" replace />} />
      <Route path="/usuarios-categorias" element={<Navigate to="/admin/users" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
