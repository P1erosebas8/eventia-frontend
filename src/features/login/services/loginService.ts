import type {
  LoginRequest,
  LoginResponse,
} from "../types/login.types";

import {
  findUserByEmail,
  saveOrganizerUser,
} from "../../../shared/services/mockUserStorage";
import api from "../../../shared/services/api";
import db from "../../../../db.json";

export async function login(
  data: LoginRequest
): Promise<LoginResponse> {
  const emailQuery = data.email.trim().toLowerCase();

  // 1. Buscar usuario registrado localmente en storage
  let user = findUserByEmail(emailQuery);

  // 2. Si no se encuentra en storage, buscar en la colección admin_users de la API o db.json
  if (!user) {
    let adminUserRow: any = null;
    try {
      const response = await api.get<any[]>("/admin_users");
      if (Array.isArray(response.data)) {
        adminUserRow = response.data.find(
          (u) => u.email && u.email.trim().toLowerCase() === emailQuery
        );
      }
    } catch {
      // Ignorar error API
    }

    if (!adminUserRow && (db as any).admin_users) {
      adminUserRow = (db as any).admin_users.find(
        (u: any) => u.email && u.email.trim().toLowerCase() === emailQuery
      );
    }

    if (adminUserRow) {
      const expectedPassword = adminUserRow.password || "Password123!";
      if (data.password !== expectedPassword) {
        throw new Error("INVALID_CREDENTIALS");
      }

      // Sincronizar en local storage
      const roleMapped =
        adminUserRow.rol?.toUpperCase() === "ORGANIZADOR" ||
        adminUserRow.rol?.toUpperCase() === "ORGANIZER"
          ? "ORGANIZER"
          : adminUserRow.rol?.toUpperCase() === "ADMIN"
          ? "ADMIN"
          : "USER";

      user = saveOrganizerUser({
        nombre: adminUserRow.nombre,
        email: adminUserRow.email,
        dni: adminUserRow.dni,
        telefono: adminUserRow.telefono,
        password: expectedPassword,
      });
      user.rol = roleMapped;
    }
  }

  if (!user) {
    throw new Error("INVALID_CREDENTIALS");
  }

  // Validar contraseña
  if (user.password !== data.password) {
    throw new Error("INVALID_CREDENTIALS");
  }

  // Generar token simulado seguro
  const accessToken = btoa(
    encodeURIComponent(
      JSON.stringify({
        id: user.id,
        email: user.email,
        rol: user.rol || "USER",
        timestamp: Date.now(),
      })
    )
  );

  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    rol: user.rol || "USER",
    accessToken,
    message: "Inicio de sesión exitoso",
  };
}