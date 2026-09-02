'use client';

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '@/store';
import InvestorDashboard from '@/components/InvestorDashboard';
import LandownerDashboard from '@/components/LandownerDashboard';
import Button from '@/components/Button';
import { api } from '@/lib/api';
import {
  UserCheck,
  Eye,
  Sparkles,
  Server,
  PlusCircle,
  FolderKanban,
  Search,
  Wallet,
  MessageSquare,
  ShieldCheck,
  Zap,
} from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);

  // Allow preview switching for testing both dashboard experiences
  const [activeRoleView, setActiveRoleView] = useState<'investor' | 'landowner' | null>(null);
  const [backendStatus, setBackendStatus] = useState<{ connected: boolean; version: string }>({
    connected: false,
    version: '1.1.0-STANDALONE',
  });

  useEffect(() => {
    api.healthCheck().then((res) => {
      setBackendStatus({ connected: res.connected, version: res.version });
    });
  }, []);

  if (!user) {
    return (
      <div className="p-8 text-center max-w-md mx-auto my-12 bg-card rounded-2xl border border-border shadow-sm">
        <h2 className="text-xl font-bold text-foreground">Authentication Required</h2>
        <p className="text-muted-foreground text-sm mt-2">
          Please log in to your TerraFund account to view your customized dashboard.
        </p>
        <Button className="mt-6 w-full" onClick={() => router.push('/auth/login')}>
          Sign In
        </Button>
      </div>
    );
  }

  // Determine effective role: override if user toggled preview, otherwise user.role
  const effectiveRole = activeRoleView || (user.role === 'landowner' ? 'landowner' : 'investor');

  const quickActions = [
    { label: 'Add Land Plot', href: '/dashboard/add-land', icon: PlusCircle, color: 'text-emerald-500 bg-emerald-500/10' },
    { label: 'My Portfolio', href: '/dashboard/my-lands', icon: FolderKanban, color: 'text-primary bg-primary/10' },
    { label: 'Browse Marketplace', href: '/dashboard/browse', icon: Search, color: 'text-blue-500 bg-blue-500/10' },
    { label: 'Escrow Wallet', href: '/dashboard/payments', icon: Wallet, color: 'text-amber-500 bg-amber-500/10' },
    { label: 'Negotiation Chat', href: '/dashboard/chat', icon: MessageSquare, color: 'text-purple-500 bg-purple-500/10' },
    { label: 'KYC Identity Audit', href: '/auth/kyc', icon: ShieldCheck, color: 'text-emerald-400 bg-emerald-400/10' },
  ];

  return (
    <div className="p-4 md:p-8 w-full max-w-full overflow-hidden min-h-screen bg-background">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Top System Health & Quick Action Command Bar */}
        <div className="bg-gradient-to-r from-card via-muted/50 to-card border border-border rounded-3xl p-4 md:p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
            {/* User Details */}
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-primary/10 text-primary rounded-2xl">
                <UserCheck className="h-6 w-6" />
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-bold">Authenticated Session</p>
                <p className="text-sm font-bold text-foreground flex items-center gap-2">
                  {user.name} ({user.email})
                  <span className="capitalize px-2.5 py-0.5 bg-primary/10 text-primary rounded-full text-xs font-extrabold">
                    {user.role}
                  </span>
                </p>
              </div>
            </div>

            {/* Backend Connectivity Status & View Switcher */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-muted border border-border rounded-xl text-xs font-semibold">
                <Server className="w-3.5 h-3.5 text-primary" />
                <span className="text-muted-foreground">Backend:</span>
                {backendStatus.connected ? (
                  <span className="text-emerald-500 font-bold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Spring Boot Online
                  </span>
                ) : (
                  <span className="text-amber-500 font-bold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-amber-500" /> Standalone Proxy
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1 bg-muted p-1 rounded-xl border border-border">
                <button
                  onClick={() => setActiveRoleView('investor')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    effectiveRole === 'investor'
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Investor
                </button>
                <button
                  onClick={() => setActiveRoleView('landowner')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    effectiveRole === 'landowner'
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Landowner
                </button>
              </div>
            </div>
          </div>

          {/* Quick Actions Shortcuts Toolbar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {quickActions.map((qa) => {
              const Icon = qa.icon;
              return (
                <button
                  key={qa.label}
                  onClick={() => router.push(qa.href)}
                  className="p-3 bg-card border border-border hover:border-primary rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md group text-center"
                >
                  <div className={`p-2 rounded-xl transition-transform group-hover:scale-110 ${qa.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">
                    {qa.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dedicated Dashboard View Rendering */}
        {effectiveRole === 'landowner' ? (
          <LandownerDashboard user={user} />
        ) : (
          <InvestorDashboard user={user} />
        )}

      </div>
    </div>
  );
}