import { useState, useEffect, type ReactNode } from "react";
import type { CartItem } from "../types/chekout.types";
import { CartContext } from "../hooks/useCartContext";

interface CartProviderProps {
  children: ReactNode;
}

const STORAGE_KEY = "eventia_cart_items";

export function CartContextProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignorar errores de cuota de storage
    }
  }, [items]);

  const addToCart = (newItem: CartItem) => {
    setItems((prev) => {
      const existing = prev.find(
        (item) => item.id_ticket_type === newItem.id_ticket_type
      );

      if (existing) {
        return prev.map((item) =>
          item.id_ticket_type === newItem.id_ticket_type
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      }

      return [...prev, newItem];
    });
  };

  const setCartItems = (newItems: CartItem[]) => {
    setItems(newItems);
  };

  const removeFromCart = (idItem: string | number) => {
    setItems((prev) => prev.filter((item) => String(item.id_ticket_type) !== String(idItem)));
  };

  const clearCart = () => {
    setItems([]);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignorar
    }
  };

  const totalAmount: number = items.reduce(
    (acc, item) => acc + item.unit_price * item.quantity,
    0
  );

  const totalCount: number = items.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        clearCart,
        setCartItems,
        totalAmount,
        totalCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

