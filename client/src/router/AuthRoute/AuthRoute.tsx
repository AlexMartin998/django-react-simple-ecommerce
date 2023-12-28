import { Navigate } from 'react-router-dom';

import { useAuthStore } from '@/store/auth';

export interface AuthRouteProps {
  children: React.ReactNode;
}

const AuthRoute: React.FC<AuthRouteProps> = ({ children }) => {
  const isAuth = useAuthStore(s => s.isAuth);

  return !isAuth ? children : <Navigate to="/" replace />;
};

export default AuthRoute;
