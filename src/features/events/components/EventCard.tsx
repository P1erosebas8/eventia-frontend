import { formatPrice } from "../services/events.service";
import type { CatalogEvent, ViewMode } from "../types/event.types";
import { getPromoPrice, isPromoUser, PROMO_DISCOUNT_PCT } from "../utils/promo.utils";

interface EventCardProps {
  event: CatalogEvent;
  view: ViewMode;
  userName: string;
}

function isUrgent(soldPct: number): boolean {
  return soldPct >= 85;
}

export default function EventCard({ event, view, userName }: EventCardProps) {
  const urgent = isUrgent(event.soldPct);
  const promoUser = isPromoUser(userName);
  const showDiscount = event.isPromoEligible && promoUser;
  const finalPrice = showDiscount ? getPromoPrice(event.price) : event.price;
  const isList = view === "list";

  return (
    <article
      className={`bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex group relative min-w-0 w-full ${
        isList ? "flex-col sm:flex-row" : "flex-col"
      }`}
    >
      <div
        className={`relative overflow-hidden bg-surface-container-high shrink-0 min-w-0 ${
          isList ? "w-full sm:w-52 lg:w-56 aspect-video sm:aspect-auto sm:min-h-[190px]" : "w-full aspect-video"
        }`}
      >
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 absolute inset-0"
          src={event.image}
          alt={event.title}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none"></div>
        {event.tag && (
          <span className="absolute top-3 left-3 bg-primary-container/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider shadow-sm max-w-[45%] truncate">
            {event.tag}
          </span>
        )}
        {event.badge && (
          <span
            className={`absolute top-3 right-3 text-[11px] font-bold px-2.5 py-1 rounded-md items-center gap-1 shadow-sm max-w-[45%] truncate hidden min-[380px]:flex ${
              urgent ? "bg-secondary text-on-secondary" : "bg-surface-container-highest text-on-surface"
            }`}
          >
            {urgent && (
              <span className="material-symbols-outlined text-[14px] shrink-0">
                local_fire_department
              </span>
            )}
            <span className="truncate">{event.badge}</span>
          </span>
        )}
        {event.isPromoEligible && (
          <div className="absolute bottom-3 left-3 bg-surface/90 backdrop-blur-md px-2 py-0.5 rounded text-on-surface text-[11px] font-bold flex items-center gap-1 max-w-[calc(100%-1.5rem)]">
            <span className="material-symbols-outlined text-secondary text-[14px] shrink-0">
              percent
            </span>
            <span className="truncate">{PROMO_DISCOUNT_PCT}% promo</span>
          </div>
        )}
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between gap-4 min-w-0">
        <div className="flex items-start gap-3 min-w-0">
          <div className="bg-surface-container flex flex-col items-center justify-center min-w-[50px] py-1.5 px-2 rounded-lg text-center shrink-0">
            <span className="text-[11px] uppercase font-bold text-primary">{event.month}</span>
            <span className="font-display font-extrabold text-xl leading-none">{event.day}</span>
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <h3 className="font-display font-bold text-base sm:text-lg group-hover:text-primary transition-colors break-words line-clamp-2 min-h-[3rem]">
              {event.title}
            </h3>
            <div className="flex items-center gap-1 text-on-surface-variant text-sm mt-0.5 min-w-0">
              <span className="material-symbols-outlined text-[16px] text-outline shrink-0">
                location_on
              </span>
              <span className="truncate">{event.venue}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1 min-w-0">
          <div className="flex justify-between gap-2 text-xs">
            <span className="text-outline truncate">Disponibilidad en taquilla</span>
            <span
              className={`font-bold whitespace-nowrap ${urgent ? "text-secondary" : "text-on-surface-variant"}`}
            >
              {event.soldPct}% vendido
            </span>
          </div>
          <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
            <div
              className={`${urgent ? "bg-secondary" : "bg-primary"} h-full rounded-full`}
              style={{ width: `${event.soldPct}%` }}
            ></div>
          </div>
        </div>

        <div className="flex items-end justify-between gap-2 flex-wrap min-w-0">
          <div className="flex flex-col min-w-0">
            <span className="text-[11px] text-outline uppercase font-medium">Desde</span>
            {showDiscount && (
              <span className="text-xs text-outline line-through">{formatPrice(event.price)}</span>
            )}
            <span className="font-display font-bold text-xl sm:text-[1.4rem] text-primary whitespace-nowrap">
              {formatPrice(finalPrice)}
            </span>
            {showDiscount && (
              <span className="text-[11px] text-primary font-semibold">
                15% aplicado para ti
              </span>
            )}
          </div>
          <button
            className="px-4 py-2 bg-primary hover:opacity-90 text-on-primary rounded-lg text-sm font-bold shadow-sm transition-all shrink-0"
            type="button"
          >
            Comprar Entradas
          </button>
        </div>
      </div>
    </article>
  );
}
