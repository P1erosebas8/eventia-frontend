import api from "../../../shared/services/api";
import type { AdminUser, UserFormData } from "../types/admin.types";
import { saveOrganizerUser } from "../../../shared/services/mockUserStorage";

/**
 * Datos semilla locales en memoria como respaldo (fallback)
 * si el servidor json-server (db.json) se encuentra apagado.
 */
let mockUsersMemory: AdminUser[] = [
  {
    id: "1",
    codigo: "#1082",
    nombre: "Mario Vargas Llosa",
    email: "contacto@marioeventos.pe",
    iniciales: "MV",
    dni: "20601948",
    telefono: "+51 984 219 042",
    rol: "Organizador",
    fechaRegistro: "14/01/2024",
    estado: "Activo",
  },
  {
    id: "2",
    codigo: "#2491",
    nombre: "Camila Paredes Ramos",
    email: "camila.paredes@gmail.com",
    iniciales: "CP",
    dni: "72910482",
    telefono: "+51 951 847 302",
    rol: "Cliente",
    fechaRegistro: "02/02/2024",
    estado: "Activo",
  },
  {
    id: "3",
    codigo: "#1184",
    nombre: "Live Producciones SAC",
    email: "operaciones@liveprod.pe",
    iniciales: "LP",
    dni: "20548194",
    telefono: "+51 998 776 210",
    rol: "Organizador",
    fechaRegistro: "19/03/2024",
    estado: "Inactivo",
  },
  {
    id: "4",
    codigo: "#3188",
    nombre: "Jorge Torres Mendoza",
    email: "jorge.torres@outlook.com",
    iniciales: "JT",
    dni: "45892019",
    telefono: "+51 940 332 104",
    rol: "Cliente",
    fechaRegistro: "27/04/2024",
    estado: "Activo",
  },
  {
    id: "5",
    codigo: "#3298",
    nombre: "Daniela Aguirre Salcedo",
    email: "dani.aguirre@pucp.edu.pe",
    iniciales: "DA",
    dni: "70184920",
    telefono: "+51 977 120 449",
    rol: "Cliente",
    fechaRegistro: "10/05/2024",
    estado: "Inactivo",
  },
  {
    id: "6",
    codigo: "#1145",
    nombre: "Eventos Teatro Municipal",
    email: "administracion@teatromunicipal.pe",
    iniciales: "ET",
    dni: "20100084",
    telefono: "+51 992 405 119",
    rol: "Organizador",
    fechaRegistro: "18/06/2024",
    estado: "Activo",
  },
  {
    id: "7",
    codigo: "#3412",
    nombre: "Rodrigo Benavides Vega",
    email: "rbenavides@gmail.com",
    iniciales: "RB",
    dni: "47828194",
    telefono: "+51 981 445 092",
    rol: "Cliente",
    fechaRegistro: "03/07/2024",
    estado: "Activo",
  },
];

const ADMIN_USERS_STORAGE_KEY = "eventia_admin_users";

function getStoredAdminUsers(): AdminUser[] {
  if (typeof window === "undefined") return [...mockUsersMemory];
  try {
    const stored = localStorage.getItem(ADMIN_USERS_STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(ADMIN_USERS_STORAGE_KEY, JSON.stringify(mockUsersMemory));
      return [...mockUsersMemory];
    }
    const parsed: AdminUser[] = JSON.parse(stored);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : [...mockUsersMemory];
  } catch {
    return [...mockUsersMemory];
  }
}

function saveStoredAdminUsers(users: AdminUser[]): void {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(ADMIN_USERS_STORAGE_KEY, JSON.stringify(users));
    } catch (e) {
      console.warn("Error saving admin users to localStorage:", e);
    }
  }
}

/**
 * Servicio encargado de la comunicación con la API dummy (json-server / db.json)
 * para la gestión de usuarios y alta de organizadores.
 */
export const adminUsersService = {
  /**
   * Obtiene la lista completa de usuarios registrados.
   * Conecta con GET /admin_users del json-server y sincroniza con almacenamiento local.
   */
  async getUsers(): Promise<AdminUser[]> {
    const localUsers = getStoredAdminUsers();
    try {
      const response = await api.get<AdminUser[]>("/admin_users");
      if (Array.isArray(response.data) && response.data.length > 0) {
        // Combinar usuarios de la API con los creados o registrados localmente
        const apiUsers = response.data;
        const apiUserIds = new Set(apiUsers.map((u) => String(u.id)));
        const missingLocalUsers = localUsers.filter((u) => !apiUserIds.has(String(u.id)));
        const combined = [...apiUsers, ...missingLocalUsers];
        saveStoredAdminUsers(combined);
        return combined;
      }
      return localUsers;
    } catch {
      // Si la API dummy está offline, retorna los usuarios persistidos localmente
      return localUsers;
    }
  },

  /**
   * Alterna el estado de una cuenta (Activo <-> Inactivo).
   * Conecta con PATCH /admin_users/:id en el json-server.
   */
  async toggleUserStatus(id: string, nuevoEstado: "Activo" | "Inactivo"): Promise<AdminUser> {
    const list = getStoredAdminUsers();
    const idx = list.findIndex((u) => String(u.id) === String(id));
    if (idx !== -1) {
      list[idx].estado = nuevoEstado;
      saveStoredAdminUsers(list);
    }

    try {
      const response = await api.patch<AdminUser>(`/admin_users/${id}`, {
        estado: nuevoEstado,
      });
      return response.data;
    } catch {
      if (idx === -1) throw new Error("Usuario no encontrado");
      return { ...list[idx] };
    }
  },

  /**
   * Registra un nuevo Organizador de eventos.
   * Conecta con POST /admin_users en el json-server.
   */
  async createUser(form: UserFormData): Promise<AdminUser> {
    const nuevoUsuario: AdminUser = {
      id: String(Date.now()),
      codigo: `#${Math.floor(Math.random() * 9000) + 1000}`,
      nombre: form.nombre.trim(),
      email: form.email.trim(),
      dni: form.dni.trim(),
      telefono: form.telefono.trim(),
      rol: "Organizador",
      iniciales: form.nombre
        .trim()
        .split(" ")
        .slice(0, 2)
        .map((w) => w[0])
        .join("")
        .toUpperCase(),
      fechaRegistro: new Date().toLocaleDateString("es-PE"),
      estado: "Activo",
      password: form.password?.trim() || "Password123!",
    };

    // Guardar y sincronizar localmente
    const list = getStoredAdminUsers();
    list.unshift(nuevoUsuario);
    saveStoredAdminUsers(list);

    // Sincronizar credenciales de acceso para permitir inicio de sesión
    try {
      saveOrganizerUser({
        nombre: form.nombre,
        email: form.email,
        dni: form.dni,
        telefono: form.telefono,
        password: form.password?.trim() || "Password123!",
      });
    } catch {
      // Ignorar
    }

    try {
      const response = await api.post<AdminUser>("/admin_users", nuevoUsuario);
      return response.data;
    } catch {
      return nuevoUsuario;
    }
  },

  /**
   * Actualiza los datos de un usuario existente.
   * Conecta con PATCH /admin_users/:id en el json-server.
   */
  async updateUser(id: string, form: UserFormData): Promise<AdminUser> {
    const payload = {
      nombre: form.nombre.trim(),
      email: form.email.trim(),
      dni: form.dni.trim(),
      telefono: form.telefono.trim(),
      iniciales: form.nombre
        .trim()
        .split(" ")
        .slice(0, 2)
        .map((w) => w[0])
        .join("")
        .toUpperCase(),
    };

    const list = getStoredAdminUsers();
    const idx = list.findIndex((u) => String(u.id) === String(id));
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...payload };
      saveStoredAdminUsers(list);
    }

    try {
      const response = await api.patch<AdminUser>(`/admin_users/${id}`, payload);
      return response.data;
    } catch {
      if (idx === -1) throw new Error("Usuario no encontrado");
      return { ...list[idx] };
    }
  },
};
