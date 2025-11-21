import { useSelector } from 'react-redux';
import { RootState } from '@/store';

export const useAuth = () => {
  const { user, token, isAuthenticated } = useSelector((state: RootState) => state.auth);

  return {
    user,
    token,
    isAuthenticated,
    isLandowner: user?.role === 'landowner',
    isInvestor: user?.role === 'investor',
    isAdmin: user?.role === 'admin',
  };
};