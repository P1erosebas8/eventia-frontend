import { useState, type ReactNode } from "react";
import type { CartItem } from "../types/chekout.types";
import { CartContext } from "../hooks/useCartContext";

interface CartProviderProps {
  children: ReactNode;
}

export function CartContextProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>([]);
  const addToCart = (newItem: CartItem) => {};
  const removeFromCart = (idItem: number) => {};
  const clearCart = () => {};
  const totalAmount: number = 0;

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, clearCart, totalAmount }}
    >
      {children}
    </CartContext.Provider>
  );
}
