'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { RootState } from '@/store';
import { setCredentials } from '@/store/slices/authSlice';

export default function Register() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'investor' as 'landowner' | 'investor',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
    setSuccess('');

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          role: formData.role,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(data.message || 'Registration successful!');
        // For demo purposes, auto-login after registration
        setTimeout(() => {
          dispatch(setCredentials({
            user: data.data.user,
            token: 'mock-jwt-token-' + Date.now()
          }));
          router.push('/dashboard');
        }, 2000);
      } else {
        setError(data.error || 'Registration failed');
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
          <div className="bg-white">
            <h1 className="text-2xl font-bold text-center mb-6 text-gray-900">{t('auth.register.title')}</h1>
             <form onSubmit={handleSubmit} className="space-y-4">
               {error && (
                 <div className="bg-red-50">
                   <p className="text-sm text-red-600">{error}</p>
                 </div>
               )}
               {success && (
                 <div className="bg-green-50">
                   <p className="text-sm text-green-600">{success}</p>
                 </div>
               )}
               <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {t('auth.register.name')}
                  </label>
                 <input
                   type="text"
                   required
                   className="w-full px-3 py-2 border border-gray-300"
                   value={formData.name}
                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                   disabled={isLoading}
                 />
               </div>
               <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {t('auth.register.email')}
                  </label>
                 <input
                   type="email"
                   required
                   className="w-full px-3 py-2 border border-gray-300"
                   value={formData.email}
                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                   disabled={isLoading}
                 />
               </div>
               <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {t('auth.register.phone')}
                  </label>
                 <input
                   type="tel"
                   required
                   className="w-full px-3 py-2 border border-gray-300"
                   value={formData.phone}
                   onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                   disabled={isLoading}
                 />
               </div>
               <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {t('auth.register.password')}
                  </label>
                 <input
                   type="password"
                   required
                   className="w-full px-3 py-2 border border-gray-300"
                   value={formData.password}
                   onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                   disabled={isLoading}
                 />
               </div>
               <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {t('auth.register.role')}
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as 'landowner' | 'investor' })}
                    disabled={isLoading}
                  >
                    <option value="investor">{t('auth.register.investor')}</option>
                    <option value="landowner">{t('auth.register.landowner')}</option>
                  </select>
               </div>
               <button
                 type="submit"
                 disabled={isLoading}
                 className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
               >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      {t('auth.register.loading')}
                    </>
                  ) : (
                    t('auth.register.submit')
                  )}
               </button>
             </form>
            <p className="text-center mt-4 text-sm text-gray-600">
              {t('auth.register.haveAccount')}{' '}
              <Link href="/auth/login" className="text-primary hover:text-accent">
                {t('auth.register.login')}
              </Link>
            </p>
          </div>
      </div>
    </div>
  );
}