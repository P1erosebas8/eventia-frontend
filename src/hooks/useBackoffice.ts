import { useMemo, useState } from "react";
import {
  CATEGORIAS_INICIALES,
  USUARIOS_INICIALES,
  type EstadoCuenta,
  type Rol,
} from "../data/backoffice";

export type BackofficeTab = "usuarios" | "categorias";

/** Estado del backoffice: tabs, filtros de usuarios y baja lógica RN03 de categorías. */
export function useBackoffice() {
  const [tab, setTab] = useState<BackofficeTab>("usuarios");
  const [busqueda, setBusqueda] = useState("");
  const [rol, setRol] = useState<Rol | "ALL">("ALL");
  const [estado, setEstado] = useState<EstadoCuenta | "ALL">("ALL");
  const [usuarios, setUsuarios] = useState(USUARIOS_INICIALES);
  const [categorias, setCategorias] = useState(CATEGORIAS_INICIALES);
  const [modalUsuario, setModalUsuario] = useState(false);
  const [modalCategoria, setModalCategoria] = useState(false);

  const usuariosFiltrados = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    return usuarios.filter((u) => {
      if (rol !== "ALL" && u.rol !== rol) return false;
      if (estado !== "ALL" && u.estado !== estado) return false;
      if (q && !`${u.nombre} ${u.email} ${u.docEtiqueta}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [usuarios, busqueda, rol, estado]);

  const toggleEstadoUsuario = (id: string) =>
    setUsuarios((prev) =>
      prev.map((u) => (u.id === id ? { ...u, estado: u.estado === "Activo" ? "Suspendido" : "Activo" } : u))
    );

  /** RN03: nunca DELETE físico, solo active true/false. */
  const toggleCategoria = (id: string) =>
    setCategorias((prev) => prev.map((c) => (c.id === id ? { ...c, activa: !c.activa } : c)));

  const activas = categorias.filter((c) => c.activa).length;

  return {
    tab, setTab,
    busqueda, setBusqueda,
    rol, setRol,
    estado, setEstado,
    usuarios: usuariosFiltrados,
    toggleEstadoUsuario,
    categorias, toggleCategoria, activas,
    modalUsuario, setModalUsuario,
    modalCategoria, setModalCategoria,
  };
}

export type Backoffice = ReturnType<typeof useBackoffice>;
