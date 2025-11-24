'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { RootState } from '@/store';
import { toggleDarkMode } from '@/store/slices/uiSlice';
import { logout } from '@/store/slices/authSlice';
import { Sun, Moon, Search, User, Menu, X, Leaf, LogOut, ChevronDown } from 'lucide-react';
import NotificationDropdown from './NotificationDropdown';

export default function Navbar() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const router = useRouter();
  const { darkMode } = useSelector((state: RootState) => state.ui);
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      dispatch(logout());
      router.push('/auth/login');
    } catch (error) {
      console.error('Logout failed:', error);
      // Fallback: clear local state anyway
      dispatch(logout());
      router.push('/auth/login');
    }
  };

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
                placeholder={t('common.search')}
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
              className={`relative p-2 rounded-xl transition-all duration-300 overflow-hidden ${
                darkMode
                  ? 'hover:bg-gray-800 text-gray-300 hover:text-white'
                  : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
              }`}
              title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <div className={`relative w-5 h-5 transition-transform duration-300 ${
                darkMode ? 'rotate-180 scale-110' : 'rotate-0 scale-100'
              }`}>
                {darkMode ? (
                  <Sun className="w-5 h-5 absolute inset-0 transition-opacity duration-300 opacity-100" />
                ) : (
                  <Moon className="w-5 h-5 absolute inset-0 transition-opacity duration-300 opacity-100" />
                )}
              </div>
              {/* Background slide animation */}
              <div className={`absolute inset-0 rounded-xl transition-all duration-300 ${
                darkMode
                  ? 'bg-gradient-to-r from-yellow-400/20 to-orange-400/20 translate-x-0'
                  : 'bg-gradient-to-r from-blue-400/20 to-indigo-400/20 -translate-x-full'
              }`} />
            </button>

            {isAuthenticated ? (
              <>
                <NotificationDropdown />
                 <div className="relative" ref={userMenuRef}>
                   <button
                     onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                     className={`flex items-center space-x-2 p-2 rounded-xl transition-all duration-200 ${
                       darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                     }`}
                   >
                     <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold text-sm">
                       {user?.name?.charAt(0).toUpperCase()}
                     </div>
                     <span className="font-medium">{user?.name}</span>
                     <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                   </button>

                   {isUserMenuOpen && (
                     <div className={`absolute right-0 mt-2 w-48 rounded-xl shadow-lg border backdrop-blur-md ${
                       darkMode
                         ? 'bg-gray-900/95 border-gray-800 text-white'
                         : 'bg-white/95 border-gray-200 text-gray-900'
                     }`}>
                       <div className="py-1">
                         <Link
                           href="/dashboard/profile"
                           className={`flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                             darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
                           }`}
                           onClick={() => setIsUserMenuOpen(false)}
                         >
                           <User className="h-4 w-4 mr-2" />
                           Profile
                         </Link>
                         <Link
                           href="/dashboard/settings"
                           className={`flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                             darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
                           }`}
                           onClick={() => setIsUserMenuOpen(false)}
                         >
                           Settings
                         </Link>
                         <button
                           onClick={() => {
                             setIsUserMenuOpen(false);
                             handleLogout();
                           }}
                           className={`flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                             darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
                           }`}
                         >
                           <LogOut className="h-4 w-4 mr-2" />
                           Logout
                         </button>
                       </div>
                     </div>
                   )}
                 </div>
              </>
             ) : (
               <div className="flex items-center space-x-3">
                  <Link href="/auth/login" className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                    darkMode ? 'text-gray-200 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}>
                    {t('nav.login')}
                  </Link>
                 <Link href="/auth/register" className="px-4 py-2 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
                   {t('nav.getStarted')}
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
                   placeholder={t('common.search')}
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
                      darkMode ? 'text-gray-200 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}>
                      {t('nav.login')}
                    </Link>
                   <Link href="/auth/register" className="block w-full text-center py-3 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200">
                     {t('nav.getStarted')}
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