/** Tarjeta del organizador verificado. */
export default function OrganizerCard() {
  return (
    <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 min-w-0">
      <div className="flex items-center gap-4 min-w-0">
        <div className="w-12 h-12 rounded-full bg-primary-container/20 text-primary flex items-center justify-center font-bold shrink-0">
          EL
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 min-w-0">
            <h3 className="text-sm font-bold truncate">Eventia Live Productions Perú</h3>
            <span className="material-symbols-outlined text-primary text-[18px] shrink-0">
              verified
            </span>
          </div>
          <p className="text-sm text-outline truncate">RUC: 20609842114 • Organizador verificado</p>
        </div>
      </div>
      <button
        className="px-3 py-1.5 rounded-lg bg-surface-container text-sm hover:bg-surface-container-high transition-colors shrink-0 self-start sm:self-auto"
        type="button"
      >
        Ver Perfil Productor
      </button>
    </div>
  );
}
