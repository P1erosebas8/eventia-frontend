import axios from "axios";
import type { AdminCategory, CategoryFormData, CategoryStatus } from "../types/admin.types";

const USE_MOCK_DATA = true;
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1";
const API_BASE_URL = `${API_URL}/admin/categories`;

function getFormattedDateTime(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

const MOCK_CATEGORIES: AdminCategory[] = [
  {
    id: "cat-1",
    numeroId: 1,
    nombre: "Conciertos & Festivales",
    descripcion: "Presentaciones musicales masivas en vivo, festivales y recitales.",
    estado: "Activa",
    ultimaActualizacion: "2024-04-10 11:22:15",
  },
  {
    id: "cat-2",
    numeroId: 2,
    nombre: "Teatro & Artes Escénicas",
    descripcion: "Obras teatrales, comedia en vivo, danza contemporánea y ballet.",
    estado: "Activa",
    ultimaActualizacion: "2024-04-12 16:45:00",
  },
  {
    id: "cat-3",
    numeroId: 3,
    nombre: "Conferencias & Tech",
    descripcion: "Cumbres de tecnología, foros empresariales, congresos y networking.",
    estado: "Activa",
    ultimaActualizacion: "2024-04-14 09:10:30",
  },
  {
    id: "cat-4",
    numeroId: 4,
    nombre: "Deportes & Maratones",
    descripcion: "Competiciones deportivas oficiales, maratones, torneos y exhibiciones.",
    estado: "Activa",
    ultimaActualizacion: "2024-04-15 13:05:40",
  },
  {
    id: "cat-5",
    numeroId: 5,
    nombre: "Gastronomía & Ferias",
    descripcion: "Festivales culinarios representativos, catas de vino y ferias gastronómicas.",
    estado: "Inactiva",
    ultimaActualizacion: "2024-04-16 10:00:00",
  },
  {
    id: "cat-6",
    numeroId: 6,
    nombre: "Cine & Entretenimiento",
    descripcion: "Festivales de cortometrajes independientes, proyecciones y alfombras rojas.",
    estado: "Activa",
    ultimaActualizacion: "2024-04-16 14:15:10",
  },
];

let categoriesMemory: AdminCategory[] = [...MOCK_CATEGORIES];

export const adminCategoriesService = {
  async getCategories(): Promise<AdminCategory[]> {
    if (USE_MOCK_DATA) {
      return Promise.resolve([...categoriesMemory]);
    }
    const response = await axios.get<AdminCategory[]>(API_BASE_URL);
    return response.data;
  },

  async createCategory(formData: CategoryFormData): Promise<AdminCategory> {
    if (USE_MOCK_DATA) {
      const nextNum =
        categoriesMemory.length > 0
          ? Math.max(...categoriesMemory.map((c) => c.numeroId)) + 1
          : 1;

      const nueva: AdminCategory = {
        id: `cat-${Date.now()}`,
        numeroId: nextNum,
        nombre: formData.nombre.trim(),
        descripcion: formData.descripcion.trim(),
        estado: formData.estado,
        ultimaActualizacion: getFormattedDateTime(),
      };

      categoriesMemory = [nueva, ...categoriesMemory];
      return Promise.resolve(nueva);
    }
    const response = await axios.post<AdminCategory>(API_BASE_URL, formData);
    return response.data;
  },

  async updateCategory(id: string, formData: CategoryFormData): Promise<AdminCategory> {
    if (USE_MOCK_DATA) {
      const index = categoriesMemory.findIndex((c) => c.id === id);
      if (index === -1) throw new Error("Categoría no encontrada");

      const actualizada: AdminCategory = {
        ...categoriesMemory[index],
        nombre: formData.nombre.trim(),
        descripcion: formData.descripcion.trim(),
        estado: formData.estado,
        ultimaActualizacion: getFormattedDateTime(),
      };

      categoriesMemory[index] = actualizada;
      return Promise.resolve(actualizada);
    }
    const response = await axios.put<AdminCategory>(`${API_BASE_URL}/${id}`, formData);
    return response.data;
  },

  async toggleCategoryStatus(id: string, nuevoEstado: CategoryStatus): Promise<AdminCategory> {
    if (USE_MOCK_DATA) {
      const index = categoriesMemory.findIndex((c) => c.id === id);
      if (index === -1) throw new Error("Categoría no encontrada");

      const actualizada: AdminCategory = {
        ...categoriesMemory[index],
        estado: nuevoEstado,
        ultimaActualizacion: getFormattedDateTime(),
      };

      categoriesMemory[index] = actualizada;
      return Promise.resolve(actualizada);
    }
    const response = await axios.patch<AdminCategory>(`${API_BASE_URL}/${id}/status`, {
      estado: nuevoEstado,
    });
    return response.data;
  },
};
