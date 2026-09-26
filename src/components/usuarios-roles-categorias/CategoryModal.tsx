interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export default function CategoryModal({ open, onClose, onSubmit }: Props) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-surface-container-lowest w-full max-w-lg rounded-2xl shadow-xl overflow-hidden">
        <div className="px-4 py-4 bg-surface-container flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]">bookmark_add</span>
            <h3 className="font-display font-semibold text-lg">Registrar Taxonomía (RF17)</h3>
          </div>
          <button onClick={onClose} type="button" className="p-1 rounded-lg hover:bg-surface-variant">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
        <form
          className="p-4 flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <label className="flex flex-col gap-1.5 text-[11px] font-bold uppercase">
            Nombre de la Categoría *
            <input required placeholder="Ej. Deportes Electrónicos & Gaming" type="text" className="px-3 py-2 rounded-lg bg-surface-container font-normal normal-case focus:outline-none focus:ring-2 focus:ring-primary" />
          </label>
          <div className="p-3 rounded-lg bg-secondary-fixed/40 text-xs flex items-start gap-2">
            <span className="material-symbols-outlined text-secondary text-[18px]">gavel</span>
            <span><strong>RN03:</strong> quedará sujeta a integridad referencial. Solo baja lógica, nunca DELETE.</span>
          </div>
          <div className="flex items-center justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-surface-container text-sm hover:bg-surface-container-high">Cancelar</button>
            <button type="submit" className="px-5 py-2 rounded-lg bg-primary text-on-primary text-sm font-bold hover:opacity-90">Guardar Categoría</button>
          </div>
        </form>
      </div>
    </div>
  );
}
