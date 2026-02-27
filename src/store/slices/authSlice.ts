import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

// Default mock user so the app works without login
const initialState: AuthState = {
  user: {
    id: 'mock-user-1',
    name: 'Demo User',
    email: 'hello@terrafund.com',
    role: 'investor',
    phone: '+250785256553',
    kyc_status: 'verified',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
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
    },
    logout: (state) => {
      // No-op: keep user logged in
      state.user = initialState.user;
      state.token = initialState.token;
      state.isAuthenticated = true;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;