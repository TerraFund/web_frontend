'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import {
  LayoutDashboard,
  MapPin,
  FileText,
  CreditCard,
  User,
  Settings,
  PlusCircle,
  MessageSquare,
  Bell,
  ChevronLeft,
  ChevronRight,
  Shield,
  BarChart3,
  Compass
} from 'lucide-react';

const navItems = {
  landowner: [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/dashboard/my-lands', label: 'My Lands', icon: MapPin },
    { href: '/dashboard/add-land', label: 'Add Land', icon: PlusCircle },
    { href: '/dashboard/proposals', label: 'Proposals', icon: FileText },
    { href: '/dashboard/chat', label: 'Messages', icon: MessageSquare },
    { href: '/dashboard/payments', label: 'Payments', icon: CreditCard },
    { href: '/dashboard/notifications', label: 'Notifications', icon: Bell },
    { href: '/dashboard/profile', label: 'Profile', icon: User },
    { href: '/dashboard/settings', label: 'Settings', icon: Settings },
  ],
  investor: [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/dashboard/browse', label: 'Browse Lands', icon: Compass },
    { href: '/dashboard/proposals', label: 'Proposals', icon: FileText },
    { href: '/dashboard/chat', label: 'Messages', icon: MessageSquare },
    { href: '/dashboard/payments', label: 'Payments', icon: CreditCard },
    { href: '/dashboard/notifications', label: 'Notifications', icon: Bell },
    { href: '/dashboard/profile', label: 'Profile', icon: User },
    { href: '/dashboard/settings', label: 'Settings', icon: Settings },
  ],
  admin: [
    { href: '/admin', label: 'Overview', icon: LayoutDashboard },
    { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
    { href: '/admin/reports', label: 'Reports', icon: FileText },
    { href: '/admin/settings', label: 'Settings', icon: Shield },
  ],
};

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useSelector((state: RootState) => state.auth);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const role = (user?.role as 'landowner' | 'investor' | 'admin') || 'investor';
  const items = navItems[role] || navItems.investor;

  // Close mobile sidebar on route change
  typeof window !== 'undefined' && window.addEventListener('popstate', () => setMobileOpen(false));

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Toggle Button (Only visible on small screens when Sidebar is part of layout) */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden fixed bottom-6 right-6 z-50 p-4 bg-primary text-white rounded-full shadow-xl hover:bg-primary/90 transition-transform active:scale-95"
      >
        <Compass className="h-6 w-6" />
      </button>

      <aside
        className={`fixed md:sticky top-0 md:top-16 left-0 h-[100dvh] md:h-[calc(100vh-4rem)] bg-card border-r border-border transition-all duration-300 ease-in-out flex flex-col z-50 md:z-0
          ${collapsed ? 'w-[68px]' : 'w-72 md:w-60'} 
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* Collapse toggle (Desktop only) */}
        <div className={`hidden md:flex ${collapsed ? 'justify-center' : 'justify-end'} p-2.5`}>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>

        {/* Mobile Header (Mobile only) */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-border mt-16">
          <span className="font-bold text-lg text-foreground">Menu</span>
          <button onClick={() => setMobileOpen(false)} className="p-2 text-muted-foreground hover:bg-muted rounded-xl">
             <ChevronLeft className="h-5 w-5" />
          </button>
        </div>

      {/* Nav items */}
      <nav className={`flex-1 ${collapsed ? 'px-1.5' : 'px-3'} space-y-1 overflow-y-auto`}>
        {items.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`group relative flex items-center rounded-xl text-sm font-medium transition-all duration-200 ${
                collapsed && !mobileOpen ? 'justify-center p-3' : 'gap-3 px-3 py-3 md:py-2.5 mx-2 md:mx-0'
              } ${
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
              title={collapsed ? item.label : undefined}
            >
              {/* Active indicator bar */}
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full transition-all duration-300" />
              )}

              <Icon className={`h-5 w-5 flex-shrink-0 transition-colors ${isActive ? 'text-primary' : ''}`} />

              {(!collapsed || mobileOpen) && (
                <span className="truncate">{item.label}</span>
              )}

              {/* Tooltip on collapsed desktop */}
              {collapsed && !mobileOpen && (
                <span className="absolute left-full ml-2 px-2.5 py-1 bg-foreground text-background text-xs font-medium rounded-lg whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none z-50 shadow-lg">
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User info at bottom */}
      <div className="p-4 md:p-2.5 border-t border-border mt-auto mb-6 md:mb-0">
        {collapsed && !mobileOpen ? (
          /* Collapsed: just avatar */
          <div className="flex justify-center">
            <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-bold cursor-default" title={user?.name || 'User'}>
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
          </div>
        ) : (
          /* Expanded: avatar + name + role */
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.name}</p>
              <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
            </div>
          </div>
        )}
      </div>
    </aside>
    </>
  );
}