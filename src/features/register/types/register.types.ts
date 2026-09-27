export interface RegisterRequest {
  firstName: string;
  lastName: string;
  documentType: string;
  documentNumber: string;
  birthDate: string;
  phonePrefix: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
  acceptPromotions: boolean;
}

export interface RegisterResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  accessToken?: string;
  message?: string;
}
