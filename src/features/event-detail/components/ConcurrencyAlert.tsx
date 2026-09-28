export default function ConcurrencyAlert() {
  return (
    <div className="w-full bg-primary text-on-primary py-2.5 px-4 sm:px-6 shadow-sm overflow-hidden">
      <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-3 min-w-0">
        <div className="flex items-center gap-2 min-w-0">
          <span className="material-symbols-outlined text-[20px] shrink-0">
            local_fire_department
          </span>
          <span className="text-xs sm:text-sm tracking-wide truncate">
            <strong className="font-bold">Alta concurrencia:</strong>{" "}
            <span className="hidden sm:inline">84% del aforo oficial ya ha sido reservado.</span>
            <span className="sm:hidden">84% del aforo reservado.</span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-2 text-xs bg-black/20 px-3 py-1 rounded-full shrink-0 whitespace-nowrap">
          <span className="w-2 h-2 rounded-full bg-secondary-fixed animate-ping"></span>
          <span>Actualización en tiempo real</span>
        </div>
      </div>
    </div>
  );
}
