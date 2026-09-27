import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { X } from "lucide-react";
import type { AdminUser, UserFormData, UserRole } from "../types/admin.types";

interface UserModalProps {
  open: boolean;
  userToEdit: AdminUser | null;
  onClose: () => void;
  onSave: (form: UserFormData) => void;
}

const EMPTY_FORM: UserFormData = {
  nombre: "",
  email: "",
  dni: "",
  telefono: "",
  rol: "Cliente",
};

export default function UserModal({
  open,
  userToEdit,
  onClose,
  onSave,
}: UserModalProps) {
  const [form, setForm] = useState<UserFormData>(EMPTY_FORM);

  useEffect(() => {
    if (userToEdit) {
      setForm({
        nombre: userToEdit.nombre,
        email: userToEdit.email,
        dni: userToEdit.dni,
        telefono: userToEdit.telefono,
        rol: userToEdit.rol,
      });
    } else {
      setForm(EMPTY_FORM);
    }
  }, [userToEdit, open]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const isEditing = Boolean(userToEdit);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  const roles: UserRole[] = ["Organizador", "Cliente"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/30 p-6 z-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-display font-bold text-lg text-on-surface">
              {isEditing ? "Editar Usuario" : "Nuevo Usuario"}
            </h2>
            <p className="text-xs text-on-surface-variant mt-0.5">
              {isEditing
                ? "Modifica los datos del usuario seleccionado."
                : "Completa los datos para registrar un nuevo usuario."}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-on-surface-variant mb-1.5">
              Nombre completo
            </label>
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              required
              placeholder="Ej. Mario Vargas Llosa"
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-outline-variant/40 bg-surface-container-low text-on-surface placeholder-on-surface-variant/50 outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/10 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-on-surface-variant mb-1.5">
              Correo electrónico
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="correo@ejemplo.com"
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-outline-variant/40 bg-surface-container-low text-on-surface placeholder-on-surface-variant/50 outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/10 transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-on-surface-variant mb-1.5">
                DNI / RUC
              </label>
              <input
                type="text"
                name="dni"
                value={form.dni}
                onChange={handleChange}
                required
                placeholder="12345678"
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-outline-variant/40 bg-surface-container-low text-on-surface placeholder-on-surface-variant/50 outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/10 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-on-surface-variant mb-1.5">
                Teléfono
              </label>
              <input
                type="text"
                name="telefono"
                value={form.telefono}
                onChange={handleChange}
                required
                placeholder="+51 999 999 999"
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-outline-variant/40 bg-surface-container-low text-on-surface placeholder-on-surface-variant/50 outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/10 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-on-surface-variant mb-1.5">
              Rol asignado
            </label>
            <select
              name="rol"
              value={form.rol}
              onChange={handleChange}
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-outline-variant/40 bg-surface-container-low text-on-surface outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/10 transition-all cursor-pointer"
            >
              {roles.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold text-on-surface-variant border border-outline-variant/40 hover:bg-surface-container transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-sm font-bold bg-primary text-on-primary hover:opacity-90 transition-opacity"
            >
              {isEditing ? "Guardar cambios" : "Registrar usuario"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
