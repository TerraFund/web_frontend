'use client';

import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { RootState } from '@/store';

export default function Dashboard() {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
          Welcome back, {user.name}!
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {user.role === 'landowner' ? 'My Lands' : 'Available Lands'}
            </h3>
            <p className="text-3xl font-bold text-primary">12</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {user.role === 'landowner' ? 'Proposals Received' : 'Proposals Sent'}
            </h3>
            <p className="text-3xl font-bold text-accent">8</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Active Deals
            </h3>
            <p className="text-3xl font-bold text-secondary">3</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Total Value
            </h3>
            <p className="text-3xl font-bold text-primary">$125,000</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Recent Activity
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  New proposal received for Land Plot #5
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Contract signed for Investment Deal #12
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-secondary rounded-full"></div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  KYC verification completed
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Quick Actions
            </h3>
            <div className="space-y-3">
              {user.role === 'landowner' ? (
                <>
                  <button className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-accent transition-colors">
                    Add New Land
                  </button>
                  <button className="w-full border border-primary text-primary py-2 px-4 rounded-lg hover:bg-primary hover:text-white transition-colors">
                    View Proposals
                  </button>
                </>
              ) : (
                <>
                  <button className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-accent transition-colors">
                    Browse Lands
                  </button>
                  <button className="w-full border border-primary text-primary py-2 px-4 rounded-lg hover:bg-primary hover:text-white transition-colors">
                    My Proposals
                  </button>
                </>
              )}
              <button className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                View Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}