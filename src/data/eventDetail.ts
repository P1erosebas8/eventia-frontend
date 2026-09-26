export type TierId = "vip" | "general" | "occidente";

export interface Tier {
  id: TierId;
  nombre: string;
  descripcion: string;
  nota: string;
  precio: number;
  precioRegular: number;
  dot: string;
}

export const TIERS: Tier[] = [
  {
    id: "vip",
    nombre: "Campo VIP",
    descripcion: "Frente al escenario principal",
    nota: "¡Últimas 48 entradas!",
    precio: 320,
    precioRegular: 376,
    dot: "bg-primary-container",
  },
  {
    id: "general",
    nombre: "Campo General",
    descripcion: "Zona posterior de pista",
    nota: "Acceso a pista libre",
    precio: 160,
    precioRegular: 188,
    dot: "bg-tertiary",
  },
  {
    id: "occidente",
    nombre: "Tribuna Occidente",
    descripcion: "Asiento numerado en grada",
    nota: "Pocas ubicaciones",
    precio: 210,
    precioRegular: 247,
    dot: "bg-primary",
  },
];

export const DESCUENTO_RN01 = 0.15;
export const MAX_TICKETS = 10;

export function formatoPEN(n: number) {
  return `S/ ${n.toFixed(2)}`;
}
