import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { NavigateFunction } from 'react-router-dom';

import { Order } from '@/shared/interfaces';
import { ecomApiAuth } from '../../shared/axios/ecomApi';

export const useCreateOrderMutation = (
  navigate: NavigateFunction,
  clearCart: () => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Order) => {
      await ecomApiAuth.post('/orders/create/', data);
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
  });
};
