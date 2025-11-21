'use client';

import { Provider } from 'react-redux';
import { store } from '@/store';
import Modal from './Modal';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      {children}
      <Modal />
    </Provider>
  );
}