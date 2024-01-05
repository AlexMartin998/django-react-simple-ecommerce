import { OrderItem } from '.';

export interface OrderResponse {
  id: number;
  user: string;
  order_items: OrderItem[];
  shipping_address: boolean;
  total_price: string;
  is_delivered: boolean;
  delivered_at: null;
  created_at: string;
}
