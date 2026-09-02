'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Bell, MessageSquare, CheckCircle, AlertTriangle, X } from 'lucide-react';

interface Notification {
  id: string;
  type: 'message' | 'proposal' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  targetUrl: string;
}

export default function NotificationDropdown() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'proposal',
      title: 'New Land Proposal Received',
      message: 'Sarah Johnson sent a 3-year lease proposal for Highland Coffee Estate #1',
      timestamp: '2 hours ago',
      read: false,
      targetUrl: '/lands/1',
    },
    {
      id: '2',
      type: 'proposal',
      title: 'Proposal Updated',
      message: 'David AgroFund submitted terms for Musanze Highland Farm #2',
      timestamp: '3 hours ago',
      read: false,
      targetUrl: '/proposals/2',
    },
    {
      id: '3',
      type: 'message',
      title: 'New Message from Investor',
      message: 'Mike Chen: Contract details & escrow terms are ready for review',
      timestamp: '4 hours ago',
      read: false,
      targetUrl: '/dashboard/chat',
    },
    {
      id: '4',
      type: 'system',
      title: 'KYC Level 2 Verification Approved',
      message: 'Your identity audit is complete. Escrow payouts are now active.',
      timestamp: '1 day ago',
      read: true,
      targetUrl: '/auth/kyc',
    },
  ]);

  // Simulate real-time incoming proposal notifications
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.15) {
        const sampleLands = [
          { id: '1', name: 'Highland Coffee Estate #1', url: '/lands/1' },
          { id: '2', name: 'Musanze Farm Estate #2', url: '/lands/2' },
          { id: '3', name: 'Rift Valley Soybean Plot #3', url: '/lands/3' },
        ];
        const selectedLand = sampleLands[Math.floor(Math.random() * sampleLands.length)];

        const newNotification: Notification = {
          id: Date.now().toString(),
          type: 'proposal',
          title: 'New Land Proposal',
          message: `An investor placed a new lease bid on ${selectedLand.name}`,
          timestamp: 'Just now',
          read: false,
          targetUrl: selectedLand.url,
        };
        setNotifications((prev) => [newNotification, ...prev.slice(0, 9)]);
      }
    }, 25000);

    return () => clearInterval(interval);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleNotificationClick = (notification: Notification) => {
    // Mark as read
    setNotifications((prev) =>
      prev.map((n) => (n.id === notification.id ? { ...n, read: true } : n))
    );
    // Close dropdown
    setIsOpen(false);
    // Navigate directly to the proposed land / proposal URL
    if (notification.targetUrl) {
      router.push(notification.targetUrl);
    }
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'message':
        return <MessageSquare className="h-5 w-5 text-blue-500" />;
      case 'proposal':
        return <CheckCircle className="h-5 w-5 text-emerald-500" />;
      case 'system':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      default:
        return <Bell className="h-5 w-5 text-muted-foreground" />;
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-muted-foreground hover:text-foreground transition-colors rounded-xl hover:bg-muted"
        aria-label="Notifications"
      >
        <Bell className={`h-6 w-6 transition-all duration-200 ${unreadCount > 0 ? 'text-primary' : ''}`} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold animate-in zoom-in duration-300 shadow-md">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-card border border-border rounded-2xl shadow-2xl z-50 overflow-hidden fade-in-down">
          <div className="p-4 border-b border-border bg-muted/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-bold text-foreground">Notifications</h3>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 text-xs bg-primary/10 text-primary font-bold rounded-full">
                    {unreadCount} new
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-xs text-primary hover:underline font-medium"
                  >
                    Mark all read
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto divide-y divide-border">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                <Bell className="h-8 w-8 mx-auto mb-2 opacity-40" />
                <p className="text-sm font-medium">No notifications yet</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className={`p-4 transition-all cursor-pointer hover:bg-muted/60 ${
                    !notification.read ? 'bg-primary/5' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-card rounded-xl border border-border flex-shrink-0 shadow-sm">
                      {getIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-bold text-foreground truncate">
                          {notification.title}
                        </p>
                        <span className="text-[10px] text-muted-foreground whitespace-nowrap ml-2">
                          {notification.timestamp}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                        {notification.message}
                      </p>
                      <span className="inline-block mt-2 text-[11px] font-semibold text-primary hover:underline">
                        View Details →
                      </span>
                    </div>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1"></div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-3 border-t border-border bg-muted/20 text-center">
            <button
              onClick={() => {
                setIsOpen(false);
                router.push('/dashboard/notifications');
              }}
              className="text-xs font-semibold text-primary hover:text-accent transition-colors"
            >
              View all notifications hub →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}