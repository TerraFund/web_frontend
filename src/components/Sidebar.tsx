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

  const role = (user?.role as 'landowner' | 'investor' | 'admin') || 'investor';
  const items = navItems[role] || navItems.investor;

  return (
    <aside
      className={`sticky top-16 h-[calc(100vh-4rem)] bg-card border-r border-border transition-all duration-300 ease-in-out flex flex-col ${
        collapsed ? 'w-[68px]' : 'w-60'
      }`}
    >
      {/* Collapse toggle */}
      <div className={`flex ${collapsed ? 'justify-center' : 'justify-end'} p-2.5`}>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
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
              className={`group relative flex items-center rounded-xl text-sm font-medium transition-all duration-200 ${
                collapsed ? 'justify-center p-3' : 'gap-3 px-3 py-2.5'
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

              {!collapsed && (
                <span className="truncate">{item.label}</span>
              )}

              {/* Tooltip on collapsed */}
              {collapsed && (
                <span className="absolute left-full ml-2 px-2.5 py-1 bg-foreground text-background text-xs font-medium rounded-lg whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none z-50 shadow-lg">
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User info at bottom */}
      <div className="p-2.5 border-t border-border">
        {collapsed ? (
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
  );
}