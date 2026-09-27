export type Role = "Administrador" | "Organizador" | "Staff" | "Cliente";
export type AccountStatus = "Activo" | "Suspendido";

export interface DirectoryUser {
  id: string;
  name: string;
  email: string;
  initials: string;
  role: Role;
  docLabel: string;
  docDetail: string;
  createdAt: string;
  status: AccountStatus;
}

export interface NewDirectoryUser {
  name: string;
  email: string;
  role: Role;
}
