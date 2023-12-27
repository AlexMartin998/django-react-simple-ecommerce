import { Outlet } from 'react-router-dom';

import { Header } from '@/shared/components/ui';

export interface AuthLayoutProps {}

const AuthLayout: React.FC<AuthLayoutProps> = () => {
  return (
    <>
      <Header />

      <main className="min-h-[1000px] bg-white dark:bg-gray-900">
        <Outlet />
      </main>
    </>
  );
};

export default AuthLayout;
