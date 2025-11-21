'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { toggleDarkMode } from '@/store/slices/uiSlice';
import { Sun, Moon, Search, User, Menu, X, Leaf } from 'lucide-react';
import NotificationDropdown from './NotificationDropdown';

export default function Navbar() {
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state: RootState) => state.ui);
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className={`fixed top-0 w-full z-50 backdrop-blur-md border-b ${darkMode ? 'bg-gray-900/95 border-gray-800 text-white' : 'bg-white/95 border-gray-200 text-gray-900'} shadow-lg transition-all duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 text-2xl font-bold text-primary hover:text-accent transition-colors">
              <Leaf className="w-8 h-8" />
              <span>TerraFund</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search lands..."
                className={`pl-10 pr-4 py-2 rounded-xl border transition-all duration-200 focus:ring-2 focus:ring-primary focus:border-transparent ${
                  darkMode
                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:bg-gray-700'
                    : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:bg-white'
                }`}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>

            <button
              onClick={() => dispatch(toggleDarkMode())}
              className={`p-2 rounded-xl transition-all duration-200 ${
                darkMode
                  ? 'hover:bg-gray-800 text-gray-300 hover:text-white'
                  : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
              }`}
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {isAuthenticated ? (
              <>
                <NotificationDropdown />
                <div className="relative">
                  <button className={`flex items-center space-x-2 p-2 rounded-xl transition-all duration-200 ${
                    darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                  }`}>
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium">{user?.name}</span>
                  </button>
                  {/* Dropdown menu would go here */}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link href="/auth/login" className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                  darkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}>
                  Login
                </Link>
                <Link href="/auth/register" className="px-4 py-2 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-xl transition-all duration-200 ${
                darkMode ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className={`md:hidden border-t ${darkMode ? 'border-gray-800 bg-gray-900/95' : 'border-gray-200 bg-white/95'} backdrop-blur-md`}>
            <div className="px-4 py-6 space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search lands..."
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all duration-200 focus:ring-2 focus:ring-primary focus:border-transparent ${
                    darkMode
                      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:bg-gray-700'
                      : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:bg-white'
                  }`}
                />
                <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Theme</span>
                <button
                  onClick={() => dispatch(toggleDarkMode())}
                  className={`p-2 rounded-xl transition-all duration-200 ${
                    darkMode ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>
              </div>

              {isAuthenticated ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold">
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium">{user?.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{user?.role}</p>
                    </div>
                  </div>
                  <NotificationDropdown />
                </div>
              ) : (
                <div className="space-y-3">
                  <Link href="/auth/login" className={`block w-full text-center py-3 rounded-xl font-medium transition-all duration-200 ${
                    darkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}>
                    Login
                  </Link>
                  <Link href="/auth/register" className="block w-full text-center py-3 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200">
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}