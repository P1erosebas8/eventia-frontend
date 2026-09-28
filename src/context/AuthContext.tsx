import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import {
  getStoredUsers,
  type StoredUser,
} from "../shared/services/mockUserStorage";

interface AuthContextType {
  isAuthenticated: boolean;
  user: StoredUser | null;
  login: (token: string, userData?: StoredUser) => void;
  logout: () => void;
  updateUser: (updatedUser: StoredUser) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

function resolveUserFromToken(token: string | null): StoredUser | null {
  if (!token) return null;

  // 1. Respaldo directo si el objeto de usuario está persistido en la sesión local
  try {
    const cached = localStorage.getItem("eventia_current_user");
    if (cached) {
      const parsed = JSON.parse(cached);
      if (parsed && parsed.id && parsed.email) {
        return parsed;
      }
    }
  } catch {
    // Continuar a resolver por token
  }

  // 2. Intentar decodificar nuevo token seguro (Base64 JSON)
  try {
    const decoded = JSON.parse(decodeURIComponent(atob(token)));
    if (decoded && (decoded.id || decoded.email)) {
      const users = getStoredUsers();
      const matched = users.find(
        (u) =>
          String(u.id) === String(decoded.id) ||
          (decoded.email && u.email.toLowerCase() === String(decoded.email).toLowerCase())
      );
      if (matched) return matched;
    }
  } catch {
    // Continuar a fallback de token legado
  }

  // 3. Respaldo para tokens legados: eventia-mock-token-{userId}-{timestamp}
  const prefix = "eventia-mock-token-";
  if (token.startsWith(prefix)) {
    const withoutPrefix = token.slice(prefix.length);
    const lastDash = withoutPrefix.lastIndexOf("-");
    const idPart = lastDash !== -1 ? withoutPrefix.slice(0, lastDash) : withoutPrefix;
    const users = getStoredUsers();
    return (
      users.find((u) => String(u.id) === String(idPart)) ?? null
    );
  }

  return null;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem("accessToken") !== null
  );
  const [user, setUser] = useState<StoredUser | null>(() =>
    resolveUserFromToken(localStorage.getItem("accessToken"))
  );

  const login = (token: string, userData?: StoredUser) => {
    localStorage.setItem("accessToken", token);
    const resolvedUser = userData || resolveUserFromToken(token);
    if (resolvedUser) {
      localStorage.setItem("eventia_current_user", JSON.stringify(resolvedUser));
    }
    setIsAuthenticated(true);
    setUser(resolvedUser);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("eventia_current_user");
    setIsAuthenticated(false);
    setUser(null);
  };

  const updateUser = (updatedUser: StoredUser) => {
    localStorage.setItem("eventia_current_user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth debe utilizarse dentro de un AuthProvider"
    );
  }

  return context;
}