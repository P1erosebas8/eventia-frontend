import { useEffect, useState } from "react";

/** Cuenta regresiva simple mm:ss, ej. 04:59 -> 00:00 */
export function useCountdown(segundosIniciales = 299) {
  const [segundos, setSegundos] = useState(segundosIniciales);

  useEffect(() => {
    if (segundos <= 0) return;
    const id = setInterval(() => setSegundos((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, [segundos]);

  const mm = String(Math.floor(segundos / 60)).padStart(2, "0");
  const ss = String(segundos % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}
