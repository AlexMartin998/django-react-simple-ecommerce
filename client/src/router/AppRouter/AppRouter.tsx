import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { ShopLayout } from '@/ecommerce/layouts/ShopLayout';
import { HomePage } from '@/ecommerce/pages/HomePage';

export interface AppRouterProps {}

const AppRouter: React.FC<AppRouterProps> = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ShopLayout />}>
          <Route index element={<HomePage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
