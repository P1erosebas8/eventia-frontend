import { useState } from "react";

export type TabId = "zonas" | "info" | "politicas";

/** Tab activo de la ficha del evento. */
export function useTabs(inicial: TabId = "zonas") {
  const [tab, setTab] = useState<TabId>(inicial);
  return { tab, setTab };
}
