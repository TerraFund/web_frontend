'use client';

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '@/store';
import InvestorDashboard from '@/components/InvestorDashboard';
import LandownerDashboard from '@/components/LandownerDashboard';
import Button from '@/components/Button';
import { UserCheck, Eye, Sparkles } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);

  // Allow preview switching for testing both dashboard experiences
  const [activeRoleView, setActiveRoleView] = useState<'investor' | 'landowner' | null>(null);

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

  return (
    <div className="p-4 md:p-8 w-full max-w-full overflow-hidden min-h-screen bg-background">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Role Switcher Preview Bar (For Testing & Verification) */}
        <div className="bg-card border border-border rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 text-primary rounded-xl">
              <UserCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">Logged in as:</p>
              <p className="text-sm font-bold text-foreground flex items-center gap-2">
                {user.name} ({user.email})
                <span className="capitalize px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs font-semibold">
                  {user.role}
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
              <Eye className="h-3.5 w-3.5" /> Dashboard View Mode:
            </span>
            <button
              onClick={() => setActiveRoleView('investor')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                effectiveRole === 'investor'
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              Investor View
            </button>
            <button
              onClick={() => setActiveRoleView('landowner')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                effectiveRole === 'landowner'
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              Landowner View
            </button>
          </div>
        </div>

        {/* Dedicated Dashboard Rendering */}
        {effectiveRole === 'landowner' ? (
          <LandownerDashboard user={user} />
        ) : (
          <InvestorDashboard user={user} />
        )}
      </div>
    </div>
  );
}