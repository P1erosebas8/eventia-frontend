import { Ticket } from "lucide-react";

export default function MisTicketsPage() {
  return (
    <div className="max-w-[1280px] mx-auto px-6 py-10">
      <div className="flex items-center gap-3 mb-6">
        <Ticket className="h-8 w-8 text-indigo-600" />
        <h1 className="text-3xl font-extrabold text-slate-900">Mis Tickets</h1>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <p className="text-slate-600">Aquí se mostrarán tus entradas y tickets comprados.</p>
      </div>
    </div>
  );
}
