import { useCallback, useEffect, useRef, useState } from "react";

export interface ToastData {
  titulo: string;
  desc: string;
}

/** Toast simple con auto-ocultado. */
export function useToast() {
  const [toast, setToast] = useState<ToastData | null>(null);
  const timer = useRef<number | null>(null);

  const showToast = useCallback((titulo: string, desc: string) => {
    setToast({ titulo, desc });
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setToast(null), 4000);
  }, []);

  useEffect(() => () => {
    if (timer.current) window.clearTimeout(timer.current);
  }, []);

  return { toast, showToast };
}
