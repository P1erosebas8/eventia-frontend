export default function HeroPromo() {
  return (
    <header className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary via-primary-container to-tertiary text-on-primary p-6 md:p-10 mb-6 shadow-xl">
      <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-secondary/30 blur-3xl pointer-events-none"></div>
      <div className="absolute left-1/3 -bottom-20 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none"></div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-8 flex flex-col gap-3">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-3 py-1 rounded-full w-fit">
            <span className="material-symbols-outlined text-[18px]">bolt</span>
            <span className="text-xs tracking-wider uppercase font-bold">Campaña Semanal Oficial</span>
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight">
            ¡Miércoles de Promo en Eventia!
          </h1>
          <p className="text-lg text-white/85 max-w-2xl">
            Aprovecha hoy el <strong className="font-bold">15% de descuento automático (RN01)</strong> en
            todos los tickets para conciertos, festivales y obras teatrales con emisión digital inmediata.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-1">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-secondary text-on-secondary px-3 py-1 rounded-md">
              <span className="material-symbols-outlined text-[16px]">schedule</span> Válido hasta las
              23:59 hrs
            </span>
            <span className="text-xs text-white/70">Sin cupón requerido. Aplicado directo en caja.</span>
          </div>
        </div>

        <div className="lg:col-span-4 flex justify-start lg:justify-end">
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl flex flex-col items-center text-center shadow-md min-w-[220px]">
            <span className="text-xs uppercase tracking-widest text-white/70 font-bold">
              Ahorro Promedio
            </span>
            <span className="font-display text-3xl font-extrabold mt-1">S/ 48.50</span>
            <span className="text-sm text-white/80 mt-0.5">por transacción en Perú</span>
            <div className="w-full bg-white/20 h-1.5 rounded-full mt-3 overflow-hidden">
              <div className="bg-secondary h-full rounded-full w-3/4"></div>
            </div>
            <span className="text-xs text-white/70 mt-1.5 font-medium">75% del cupo diario canjeado</span>
          </div>
        </div>
      </div>
    </header>
  );
}
