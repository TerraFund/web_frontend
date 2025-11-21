'use client';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { setDarkMode } from '@/store/slices/uiSlice';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state: RootState) => state.ui);

  useEffect(() => {
    // Check for saved theme preference or default to system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      dispatch(setDarkMode(savedTheme === 'dark'));
    } else {
      // Check system preference
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      dispatch(setDarkMode(systemPrefersDark));
    }
  }, [dispatch]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return <>{children}</>;
}