import { isPromoUser, PROMO_DISCOUNT_PCT } from "../../events/services/events.service";

interface PromoBannerProps {
  userName: string;
}

/**
 * Banner de promo del detalle. Se personaliza si la sesión califica;
 * en otro caso muestra la condición (Roberto o Gerónimo).
 */
export default function PromoBanner({ userName }: PromoBannerProps) {
  const eligible = isPromoUser(userName);
  const firstName = userName.trim().split(/\s+/)[0];

  return (
    <div className="rounded-xl bg-gradient-to-r from-tertiary-container via-primary-container to-primary p-4 text-white shadow-sm flex items-center justify-between gap-4 min-w-0 overflow-hidden">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-[28px]">bolt</span>
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] uppercase font-bold tracking-wider bg-white/20 px-2 py-0.5 rounded whitespace-nowrap">
              Promo Roberto & Gerónimo
            </span>
          </div>
          <p className="font-display font-bold text-base sm:text-lg mt-0.5 break-words">
            {eligible && firstName
              ? `¡${firstName}, tienes ${PROMO_DISCOUNT_PCT}% OFF en todas las localidades!`
              : `${PROMO_DISCOUNT_PCT}% OFF para usuarios llamados Roberto o Gerónimo`}
          </p>
          <p className="text-sm text-white/90 break-words">
            El beneficio se calcula de inmediato en el resumen de compra.
          </p>
        </div>
      </div>
      <div className="hidden sm:block text-right shrink-0">
        <span className="font-display font-extrabold text-4xl block leading-none">-15%</span>
        <span className="text-[11px] text-white/80">AUTO</span>
      </div>
    </div>
  );
}
