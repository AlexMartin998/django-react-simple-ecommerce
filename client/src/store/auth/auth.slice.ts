import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { toast } from 'react-hot-toast';
import { NavigateFunction } from 'react-router-dom';

import { RegisterFormData } from '@/auth/pages/RegisterPage/RegisterPage';
import { LoginResponse } from '@/auth/shared/interfaces';
import { ecomApi, ecomApiAuth } from '@/shared/axios';
import { User } from '@/shared/interfaces';
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
    onSuccess: async res => {
      const { access, refresh } = res.data;

      toast.success('Successful login');
      reset && reset();

      await setAuthToken(access, refresh);
    },
    onError: err => {
      if (isAxiosError(err)) return toast.error(err.response?.data.detail);

      toast.error('Something went wrong');
      console.log(err);
    },
  });
};

///* TODO: no usa 1 refreshToken desde aqui en el AppRouter como FH, implementarlo para el /refresh

export const useEditProfileMutation = (
  setModalOpen: (value: boolean) => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userLike: any) => {
      const formData = new FormData();
      formData.append('name', userLike.name);
      formData.append('last_name', userLike.last_name);
      formData.append('email', userLike.email);
      if (userLike.avatar && userLike.updImg)
        formData.append('avatar', userLike.avatar);

      return ecomApiAuth.put(`/users/edit/${userLike.id}/`, formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('Profile updated!');
      setModalOpen(false);
    },
    onError: () => {
      toast.error('Error!');
    },
  });
};

export const useGetUserQuery = (id: number) => {
  const setUser = useAuthStore(s => s.setUser);

  return useQuery({
    queryKey: ['users', id],
    queryFn: async () => {
      const user = await getUser(id);
      setUser(user);
      return user;
    },
  });
};

///* actions
export const getUser = async (id: number) => {
  const response = await ecomApiAuth.get<User>(`/users/get/${id}/`);
  return response.data;
};
