import { create } from 'zustand';

import { Product } from '@/shared/interfaces';
import { searchProduct } from '.';

type State = {
  searchedProducts: Product[];
};

type Actions = {
  setSearchedProducts: (products: Product[]) => void;
  searchProducts: (term: string) => Promise<void>;
};

export const useProductsStore = create<State & Actions>(set => ({
  searchedProducts: [],

  searchProducts: async (term: string) => {
    const { products } = await searchProduct(term);

    set({ searchedProducts: products });
  },

  setSearchedProducts: (products: Product[]) => {
    set({ searchedProducts: products });
  },
}));
