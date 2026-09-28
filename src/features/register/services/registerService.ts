import api from "../../../shared/services/api";

import type {
  RegisterRequest,
  RegisterResponse,
} from "../types/register.types";

import {
  saveUser,
  findUserByEmail,
} from "../../../shared/services/mockUserStorage";

export async function register(
  data: RegisterRequest
): Promise<RegisterResponse> {

  // Verifica si ya existe localmente
  const existingUser = findUserByEmail(data.email);

  if (existingUser) {
    throw new Error(
      "Ya existe una cuenta con este correo electrónico."
    );
  }

  // Guardar usuario localmente y sincronizar
  const user = saveUser(data);

  try {
    // Registrar también en admin_users de json-server para que aparezca en el panel de administración
    await api.post("/admin_users", {
      id: String(user.id),
      codigo: `#${Math.floor(Math.random() * 9000) + 1000}`,
      nombre: `${data.firstName} ${data.lastName}`.trim(),
      email: data.email.trim(),
      dni: data.documentNumber || "",
      telefono: data.phoneNumber || "",
      rol: "Cliente",
      iniciales: `${data.firstName[0] || ""}${data.lastName[0] || ""}`.toUpperCase() || "CL",
      fechaRegistro: new Date().toLocaleDateString("es-PE"),
      estado: "Activo",
      password: data.password,
    }).catch(() => {});

    // Simulamos el registro mediante la API dummy estándar
    await api.post("/users/add", {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      username:
        data.email.split("@")[0] ||
        data.firstName.toLowerCase(),
      password: data.password,
    }).catch(() => {});

  } catch (error) {
    console.warn(
      "La API dummy no está disponible. Continuando con almacenamiento local.",
      error
    );
  }

  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    accessToken: "",
    message: "Cuenta creada exitosamente",
  };
}