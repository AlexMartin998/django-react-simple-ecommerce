import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { toast } from 'react-hot-toast';
import { NavigateFunction } from 'react-router-dom';

import { RegisterFormData } from '@/auth/pages/RegisterPage/RegisterPage';
import { ecomApi } from '@/shared/axios';

export const useRegisterUser = (
  userRegisterData: RegisterFormData,
  reset?: Function,
  navigate?: NavigateFunction
) => {
  return useMutation({
    mutationFn: async () => {
      await ecomApi.post('/users/register/', userRegisterData);
    },
    onSuccess: () => {
      toast.success('Successful registration');
      reset && reset();
      navigate && navigate('/auth/login');
    },
    onError: err => {
      if (isAxiosError(err)) return toast.error(err.response?.data.error);

      toast.error('Something went wrong');
      console.log(err);
    },
  });
};
