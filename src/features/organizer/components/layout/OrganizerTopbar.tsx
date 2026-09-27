export default function OrganizerTopbar() {
  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-end px-6 lg:px-8 border-b border-outline-variant/20 transition-all">
      <div className="flex items-center gap-3.5">
        {/* Notifications Bell */}
        <button
          type="button"
          aria-label="Alertas en tiempo real"
          className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors relative"
        >
          <span className="material-symbols-outlined text-[20px]">notifications</span>
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-secondary ring-2 ring-surface" />
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-2.5 pl-3 border-l border-surface-container">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
            alt="Valeria Mendoza"
            className="w-8 h-8 rounded-full object-cover ring-1 ring-outline-variant/30"
          />
          <div className="hidden lg:flex flex-col text-left">
            <span className="text-xs font-bold text-on-surface leading-tight">Valeria Mendoza</span>
            <span className="text-[11px] text-outline leading-tight">vmendoza@eventia.pe</span>
          </div>
        </div>
      </div>
    </header>
  );
}
