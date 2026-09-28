export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  id: number | string;
  firstName: string;
  lastName: string;
  email: string;
  rol: string;
  message: string;
}