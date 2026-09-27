import { Outlet } from "react-router-dom";
import UserHeader from "../shared/components/UserHeader";

export default function UserLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <UserHeader />

      <main className="pt-20">
        <Outlet />
      </main>
    </div>
  );
}