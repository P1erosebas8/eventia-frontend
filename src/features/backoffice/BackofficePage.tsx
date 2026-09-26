import { useState } from "react";
import BackofficeHeader from "../../components/backoffice/BackofficeHeader";
import BackofficeSidebar from "../../components/backoffice/BackofficeSidebar";
import BackofficeTabs from "../../components/backoffice/BackofficeTabs";
import CategoryManager from "../../components/backoffice/CategoryManager";
import CategoryModal from "../../components/backoffice/CategoryModal";
import KpiRibbon from "../../components/backoffice/KpiRibbon";
import Toast, { type ToastData } from "../../components/backoffice/Toast";
import UserDirectory from "../../components/backoffice/UserDirectory";
import UserModal from "../../components/backoffice/UserModal";
import {
  CATEGORIAS_INICIALES,
  USUARIOS_INICIALES,
  type EstadoCuenta,
  type Rol,
} from "../../data/backoffice";

export default function BackofficePage() {
  const [tab, setTab] = useState<"usuarios" | "categorias">("usuarios");
  const [busqueda, setBusqueda] = useState("");
  const [rol, setRol] = useState<Rol | "ALL">("ALL");
  const [estado, setEstado] = useState<EstadoCuenta | "ALL">("ALL");
  const [usuarios, setUsuarios] = useState(USUARIOS_INICIALES);
  const [categorias, setCategorias] = useState(CATEGORIAS_INICIALES);
  const [modalUsuario, setModalUsuario] = useState(false);
  const [modalCategoria, setModalCategoria] = useState(false);
  const [toast, setToast] = useState<ToastData | null>(null);

  const showToast = (titulo: string, desc: string) => {
    setToast({ titulo, desc });
    window.setTimeout(() => setToast(null), 4000);
  };

  const q = busqueda.trim().toLowerCase();
  const usuariosFiltrados = usuarios.filter((u) => {
    if (rol !== "ALL" && u.rol !== rol) return false;
    if (estado !== "ALL" && u.estado !== estado) return false;
    if (q && !`${u.nombre} ${u.email} ${u.docEtiqueta}`.toLowerCase().includes(q)) return false;
    return true;
  });

  const toggleEstadoUsuario = (id: string) =>
    setUsuarios((prev) =>
      prev.map((u) => (u.id === id ? { ...u, estado: u.estado === "Activo" ? "Suspendido" : "Activo" } : u))
    );

  /** RN03: nunca DELETE físico, solo active true/false. */
  const toggleCategoria = (id: string) =>
    setCategorias((prev) => prev.map((c) => (c.id === id ? { ...c, activa: !c.activa } : c)));

  const activas = categorias.filter((c) => c.activa).length;

  return (
    <div className="min-h-screen bg-surface">
      <BackofficeSidebar />
      <div className="pl-0 lg:pl-64">
        <BackofficeHeader onNuevoUsuario={() => setModalUsuario(true)} />
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
                  onClick={() => setModalUsuario(true)}
                  className="inline-flex items-center gap-2 bg-primary text-on-primary hover:opacity-90 px-4 py-2.5 rounded-lg text-sm shadow-sm transition-all active:scale-95"
                >
                  <span className="material-symbols-outlined text-[20px]">person_add</span>
                  <span>Invitar / Crear Usuario</span>
                </button>
                <button
                  type="button"
                  onClick={() => setModalCategoria(true)}
                  className="inline-flex items-center gap-2 bg-surface-container-high hover:bg-surface-variant px-4 py-2.5 rounded-lg text-sm transition-all"
                >
                  <span className="material-symbols-outlined text-primary text-[20px]">bookmark_add</span>
                  <span>Nueva Categoría</span>
                </button>
              </div>
            </div>

            <KpiRibbon activas={activas} total={categorias.length} />
            <BackofficeTabs tab={tab} setTab={setTab} />

            {tab === "usuarios" ? (
              <UserDirectory
                usuarios={usuariosFiltrados}
                busqueda={busqueda}
                setBusqueda={setBusqueda}
                rol={rol}
                setRol={setRol}
                estado={estado}
                setEstado={setEstado}
                onToggleEstado={toggleEstadoUsuario}
                onToast={showToast}
              />
            ) : (
              <CategoryManager categorias={categorias} onToggle={toggleCategoria} onToast={showToast} />
            )}
          </div>
        </main>
      </div>

      <UserModal
        open={modalUsuario}
        onClose={() => setModalUsuario(false)}
        onSubmit={() => {
          setModalUsuario(false);
          showToast("Invitación Despachada", "Credencial inicial con validación RBAC enviada.");
        }}
      />
      <CategoryModal
        open={modalCategoria}
        onClose={() => setModalCategoria(false)}
        onSubmit={() => {
          setModalCategoria(false);
          showToast("Taxonomía Registrada", "Categoría persistida con active=true (RF17).");
        }}
      />
      <Toast toast={toast} />
    </div>
  );
}
