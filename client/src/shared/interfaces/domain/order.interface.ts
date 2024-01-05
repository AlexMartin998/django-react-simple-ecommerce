import { ProductCart } from '..';

export interface Order {
  total_price: number;
  address: string;
  city: string;
  postal_code: string;
  order_items: ProductCart[];
}

export interface OrderItem {
  id: number;
  product: string;
  quantity: number;
  price: string;
  order: number;
}

export interface ShippingAddress {
  id: number;
  address: string;
  city: string;
  postal_code: string;
  order: number;
}
