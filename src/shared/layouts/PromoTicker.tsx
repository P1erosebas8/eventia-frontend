export default function PromoTicker() {
  return (
    <aside
      aria-label="Aviso de promoción vigente"
      className="w-full bg-surface-container-high py-2.5 px-4 sm:px-6 shadow-sm overflow-hidden"
    >
      <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-3 min-w-0">
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-secondary text-on-secondary text-[12px] font-bold shrink-0">
            !
          </span>
          <p className="text-xs sm:text-sm truncate">
            <span className="font-bold text-secondary">PROMO VIGENTE:</span>{" "}
            <span className="hidden sm:inline">
              15% de descuento para usuarios llamados Roberto o Gerónimo.
            </span>
            <span className="sm:hidden">15% para Roberto o Gerónimo.</span>
          </p>
        </div>
        <div className="hidden lg:flex items-center gap-1 text-outline text-xs font-semibold shrink-0 whitespace-nowrap">
          <span className="material-symbols-outlined text-[16px] text-primary">verified_user</span>
          <span>Validación oficial RENIEC / DNI Biométrica</span>
        </div>
      </div>
    </aside>
  );
}
