import { ecomApiAuth } from '@/shared/axios';
import { User } from '@/shared/interfaces';

export const getUsers = async () => {
  const response = await ecomApiAuth.get<User[]>('/users/');
  return response.data;
};
