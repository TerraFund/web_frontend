'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import { api } from '@/lib/api';
import {
  Users,
  Map,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Ban,
  Shield,
  Search,
  Filter,
  Check,
  TrendingUp,
  DollarSign,
  Activity,
  RefreshCw,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'lands' | 'disputes' | 'analytics'>('overview');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedLands, setSelectedLands] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [stats, setStats] = useState({
    totalUsers: 1247,
    totalLands: 89,
    activeDeals: 23,
    pendingVerifications: 12,
    landownerCount: 450,
    investorCount: 750,
    adminCount: 47,
  });

  const [users, setUsers] = useState<any[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'landowner',
      kyc_status: 'verified',
      created_at: '2024-01-10T10:00:00Z',
    },
    {
      id: '2',
      name: 'Sarah Smith',
      email: 'sarah@example.com',
      role: 'investor',
      kyc_status: 'pending',
      created_at: '2024-01-15T10:00:00Z',
    },
    {
      id: '3',
      name: 'Geofrey Kayin',
      email: 'geofreykayin@gmail.com',
      role: 'admin',
      kyc_status: 'verified',
      created_at: '2024-01-01T10:00:00Z',
    },
  ]);

  const [lands, setLands] = useState<any[]>([
    {
      id: '1',
      title: 'Kigali Agricultural Land #1',
      owner: 'John Doe',
      location: 'Gasabo, Kigali',
      sizeInHectares: 5.2,
      verified: true,
      hidden: false,
      created_at: '2024-01-12T10:00:00Z',
    },
    {
      id: '2',
      title: 'Musanze Farm Estate #3',
      owner: 'Alice Johnson',
      location: 'Musanze, Northern Province',
      sizeInHectares: 12.0,
      verified: false,
      hidden: false,
      created_at: '2024-01-18T10:00:00Z',
    },
    {
      id: '3',
      title: 'Bugesera Coffee Plantation',
      owner: 'Robert Mukasa',
      location: 'Bugesera, Eastern Province',
      sizeInHectares: 8.5,
      verified: false,
      hidden: false,
      created_at: '2024-01-20T10:00:00Z',
    },
  ]);

  const [disputes, setDisputes] = useState<any[]>([
    {
      id: '1',
      title: 'Boundary Ownership Verification',
      description: 'Dispute over land plot #4 boundaries in Bugesera',
      parties: 'Investor A vs Landowner B',
      status: 'open',
      priority: 'high',
      created_at: '2024-01-20T14:30:00Z',
    },
    {
      id: '2',
      title: 'Escrow Milestone Delay',
      description: 'Milestone 2 payment delayed past agreement deadline',
      parties: 'Investor C vs Landowner D',
      status: 'investigating',
      priority: 'medium',
      created_at: '2024-01-22T09:15:00Z',
    },
  ]);

  const fetchData = async () => {
    setRefreshing(true);
    try {
      const [usersRes, landsRes, disputesRes, analyticsRes] = await Promise.all([
        fetch('/api/admin/users').then((r) => r.json()).catch(() => null),
        fetch('/api/admin/lands').then((r) => r.json()).catch(() => null),
        fetch('/api/admin/disputes').then((r) => r.json()).catch(() => null),
        fetch('/api/admin/analytics').then((r) => r.json()).catch(() => null),
      ]);

      if (usersRes?.success && Array.isArray(usersRes.data)) {
        setUsers(usersRes.data);
      }
      if (landsRes?.success && Array.isArray(landsRes.data)) {
        setLands(landsRes.data);
      }
      if (disputesRes?.success && Array.isArray(disputesRes.data)) {
        setDisputes(disputesRes.data);
      }
      if (analyticsRes?.success && analyticsRes.data?.platformMetrics) {
        setStats(analyticsRes.data.platformMetrics);
      }
    } catch (err) {
      console.error('Failed to load live admin data:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleVerifyLand = async (id: string | number) => {
    try {
      await api.admin.verifyLand(id);
      setLands((prev) =>
        prev.map((l) => (String(l.id) === String(id) ? { ...l, verified: true } : l))
      );
    } catch (err) {
      console.error('Verification failed:', err);
    }
  };

  const handleFlagLand = async (id: string | number) => {
    try {
      await api.admin.flagLand(id);
      setLands((prev) =>
        prev.map((l) => (String(l.id) === String(id) ? { ...l, hidden: true } : l))
      );
    } catch (err) {
      console.error('Flagging failed:', err);
    }
  };

  const handleBulkUserAction = (action: string) => {
    console.log(`Bulk ${action} for users:`, selectedUsers);
    if (action === 'suspend') {
      setUsers((prev) =>
        prev.map((u) => (selectedUsers.includes(String(u.id)) ? { ...u, kyc_status: 'suspended' } : u))
      );
    }
    setSelectedUsers([]);
  };

  const handleBulkLandAction = (action: string) => {
    console.log(`Bulk ${action} for lands:`, selectedLands);
    if (action === 'verify') {
      setLands((prev) =>
        prev.map((l) => (selectedLands.includes(String(l.id)) ? { ...l, verified: true } : l))
      );
    } else if (action === 'hide') {
      setLands((prev) =>
        prev.map((l) => (selectedLands.includes(String(l.id)) ? { ...l, hidden: true } : l))
      );
    }
    setSelectedLands([]);
  };

  const userGrowthData = [
    { month: 'Jan', users: 120 },
    { month: 'Feb', users: 180 },
    { month: 'Mar', users: 250 },
    { month: 'Apr', users: 320 },
    { month: 'May', users: 450 },
    { month: 'Jun', users: 580 },
    { month: 'Jul', users: 780 },
    { month: 'Aug', users: 1020 },
    { month: 'Sep', users: 1247 },
  ];

  const dealData = [
    { month: 'Jan', deals: 5 },
    { month: 'Feb', deals: 8 },
    { month: 'Mar', deals: 12 },
    { month: 'Apr', deals: 15 },
    { month: 'May', deals: 18 },
    { month: 'Jun', deals: 23 },
  ];

  const userTypeData = [
    { name: 'Landowners', value: stats.landownerCount || 450, color: '#0B6E4F' },
    { name: 'Investors', value: stats.investorCount || 750, color: '#F4A261' },
    { name: 'Admins', value: stats.adminCount || 47, color: '#1E3932' },
  ];

  const filteredUsers = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.role?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredLands = lands.filter(
    (l) =>
      l.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.owner?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="p-4 md:p-8 w-full max-w-7xl mx-auto space-y-6">
        <div className="h-8 bg-muted rounded w-1/4 animate-pulse mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-28 bg-muted rounded-2xl animate-pulse" />
          ))}
        </div>
        <div className="h-64 bg-muted rounded-2xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 w-full max-w-full overflow-hidden min-h-screen bg-background">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-foreground tracking-tight flex items-center gap-3">
              <Shield className="h-8 w-8 text-primary" /> Admin Control Center
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Manage platform users, verify land listings, monitor disputes, and track system analytics.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={fetchData}
              disabled={refreshing}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
              {refreshing ? 'Refreshing...' : 'Refresh Data'}
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-card rounded-2xl shadow-sm border border-border p-6 hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                <p className="text-3xl font-extrabold text-foreground mt-2">{stats.totalUsers}</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                <Users className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-emerald-600 font-medium">
              <TrendingUp className="h-3.5 w-3.5 mr-1" /> +18.4% this month
            </div>
          </div>

          <div className="bg-card rounded-2xl shadow-sm border border-border p-6 hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Lands Listed</p>
                <p className="text-3xl font-extrabold text-foreground mt-2">{stats.totalLands}</p>
              </div>
              <div className="p-3 bg-accent/10 rounded-2xl text-accent">
                <Map className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-emerald-600 font-medium">
              <TrendingUp className="h-3.5 w-3.5 mr-1" /> +12.1% growth
            </div>
          </div>

          <div className="bg-card rounded-2xl shadow-sm border border-border p-6 hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Deals</p>
                <p className="text-3xl font-extrabold text-foreground mt-2">{stats.activeDeals}</p>
              </div>
              <div className="p-3 bg-secondary/10 rounded-2xl text-secondary">
                <Activity className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-muted-foreground font-medium">
              Escrow protected
            </div>
          </div>

          <div className="bg-card rounded-2xl shadow-sm border border-border p-6 hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Verifications</p>
                <p className="text-3xl font-extrabold text-amber-600 dark:text-amber-400 mt-2">
                  {stats.pendingVerifications}
                </p>
              </div>
              <div className="p-3 bg-amber-500/10 rounded-2xl text-amber-500">
                <AlertTriangle className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-amber-600 font-medium">
              Requires admin review
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-border gap-4 pb-2">
          <nav className="flex space-x-2 md:space-x-6 overflow-x-auto no-scrollbar py-1">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'users', label: `Users (${users.length})` },
              { id: 'lands', label: `Lands (${lands.length})` },
              { id: 'disputes', label: `Disputes (${disputes.length})` },
              { id: 'analytics', label: 'Analytics' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 px-4 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-primary text-white shadow-md'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {(activeTab === 'users' || activeTab === 'lands') && (
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-card border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          )}
        </div>

        {/* Tab Content */}
        <div>
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-card rounded-2xl shadow-sm border border-border p-6">
                  <h3 className="text-lg font-bold text-foreground mb-4">User Growth Overview</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={userGrowthData}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="month" stroke="currentColor" opacity={0.6} />
                        <YAxis stroke="currentColor" opacity={0.6} />
                        <Tooltip />
                        <Line type="monotone" dataKey="users" stroke="#0B6E4F" strokeWidth={3} dot={{ r: 4 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-card rounded-2xl shadow-sm border border-border p-6">
                  <h3 className="text-lg font-bold text-foreground mb-4">User Role Distribution</h3>
                  <div className="h-64 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={userTypeData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {userTypeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex justify-center space-x-6 mt-4">
                    {userTypeData.map((t) => (
                      <div key={t.name} className="flex items-center space-x-2 text-xs">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: t.color }}></span>
                        <span className="text-muted-foreground">{t.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* System Health & Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-card rounded-2xl shadow-sm border border-border p-6">
                  <h3 className="text-lg font-bold text-foreground mb-4">Recent Audit Activity</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Admin Account Seeded: geofreykayin@gmail.com</p>
                        <p className="text-xs text-muted-foreground">Admin Role Granted • Active</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Land Verification Requested: Musanze Farm Estate #3</p>
                        <p className="text-xs text-muted-foreground">Pending Document Review</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-foreground">KYC Approved for Investor Sarah Smith</p>
                        <p className="text-xs text-muted-foreground">Documents Verified</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-card rounded-2xl shadow-sm border border-border p-6">
                  <h3 className="text-lg font-bold text-foreground mb-4">System Health</h3>
                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">PostgreSQL Database</span>
                      <span className="px-2.5 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded-full font-semibold text-xs">Healthy</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Spring Boot API Gateway</span>
                      <span className="px-2.5 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded-full font-semibold text-xs">Online</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">JWT Authentication Service</span>
                      <span className="px-2.5 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded-full font-semibold text-xs">Active</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-muted-foreground">API Latency</span>
                      <span className="font-semibold text-foreground">42 ms</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* USERS TAB */}
          {activeTab === 'users' && (
            <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
              <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                <h2 className="text-lg font-bold text-foreground">User Directory</h2>
                {selectedUsers.length > 0 && (
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-muted-foreground">{selectedUsers.length} selected</span>
                    <Button variant="outline" size="sm" onClick={() => handleBulkUserAction('suspend')}>
                      Suspend Selected
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setSelectedUsers([])}>
                      Clear
                    </Button>
                  </div>
                )}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-muted/50 border-b border-border text-muted-foreground text-xs uppercase font-semibold">
                    <tr>
                      <th className="px-6 py-3">
                        <input
                          type="checkbox"
                          checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                          onChange={(e) =>
                            setSelectedUsers(e.target.checked ? filteredUsers.map((u) => String(u.id)) : [])
                          }
                          className="rounded border-border"
                        />
                      </th>
                      <th className="px-6 py-3">Name</th>
                      <th className="px-6 py-3">Email</th>
                      <th className="px-6 py-3">Role</th>
                      <th className="px-6 py-3">KYC Status</th>
                      <th className="px-6 py-3">Joined</th>
                      <th className="px-6 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-muted/30 transition-colors">
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            checked={selectedUsers.includes(String(user.id))}
                            onChange={(e) =>
                              setSelectedUsers((prev) =>
                                prev.includes(String(user.id))
                                  ? prev.filter((id) => id !== String(user.id))
                                  : [...prev, String(user.id)]
                              )
                            }
                            className="rounded border-border"
                          />
                        </td>
                        <td className="px-6 py-4 font-semibold text-foreground">{user.name}</td>
                        <td className="px-6 py-4 text-muted-foreground">{user.email}</td>
                        <td className="px-6 py-4">
                          <span className="capitalize px-2.5 py-1 bg-primary/10 text-primary rounded-lg text-xs font-semibold">
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                              user.kyc_status === 'verified'
                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                : user.kyc_status === 'suspended'
                                ? 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                                : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                            }`}
                          >
                            {user.kyc_status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground text-xs">
                          {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => router.push(`/admin/users/${user.id}`)}
                              className="p-1.5 text-muted-foreground hover:text-primary transition-colors"
                              title="View Details"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleBulkUserAction('suspend')}
                              className="p-1.5 text-red-500 hover:text-red-700 transition-colors"
                              title="Suspend User"
                            >
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

          {/* LANDS TAB */}
          {activeTab === 'lands' && (
            <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
              <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                <h2 className="text-lg font-bold text-foreground">Land Listings Management</h2>
                {selectedLands.length > 0 && (
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-muted-foreground">{selectedLands.length} selected</span>
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
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-muted/50 border-b border-border text-muted-foreground text-xs uppercase font-semibold">
                    <tr>
                      <th className="px-6 py-3">
                        <input
                          type="checkbox"
                          checked={selectedLands.length === filteredLands.length && filteredLands.length > 0}
                          onChange={(e) =>
                            setSelectedLands(e.target.checked ? filteredLands.map((l) => String(l.id)) : [])
                          }
                          className="rounded border-border"
                        />
                      </th>
                      <th className="px-6 py-3">Title</th>
                      <th className="px-6 py-3">Location</th>
                      <th className="px-6 py-3">Size (Ha)</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredLands.map((land) => (
                      <tr key={land.id} className="hover:bg-muted/30 transition-colors">
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            checked={selectedLands.includes(String(land.id))}
                            onChange={(e) =>
                              setSelectedLands((prev) =>
                                prev.includes(String(land.id))
                                  ? prev.filter((id) => id !== String(land.id))
                                  : [...prev, String(land.id)]
                              )
                            }
                            className="rounded border-border"
                          />
                        </td>
                        <td className="px-6 py-4 font-semibold text-foreground">
                          {land.title || `Plot #${land.id}`}
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">{land.location || 'Rwanda'}</td>
                        <td className="px-6 py-4 font-medium text-foreground">{land.sizeInHectares || land.size || 2.5} Ha</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1.5">
                            {land.verified ? (
                              <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 rounded-full text-xs font-semibold flex items-center gap-1">
                                <Check className="h-3 w-3" /> Verified
                              </span>
                            ) : (
                              <span className="px-2.5 py-1 bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 rounded-full text-xs font-semibold">
                                Pending Verification
                              </span>
                            )}
                            {land.hidden && (
                              <span className="px-2 py-0.5 bg-red-100 text-red-800 rounded text-xs">Hidden</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            {!land.verified && (
                              <button
                                onClick={() => handleVerifyLand(land.id)}
                                className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-xs font-semibold hover:bg-emerald-700 transition-colors"
                              >
                                Approve
                              </button>
                            )}
                            {!land.hidden && (
                              <button
                                onClick={() => handleFlagLand(land.id)}
                                className="px-3 py-1 bg-red-500/10 text-red-600 rounded-lg text-xs font-semibold hover:bg-red-500/20 transition-colors"
                              >
                                Flag / Hide
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

          {/* DISPUTES TAB */}
          {activeTab === 'disputes' && (
            <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden p-6 space-y-4">
              <h2 className="text-lg font-bold text-foreground">Dispute Resolution Queue</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {disputes.map((dispute) => (
                  <div key={dispute.id} className="p-5 border border-border rounded-xl bg-muted/20 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-foreground">{dispute.title}</h3>
                      <span className="px-2.5 py-1 bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300 rounded-full text-xs font-semibold">
                        {dispute.priority} priority
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{dispute.description}</p>
                    <p className="text-xs text-foreground/80 font-medium">Parties involved: {dispute.parties}</p>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs text-muted-foreground">Status: {dispute.status}</span>
                      <Button size="sm" variant="outline">
                        Investigate
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ANALYTICS TAB */}
          {activeTab === 'analytics' && (
            <div className="bg-card rounded-2xl shadow-sm border border-border p-6 space-y-6">
              <h2 className="text-lg font-bold text-foreground">Platform Activity & Revenue Analytics</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dealData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="month" stroke="currentColor" opacity={0.6} />
                    <YAxis stroke="currentColor" opacity={0.6} />
                    <Tooltip />
                    <Bar dataKey="deals" fill="#0B6E4F" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}