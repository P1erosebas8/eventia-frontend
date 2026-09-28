import { PROMO_DISCOUNT_PCT } from "../utils/promo.utils";

interface HeroPromoProps {
  userName: string;
}

/**
 * Banner de promo. La página solo lo monta si la sesión califica, por eso
 * aquí se asume elegibilidad y se personaliza con el primer nombre.
 */
export default function HeroPromo({ userName }: HeroPromoProps) {
  const firstName = userName.trim().split(/\s+/)[0];

  return (
    <div className="rounded-xl bg-gradient-to-r from-primary via-primary-container to-tertiary text-on-primary px-4 sm:px-5 py-3 shadow-md flex items-center gap-3 min-w-0 overflow-hidden">
      <span className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0">
        <span className="material-symbols-outlined text-[22px]">bolt</span>
      </span>
      <p className="text-sm sm:text-base font-semibold truncate min-w-0 flex-1">
        ¡{firstName}, tienes {PROMO_DISCOUNT_PCT}% de descuento en eventos seleccionados!
      </p>
      <span className="font-display font-extrabold text-xl sm:text-2xl shrink-0 whitespace-nowrap">
        -{PROMO_DISCOUNT_PCT}%
      </span>
    </div>
  );
}
