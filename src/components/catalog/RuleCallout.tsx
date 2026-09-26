export default function RuleCallout() {
  return (
    <aside aria-label="Información reglamentaria" className="bg-surface-container p-4 rounded-xl flex items-start gap-4">
      <div className="w-10 h-10 rounded-full bg-primary-container/20 text-primary flex items-center justify-center shrink-0">
        <span className="material-symbols-outlined text-[20px]">badge</span>
      </div>
      <div className="flex flex-col gap-1">
        <h4 className="font-display font-bold text-lg">Importante: Nominatividad Obligatoria (RN03)</h4>
        <p className="text-sm text-on-surface-variant">
          Por disposición legal para espectáculos públicos en Perú, cada ticket debe estar nominado con
          DNI o Carné de Extranjería válido del asistente final antes de ingresar. Las entradas
          adquiridas con la promo de Miércoles cuentan con garantía de re-nominación gratuita hasta 24
          horas previas al evento.
        </p>
      </div>
    </aside>
  );
}
