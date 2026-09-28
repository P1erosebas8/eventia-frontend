import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Ticket, Calendar, MapPin, CheckCircle2, QrCode, Sparkles, AlertCircle } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { userTicketsService } from "../services/userTicketsService";
import type { UserTicket } from "../../checkout/services/checkoutService";

export default function MisTicketsPage() {
  const location = useLocation();
  const { user } = useAuth();
  const [tickets, setTickets] = useState<UserTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"ALL" | "VIGENTE" | "USADO">("ALL");
  const [selectedQr, setSelectedQr] = useState<UserTicket | null>(null);

  const purchaseSuccess = location.state?.purchaseSuccess;
  const newTicketsCount = location.state?.ticketsCount;

  useEffect(() => {
    async function loadTickets() {
      try {
        setLoading(true);
        const data = await userTicketsService.getUserTickets(user?.id);
        setTickets(data);
      } catch (err) {
        console.error("Error cargando tickets:", err);
      } finally {
        setLoading(false);
      }
    }
    loadTickets();
  }, [user]);

  const filteredTickets = tickets.filter((t) => {
    if (filter === "ALL") return true;
    return t.status === filter;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-8">
        {/* Banner de Compra Exitosa */}
        {purchaseSuccess && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 flex items-start gap-4 shadow-sm animate-fade-in">
            <div className="p-2 bg-emerald-100 text-emerald-600 rounded-xl">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-extrabold text-emerald-900 text-base">
                ¡Compra procesada con éxito!
              </h3>
              <p className="text-sm text-emerald-700">
                Se han emitido {newTicketsCount || "tus"} entradas con código QR único. Ya están listas para ser presentadas en el acceso al evento.
              </p>
            </div>
          </div>
        )}

        {/* Encabezado Principal */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-md shadow-indigo-100">
              <Ticket className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                Mis Entradas
              </h1>
              <p className="text-sm font-medium text-slate-500">
                Consulta tus accesos nominados y códigos QR de ingreso a los eventos
              </p>
            </div>
          </div>

          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-extrabold text-indigo-600 border border-indigo-200 shadow-sm hover:bg-indigo-50 transition"
          >
            <Sparkles className="h-4 w-4" />
            Explorar más eventos
          </Link>
        </div>

        {/* Filtros de Estado */}
        <div className="flex items-center gap-2">
          {(
            [
              { id: "ALL", label: "Todas las entradas" },
              { id: "VIGENTE", label: "Vigentes" },
              { id: "USADO", label: "Usadas / Anuladas" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilter(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                filter === tab.id
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Listado de Entradas */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-400">
            <div className="w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs font-semibold">Cargando tus entradas...</p>
          </div>
        ) : filteredTickets.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm space-y-4 max-w-md mx-auto">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <Ticket className="h-7 w-7" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-800">
              No se encontraron entradas
            </h3>
            <p className="text-xs text-slate-500">
              {filter === "ALL"
                ? "Aún no tienes entradas compradas. ¡Encuentra tu próximo concierto o festival en nuestro catálogo!"
                : "No hay entradas con el estado seleccionado."}
            </p>
            <div className="pt-2">
              <Link
                to="/"
                className="inline-block px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition"
              >
                Ver Catálogo
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredTickets.map((ticket) => (
              <div
                key={ticket.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition flex flex-col justify-between"
              >
                {/* Cabecera de la Entrada */}
                <div className="p-6 space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-1 rounded">
                      ID: {ticket.id}
                    </span>
                    <span
                      className={`text-xs font-extrabold px-2.5 py-1 rounded-full ${
                        ticket.status === "VIGENTE"
                          ? "bg-emerald-100 text-emerald-700"
                          : ticket.status === "USADO"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-rose-100 text-rose-700"
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900 leading-tight">
                      {ticket.event_title}
                    </h3>
                    <p className="text-xs font-bold text-indigo-600 mt-1 uppercase tracking-wide">
                      Zona: {ticket.ticket_type}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-slate-400 shrink-0" />
                      <span>{new Date(ticket.event_date).toLocaleDateString("es-PE", { dateStyle: "long" })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-slate-400 shrink-0" />
                      <span className="truncate">{ticket.venue}</span>
                    </div>
                  </div>
                </div>

                {/* Sección Desprendible con Código QR */}
                <div className="bg-slate-50 border-t border-dashed border-slate-200 p-4 flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Código de Acceso
                    </p>
                    <p className="text-xs font-mono font-bold text-slate-800 break-all">
                      {ticket.qr_code.slice(0, 18)}...
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedQr(ticket)}
                    className="flex items-center gap-1.5 px-3 py-2 bg-white text-indigo-600 border border-indigo-200 rounded-xl text-xs font-bold hover:bg-indigo-50 shadow-sm transition shrink-0"
                  >
                    <QrCode className="h-4 w-4" />
                    Ver QR
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal de Código QR para el ingreso */}
        {selectedQr && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl space-y-6 text-center animate-scale-up">
              <div className="space-y-1">
                <h3 className="text-lg font-black text-slate-900">
                  {selectedQr.event_title}
                </h3>
                <p className="text-xs font-bold text-indigo-600 uppercase">
                  Zona: {selectedQr.ticket_type}
                </p>
              </div>

              {/* Generador Visual de QR */}
              <div className="p-6 bg-slate-50 rounded-2xl border-2 border-dashed border-indigo-200 flex flex-col items-center justify-center gap-3">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
                    selectedQr.qr_code
                  )}`}
                  alt="Código QR de Entrada"
                  className="w-44 h-44 rounded-lg bg-white p-2 shadow-xs"
                />
                <span className="text-[11px] font-mono text-slate-500 font-semibold break-all px-2">
                  {selectedQr.qr_code}
                </span>
              </div>

              <div className="text-xs text-slate-500 flex items-center justify-center gap-1.5 bg-amber-50 text-amber-800 p-2.5 rounded-xl border border-amber-200">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>Presenta este código en la puerta de acceso al evento.</span>
              </div>

              <button
                type="button"
                onClick={() => setSelectedQr(null)}
                className="w-full py-3 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition shadow-md"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
