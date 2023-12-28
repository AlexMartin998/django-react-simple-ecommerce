import axios, { AxiosRequestHeaders } from 'axios';

import { useAuthStore } from '@/store/auth';

export const ecomApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const ecomApiAuth = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

///* Interceptores - A TODAS las peticiones: q van al back o q regresan
ecomApiAuth.interceptors.request.use(config => {
  // Zustand mantiene sync state-localStorage, x eso podemos confiar en el access del state
  const token: string = useAuthStore.getState().access;

  config.headers = {
    Authorization: `Bearer ${token}`,
  } as AxiosRequestHeaders;

  return config;
});
