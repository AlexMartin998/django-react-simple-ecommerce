import { Navigate } from 'react-router-dom';

import { useAuthStore } from '@/store/auth';

export interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const isAuth = useAuthStore(s => s.isAuth);
  const isAdmin = useAuthStore(s => s.isAdmin);

  return isAuth && isAdmin ? children : <Navigate to="/" replace />;
};

export default AdminRoute;
