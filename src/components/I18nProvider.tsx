'use client';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface I18nProviderProps {
  children: React.ReactNode;
}

export default function I18nProvider({ children }: I18nProviderProps) {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Ensure i18n is initialized on the client side
    if (!i18n.isInitialized) {
      i18n.init();
    }
  }, [i18n]);

  return <>{children}</>;
}