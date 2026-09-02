'use client';

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter, usePathname } from 'next/navigation';
import { RootState } from '@/store';
import { ShieldAlert, Loader2 } from 'lucide-react';
import Button from '@/components/Button';

interface AuthGuardProps {
  children: React.ReactNode;
  allowedRoles?: ('landowner' | 'investor' | 'admin')[];
  requireKyc?: boolean;
}

export default function AuthGuard({ children, allowedRoles, requireKyc = false }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      router.push(`/auth/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [isAuthenticated, user, pathname, router]);

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-6 text-center">
        <div className="space-y-4 max-w-sm">
          <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto" />
          <p className="text-sm font-semibold text-muted-foreground">Verifying authentication session...</p>
        </div>
      </div>
    );
  }

  // Check Role Authorization
  const hasAllowedRole =
    !allowedRoles || allowedRoles.length === 0 || allowedRoles.includes(user.role as any);

  if (!hasAllowedRole) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-6 text-center">
        <div className="bg-card border border-border rounded-3xl p-8 max-w-md w-full shadow-lg space-y-4">
          <div className="w-14 h-14 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto text-red-500">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-foreground">Access Restricted</h2>
          <p className="text-xs text-muted-foreground">
            Your current account role (<span className="font-bold capitalize">{user.role}</span>) does not have permission to view this section.
          </p>
          <Button className="w-full" onClick={() => router.push('/dashboard')}>
            Return to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  // Check KYC Audit Authorization if required
  if (requireKyc && user.kyc_status !== 'verified') {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-6 text-center">
        <div className="bg-card border border-border rounded-3xl p-8 max-w-md w-full shadow-lg space-y-4">
          <div className="w-14 h-14 bg-amber-500/10 rounded-2xl flex items-center justify-center mx-auto text-amber-500">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-foreground">KYC Identity Audit Required</h2>
          <p className="text-xs text-muted-foreground">
            You must complete identity verification before accessing financial escrow & property listing tools.
          </p>
          <Button className="w-full" onClick={() => router.push('/auth/kyc')}>
            Proceed to KYC Audit
          </Button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
