import { Navigate, Route, Routes } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import UserLayout from "../layouts/UserLayout";

import LoginPage from "../features/login/pages/LoginPage";

import CatalogPage from "../features/catalog/CatalogPage";
import EventDetailPage from "../features/event-detail/EventDetailPage";

import MisTicketsPage from "../features/user/pages/MisTicketsPage";
import PerfilPage from "../features/user/pages/PerfilPage";

import AdminLayout from "../features/admin/components/AdminLayout";
import AdminMonitoringPage from "../features/admin/pages/AdminMonitoringPage";
import AdminCategoriesPage from "../features/admin/pages/AdminCategoriesPage";
import AdminUsersPage from "../features/admin/pages/AdminUsersPage";

import UsuariosRolesCategoriasPage from "../features/usuarios-roles-categorias/UsuariosRolesCategoriasPage";

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-2 bg-surface">
      <h1 className="font-display font-extrabold text-4xl">
        404
      </h1>

      <p className="text-sm text-on-surface-variant">
        Página no encontrada
      </p>

      <a
        href="/catalogo"
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

      {/* Visitante: Rutas públicas con Header Público (MainLayout) */}
      <Route element={<MainLayout />}>

        <Route
          path="/"
          element={<Navigate to="/catalogo" replace />}
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/catalogo"
          element={<CatalogPage />}
        />

        <Route
          path="/evento"
          element={<EventDetailPage />}
        />

        <Route
          path="/evento/:id"
          element={<EventDetailPage />}
        />

      </Route>

      {/* Autenticado: Rutas de usuario con Header Usuario (UserLayout) */}
      <Route element={<UserLayout />}>

        <Route
          path="/app"
          element={<Navigate to="/app/catalogo" replace />}
        />

        <Route
          path="/app/catalogo"
          element={<CatalogPage />}
        />

        <Route
          path="/app/mis-tickets"
          element={<MisTicketsPage />}
        />

        <Route
          path="/app/perfil"
          element={<PerfilPage />}
        />

        <Route
          path="/mis-tickets"
          element={<MisTicketsPage />}
        />

        <Route
          path="/perfil"
          element={<PerfilPage />}
        />

      </Route>

      {/* Rutas del módulo administrador */}
      <Route path="/admin" element={<AdminLayout />}>

        <Route
          index
          element={<Navigate to="monitoreo" replace />}
        />

        <Route
          path="monitoreo"
          element={<AdminMonitoringPage />}
        />

        <Route
          path="usuarios"
          element={<AdminUsersPage />}
        />

        <Route
          path="categorias"
          element={<AdminCategoriesPage />}
        />

      </Route>


      <Route
        path="/usuarios-roles-categorias"
        element={<UsuariosRolesCategoriasPage />}
      />

      <Route
        path="*"
        element={<NotFound />}
      />

    </Routes>
  );
}