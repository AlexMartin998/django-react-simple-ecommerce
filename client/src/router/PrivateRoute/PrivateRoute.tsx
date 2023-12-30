import { Navigate } from 'react-router-dom';

import { useAuthStore } from '@/store/auth';

export interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const isAuth = useAuthStore(s => s.isAuth);

  return !isAuth ? <Navigate to="/auth/login" replace /> : children;
};

export default PrivateRoute;
