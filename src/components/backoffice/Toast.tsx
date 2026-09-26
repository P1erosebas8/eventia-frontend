import type { ToastData } from "../../hooks/useToast";

export default function Toast({ toast }: { toast: ToastData | null }) {
  if (!toast) return null;
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="flex items-center gap-3 bg-inverse-surface text-inverse-on-surface px-4 py-3 rounded-xl shadow-xl max-w-md">
        <span className="material-symbols-outlined text-emerald-400 text-[22px]">check_circle</span>
        <div className="flex flex-col">
          <span className="text-sm font-bold">{toast.titulo}</span>
          <span className="text-sm opacity-80">{toast.desc}</span>
        </div>
      </div>
    </div>
  );
}
