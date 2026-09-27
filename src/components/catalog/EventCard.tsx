import { Link } from "react-router-dom";
import { formatoPrecio, type Evento } from "../../data/events";

function esUrgente(pct: number) {
  return pct >= 85;
}

export default function EventCard({ evento, vista }: { evento: Evento; vista: "grid" | "lista" }) {
  const urgente = esUrgente(evento.vendidoPct);
  return (
    <article
      className={`bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex group relative ${
        vista === "lista" ? "flex-row" : "flex-col"
      }`}
    >
      <div
        className={`relative overflow-hidden bg-surface-container-high shrink-0 ${
          vista === "lista" ? "w-56 aspect-auto min-h-full" : "w-full aspect-video"
        }`}
      >
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 absolute inset-0"
          src={evento.imagen}
          alt={evento.titulo}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
        <span className="absolute top-3 left-3 bg-primary-container/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider shadow-sm">
          {evento.etiqueta}
        </span>
        {evento.alerta && (
          <span
            className={`absolute top-3 right-3 text-[11px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1 shadow-sm ${
              urgente ? "bg-secondary text-on-secondary" : "bg-surface-container-highest text-on-surface"
            }`}
          >
            {urgente && <span className="material-symbols-outlined text-[14px]">local_fire_department</span>}
            {evento.alerta}
          </span>
        )}
        {evento.rn01 && (
          <div className="absolute bottom-3 left-3 bg-surface/90 backdrop-blur-md px-2 py-0.5 rounded text-on-surface text-[11px] font-bold flex items-center gap-1">
            <span className="material-symbols-outlined text-secondary text-[14px]">percent</span> RN01
            Aplicable
          </div>
        )}
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="bg-surface-container flex flex-col items-center justify-center min-w-[50px] py-1.5 px-2 rounded-lg text-center">
            <span className="text-[11px] uppercase font-bold text-primary">{evento.mes}</span>
            <span className="font-display font-extrabold text-xl leading-none">{evento.dia}</span>
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <h3 className="font-display font-bold text-lg group-hover:text-primary transition-colors truncate">
              {evento.titulo}
            </h3>
            <div className="flex items-center gap-1 text-on-surface-variant text-sm mt-0.5 truncate">
              <span className="material-symbols-outlined text-[16px] text-outline">location_on</span>
              <span className="truncate">{evento.recinto}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-xs">
            <span className="text-outline">Disponibilidad en taquilla</span>
            <span className={`font-bold ${urgente ? "text-secondary" : "text-on-surface-variant"}`}>
              {evento.vendidoPct}% vendido
            </span>
          </div>
          <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
            <div
              className={`${urgente ? "bg-secondary" : "bg-primary"} h-full rounded-full`}
              style={{ width: `${evento.vendidoPct}%` }}
            ></div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[11px] text-outline uppercase font-medium">Desde</span>
            <span className="font-display font-bold text-[1.4rem] text-primary">
              {formatoPrecio(evento.precio)}
            </span>
          </div>
          <Link
            to={`/evento/${evento.id}`}
            className="px-4 py-2 bg-primary hover:opacity-90 text-on-primary rounded-lg text-sm font-bold shadow-sm transition-all"
          >
            Comprar Entradas
          </Link>
        </div>
      </div>
    </article>
  );
}
