import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

const defaultUser: User = {
  id: 'mock-user-1',
  name: 'Demo User',
  email: 'hello@terrafund.com',
  role: 'investor',
  phone: '+250785256553',
  kyc_status: 'verified',
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
};

const initialState: AuthState = {
  user: defaultUser,
  token: 'mock-token',
  isAuthenticated: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      if (typeof window !== 'undefined') {
        localStorage.setItem('terrafund_token', action.payload.token);
        localStorage.setItem('terrafund_user', JSON.stringify(action.payload.user));
      }
    },
    logout: (state) => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('terrafund_token');
        localStorage.removeItem('terrafund_user');
      }
      state.user = defaultUser;
      state.token = 'mock-token';
      state.isAuthenticated = true;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;