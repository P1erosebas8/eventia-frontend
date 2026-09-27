import { useEffect, useState } from "react";
import UserModal from "../components/UserModal";
import UsersFilters from "../components/UsersFilters";
import UsersHeader from "../components/UsersHeader";
import UsersTable from "../components/UsersTable";
import { adminUsersService } from "../services/adminUsersService";
import type { AdminUser, UserFormData, UserRole, UserStatus } from "../types/admin.types";

type RoleFilter = UserRole | "Todos";
type StatusFilter = UserStatus | "Todos";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("Todos");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("Todos");
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState<AdminUser | null>(null);

  useEffect(() => {
    adminUsersService.getUsers().then(setUsers);
  }, []);

  const q = search.trim().toLowerCase();
  const filteredUsers = users.filter((u) => {
    if (roleFilter !== "Todos" && u.rol !== roleFilter) return false;
    if (statusFilter !== "Todos" && u.estado !== statusFilter) return false;
    if (q && !`${u.nombre} ${u.email} ${u.dni}`.toLowerCase().includes(q)) return false;
    return true;
  });

  const handleToggleStatus = async (user: AdminUser) => {
    const nuevoEstado = user.estado === "Activo" ? "Inactivo" : "Activo";
    const actualizado = await adminUsersService.toggleUserStatus(user.id, nuevoEstado);
    setUsers((prev) => prev.map((u) => (u.id === actualizado.id ? actualizado : u)));
  };

  const handleEdit = (user: AdminUser) => {
    setUserToEdit(user);
    setModalOpen(true);
  };

  const handleNuevoUsuario = () => {
    setUserToEdit(null);
    setModalOpen(true);
  };

  const handleSave = async (form: UserFormData) => {
    if (userToEdit) {
      const actualizado = await adminUsersService.updateUser(userToEdit.id, form);
      setUsers((prev) => prev.map((u) => (u.id === actualizado.id ? actualizado : u)));
    } else {
      const nuevo = await adminUsersService.createUser(form);
      setUsers((prev) => [...prev, nuevo]);
    }
    setModalOpen(false);
  };

  return (
    <div className="w-full pb-12 space-y-6">
      <UsersHeader onNuevoUsuario={handleNuevoUsuario} />

      <UsersFilters
        users={users}
        roleFilter={roleFilter}
        statusFilter={statusFilter}
        search={search}
        onRoleFilter={setRoleFilter}
        onStatusFilter={setStatusFilter}
        onSearch={setSearch}
      />

      <UsersTable
        users={filteredUsers}
        onToggleStatus={handleToggleStatus}
        onEdit={handleEdit}
      />

      <UserModal
        open={modalOpen}
        userToEdit={userToEdit}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}
