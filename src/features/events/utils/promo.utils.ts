export const PROMO_DISCOUNT_PCT = 15;

function normalizeName(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

/** Promo applies to every user whose first name is Roberto or Geronimo. */
export function isPromoUser(userName: string): boolean {
  const firstName = normalizeName(userName).split(/\s+/)[0] ?? "";
  return firstName === "roberto" || firstName === "geronimo";
}

export function getPromoPrice(price: number): number {
  return price * (1 - PROMO_DISCOUNT_PCT / 100);
}
