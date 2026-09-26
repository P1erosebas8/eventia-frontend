const META = [
  { icon: "calendar_today", label: "Fecha", valor: "15 Nov 2025" },
  { icon: "schedule", label: "Horario", valor: "19:00 hrs" },
  { icon: "stadium", label: "Capacidad", valor: "45,000 pers." },
  { icon: "badge", label: "Acceso", valor: "+18 Años (DNI)" },
];

export default function EventHero() {
  return (
    <div className="relative rounded-xl overflow-hidden shadow-sm bg-surface-container-lowest">
      <div className="relative h-72 sm:h-80 w-full overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIOA9eVjToxUyzxS_N7DLSC7DpiRAU05vdwlgBGEvnhpqKV5NNYsd6h-F0-G2qyc_AawfzFOvWioyn2MRsCbw_eFE6jM8U-vaT6KVaVjTXpPXiGJGvQGO9sGgzT70_cQXkvAV3gVgd0ndWTiiluotuQrqEVf2jw5GAd9FqE9b5FoXhmNewJsrTNQ6uYAtfwxEP0gVhWuk3C6uP8qrZcIjin3nu_TogqzzeZa5iDKKD3Cd-Y2pFJM1E4A"
          alt="Concierto Lima Live Sessions en el Estadio Nacional"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <span className="bg-primary text-on-primary text-[11px] font-bold uppercase px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">verified</span>
            Oficial Eventia Live
          </span>
          <span className="bg-secondary text-on-secondary text-[11px] font-bold uppercase px-3 py-1 rounded-full shadow-sm">
            Fase Preventa 2
          </span>
        </div>

        <div className="absolute bottom-4 right-4 bg-white/95 rounded-lg p-3 text-center shadow-md">
          <span className="block text-[11px] font-bold uppercase text-secondary tracking-widest">NOV</span>
          <span className="block font-display font-extrabold text-2xl leading-none">15</span>
          <span className="block text-[11px] text-outline">2025</span>
        </div>

        <div className="absolute bottom-4 left-4 right-24 text-white">
          <h1 className="font-display text-3xl tracking-tight drop-shadow-md font-bold">
            LIMA LIVE SESSIONS 2025
          </h1>
          <p className="text-sm flex items-center gap-1 mt-1 drop-shadow-sm">
            <span className="material-symbols-outlined text-[18px]">location_on</span>
            Estadio Nacional del Perú, José Díaz s/n, Lima
          </p>
        </div>
      </div>

      <div className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {META.map((m) => (
          <div key={m.label} className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[20px]">{m.icon}</span>
            </div>
            <div>
              <span className="block text-[11px] text-outline">{m.label}</span>
              <span className="text-sm font-bold">{m.valor}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
