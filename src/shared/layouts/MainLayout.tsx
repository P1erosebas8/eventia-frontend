import { Outlet } from "react-router-dom";
import PublicHeader from "./PublicHeader";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-surface overflow-x-hidden">
      <PublicHeader />

      <main className="pt-16 min-w-0">
        <Outlet />
      </main>
    </div>
  );
}
