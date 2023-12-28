import { useInfiniteQuery } from '@tanstack/react-query';

import { ecomApi } from '@/shared/axios';
import { ProductsResponse } from '@/shared/interfaces';

export const getProducts = async ({ pageParam = 1 }) => {
  const response = await ecomApi.get<ProductsResponse>(
    `/products/?page=${pageParam}&pages=9`
  );

  return response.data;
};

export const useInfiniteQueryProducts = () =>
  useInfiniteQuery(['products'], getProducts, {
    getNextPageParam: (page: any) => page.meta.next,
  });
