interface Props {
  tab: "usuarios" | "categorias";
  setTab: (t: "usuarios" | "categorias") => void;
}

export default function BackofficeTabs({ tab, setTab }: Props) {
  const base =
    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all whitespace-nowrap";
  return (
    <div className="flex items-center gap-2 bg-surface-container-low p-1.5 rounded-xl mt-2 w-fit shadow-inner overflow-x-auto max-w-full">
      <button
        type="button"
        onClick={() => setTab("usuarios")}
        className={`${base} ${tab === "usuarios" ? "bg-white text-primary shadow-sm font-bold" : "text-on-surface-variant font-semibold hover:text-on-surface"}`}
      >
        <span className="material-symbols-outlined text-[20px]">badge</span>
        <span>Directorio de Usuarios y Roles (RF21)</span>
        <span className="bg-primary/10 text-primary text-[11px] font-bold px-2 py-0.5 rounded-full ml-1">
          2,842
        </span>
      </button>
      <button
        type="button"
        onClick={() => setTab("categorias")}
        className={`${base} ${tab === "categorias" ? "bg-white text-primary shadow-sm font-bold" : "text-on-surface-variant font-semibold hover:text-on-surface"}`}
      >
        <span className="material-symbols-outlined text-[20px]">schema</span>
        <span>Categorías de Eventos (RF17, RN03)</span>
        <span className="bg-surface-container-high text-[11px] font-bold px-2 py-0.5 rounded-full ml-1">6</span>
      </button>
    </div>
  );
}
