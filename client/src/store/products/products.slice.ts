import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { ecomApi, ecomApiAuth } from '@/shared/axios';
import { ProductsResponse, ProductsSearchResponse } from '@/shared/interfaces';

export const searchProduct = async (query: string) => {
  const response = await ecomApiAuth.get<ProductsSearchResponse>(
    `/products/search/?query=${query}`
  );
  return response.data;
};

export const useInfiniteQueryProducts = () =>
  useInfiniteQuery(['products'], getProducts, {
    getNextPageParam: (page: any) => page.meta.next,
  });

export const useProductDeleteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product deleted!');
    },
    onError: () => {
      toast.error('Error!');
    },
  });
};

////* actions
export const getProducts = async ({ pageParam = 1 }) => {
  const response = await ecomApi.get<ProductsResponse>(
    `/products/?page=${pageParam}&pages=9`
  );

  return response.data;
};

const deleteProduct = async (id: number) =>
  ecomApiAuth.delete(`/products/delete/${id}/`);
