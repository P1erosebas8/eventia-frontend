export default function ConcurrencyAlert() {
  return (
    <div className="w-full bg-primary text-on-primary py-2.5 px-6 shadow-sm">
      <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px]">local_fire_department</span>
          <span className="text-sm tracking-wide">
            <strong className="font-bold">Alta Concurrencia (RF19):</strong> 84% del aforo oficial ya ha
            sido reservado para esta fecha.
          </span>
        </div>
        <div className="hidden md:flex items-center gap-2 text-xs bg-black/20 px-3 py-1 rounded-full">
          <span className="w-2 h-2 rounded-full bg-secondary-fixed animate-ping"></span>
          <span>Actualización en tiempo real</span>
        </div>
      </div>
    </div>
  );
}
