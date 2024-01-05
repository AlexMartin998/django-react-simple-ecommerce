import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { NavigateFunction } from 'react-router-dom';

import { Order } from '@/shared/interfaces';
import { useOrderStore } from '.';
import { ecomApiAuth } from '../../shared/axios/ecomApi';

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