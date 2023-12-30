import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { AdminRoute } from '../AdminRoute';
import { AuthRoute } from '../AuthRoute';
import { PrivateRoute } from '../PrivateRoute';

import { AdminLayout } from '@/admin/layouts/AdminLayout';
import { AuthLayout } from '@/auth/layouts/AuthLayout';
import { DashboardLayout } from '@/dashboard/layouts';
import { ShopLayout } from '@/ecommerce/layouts/ShopLayout';

import { AdminPage, EditProductPage, NewProductPage } from '@/admin/pages';
import { LoginPage, RegisterPage } from '@/auth/pages';
import { ProfilePage } from '@/dashboard/pages';
import { CartPage, HomePage } from '@/ecommerce/pages';

export interface AppRouterProps {}

const AppRouter: React.FC<AppRouterProps> = () => {
  return (
    <BrowserRouter>
      {/* ========= Public Routes ========= */}
      <Routes>
        <Route path="/" element={<ShopLayout />}>
          <Route index element={<HomePage />} />
          <Route path="cart" element={<CartPage />} />
        </Route>

        {/* ========= Private Routes ========= */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route path="profile" element={<ProfilePage />} />
          <Route path="" element={<Navigate to="/" replace />} />
        </Route>

        {/* ========= Auth Routes ========= */}
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

        {/* ========= Admin Routes ========= */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<AdminPage />} />

          {/* ----- Products ----- */}
          <Route path="products/new" element={<NewProductPage />} />
          <Route path="products/edit/:id" element={<EditProductPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
