import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { AuthLayout } from '@/auth/layouts/AuthLayout';
import { ShopLayout } from '@/ecommerce/layouts/ShopLayout';

import { LoginPage } from '@/auth/pages/LoginPage';
import { RegisterPage } from '@/auth/pages/RegisterPage';
import { HomePage } from '@/ecommerce/pages/HomePage';
import { AuthRoute } from '../AuthRoute';

export interface AppRouterProps {}

const AppRouter: React.FC<AppRouterProps> = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ShopLayout />}>
          <Route index element={<HomePage />} />
        </Route>

        <Route
          path="/auth"
          element={
            <AuthRoute>
              <AuthLayout />
            </AuthRoute>
          }
        >
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="" element={<Navigate to="/auth/login" replace />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
