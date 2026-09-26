import { useEffect, useState } from "react";
import CategoriesHeader from "../components/CategoriesHeader";
import CategoriesTable from "../components/CategoriesTable";
import CategoryModal from "../components/CategoryModal";
import { adminCategoriesService } from "../services/adminCategoriesService";
import type { AdminCategory, CategoryFormData } from "../types/admin.types";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<AdminCategory | null>(null);

  useEffect(() => {
    adminCategoriesService.getCategories().then(setCategories);
  }, []);

  const handleNuevaCategoria = () => {
    setCategoryToEdit(null);
    setModalOpen(true);
  };

  const handleEdit = (category: AdminCategory) => {
    setCategoryToEdit(category);
    setModalOpen(true);
  };

  const handleSave = async (formData: CategoryFormData) => {
    if (categoryToEdit) {
      const actualizada = await adminCategoriesService.updateCategory(
        categoryToEdit.id,
        formData
      );
      setCategories((prev) =>
        prev.map((c) => (c.id === actualizada.id ? actualizada : c))
      );
    } else {
      const nueva = await adminCategoriesService.createCategory(formData);
      setCategories((prev) => [nueva, ...prev]);
    }
    setModalOpen(false);
  };

  const handleToggleStatus = async (category: AdminCategory) => {
    const nuevoEstado = category.estado === "Activa" ? "Inactiva" : "Activa";
    const actualizada = await adminCategoriesService.toggleCategoryStatus(
      category.id,
      nuevoEstado
    );
    setCategories((prev) =>
      prev.map((c) => (c.id === actualizada.id ? actualizada : c))
    );
  };

  return (
    <div className="w-full pb-12 space-y-6">
      {/* Cabecera con título y botón para registrar nueva categoría */}
      <CategoriesHeader onNuevaCategoria={handleNuevaCategoria} />

      {/* Catálogo completo sin recorte ni scroll incómodo */}
      <CategoriesTable
        categories={categories}
        onEdit={handleEdit}
        onToggleStatus={handleToggleStatus}
      />

      {/* Modal para crear o editar categoría */}
      <CategoryModal
        open={modalOpen}
        categoryToEdit={categoryToEdit}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}
