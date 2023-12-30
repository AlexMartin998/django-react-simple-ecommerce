import { Outlet } from 'react-router-dom';

import { Header } from '@/shared/components/ui';

export interface DashboardLayoutProps {}

const DashboardLayout: React.FC<DashboardLayoutProps> = () => {
  return (
    <>
      <Header />

      <main className="min-h-[1000px] bg-white dark:bg-gray-900">
        <Outlet />
      </main>
    </>
  );
};

export default DashboardLayout;
