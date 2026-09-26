export default function Header() {
  return (
    <header className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-20 max-w-[1280px] mx-auto px-6 flex items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-9 h-9 rounded-lg bg-primary text-on-primary flex items-center justify-center font-display font-extrabold text-xl">
            E
          </div>
          <div className="flex flex-col">
            <span className="font-display font-semibold text-lg tracking-tight leading-none">Eventia</span>
            <span className="text-[11px] font-bold text-outline tracking-wider uppercase mt-0.5">
              Perú S.A.C.
            </span>
          </div>
        </div>

        <div className="hidden xl:flex items-center flex-1 max-w-xs relative">
          <span className="material-symbols-outlined absolute left-3 text-outline text-[20px] pointer-events-none">
            search
          </span>
          <input
            className="w-full bg-surface-container-low text-on-surface text-sm pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-outline"
            placeholder="Buscar conciertos, obras, festivales..."
            type="text"
          />
        </div>

        <nav className="hidden md:flex items-center gap-2">
          <a href="#" className="px-3 py-2 bg-primary-container/20 text-primary font-semibold rounded-lg text-sm">
            Explorar Eventos
          </a>
          <a href="#" className="px-3 py-2 rounded-lg text-sm font-semibold text-on-surface-variant hover:bg-surface-container-high transition-colors">
            Mis Tickets
          </a>
          <a href="#" className="px-3 py-2 rounded-lg text-sm font-semibold text-on-surface-variant hover:bg-surface-container-high transition-colors">
            Promociones RN01
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center bg-surface-container px-3 py-1.5 rounded-lg">
            <span className="text-[11px] font-bold text-outline mr-1.5">MONEDA</span>
            <span className="text-sm text-primary font-bold">PEN (S/)</span>
          </div>
          <button
            aria-label="Notificaciones"
            className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors relative"
            type="button"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-secondary"></span>
          </button>
          <div className="flex items-center gap-1">
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover bg-surface-container-high"
              src="https://lh3.googleusercontent.com/aida/AEtjO1VKf7CB99gtPkRBu6ogP6OhU6_qlxigptLnMh5rudGjyjchCEamowbeHTqw4GYlwSR8frTtwY0pNInrPBNmBtk_yKzeLoB7P2WY53QYUpyu5n_YBFQPQ40ilJ7GICmUolNobRWZNUa2rGkfu_tMMrEeosVaC67RQDzIQToDy4RiSO9_QaFVfvTA9KwnA0uguCPXh69EplVNOdALLHfykriq12xX0z_E6KAmhMZX_II1iVFAXCwuNY5KZ2M"
            />
            <span className="hidden lg:inline-block text-sm font-semibold">Mi Cuenta</span>
            <span className="material-symbols-outlined text-outline text-[18px]">expand_more</span>
          </div>
        </div>
      </div>
    </header>
  );
}
