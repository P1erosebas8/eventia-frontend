import type { RegisterRequest } from "@/features/register/types/register.types";

export interface StoredUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  rol: string;
  documentType?: string;
  documentNumber?: string;
  birthDate?: string;
  phoneNumber?: string;
}

const STORAGE_KEY = "user";

export function getStoredUsers(): StoredUser[] {
  if (typeof window !== "undefined" && localStorage.getItem("eventia_users")) {
    localStorage.removeItem("eventia_users");
  }

  const users = localStorage.getItem(STORAGE_KEY);

  if (!users) {
    return [];
  }

  try {
    const parsed = JSON.parse(users);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    if (typeof parsed === "object" && parsed !== null) {
      return [parsed];
    }
    return [];
  } catch {
    return [];
  }
}

export function saveUser(data: RegisterRequest): StoredUser {
  if (typeof window !== "undefined" && localStorage.getItem("eventia_users")) {
    localStorage.removeItem("eventia_users");
  }

  const users = getStoredUsers();

  const newUser: StoredUser = {
    id: Date.now(),
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: data.password,
    rol: "USER",
    documentType: data.documentType,
    documentNumber: data.documentNumber,
    birthDate: data.birthDate,
    phoneNumber: data.phoneNumber,
  };

  users.push(newUser);

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(users)
  );

  return newUser;
}

export function findUserByEmail(
  email: string
): StoredUser | undefined {
  const users = getStoredUsers();

  return users.find(
    (user) =>
      user.email && user.email.toLowerCase() === email.toLowerCase()
  );
}