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
    const root = document.documentElement;

    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      // Add smooth transition for background color change
      root.style.setProperty('--theme-transition', 'background-color 0.3s ease-in-out, color 0.3s ease-in-out');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      // Add smooth transition for background color change
      root.style.setProperty('--theme-transition', 'background-color 0.3s ease-in-out, color 0.3s ease-in-out');
    }

    // Clean up transition property after animation
    const timeout = setTimeout(() => {
      root.style.removeProperty('--theme-transition');
    }, 300);

    return () => clearTimeout(timeout);
  }, [darkMode]);

  return <>{children}</>;
}