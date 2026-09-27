import { isPromoUser, PROMO_DISCOUNT_PCT } from "../utils/promo.utils";

interface HeroPromoProps {
  userName: string;
}

export default function HeroPromo({ userName }: HeroPromoProps) {
  const eligible = isPromoUser(userName);
  const firstName = userName.trim().split(/\s+/)[0];

  return (
    <header className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary via-primary-container to-tertiary text-on-primary p-6 md:p-8 mb-6 shadow-xl">
      <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-secondary/30 blur-3xl pointer-events-none"></div>
      <div className="absolute left-1/3 -bottom-20 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none"></div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 items-center min-w-0">
        <div className="lg:col-span-8 flex flex-col gap-3 min-w-0">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-3 py-1 rounded-full w-fit max-w-full">
            <span className="material-symbols-outlined text-[18px] shrink-0">bolt</span>
            <span className="text-xs tracking-wider uppercase font-bold truncate">
              Promo para Roberto y Gerónimo
            </span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-balance break-words">
            {eligible && firstName
              ? `¡${firstName}, tienes ${PROMO_DISCOUNT_PCT}% de descuento!`
              : "15% de descuento en Eventia"}
          </h1>
          <p className="text-base sm:text-lg text-white/85 max-w-2xl break-words">
            {eligible ? (
              <>
                Como te llamas <strong className="font-bold">{firstName}</strong>, tienes{" "}
                <strong className="font-bold">{PROMO_DISCOUNT_PCT}% de descuento automático</strong>{" "}
                en eventos seleccionados con emisión digital inmediata.
              </>
            ) : (
              <>
                Todos los usuarios llamados{" "}
                <strong className="font-bold">Roberto o Gerónimo</strong> reciben{" "}
                <strong className="font-bold">{PROMO_DISCOUNT_PCT}% de descuento automático</strong>{" "}
                en eventos seleccionados. Escribe tu nombre en los filtros para validar tu descuento.
              </>
            )}
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-secondary text-on-secondary px-3 py-1 rounded-md whitespace-nowrap">
              <span className="material-symbols-outlined text-[16px]">verified</span> Descuento
              aplicado en caja
            </span>
            <span className="text-xs text-white/70">Sin cupón requerido.</span>
          </div>
        </div>

        <div className="lg:col-span-4 flex justify-start lg:justify-end min-w-0">
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl flex flex-col items-center text-center shadow-md w-full max-w-[260px] min-w-0">
            <span className="text-xs uppercase tracking-widest text-white/70 font-bold">
              Ahorro Promedio
            </span>
            <span className="font-display text-2xl sm:text-3xl font-extrabold mt-1 whitespace-nowrap">
              S/ 48.50
            </span>
            <span className="text-sm text-white/80 mt-0.5">por transacción en Perú</span>
            <div className="w-full bg-white/20 h-1.5 rounded-full mt-3 overflow-hidden">
              <div className="bg-secondary h-full rounded-full w-3/4"></div>
            </div>
            <span className="text-xs text-white/70 mt-1.5 font-medium">
              75% del cupo diario canjeado
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
