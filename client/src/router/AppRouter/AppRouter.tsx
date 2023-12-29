import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { AdminRoute } from '../AdminRoute';
import { AuthRoute } from '../AuthRoute';

import { AdminLayout } from '@/admin/layouts/AdminLayout';
import { AuthLayout } from '@/auth/layouts/AuthLayout';
import { ShopLayout } from '@/ecommerce/layouts/ShopLayout';

import { AdminPage } from '@/admin/pages';
import { LoginPage, RegisterPage } from '@/auth/pages';
import { HomePage } from '@/ecommerce/pages';

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

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<AdminPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
