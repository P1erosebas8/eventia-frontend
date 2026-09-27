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

  try {
    // Simulamos el registro mediante la API dummy
    await api.post("/users/add", {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      username:
        data.email.split("@")[0] ||
        data.firstName.toLowerCase(),
      password: data.password,
    });

  } catch (error) {
    console.warn(
      "La API dummy no está disponible. Continuando con almacenamiento local.",
      error
    );

    // No detenemos el registro porque nuestro almacenamiento
    // local será el que permita posteriormente iniciar sesión.
  }

  // Guardar usuario localmente
  const user = saveUser(data);

  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    accessToken: "",
    message: "Cuenta creada exitosamente",
  };
}