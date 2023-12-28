import { Product } from '.';

export interface ProductsResponse {
  data: Product[];
  meta: Meta;
}

export interface Meta {
  next: null;
  previous: null;
  count: number;
}
