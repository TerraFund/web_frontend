'use client';

import { Provider } from 'react-redux';
import { store } from '@/store';
import Modal from './Modal';
import ThemeProvider from './ThemeProvider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        {children}
        <Modal />
      </ThemeProvider>
    </Provider>
  );
}