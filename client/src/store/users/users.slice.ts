import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { ecomApiAuth } from '@/shared/axios';
import { SearchUsersResponse, User } from '@/shared/interfaces';

export const useUserDeleteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await ecomApiAuth.delete(`/users/delete/${id}/`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('User deleted!');
    },
    onError: () => {
      toast.error('Error!');
    },
  });
};

////* actions
export const searchUsers = async (query: string) => {
  const response = await ecomApiAuth.get<SearchUsersResponse>(
    `/users/search/?query=${query}`
  );
  return response.data;
};

export const getUsers = async () => {
  const response = await ecomApiAuth.get<User[]>('/users/');
  return response.data;
};
