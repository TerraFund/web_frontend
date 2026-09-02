import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

const defaultUser: User = {
  id: 'admin-1',
  name: 'Geofrey Kayin',
  email: 'geofreykayin@gmail.com',
  role: 'admin',
  phone: '+250788000000',
  kyc_status: 'verified',
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
};

const initialState: AuthState = {
  user: defaultUser,
  token: 'mock-token',
  isAuthenticated: true,
};

const setCookie = (name: string, value: string, days = 7) => {
  if (typeof document === 'undefined') return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
};

const deleteCookie = (name: string) => {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
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
        setCookie('terrafund_token', action.payload.token);
        setCookie('terrafund_role', action.payload.user.role);
      }
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        if (typeof window !== 'undefined') {
          localStorage.setItem('terrafund_user', JSON.stringify(state.user));
          if (action.payload.role) {
            setCookie('terrafund_role', action.payload.role);
          }
        }
      }
    },
    logout: (state) => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('terrafund_token');
        localStorage.removeItem('terrafund_user');
        deleteCookie('terrafund_token');
        deleteCookie('terrafund_role');
      }
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, updateUser, logout } = authSlice.actions;
export default authSlice.reducer;