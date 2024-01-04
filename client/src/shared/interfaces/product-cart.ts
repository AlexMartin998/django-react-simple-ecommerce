export interface ProductCart {
  id?: number;
  name: string;
  image: File | string | null;
  category: string;
  count_in_stock: number;
  description?: string;
  rating?: string;
  num_reviews?: number;
  price: number;
  quantity: number;
  slug: string;
}
