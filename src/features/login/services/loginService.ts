import type {
  LoginRequest,
  LoginResponse,
} from "../types/login.types";

import {
  findUserByEmail,
} from "../../../shared/services/mockUserStorage";

export async function login(
  data: LoginRequest
): Promise<LoginResponse> {

  // Buscar usuario registrado localmente
  const user = findUserByEmail(data.email);

  if (!user) {
    throw new Error("INVALID_CREDENTIALS");
  }

  // Validar contraseña
  if (user.password !== data.password) {
    throw new Error("INVALID_CREDENTIALS");
  }

  // Generar token simulado
  const accessToken =
    `eventia-mock-token-${user.id}-${Date.now()}`;

  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    accessToken,
    message: "Inicio de sesión exitoso",
  };
}