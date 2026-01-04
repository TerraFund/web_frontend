'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import { Users, Map, BarChart3, AlertTriangle, CheckCircle, XCircle, Eye, Edit, Ban, TrendingUp, DollarSign, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedLands, setSelectedLands] = useState<string[]>([]);

  const mockStats = {
    totalUsers: 1247,
    totalLands: 89,
    activeDeals: 23,
    pendingVerifications: 12,
  };

  const userGrowthData = [
    { month: 'Jan', users: 120 },
    { month: 'Feb', users: 180 },
    { month: 'Mar', users: 250 },
    { month: 'Apr', users: 320 },
    { month: 'May', users: 450 },
    { month: 'Jun', users: 580 },
  ];

  const dealData = [
    { month: 'Jan', deals: 5 },
    { month: 'Feb', deals: 8 },
    { month: 'Mar', deals: 12 },
    { month: 'Apr', deals: 15 },
    { month: 'May', deals: 18 },
    { month: 'Jun', deals: 23 },
  ];

  const revenueData = [
    { month: 'Jan', revenue: 25000 },
    { month: 'Feb', revenue: 35000 },
    { month: 'Mar', revenue: 42000 },
    { month: 'Apr', revenue: 55000 },
    { month: 'May', revenue: 68000 },
    { month: 'Jun', revenue: 82000 },
  ];

  const userTypeData = [
    { name: 'Landowners', value: 45, color: '#0B6E4F' },
    { name: 'Investors', value: 35, color: '#F4A261' },
    { name: 'Admins', value: 20, color: '#1E3932' },
  ];

  const mockUsers = [
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'landowner', status: 'verified', joined: '2024-01-15' },
    { id: '2', name: 'Sarah Smith', email: 'sarah@example.com', role: 'investor', status: 'pending', joined: '2024-01-20' },
  ];

  const mockLands = [
    { id: '1', title: 'Coffee Farm Plot #5', owner: 'John Doe', status: 'verified', listed: '2024-01-10' },
    { id: '2', title: 'Maize Field #12', owner: 'Mike Chen', status: 'pending', listed: '2024-01-18' },
  ];

  const mockDisputes = [
    { id: '1', title: 'Contract Breach - Payment Delay', parties: 'John Doe vs Sarah Smith', status: 'open', priority: 'high', created: '2024-01-20', description: 'Investor claims landowner delayed payment release after milestone completion.' },
    { id: '2', title: 'Land Quality Dispute', parties: 'Mike Chen vs David Kim', status: 'investigating', priority: 'medium', created: '2024-01-18', description: 'Investor alleges land quality does not match description provided.' },
    { id: '3', title: 'Contract Terms Misunderstanding', parties: 'Alice Brown vs Bob Wilson', status: 'resolved', priority: 'low', created: '2024-01-15', description: 'Parties disagreed on revenue sharing terms interpretation.' },
  ];

  const handleBulkUserAction = (action: string) => {
    console.log(`Bulk ${action} for users:`, selectedUsers);
    setSelectedUsers([]);
  };

  const handleBulkLandAction = (action: string) => {
    console.log(`Bulk ${action} for lands:`, selectedLands);
    setSelectedLands([]);
  };

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Admin Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 animate-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-primary mr-3" />
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{mockStats.totalUsers}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Users</p>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 animate-in slide-in-from-bottom-4 duration-500 delay-100">
                <div className="flex items-center">
                  <Map className="h-8 w-8 text-accent mr-3" />
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{mockStats.totalLands}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Lands</p>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 animate-in slide-in-from-bottom-4 duration-500 delay-200">
                <div className="flex items-center">
                  <BarChart3 className="h-8 w-8 text-secondary mr-3" />
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{mockStats.activeDeals}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Active Deals</p>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 animate-in slide-in-from-bottom-4 duration-500 delay-300">
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
                     { id: 'disputes', label: 'Disputes' },
                     { id: 'analytics', label: 'Analytics' },
                      { id: 'settings', label: 'Settings' },
                      { id: 'reports', label: 'Reports' },
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
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">User Management</h2>
                  {selectedUsers.length > 0 && (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">{selectedUsers.length} selected</span>
                      <Button variant="outline" size="sm" onClick={() => handleBulkUserAction('suspend')}>
                        Suspend
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleBulkUserAction('activate')}>
                        Activate
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setSelectedUsers([])}>
                        Clear
                      </Button>
                    </div>
                  )}
                </div>
              </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          <input
                            type="checkbox"
                            checked={selectedUsers.length === mockUsers.length}
                            onChange={(e) => setSelectedUsers(e.target.checked ? mockUsers.map(u => u.id) : [])}
                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                          />
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Role</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Joined</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {mockUsers.map((user, index) => (
                          <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 animate-in slide-in-from-bottom-4 duration-300" style={{ animationDelay: `${index * 50}ms` }}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <input
                                type="checkbox"
                                checked={selectedUsers.includes(user.id)}
                                onChange={(e) => setSelectedUsers(prev =>
                                  prev.includes(user.id)
                                    ? prev.filter(id => id !== user.id)
                                    : [...prev, user.id]
                                )}
                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                              />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{user.name}</td>
                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{user.email}</td>
                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 capitalize">{user.role}</td>
                           <td className="px-6 py-4 whitespace-nowrap">
                             <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full animate-in zoom-in duration-300 ${
                               user.status === 'verified'
                                 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                 : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                             }`}>
                               {user.status}
                             </span>
                           </td>
                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{user.joined}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => router.push(`/admin/users/${user.id}`)}
                                  className="p-1 text-primary hover:text-accent transition-colors hover:scale-110"
                                  title="View Details"
                                >
                                  <Eye className="h-4 w-4" />
                                </button>
                               <button className="p-1 text-blue-600 hover:text-blue-800 transition-colors hover:scale-110" title="Edit User">
                                 <Edit className="h-4 w-4" />
                               </button>
                               <button className="p-1 text-red-600 hover:text-red-800 transition-colors hover:scale-110" title="Suspend User">
                                 <Ban className="h-4 w-4" />
                               </button>
                             </div>
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
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Land Management</h2>
                  {selectedLands.length > 0 && (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">{selectedLands.length} selected</span>
                      <Button variant="outline" size="sm" onClick={() => handleBulkLandAction('verify')}>
                        Verify
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleBulkLandAction('hide')}>
                        Hide
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setSelectedLands([])}>
                        Clear
                      </Button>
                    </div>
                  )}
                </div>
              </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                     <thead className="bg-gray-50 dark:bg-gray-700">
                       <tr>
                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                           <input
                             type="checkbox"
                             checked={selectedLands.length === mockLands.length}
                             onChange={(e) => setSelectedLands(e.target.checked ? mockLands.map(l => l.id) : [])}
                             className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                           />
                         </th>
                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Title</th>
                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Owner</th>
                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Listed</th>
                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                       </tr>
                     </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {mockLands.map((land, index) => (
                          <tr key={land.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 animate-in slide-in-from-bottom-4 duration-300" style={{ animationDelay: `${index * 50}ms` }}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <input
                                type="checkbox"
                                checked={selectedLands.includes(land.id)}
                                onChange={(e) => setSelectedLands(prev =>
                                  prev.includes(land.id)
                                    ? prev.filter(id => id !== land.id)
                                    : [...prev, land.id]
                                )}
                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                              />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{land.title}</td>
                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{land.owner}</td>
                           <td className="px-6 py-4 whitespace-nowrap">
                             <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full animate-in zoom-in duration-300 ${
                               land.status === 'verified'
                                 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                 : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                             }`}>
                               {land.status}
                             </span>
                           </td>
                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{land.listed}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => router.push(`/admin/lands/${land.id}`)}
                                  className="p-1 text-primary hover:text-accent transition-colors hover:scale-110"
                                  title="View Details"
                                >
                                  <Eye className="h-4 w-4" />
                                </button>
                                <button className="px-3 py-1 bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-200 dark:hover:bg-green-800 rounded-md transition-all duration-200 hover:scale-105 text-xs" title="Verify Land">
                                  Verify
                                </button>
                                <button className="px-3 py-1 bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900 dark:text-red-200 dark:hover:bg-red-800 rounded-md transition-all duration-200 hover:scale-105 text-xs" title="Hide Land">
                                  Hide
                                </button>
                              </div>
                            </td>
                         </tr>
                       ))}
                     </tbody>
                  </table>
                </div>
              </div>
        )}

         {activeTab === 'analytics' && (
           <div className="space-y-8">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                 <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                   <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                   User Growth
                 </h3>
                 <ResponsiveContainer width="100%" height={300}>
                   <LineChart data={userGrowthData}>
                     <CartesianGrid strokeDasharray="3 3" />
                     <XAxis dataKey="month" />
                     <YAxis />
                     <Tooltip />
                     <Line type="monotone" dataKey="users" stroke="#0B6E4F" strokeWidth={2} />
                   </LineChart>
                 </ResponsiveContainer>
               </div>

               <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                 <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                   <Activity className="w-5 h-5 mr-2 text-accent" />
                   Deal Volume
                 </h3>
                 <ResponsiveContainer width="100%" height={300}>
                   <BarChart data={dealData}>
                     <CartesianGrid strokeDasharray="3 3" />
                     <XAxis dataKey="month" />
                     <YAxis />
                     <Tooltip />
                     <Bar dataKey="deals" fill="#F4A261" />
                   </BarChart>
                 </ResponsiveContainer>
               </div>
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                 <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                   <DollarSign className="w-5 h-5 mr-2 text-secondary" />
                   Revenue Trends
                 </h3>
                 <ResponsiveContainer width="100%" height={300}>
                   <LineChart data={revenueData}>
                     <CartesianGrid strokeDasharray="3 3" />
                     <XAxis dataKey="month" />
                     <YAxis />
                     <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                     <Line type="monotone" dataKey="revenue" stroke="#1E3932" strokeWidth={2} />
                   </LineChart>
                 </ResponsiveContainer>
               </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">User Distribution</h3>
                  <div className="flex items-center justify-center h-64 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <p className="text-gray-500 dark:text-gray-400">User Distribution Chart</p>
                  </div>
                </div>
             </div>

             <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
               <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Platform Metrics</h3>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                 <div className="text-center">
                   <div className="text-2xl font-bold text-primary">{mockStats.totalUsers}</div>
                   <div className="text-sm text-gray-600 dark:text-gray-400">Total Users</div>
                   <div className="text-xs text-green-600 mt-1">+12% this month</div>
                 </div>
                 <div className="text-center">
                   <div className="text-2xl font-bold text-accent">{mockStats.totalLands}</div>
                   <div className="text-sm text-gray-600 dark:text-gray-400">Active Lands</div>
                   <div className="text-xs text-green-600 mt-1">+8% this month</div>
                 </div>
                 <div className="text-center">
                   <div className="text-2xl font-bold text-secondary">{mockStats.activeDeals}</div>
                   <div className="text-sm text-gray-600 dark:text-gray-400">Active Deals</div>
                   <div className="text-xs text-green-600 mt-1">+15% this month</div>
                 </div>
                 <div className="text-center">
                   <div className="text-2xl font-bold text-primary">$82K</div>
                   <div className="text-sm text-gray-600 dark:text-gray-400">Monthly Revenue</div>
                   <div className="text-xs text-green-600 mt-1">+18% this month</div>
                 </div>
               </div>
             </div>
            </div>
          )}

          {activeTab === 'disputes' && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Dispute Management</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                   <thead className="bg-gray-50 dark:bg-gray-700">
                     <tr>
                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Parties</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Priority</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Created</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                     {mockDisputes.map((dispute, index) => (
                       <tr key={dispute.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 animate-in slide-in-from-bottom-4 duration-300" style={{ animationDelay: `${index * 50}ms` }}>
                         <td className="px-6 py-4 whitespace-nowrap">
                           <div>
                             <div className="text-sm font-medium text-gray-900 dark:text-white">{dispute.title}</div>
                             <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">{dispute.description}</div>
                           </div>
                         </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{dispute.parties}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full animate-in zoom-in duration-300 ${
                            dispute.status === 'open'
                              ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                              : dispute.status === 'investigating'
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                              : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          }`}>
                            {dispute.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            dispute.priority === 'high'
                              ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                              : dispute.priority === 'medium'
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                              : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          }`}>
                            {dispute.priority}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{dispute.created}</td>
                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                           <div className="flex items-center space-x-2">
                             <button
                               onClick={() => router.push(`/admin/disputes/${dispute.id}`)}
                               className="px-3 py-1 bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800 rounded-md transition-all duration-200 hover:scale-105 text-xs"
                             >
                               View Details
                             </button>
                            {dispute.status !== 'resolved' && (
                              <button className="px-3 py-1 bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-200 dark:hover:bg-green-800 rounded-md transition-all duration-200 hover:scale-105 text-xs">
                                Resolve
                              </button>
                            )}
                          </div>
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

          {activeTab === 'settings' && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8">
              <div className="text-center">
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Platform Settings</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">Configure platform-wide settings and preferences</p>
                <Button onClick={() => router.push('/admin/settings')}>
                  Go to Settings
                </Button>
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8">
              <div className="text-center">
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Reports & Analytics</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">Generate and download detailed reports</p>
                <Button onClick={() => router.push('/admin/reports')}>
                  Go to Reports
                </Button>
              </div>
             </div>
           )}
         </div>
       </div>
     </div>
   );
 }