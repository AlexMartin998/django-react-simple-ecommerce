import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { ecomApiAuth } from '@/shared/axios';
import { useUiStore } from '../ui';

type MutationData = {
  productId: number;
  description: string;
  rating: number;
};

export const useCreateReviewMutation = () => {
  const setModalOpen = useUiStore(s => s.setModalOpen);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ productId, description, rating }: MutationData) => {
      return ecomApiAuth.post(`/products/review/${productId}/`, {
        description,
        rating,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product'] });

      toast.success('Review created');
    },
    onError: () => {
      toast.error('Error!');
    },
    onMutate: () => setModalOpen(false),
  });
};
