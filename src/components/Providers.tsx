'use client';

import { Provider } from 'react-redux';
import { store } from '@/store';
import Modal from './Modal';
import ToastContainer from './ToastContainer';
import I18nProvider from './I18nProvider';
import '@/lib/i18n';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <I18nProvider>
        {children}
        <Modal />
        <ToastContainer />
      </I18nProvider>
    </Provider>
  );
}