export default function OrganizerCard() {
  return (
    <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-primary-container/20 text-primary flex items-center justify-center font-bold">
          EL
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <h3 className="text-sm font-bold">Eventia Live Productions Perú</h3>
            <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
          </div>
          <p className="text-sm text-outline">RUC: 20609842114 • Organizador Oficial Verificado</p>
        </div>
      </div>
      <button
        className="hidden sm:inline-flex px-3 py-1.5 rounded-lg bg-surface-container text-sm hover:bg-surface-container-high transition-colors"
        type="button"
      >
        Ver Perfil Productor
      </button>
    </div>
  );
}
