export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}