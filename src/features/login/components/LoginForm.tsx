import { useState } from "react";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { login } from "../services/loginService";
import type { LoginRequest } from "../types/login.types";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const { login: authenticate } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState<LoginRequest>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const data = await login(form);

      authenticate(data.accessToken, {
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        rol: data.rol,
      });

      // Redirigir según el rol del usuario:
      if (data.rol === "ADMIN") {
        navigate("/admin/monitoreo");
      } else if (data.rol === "ORGANIZER") {
        navigate("/organizador/dashboard");
      } else {
        navigate("/");
      }

    } catch (error) {
      if (
        error instanceof Error &&
        error.message === "INVALID_CREDENTIALS"
      ) {
        setError("Correo o contraseña incorrectos.");
      } else {
        setError(
          "Ocurrió un error inesperado. Inténtalo nuevamente."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = (email: string) => {
    setForm({
      email,
      password: "Password123!",
    });
    setError("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      {/* Correo */}
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-bold text-slate-800"
        >
          Correo electrónico
        </label>

        <div className="relative">
          <Mail
            className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
          />

          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="ej. usuario@eventia.com"
            required
            className="w-full rounded-lg border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>
      </div>

      {/* Contraseña */}
      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-bold text-slate-800"
        >
          Contraseña
        </label>

        <div className="relative">
          <Lock
            className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
          />

          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
            required
            className="w-full rounded-lg border border-slate-200 bg-white py-3 pl-11 pr-11 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword((value) => !value)
            }
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
            aria-label={
              showPassword
                ? "Ocultar contraseña"
                : "Mostrar contraseña"
            }
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Botón */}
      <button
        type="submit"
        disabled={loading}
        className="flex w-full items-center justify-center rounded-lg bg-indigo-600 px-4 py-3 text-sm font-bold text-white shadow-md transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading
          ? "Iniciando sesión..."
          : "Iniciar Sesión"}
      </button>

      {/* Cuentas de Acceso Rápido para Pruebas */}
      <div className="pt-4 border-t border-slate-100 space-y-2">
        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 text-center">
          Cuentas demo para pruebas rápidas
        </p>
        <div className="grid grid-cols-3 gap-1.5">
          <button
            type="button"
            onClick={() => handleFillDemo("rquispe@gmail.com")}
            className="px-2 py-1.5 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 border border-slate-200 rounded-lg text-[11px] font-semibold text-slate-600 transition truncate"
            title="Cliente: rquispe@gmail.com"
          >
            👤 Cliente
          </button>
          <button
            type="button"
            onClick={() => handleFillDemo("contacto@marioeventos.pe")}
            className="px-2 py-1.5 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 border border-slate-200 rounded-lg text-[11px] font-semibold text-slate-600 transition truncate"
            title="Organizador: contacto@marioeventos.pe"
          >
            🎪 Organizador
          </button>
          <button
            type="button"
            onClick={() => handleFillDemo("vmendoza@eventia.pe")}
            className="px-2 py-1.5 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 border border-slate-200 rounded-lg text-[11px] font-semibold text-slate-600 transition truncate"
            title="Admin: vmendoza@eventia.pe"
          >
            🛡️ Admin
          </button>
        </div>
      </div>
    </form>
  );
}
