/** Porcentaje de descuento de la promo (aplica solo a elegibles). */
export const PROMO_DISCOUNT_PCT = 15;

/**
 * Normaliza un nombre para compararlo: minúsculas, sin tildes ni espacios
 * sobrantes ("Gerónimo" y "geronimo" coinciden).
 */
function normalizeName(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

/**
 * Regla de negocio 1: la promo aplica a todo usuario cuyo primer nombre
 * sea Roberto o Gerónimo.
 */
export function isPromoUser(userName: string): boolean {
  const firstName = normalizeName(userName).split(/\s+/)[0] ?? "";
  return firstName === "roberto" || firstName === "geronimo";
}

/** Precio final con la promo aplicada. */
export function getPromoPrice(price: number): number {
  return price * (1 - PROMO_DISCOUNT_PCT / 100);
}
