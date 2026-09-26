import BackofficeHeader from "../../components/backoffice/BackofficeHeader";
import BackofficeSidebar from "../../components/backoffice/BackofficeSidebar";
import BackofficeTabs from "../../components/backoffice/BackofficeTabs";
import CategoryManager from "../../components/backoffice/CategoryManager";
import CategoryModal from "../../components/backoffice/CategoryModal";
import KpiRibbon from "../../components/backoffice/KpiRibbon";
import Toast from "../../components/backoffice/Toast";
import UserDirectory from "../../components/backoffice/UserDirectory";
import UserModal from "../../components/backoffice/UserModal";
import { useBackoffice } from "../../hooks/useBackoffice";
import { useToast } from "../../hooks/useToast";

export default function BackofficePage() {
  const b = useBackoffice();
  const { toast, showToast } = useToast();

  return (
    <div className="min-h-screen bg-surface">
      <BackofficeSidebar />
      <div className="pl-0 lg:pl-64">
        <BackofficeHeader onNuevoUsuario={() => b.setModalUsuario(true)} />
        <main className="w-full pt-16 px-6 min-h-screen">
          <div className="flex flex-col w-full pb-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 py-4">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed text-[11px] uppercase tracking-wider font-bold">
                    Módulo Central de Seguridad
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-on-surface-variant">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Eventia S.A.C. Core v4.2
                  </span>
                </div>
                <h1 className="font-display font-bold text-3xl tracking-tight">
                  Gestión de Identidades, Permisos y Categorías
                </h1>
                <p className="text-[0.9375rem] text-on-surface-variant max-w-2xl">
                  Control RBAC de credenciales, accesos de puerta y taxonomías operativas (RF17 y RF21).
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => b.setModalUsuario(true)}
                  className="inline-flex items-center gap-2 bg-primary text-on-primary hover:opacity-90 px-4 py-2.5 rounded-lg text-sm shadow-sm transition-all active:scale-95"
                >
                  <span className="material-symbols-outlined text-[20px]">person_add</span>
                  <span>Invitar / Crear Usuario</span>
                </button>
                <button
                  type="button"
                  onClick={() => b.setModalCategoria(true)}
                  className="inline-flex items-center gap-2 bg-surface-container-high hover:bg-surface-variant px-4 py-2.5 rounded-lg text-sm transition-all"
                >
                  <span className="material-symbols-outlined text-primary text-[20px]">bookmark_add</span>
                  <span>Nueva Categoría</span>
                </button>
              </div>
            </div>

            <KpiRibbon activas={b.activas} total={b.categorias.length} />
            <BackofficeTabs tab={b.tab} setTab={b.setTab} />

            {b.tab === "usuarios" ? (
              <UserDirectory
                usuarios={b.usuarios}
                busqueda={b.busqueda}
                setBusqueda={b.setBusqueda}
                rol={b.rol}
                setRol={b.setRol}
                estado={b.estado}
                setEstado={b.setEstado}
                onToggleEstado={b.toggleEstadoUsuario}
                onToast={showToast}
              />
            ) : (
              <CategoryManager categorias={b.categorias} onToggle={b.toggleCategoria} onToast={showToast} />
            )}
          </div>
        </main>
      </div>

      <UserModal
        open={b.modalUsuario}
        onClose={() => b.setModalUsuario(false)}
        onSubmit={() => {
          b.setModalUsuario(false);
          showToast("Invitación Despachada", "Credencial inicial con validación RBAC enviada.");
        }}
      />
      <CategoryModal
        open={b.modalCategoria}
        onClose={() => b.setModalCategoria(false)}
        onSubmit={() => {
          b.setModalCategoria(false);
          showToast("Taxonomía Registrada", "Categoría persistida con active=true (RF17).");
        }}
      />
      <Toast toast={toast} />
    </div>
  );
}
