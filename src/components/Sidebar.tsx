'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Home, Map, FileText, MessageSquare, CreditCard, Settings, Users, Bell, BarChart3 } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useSelector((state: RootState) => state.auth);


  const landownerLinks = [
    { href: '/dashboard', icon: Home, label: 'Dashboard' },
    { href: '/dashboard/my-lands', icon: Map, label: 'My Lands' },
    { href: '/dashboard/proposals', icon: FileText, label: 'Proposals' },
    { href: '/dashboard/chat', icon: MessageSquare, label: 'Chat' },
    { href: '/dashboard/notifications', icon: Bell, label: 'Notifications' },
    { href: '/dashboard/payments', icon: CreditCard, label: 'Payments' },
    { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
  ];

  const investorLinks = [
    { href: '/dashboard', icon: Home, label: 'Dashboard' },
    { href: '/dashboard/browse', icon: Map, label: 'Browse Lands' },
    { href: '/dashboard/proposals', icon: FileText, label: 'My Proposals' },
    { href: '/dashboard/chat', icon: MessageSquare, label: 'Chat' },
    { href: '/dashboard/notifications', icon: Bell, label: 'Notifications' },
    { href: '/dashboard/payments', icon: CreditCard, label: 'Payments' },
    { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
  ];

  const adminLinks = [
    { href: '/admin', icon: Home, label: 'Dashboard' },
    { href: '/admin/users', icon: Users, label: 'Users' },
    { href: '/admin/lands', icon: Map, label: 'Lands' },
    { href: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
    { href: '/admin/reports', icon: FileText, label: 'Reports' },
    { href: '/admin/settings', icon: Settings, label: 'Settings' },
  ];

  const links = user?.role === 'landowner' ? landownerLinks : user?.role === 'investor' ? investorLinks : adminLinks;

  return (
    <aside className="w-64 min-h-screen bg-white text-gray-900 shadow-lg">
      <div className="p-6">
        <h2 className="text-xl font-bold text-primary">Menu</h2>
      </div>
      <nav className="px-4">
        <ul className="space-y-2">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary text-white'
                      : `hover:bg-gray-100
                          darkMode ? 'text-text_primary' : 'text-gray-900'
                        }`
                  }`}
                >
                  <link.icon className="h-5 w-5" />
                  <span>{link.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}