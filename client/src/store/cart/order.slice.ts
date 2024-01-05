import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { NavigateFunction } from 'react-router-dom';

import { Order, OrderResponse } from '@/shared/interfaces';
import { useOrderStore } from '.';
import { ecomApiAuth } from '../../shared/axios/ecomApi';

export const useGetMyOrders = () => {
  return useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const { data } = await ecomApiAuth.get<any[]>('/orders/my/');
      return data;
    },
  });
};

export const useGetOrderQuery = (id: number) =>
  useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const { data } = await ecomApiAuth.get<OrderResponse>(
        `/orders/get/${id}/`
      );
      return data;
    },
    retry: false,
  });

export const useCreateOrderMutation = (
  navigate: NavigateFunction,
  clearCart: () => void
) => {
  const queryClient = useQueryClient();

  const setIsPaying = useOrderStore(s => s.setIsPaying);

  return useMutation({
    mutationFn: async (orderData: Order) => {
      setIsPaying(true);
      return ecomApiAuth.post('/orders/create/', orderData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Order created!');
      clearCart();
      navigate('/');
    },
    onError: () => {
      toast.error('Error!');
      navigate('/');
    },
    // like Finally
    onMutate: () => {
      setIsPaying(false);
    },
  });
};
