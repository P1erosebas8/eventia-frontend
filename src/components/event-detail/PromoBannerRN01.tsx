export default function PromoBannerRN01() {
  return (
    <div className="rounded-xl bg-gradient-to-r from-tertiary-container via-primary-container to-primary p-4 text-white shadow-sm flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-[28px]">bolt</span>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] uppercase font-bold tracking-wider bg-white/20 px-2 py-0.5 rounded">
              Regla Activa RN01
            </span>
            <span className="text-xs text-white/80">¡Miércoles de Descuento!</span>
          </div>
          <p className="font-display font-bold text-lg mt-0.5">15% OFF directo en todas las localidades</p>
          <p className="text-sm text-white/90">
            El beneficio se calcula de manera inmediata en el resumen de compra para compras procesadas
            hoy.
          </p>
        </div>
      </div>
      <div className="hidden sm:block text-right shrink-0">
        <span className="font-display font-extrabold text-4xl block leading-none">-15%</span>
        <span className="text-[11px] text-white/80">CUPÓN AUTO</span>
      </div>
    </div>
  );
}
