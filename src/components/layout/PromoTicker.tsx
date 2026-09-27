export default function PromoTicker() {
  return (
    <aside aria-label="Alerta de beneficio bancario" className="w-full bg-surface-container-high py-2.5 px-6 shadow-sm">
      <div className="max-w-[1280px] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-secondary text-on-secondary text-[12px] font-bold">
            !
          </span>
          <p className="text-sm">
            <span className="font-bold text-secondary">REGLA RN01 VIGENTE:</span> 15% de descuento
            directo en el checkout con cualquier medio de pago nacional.
          </p>
        </div>
        <div className="hidden md:flex items-center gap-1 text-outline text-xs font-semibold">
          <span className="material-symbols-outlined text-[16px] text-primary">verified_user</span>
          <span>Validación oficial RENIEC / DNI Biométrica</span>
        </div>
      </div>
    </aside>
  );
}
