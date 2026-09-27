import PublicHeader from "@/shared/components/PublicHeader";
import { Outlet } from "react-router-dom";
import UserHeader from "@/shared/components/UserHeader";
import { useAuth } from "@/context/AuthContext";

export default function MainLayout() {
  const { isAuthenticated } = useAuth();

return (
    <div className="min-h-screen bg-slate-50">
      {isAuthenticated ? <UserHeader /> : <PublicHeader />}

      <main className="pt-20">
        <Outlet />
      </main>
    </div>
  );