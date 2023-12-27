import axios from 'axios';

export const ecomApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
