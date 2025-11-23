'use client';

import { Provider } from 'react-redux';
import { store } from '@/store';
import Modal from './Modal';
import ThemeProvider from './ThemeProvider';
import I18nProvider from './I18nProvider';
import '@/lib/i18n';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <I18nProvider>
        <ThemeProvider>
          {children}
          <Modal />
        </ThemeProvider>
      </I18nProvider>
    </Provider>
  );
}