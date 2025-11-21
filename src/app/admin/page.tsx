'use client';

import { useState } from 'react';
import Button from '@/components/Button';
import { Users, Map, BarChart3, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'lands' | 'analytics'>('overview');

  const mockStats = {
    totalUsers: 1247,
    totalLands: 89,
    activeDeals: 23,
    pendingVerifications: 12,
  };

  const mockUsers = [
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'landowner', status: 'verified', joined: '2024-01-15' },
    { id: '2', name: 'Sarah Smith', email: 'sarah@example.com', role: 'investor', status: 'pending', joined: '2024-01-20' },
  ];

  const mockLands = [
    { id: '1', title: 'Coffee Farm Plot #5', owner: 'John Doe', status: 'verified', listed: '2024-01-10' },
    { id: '2', title: 'Maize Field #12', owner: 'Mike Chen', status: 'pending', listed: '2024-01-18' },
  ];

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Admin Dashboard</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-primary mr-3" />
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{mockStats.totalUsers}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Users</p>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <div className="flex items-center">
                  <Map className="h-8 w-8 text-accent mr-3" />
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{mockStats.totalLands}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Lands</p>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <div className="flex items-center">
                  <BarChart3 className="h-8 w-8 text-secondary mr-3" />
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{mockStats.activeDeals}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Active Deals</p>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <div className="flex items-center">
                  <AlertTriangle className="h-8 w-8 text-yellow-500 mr-3" />
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{mockStats.pendingVerifications}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Pending Verifications</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="mb-6">
              <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="-mb-px flex space-x-8">
                  {[
                    { id: 'overview', label: 'Overview' },
                    { id: 'users', label: 'Users' },
                    { id: 'lands', label: 'Lands' },
                    { id: 'analytics', label: 'Analytics' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`py-2 px-1 border-b-2 font-medium text-sm ${
                        activeTab === tab.id
                          ? 'border-primary text-primary'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === 'users' && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">User Management</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Role</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Joined</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {mockUsers.map((user) => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{user.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{user.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{user.role}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              user.status === 'verified'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{user.joined}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-primary hover:text-accent mr-2">Edit</button>
                            <button className="text-red-600 hover:text-red-800">Suspend</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'lands' && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Land Management</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Title</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Owner</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Listed</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {mockLands.map((land) => (
                        <tr key={land.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{land.title}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{land.owner}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              land.status === 'verified'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {land.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{land.listed}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-primary hover:text-accent mr-2">Verify</button>
                            <button className="text-red-600 hover:text-red-800">Hide</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Recent Activity</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="text-sm text-gray-900 dark:text-white">New user registered: Sarah Smith</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className="h-5 w-5 text-yellow-500" />
                      <div>
                        <p className="text-sm text-gray-900 dark:text-white">Land verification pending: Coffee Farm #5</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">4 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <XCircle className="h-5 w-5 text-red-500" />
                      <div>
                        <p className="text-sm text-gray-900 dark:text-white">Proposal rejected: Maize Field #12</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">1 day ago</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">System Health</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Server Status</span>
                      <span className="text-sm font-medium text-green-600">Online</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Database</span>
                      <span className="text-sm font-medium text-green-600">Healthy</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">API Response Time</span>
                      <span className="text-sm font-medium text-yellow-600">120ms</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Active Users</span>
                      <span className="text-sm font-medium text-blue-600">47</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}