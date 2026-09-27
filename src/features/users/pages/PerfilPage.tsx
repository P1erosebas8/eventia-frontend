import { User } from "lucide-react";

export default function PerfilPage() {
  return (
    <div className="max-w-[1280px] mx-auto px-6 py-10">
      <div className="flex items-center gap-3 mb-6">
        <User className="h-8 w-8 text-indigo-600" />
        <h1 className="text-3xl font-extrabold text-slate-900">Mi Perfil</h1>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <p className="text-slate-600">Gestión de tu información personal y datos de cuenta.</p>
      </div>
    </div>
  );
}
