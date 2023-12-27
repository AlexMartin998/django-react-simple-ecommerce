import { Outlet } from 'react-router-dom';

export interface AuthLayoutProps {}

const AuthLayout: React.FC<AuthLayoutProps> = () => {
  return (
    <>
      {/* <Header /> */}

      <main className="h-screen bg-gray-100 dark:bg-gray-900">
        <Outlet />
      </main>
    </>
  );
};

export default AuthLayout;
