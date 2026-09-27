export default function InfoCallout() {
  return (
    <aside
      aria-label="Información sobre entradas nominadas"
      className="bg-surface-container p-4 rounded-xl flex items-start gap-4 min-w-0"
    >
      <div className="w-10 h-10 rounded-full bg-primary-container/20 text-primary flex items-center justify-center shrink-0">
        <span className="material-symbols-outlined text-[20px]">badge</span>
      </div>
      <div className="flex flex-col gap-1 min-w-0">
        <h4 className="font-display font-bold text-base sm:text-lg text-balance">
          Importante: entradas nominadas
        </h4>
        <p className="text-sm text-on-surface-variant break-words">
          Para espectáculos públicos en Perú, cada ticket debe estar nominado con el DNI o Carné de
          Extranjería del asistente final antes de ingresar. Las entradas con promo incluyen
          re-nominación gratuita hasta 24 horas antes del evento.
        </p>
      </div>
    </aside>
  );
}
