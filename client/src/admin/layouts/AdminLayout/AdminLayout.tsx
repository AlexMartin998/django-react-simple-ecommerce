import { Outlet } from 'react-router-dom';

import { Header } from '@/shared/components/ui';

export interface ShopLayoutProps {}

const AdminLayout: React.FC<ShopLayoutProps> = () => {
  return (
    <>
      <Header />

      <main className="min-h-[1000px] bg-white dark:bg-gray-900">
        <Outlet />
      </main>
    </>
  );
};

export default AdminLayout;
