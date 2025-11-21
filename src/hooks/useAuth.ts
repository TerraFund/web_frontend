import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { login, logout } from '@/store/slices/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, token, isAuthenticated, loading } = useSelector((state: RootState) => state.auth);

  const handleLogin = (userData: any, authToken: string) => {
    dispatch(login({ user: userData, token: authToken }));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return {
    user,
    token,
    isAuthenticated,
    loading,
    isLandowner: user?.role === 'landowner',
    isInvestor: user?.role === 'investor',
    isAdmin: user?.role === 'admin',
    login: handleLogin,
    logout: handleLogout,
  };
};