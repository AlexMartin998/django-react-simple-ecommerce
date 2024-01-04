import { Product } from '.';

export interface Order {
  total_price: number;
  address: string;
  city: string;
  postal_code: string;
  order_items: Product[];
}
