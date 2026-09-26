interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export default function UserModal({ open, onClose, onSubmit }: Props) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-surface-container-lowest w-full max-w-xl rounded-2xl shadow-xl overflow-hidden">
        <div className="px-4 py-4 bg-surface-container flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]">person_add</span>
            <h3 className="font-display font-semibold text-lg">Crear / Invitar Usuario al Backoffice</h3>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="flex flex-col gap-1.5 text-[11px] font-bold uppercase">
              Nombres y Apellidos *
              <input required placeholder="Ej. Mario Vargas Llosa" type="text" className="px-3 py-2 rounded-lg bg-surface-container font-normal normal-case focus:outline-none focus:ring-2 focus:ring-primary" />
            </label>
            <label className="flex flex-col gap-1.5 text-[11px] font-bold uppercase">
              Correo Electrónico *
              <input required placeholder="mario@empresa.pe" type="email" className="px-3 py-2 rounded-lg bg-surface-container font-normal normal-case focus:outline-none focus:ring-2 focus:ring-primary" />
            </label>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="flex flex-col gap-1.5 text-[11px] font-bold uppercase">
              Tipo de Documento *
              <select className="px-3 py-2 rounded-lg bg-surface-container font-normal normal-case focus:outline-none focus:ring-2 focus:ring-primary">
                <option>DNI (Persona Natural)</option>
                <option>RUC 20 (Persona Jurídica)</option>
                <option>Carné de Extranjería (CE)</option>
              </select>
            </label>
            <label className="flex flex-col gap-1.5 text-[11px] font-bold uppercase">
              Número de Documento *
              <input required placeholder="8 dígitos DNI o 11 RUC" type="text" className="px-3 py-2 rounded-lg bg-surface-container font-normal normal-case focus:outline-none focus:ring-2 focus:ring-primary" />
            </label>
          </div>
          <div className="p-3 rounded-lg bg-surface-container text-xs flex items-start gap-2">
            <span className="material-symbols-outlined text-primary text-[18px]">info</span>
            <span>Se enviará un correo con enlace seguro para configurar 2FA y contraseña.</span>
          </div>
          <div className="flex items-center justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-surface-container text-sm hover:bg-surface-container-high">Cancelar</button>
            <button type="submit" className="px-5 py-2 rounded-lg bg-primary text-on-primary text-sm font-bold hover:opacity-90">Emitir Invitación</button>
          </div>
        </form>
      </div>
    </div>
  );
}
