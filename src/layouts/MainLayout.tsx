import PublicHeader from "@/shared/components/PublicHeader";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <PublicHeader />

      <main className="pt-20">
        <Outlet />
      </main>
    </div>
  );
}