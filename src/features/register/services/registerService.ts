import api from "../../../shared/services/api";
import type {
  RegisterRequest,
  RegisterResponse,
} from "../types/register.types";

export async function register(
  data: RegisterRequest
): Promise<RegisterResponse> {
  try {
    const response = await api.post("/users/add", {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      username: data.email.split("@")[0] || data.firstName.toLowerCase(),
      password: data.password,
    });

    return {
      id: response.data?.id || Date.now(),
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      accessToken: "dummy-register-token-" + Date.now(),
      message: "Registro exitoso",
    };
  } catch (error) {
    console.warn("Falló llamada a API dummy, retornando respuesta simulada de éxito:", error);
    // Simular retardo de red de API dummy
    await new Promise((resolve) => setTimeout(resolve, 800));

    return {
      id: Date.now(),
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      accessToken: "dummy-register-token-" + Date.now(),
      message: "Cuenta creada exitosamente",
    };
  }
}
