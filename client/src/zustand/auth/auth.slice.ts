import { ecomApi } from '@/shared/axios';

import { RegisterFormData } from '@/auth/pages/RegisterPage/RegisterPage';

export const registerUser = async (userRegisterData: RegisterFormData) =>
  await ecomApi.post('/users/register/', userRegisterData);
