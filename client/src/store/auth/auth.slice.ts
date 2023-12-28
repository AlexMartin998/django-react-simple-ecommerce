import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { toast } from 'react-hot-toast';
import { NavigateFunction } from 'react-router-dom';

import { RegisterFormData } from '@/auth/pages/RegisterPage/RegisterPage';
import { LoginResponse } from '@/auth/shared/interfaces';
import { ecomApi } from '@/shared/axios';
import { useAuthStore } from '.';

export const useRegisterUser = (
  userRegisterData: RegisterFormData,
  reset?: Function,
  navigate?: NavigateFunction
) => {
  return useMutation({
    mutationFn: async () => {
      return ecomApi.post('/users/register/', userRegisterData);
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

export const useLogin = (loginData: any, reset?: Function) => {
  const setAuthToken = useAuthStore(s => s.setToken);

  return useMutation({
    mutationFn: async () => {
      return ecomApi.post<LoginResponse>('/users/login/', loginData);
    },
    onSuccess: res => {
      const { access, refresh } = res.data;

      toast.success('Successful login');
      reset && reset();

      setAuthToken(access, refresh);
    },
    onError: err => {
      if (isAxiosError(err)) return toast.error(err.response?.data.detail);

      toast.error('Something went wrong');
      console.log(err);
    },
  });
};
