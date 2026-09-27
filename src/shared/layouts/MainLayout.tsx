import { Link, Outlet } from "react-router-dom";
import Header from "./Header";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-surface overflow-x-hidden">
      <Header
        action={
          <Link
            to="/login"
            className="px-3.5 py-1.5 rounded-lg bg-primary text-on-primary text-xs font-semibold shadow-sm hover:opacity-90 transition whitespace-nowrap"
          >
            Iniciar Sesión
          </Link>
        }
      />

      <main className="pt-16 min-w-0">
        <Outlet />
      </main>
    </div>
  );
}
