import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function UserLayout() {
  return (
    <div className="min-h-screen bg-surface overflow-x-hidden">
      <Header />

      <main className="pt-16 min-w-0">
        <Outlet />
      </main>
    </div>
  );
}
