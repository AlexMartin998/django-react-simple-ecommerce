import { Review } from '.';

export interface Product {
  id?: number;
  reviews: Review[];
  name: string;
  image: File | string | null;
  category: string;
  count_in_stock: number;
  created_at: string;
  description?: string;
  rating?: string;
  num_reviews?: number;
  price: string;
  slug: string;
  // user: number;
}
