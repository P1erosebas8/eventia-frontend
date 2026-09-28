export interface CartItem {
  id_ticket_type: number;
  ticket_name: string;
  event_name: string;
  unit_price: number;
  quantity: number;
}

export interface CartContexType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  totalAmount: number;
}

export interface OrderPayload {
  id_user: number;
  payment_method: string;
  total_amount: number;
  order_details: OrderDetailPayload[];
}

export interface OrderDetailPayload {
  id_ticket_type: number;
  quantity: number;
}
