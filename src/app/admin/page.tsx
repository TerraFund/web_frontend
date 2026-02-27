'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import { Users, Map, BarChart3, AlertTriangle, CheckCircle, XCircle, Eye, Edit, Ban, TrendingUp, DollarSign, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedLands, setSelectedLands] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [lands, setLands] = useState<any[]>([]);
  const [disputes, setDisputes] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, landsRes, disputesRes, analyticsRes] = await Promise.all([
          fetch('/api/admin/users'),
          fetch('/api/admin/lands'),
          fetch('/api/admin/disputes'),
          fetch('/api/admin/analytics'),
        ]);

        const usersData = await usersRes.json();
        const landsData = await landsRes.json();
        const disputesData = await disputesRes.json();
        const analyticsData = await analyticsRes.json();

        if (usersData.success) setUsers(usersData.data);
        if (landsData.success) setLands(landsData.data);
        if (disputesData.success) setDisputes(disputesData.data);
        if (analyticsData.success) setStats(analyticsData.data.platformMetrics);
      } catch (error) {
        console.error('Failed to fetch admin data:', error);
        setError('Failed to load admin data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const defaultStats = {
    totalUsers: 1247,
    totalLands: 89,
    activeDeals: 23,
    pendingVerifications: 12,
  };

  const currentStats = stats || defaultStats;

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







  const handleBulkUserAction = (action: string) => {
    console.log(`Bulk ${action} for users:`, selectedUsers);
    setSelectedUsers([]);
  };

  const handleBulkLandAction = (action: string) => {
    console.log(`Bulk ${action} for lands:`, selectedLands);
    setSelectedLands([]);
  };

  if (loading) {
    return (
      <div className="p-4 md:p-8 w-full max-w-full overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-300 rounded"></div>
              ))}
            </div>
            <div className="h-64 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 md:p-8 w-full max-w-full overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <div className="bg-red-50 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-red-800">Error Loading Data</h2>
            <p className="text-red-600">{error}</p>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 md:mb-8 text-foreground">Admin Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-card rounded-2xl shadow-lg border border-border p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-primary mr-3" />
                   <div>
                     <p className="text-2xl font-bold text-foreground">{currentStats.totalUsers}</p>
                     <p className="text-sm text-muted-foreground">Total Users</p>
                   </div>
                </div>
              </div>
              <div className="bg-card rounded-2xl shadow-lg border border-border p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center">
                  <Map className="h-8 w-8 text-accent mr-3" />
                   <div>
                     <p className="text-2xl font-bold text-foreground">{currentStats.totalLands}</p>
                     <p className="text-sm text-muted-foreground">Total Lands</p>
                   </div>
                </div>
              </div>
              <div className="bg-card rounded-2xl shadow-lg border border-border p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center">
                  <BarChart3 className="h-8 w-8 text-secondary mr-3" />
                   <div>
                     <p className="text-2xl font-bold text-foreground">{currentStats.activeDeals}</p>
                     <p className="text-sm text-muted-foreground">Active Deals</p>
                   </div>
                </div>
              </div>
              <div className="bg-card rounded-2xl shadow-lg border border-border p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center">
                  <AlertTriangle className="h-8 w-8 text-yellow-500 mr-3" />
                   <div>
                     <p className="text-2xl font-bold text-foreground">{currentStats.pendingVerifications}</p>
                     <p className="text-sm text-muted-foreground">Pending Verifications</p>
                   </div>
                </div>
              </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
              <div className="border-b border-border overflow-x-auto no-scrollbar scroll-smooth">
                <nav className="-mb-px flex space-x-4 md:space-x-8 min-w-max px-1">
                  {[
                      { id: 'overview', label: 'Overview' },
                      { id: 'users', label: 'Users' },
                      { id: 'lands', label: 'Lands' },
                      { id: 'disputes', label: 'Disputes' },
                    ].map((tab) => (
                     <button
                       key={tab.id}
                       onClick={() => setActiveTab(tab.id as any)}
                       className={`py-2 px-1 border-b-2 font-medium text-sm ${
                         activeTab === tab.id
                           ? 'border-primary text-primary'
                           : 'border-transparent text-muted-foreground hover:text-foreground/80 hover:border-border'
                       }`}
                     >
                       {tab.label}
                     </button>
                   ))}
                </nav>
              </div>
         </div>

          {/* Tab Content */}
          <div>
            {activeTab === 'users' && (
            <div className="bg-card rounded-2xl shadow-lg border border-border overflow-hidden">
              <div className="px-6 py-4 border-b border-border">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-foreground">User Management</h2>
                  {selectedUsers.length > 0 && (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">{selectedUsers.length} selected</span>
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
                    <thead className="bg-muted">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">
                           <input
                             type="checkbox"
                             checked={selectedUsers.length === users.length}
                             onChange={(e) => setSelectedUsers(e.target.checked ? users.map(u => u.id) : [])}
                             className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
                           />
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">Role</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">Joined</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                       <tbody className="bg-card">
                         {users.map((user, index) => (
                          <tr key={user.id} className="hover:bg-muted" style={{ animationDelay: `${index * 50}ms` }}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <input
                                type="checkbox"
                                checked={selectedUsers.includes(user.id)}
                                onChange={(e) => setSelectedUsers(prev =>
                                  prev.includes(user.id)
                                    ? prev.filter(id => id !== user.id)
                                    : [...prev, user.id]
                                )}
                                className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
                              />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">{user.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{user.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{user.role}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full animate-in zoom-in duration-300 ${
                                user.kyc_status === 'verified'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {user.kyc_status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{new Date(user.created_at).toLocaleDateString()}</td>
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
            <div className="bg-card rounded-2xl shadow-lg border border-border overflow-hidden">
              <div className="px-6 py-4 border-b border-border">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-foreground">Land Management</h2>
                  {selectedLands.length > 0 && (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">{selectedLands.length} selected</span>
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
                     <thead className="bg-muted">
                       <tr>
                         <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">
                            <input
                              type="checkbox"
                              checked={selectedLands.length === lands.length}
                              onChange={(e) => setSelectedLands(e.target.checked ? lands.map(l => l.id) : [])}
                              className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
                            />
                         </th>
                         <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">Title</th>
                         <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">Owner</th>
                         <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">Status</th>
                         <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">Listed</th>
                         <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">Actions</th>
                       </tr>
                     </thead>
                       <tbody className="bg-card">
                         {lands.map((land, index) => (
                          <tr key={land.id} className="hover:bg-muted" style={{ animationDelay: `${index * 50}ms` }}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <input
                                type="checkbox"
                                checked={selectedLands.includes(land.id)}
                                onChange={(e) => setSelectedLands(prev =>
                                  prev.includes(land.id)
                                    ? prev.filter(id => id !== land.id)
                                    : [...prev, land.id]
                                )}
                                className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
                              />
                            </td>
                             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">{land.title}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{land.owner}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full animate-in zoom-in duration-300 ${
                                land.verified
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {land.verified ? 'verified' : 'pending'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{new Date(land.created_at).toLocaleDateString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => router.push(`/admin/lands/${land.id}`)}
                                  className="p-1 text-primary hover:text-accent transition-colors hover:scale-110"
                                  title="View Details"
                                >
                                  <Eye className="h-4 w-4" />
                                </button>
                                <button className="px-3 py-1 bg-green-100 text-green-800 hover:bg-green-200" title="Verify Land">
                                  Verify
                                </button>
                                <button className="px-3 py-1 bg-red-100 text-red-800 hover:bg-red-200" title="Hide Land">
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



          {activeTab === 'disputes' && (
            <div className="bg-card rounded-2xl shadow-lg border border-border overflow-hidden">
              <div className="px-6 py-4 border-b border-border">
                <h2 className="text-lg font-semibold text-foreground">Dispute Management</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                   <thead className="bg-muted">
                     <tr>
                       <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">Parties</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">Priority</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">Created</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                   <tbody className="bg-card">
                      {disputes.map((dispute, index) => (
                       <tr key={dispute.id} className="hover:bg-muted" style={{ animationDelay: `${index * 50}ms` }}>
                         <td className="px-6 py-4 whitespace-nowrap">
                           <div>
                             <div className="text-sm font-medium text-foreground">{dispute.title}</div>
                             <div className="text-sm text-muted-foreground">{dispute.description}</div>
                           </div>
                         </td>
                         <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{dispute.parties}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full animate-in zoom-in duration-300 ${
                              dispute.status === 'open'
                                ? 'bg-red-100 text-red-800'
                                : dispute.status === 'investigating'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {dispute.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              dispute.priority === 'high'
                                ? 'bg-red-100 text-red-800'
                                : dispute.priority === 'medium'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {dispute.priority}
                           </span>
                         </td>
                         <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{new Date(dispute.created_at).toLocaleDateString()}</td>
                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                           <div className="flex items-center space-x-2">
                             <button
                               onClick={() => router.push(`/admin/disputes/${dispute.id}`)}
                               className="px-3 py-1 bg-blue-100 text-blue-800 hover:bg-blue-200"
                             >
                               View Details
                             </button>
                            {dispute.status !== 'resolved' && (
                              <button className="px-3 py-1 bg-green-100 text-green-800 hover:bg-green-200">
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
             <div className="bg-card rounded-2xl shadow-lg border border-border p-6">
               <h3 className="text-lg font-semibold mb-4 text-foreground">Recent Activity</h3>
               <div className="space-y-4">
                 <div className="flex items-center space-x-3">
                   <CheckCircle className="h-5 w-5 text-green-500" />
                   <div>
                     <p className="text-sm text-foreground">New user registered: Sarah Smith</p>
                     <p className="text-xs text-muted-foreground">2 hours ago</p>
                   </div>
                 </div>
                 <div className="flex items-center space-x-3">
                   <AlertTriangle className="h-5 w-5 text-yellow-500" />
                   <div>
                     <p className="text-sm text-foreground">Land verification pending: Coffee Farm #5</p>
                     <p className="text-xs text-muted-foreground">4 hours ago</p>
                   </div>
                 </div>
                 <div className="flex items-center space-x-3">
                   <XCircle className="h-5 w-5 text-red-500" />
                   <div>
                     <p className="text-sm text-foreground">Proposal rejected: Maize Field #12</p>
                     <p className="text-xs text-muted-foreground">1 day ago</p>
                   </div>
                 </div>
               </div>
             </div>

             <div className="bg-card rounded-2xl shadow-lg border border-border p-6">
               <h3 className="text-lg font-semibold mb-4 text-foreground">System Health</h3>
               <div className="space-y-4">
                 <div className="flex justify-between items-center">
                   <span className="text-sm text-muted-foreground">Server Status</span>
                   <span className="text-sm font-medium text-green-600">Online</span>
                 </div>
                 <div className="flex justify-between items-center">
                   <span className="text-sm text-muted-foreground">Database</span>
                   <span className="text-sm font-medium text-green-600">Healthy</span>
                 </div>
                 <div className="flex justify-between items-center">
                   <span className="text-sm text-muted-foreground">API Response Time</span>
                   <span className="text-sm font-medium text-yellow-600">120ms</span>
                 </div>
                 <div className="flex justify-between items-center">
                   <span className="text-sm text-muted-foreground">Active Users</span>
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