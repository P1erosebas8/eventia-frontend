export interface CartItem {
  id_ticket_type: string | number;
  id_event?: string | number;
  ticket_name: string;
  event_name: string;
  event_date?: string;
  venue?: string;
  unit_price: number;
  quantity: number;
}

export interface CartContexType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string | number) => void;
  clearCart: () => void;
  setCartItems: (items: CartItem[]) => void;
  totalAmount: number;
  totalCount: number;
}

export interface OrderPayload {
  id_user: number;
  payment_method: string;
  total_amount: number;
  status: string;
  order_details: OrderDetailPayload[];
}

export interface OrderDetailPayload {
  id_ticket_type: string | number;
  ticket_name: string;
  quantity: number;
  unit_price: number;
  discount_applied?: number;
}

