'use client';

import { useState, useEffect } from 'react';
import Button from '@/components/Button';
import { TrendingUp, Users, Map, DollarSign, Activity, BarChart3 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

export default function AdminAnalyticsPage() {
  const [analytics, setAnalytics] = useState<{
    userGrowth: Array<{ month: string; users: number }>;
    dealVolume: Array<{ month: string; deals: number }>;
    revenue: Array<{ month: string; revenue: number }>;
    userDistribution: Array<{ name: string; value: number; color: string }>;
    platformMetrics: {
      totalUsers: number;
      totalLands: number;
      activeDeals: number;
      pendingVerifications: number;
      monthlyRevenue: number;
    };
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock API call
    const fetchAnalytics = async () => {
      try {
        const response = await fetch('/api/admin/analytics');
        const data = await response.json();
        if (data.success) {
          setAnalytics(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-300 rounded"></div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="h-64 bg-gray-300 rounded"></div>
              <div className="h-64 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="p-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="bg-red-50">
            <h2 className="text-lg font-semibold text-red-800">Error Loading Analytics</h2>
            <p className="text-red-600">Failed to load analytics data. Please try again.</p>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center space-x-3 mb-8">
          <BarChart3 className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-card">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-primary mr-3" />
              <div>
                <p className="text-2xl font-bold text-foreground">{analytics.platformMetrics.totalUsers}</p>
                <p className="text-sm text-muted-foreground">Total Users</p>
              </div>
            </div>
          </div>
          <div className="bg-card">
            <div className="flex items-center">
              <Map className="h-8 w-8 text-accent mr-3" />
              <div>
                <p className="text-2xl font-bold text-foreground">{analytics.platformMetrics.totalLands}</p>
                <p className="text-sm text-muted-foreground">Total Lands</p>
              </div>
            </div>
          </div>
          <div className="bg-card">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-secondary mr-3" />
              <div>
                <p className="text-2xl font-bold text-foreground">{analytics.platformMetrics.activeDeals}</p>
                <p className="text-sm text-muted-foreground">Active Deals</p>
              </div>
            </div>
          </div>
          <div className="bg-card">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-green-500 mr-3" />
              <div>
                <p className="text-2xl font-bold text-foreground">${analytics.platformMetrics.monthlyRevenue.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Monthly Revenue</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-card">
            <h3 className="text-lg font-semibold mb-4 text-foreground">
              <TrendingUp className="w-5 h-5 mr-2 text-primary" />
              User Growth
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analytics.userGrowth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="#0B6E4F" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-card">
            <h3 className="text-lg font-semibold mb-4 text-foreground">
              <Activity className="w-5 h-5 mr-2 text-accent" />
              Deal Volume
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics.dealVolume}>
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
          <div className="bg-card">
            <h3 className="text-lg font-semibold mb-4 text-foreground">
              <DollarSign className="w-5 h-5 mr-2 text-secondary" />
              Revenue Trends
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analytics.revenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                <Line type="monotone" dataKey="revenue" stroke="#1E3932" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-card">
            <h3 className="text-lg font-semibold mb-4 text-foreground">User Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analytics.userDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {analytics.userDistribution.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Detailed Metrics */}
        <div className="mt-8 bg-card">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Platform Metrics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{analytics.platformMetrics.totalUsers}</div>
              <div className="text-sm text-muted-foreground">Total Users</div>
              <div className="text-xs text-green-600 mt-1">+12% this month</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">{analytics.platformMetrics.totalLands}</div>
              <div className="text-sm text-muted-foreground">Active Lands</div>
              <div className="text-xs text-green-600 mt-1">+8% this month</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary">{analytics.platformMetrics.activeDeals}</div>
              <div className="text-sm text-muted-foreground">Active Deals</div>
              <div className="text-xs text-green-600 mt-1">+15% this month</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">${analytics.platformMetrics.monthlyRevenue.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Monthly Revenue</div>
              <div className="text-xs text-green-600 mt-1">+18% this month</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}