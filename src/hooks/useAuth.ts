import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { setCredentials, logout } from '@/store/slices/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, token, isAuthenticated } = useSelector((state: RootState) => state.auth);

  const handleLogin = (userData: any, authToken: string) => {
    dispatch(setCredentials({ user: userData, token: authToken }));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return {
    user,
    token,
    isAuthenticated,
    isLandowner: user?.role === 'landowner',
    isInvestor: user?.role === 'investor',
    isAdmin: user?.role === 'admin',
    login: handleLogin,
    logout: handleLogout,
  };
};