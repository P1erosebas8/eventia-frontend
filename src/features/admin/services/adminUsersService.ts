import axios from "axios";
import type { AdminUser, UserFormData } from "../types/admin.types";

const USE_MOCK_DATA = true;
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1";

/* DATOS DE PRUEBA LOCALES */
const MOCK_USERS: AdminUser[] = [
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

/* SERVICIO DE USUARIOS */
export const adminUsersService = {
  async getUsers(): Promise<AdminUser[]> {
    if (USE_MOCK_DATA) {
      return Promise.resolve(MOCK_USERS);
    }
    const { data } = await axios.get<AdminUser[]>(`${API_URL}/admin/users`);
    return data;
  },

  async toggleUserStatus(id: string, nuevoEstado: "Activo" | "Inactivo"): Promise<AdminUser> {
    if (USE_MOCK_DATA) {
      const user = MOCK_USERS.find((u) => u.id === id);
      if (!user) throw new Error("Usuario no encontrado");
      user.estado = nuevoEstado;
      return Promise.resolve({ ...user });
    }
    const { data } = await axios.patch<AdminUser>(`${API_URL}/admin/users/${id}/status`, {
      estado: nuevoEstado,
    });
    return data;
  },

  async createUser(form: UserFormData): Promise<AdminUser> {
    if (USE_MOCK_DATA) {
      const nuevo: AdminUser = {
        id: String(MOCK_USERS.length + 1),
        codigo: `#${Math.floor(Math.random() * 9000) + 1000}`,
        iniciales: form.nombre
          .split(" ")
          .slice(0, 2)
          .map((w) => w[0])
          .join("")
          .toUpperCase(),
        ...form,
        fechaRegistro: new Date().toLocaleDateString("es-PE"),
        estado: "Activo",
      };
      MOCK_USERS.push(nuevo);
      return Promise.resolve(nuevo);
    }
    const { data } = await axios.post<AdminUser>(`${API_URL}/admin/users`, form);
    return data;
  },

  async updateUser(id: string, form: UserFormData): Promise<AdminUser> {
    if (USE_MOCK_DATA) {
      const idx = MOCK_USERS.findIndex((u) => u.id === id);
      if (idx === -1) throw new Error("Usuario no encontrado");
      MOCK_USERS[idx] = {
        ...MOCK_USERS[idx],
        ...form,
        iniciales: form.nombre
          .split(" ")
          .slice(0, 2)
          .map((w) => w[0])
          .join("")
          .toUpperCase(),
      };
      return Promise.resolve({ ...MOCK_USERS[idx] });
    }
    const { data } = await axios.put<AdminUser>(`${API_URL}/admin/users/${id}`, form);
    return data;
  },
};
