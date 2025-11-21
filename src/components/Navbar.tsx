'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { toggleDarkMode } from '@/store/slices/uiSlice';
import { Sun, Moon, Bell, Search, User } from 'lucide-react';

export default function Navbar() {
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state: RootState) => state.ui);
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  return (
    <nav className={`fixed top-0 w-full z-50 ${darkMode ? 'bg-secondary text-text_primary' : 'bg-white text-gray-900'} shadow-lg`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary">
              TerraFund
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search lands..."
                className={`pl-10 pr-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'}`}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>

            <button
              onClick={() => dispatch(toggleDarkMode())}
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {isAuthenticated ? (
              <>
                <button className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
                  <Bell className="h-5 w-5" />
                </button>
                <div className="relative">
                  <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
                    <User className="h-5 w-5" />
                    <span>{user?.name}</span>
                  </button>
                  {/* Dropdown menu would go here */}
                </div>
              </>
            ) : (
              <div className="space-x-2">
                <Link href="/auth/login" className="px-4 py-2 text-primary hover:text-accent">
                  Login
                </Link>
                <Link href="/auth/register" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-accent">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}