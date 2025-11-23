'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { RootState } from '@/store';
import { setCredentials } from '@/store/slices/authSlice';

export default function Login() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        dispatch(setCredentials({
          user: data.data.user,
          token: data.data.token
        }));
        router.push('/dashboard');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen py-12">
      <div className="max-w-md w-full mx-4">
           <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h1 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">{t('auth.login.title')}</h1>
             <form onSubmit={handleSubmit} className="space-y-4">
               {error && (
                 <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                   <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                 </div>
               )}
               <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('auth.login.email')}
                  </label>
                 <input
                   type="email"
                   required
                   className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                   value={formData.email}
                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                   disabled={isLoading}
                 />
               </div>
               <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('auth.login.password')}
                  </label>
                 <input
                   type="password"
                   required
                   className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                   value={formData.password}
                   onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                   disabled={isLoading}
                 />
               </div>
               <div className="flex items-center">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" disabled={isLoading} />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{t('auth.login.rememberMe')}</span>
                  </label>
               </div>
               <button
                 type="submit"
                 disabled={isLoading}
                 className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
               >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      {t('auth.login.loading')}
                    </>
                  ) : (
                    t('auth.login.submit')
                  )}
               </button>
             </form>
            <p className="text-center mt-4 text-sm text-gray-600 dark:text-gray-400">
              {t('auth.login.noAccount')}{' '}
              <Link href="/auth/register" className="text-primary hover:text-accent">
                {t('auth.login.register')}
              </Link>
            </p>
          </div>
      </div>
    </div>
  );
}