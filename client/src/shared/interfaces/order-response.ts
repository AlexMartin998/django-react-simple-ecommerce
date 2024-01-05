import { OrderItem, ShippingAddress } from '.';

export interface OrderResponse {
  id: number;
  user: string;
  order_items: OrderItem[];
  shipping_address: ShippingAddress;
  total_price: string;
  is_delivered: boolean;
  delivered_at: string;
  created_at: string;
}
