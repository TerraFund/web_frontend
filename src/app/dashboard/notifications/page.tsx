'use client';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import Button from '@/components/Button';
import {
  Bell,
  CheckCircle,
  AlertTriangle,
  MessageSquare,
  DollarSign,
  MapPin,
  Clock,
  Filter,
  Check,
  Trash2,
  Settings,
  Star
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'proposal' | 'payment' | 'system' | 'message' | 'land' | 'review';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  priority?: 'low' | 'medium' | 'high';
  actionUrl?: string;
  metadata?: {
    amount?: number;
    landId?: string;
    userId?: string;
    proposalId?: string;
  };
}

export default function Notifications() {

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([]);

  // Mock notifications data
  const mockNotifications: Notification[] = [
    {
      id: '1',
      type: 'proposal',
      title: 'New Investment Proposal',
      message: 'Sarah Johnson submitted a $25,000 investment proposal for your coffee farm in Kigali City',
      read: false,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      priority: 'high',
      actionUrl: '/dashboard/proposals/1',
      metadata: { amount: 25000, landId: '1', userId: '2' }
    },
    {
      id: '2',
      type: 'payment',
      title: 'Payment Received',
      message: 'You have received $15,000 from Mike Chen for the maize field investment',
      read: false,
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      priority: 'high',
      metadata: { amount: 15000 }
    },
    {
      id: '3',
      type: 'system',
      title: 'KYC Verification Complete',
      message: 'Your identity verification has been approved. You can now receive investments.',
      read: true,
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      priority: 'medium'
    },
    {
      id: '4',
      type: 'message',
      title: 'New Message from Investor',
      message: 'David Kim: I\'m interested in your land portfolio. Can we schedule a call?',
      read: false,
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      priority: 'medium',
      actionUrl: '/dashboard/chat?user=3'
    },
    {
      id: '5',
      type: 'land',
      title: 'Land Listing Approved',
      message: 'Your coffee farm plot has been approved and is now live on the platform',
      read: true,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      priority: 'low',
      metadata: { landId: '1' }
    },
    {
      id: '6',
      type: 'review',
      title: 'New Review Received',
      message: 'You received a 5-star review from an investor: "Excellent communication and professional service"',
      read: true,
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      priority: 'low'
    },
    {
      id: '7',
      type: 'system',
      title: 'Monthly Report Available',
      message: 'Your November investment report is ready. View your portfolio performance.',
      read: false,
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      priority: 'low',
      actionUrl: '/dashboard/reports'
    },
    {
      id: '8',
      type: 'payment',
      title: 'Escrow Funds Released',
      message: 'Funds from your recent land transaction have been released to your account',
      read: true,
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      priority: 'medium',
      metadata: { amount: 5000 }
    }
  ];

  useEffect(() => {
    // Simulate API call
    const loadNotifications = async () => {
      setLoading(true);
      // In real app, this would be an API call
      setTimeout(() => {
        setNotifications(mockNotifications);
        setLoading(false);
      }, 1000);
    };

    loadNotifications();
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'proposal':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'payment':
        return <DollarSign className="h-5 w-5 text-blue-500" />;
      case 'system':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'message':
        return <MessageSquare className="h-5 w-5 text-purple-500" />;
      case 'land':
        return <MapPin className="h-5 w-5 text-green-600" />;
      case 'review':
        return <Star className="h-5 w-5 text-orange-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500 bg-red-50';
      case 'medium':
        return 'border-l-yellow-500 bg-yellow-50';
      case 'low':
        return 'border-l-gray-500 bg-gray-50';
      default:
        return 'border-l-gray-300 bg-white';
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread' && notification.read) return false;
    if (filter === 'read' && !notification.read) return false;
    if (typeFilter !== 'all' && notification.type !== typeFilter) return false;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAsUnread = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: false } : n)
    );
  };

  const markSelectedAsRead = () => {
    setNotifications(prev =>
      prev.map(n => selectedNotifications.includes(n.id) ? { ...n, read: true } : n)
    );
    setSelectedNotifications([]);
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const deleteSelected = () => {
    setNotifications(prev => prev.filter(n => !selectedNotifications.includes(n.id)));
    setSelectedNotifications([]);
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;

    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200"></div>
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-20 bg-gray-200"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Notifications</h1>
              <p className="text-lg text-gray-600">
                Stay updated with your latest activity and messages
              </p>
            </div>
            <div className="flex items-center space-x-3">
              {unreadCount > 0 && (
                <div className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                  {unreadCount} unread
                </div>
              )}
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>

        {/* Filters and Actions */}
        <div className="bg-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            {/* Filters */}
            <div className="flex flex-wrap items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Filter:</span>
              </div>

              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as 'all' | 'unread' | 'read')}
                className="px-3 py-2 border border-gray-300"
              >
                <option value="all">All Notifications</option>
                <option value="unread">Unread Only</option>
                <option value="read">Read Only</option>
              </select>

              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300"
              >
                <option value="all">All Types</option>
                <option value="proposal">Proposals</option>
                <option value="payment">Payments</option>
                <option value="message">Messages</option>
                <option value="system">System</option>
                <option value="land">Land Updates</option>
                <option value="review">Reviews</option>
              </select>
            </div>

            {/* Bulk Actions */}
            {selectedNotifications.length > 0 && (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600">
                  {selectedNotifications.length} selected
                </span>
                <Button variant="outline" size="sm" onClick={markSelectedAsRead}>
                  <Check className="h-4 w-4 mr-2" />
                  Mark Read
                </Button>
                <Button variant="outline" size="sm" onClick={deleteSelected} className="text-red-600 hover:text-red-700">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="bg-white">
              <Bell className="h-16 w-16 text-gray-300" />
              <h3 className="text-xl font-semibold text-gray-900">No notifications found</h3>
              <p className="text-gray-600">
                {filter === 'unread' ? 'You have no unread notifications.' :
                 filter === 'read' ? 'You have no read notifications.' :
                 'You have no notifications yet.'}
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white
                  getPriorityColor(notification.priority)
                } ${!notification.read ? 'ring-2 ring-primary/20' : ''}`}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      {/* Checkbox for bulk actions */}
                      <input
                        type="checkbox"
                        checked={selectedNotifications.includes(notification.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedNotifications(prev => [...prev, notification.id]);
                          } else {
                            setSelectedNotifications(prev => prev.filter(id => id !== notification.id));
                          }
                        }}
                        className="mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      />

                      {/* Icon */}
                      <div className="flex-shrink-0">
                        {getIcon(notification.type)}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className={`text-lg font-semibold ${
                              notification.read ? 'text-gray-900' : 'text-gray-900'
                            }`}>
                              {notification.title}
                            </h3>
                            <p className={`mt-1 text-sm ${
                              notification.read ? 'text-gray-600' : 'text-gray-600'
                            }`}>
                              {notification.message}
                            </p>

                            {/* Metadata */}
                            {notification.metadata && (
                              <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
                                {notification.metadata.amount && (
                                  <span className="flex items-center">
                                    <DollarSign className="h-3 w-3 mr-1" />
                                    ${notification.metadata.amount.toLocaleString()}
                                  </span>
                                )}
                                {notification.metadata.landId && (
                                  <span className="flex items-center">
                                    <MapPin className="h-3 w-3 mr-1" />
                                    Land #{notification.metadata.landId}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Time and Actions */}
                          <div className="flex items-center space-x-2 ml-4">
                            <span className="text-xs text-gray-500">
                              <Clock className="h-3 w-3 mr-1" />
                              {formatTimeAgo(notification.createdAt)}
                            </span>

                            <div className="flex items-center space-x-1">
                              {!notification.read ? (
                                <button
                                  onClick={() => markAsRead(notification.id)}
                                  className="p-1 text-gray-400 hover:text-gray-600"
                                  title="Mark as read"
                                >
                                  <Check className="h-4 w-4" />
                                </button>
                              ) : (
                                <button
                                  onClick={() => markAsUnread(notification.id)}
                                  className="p-1 text-gray-400 hover:text-gray-600"
                                  title="Mark as unread"
                                >
                                  <Bell className="h-4 w-4" />
                                </button>
                              )}

                              <button
                                onClick={() => deleteNotification(notification.id)}
                                className="p-1 text-gray-400 hover:text-red-600"
                                title="Delete notification"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Action Button */}
                        {notification.actionUrl && (
                          <div className="mt-4">
                            <Button variant="outline" size="sm" as="a" href={notification.actionUrl}>
                              View Details
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Load More */}
        {filteredNotifications.length > 0 && (
          <div className="text-center mt-8">
            <Button variant="outline">
              Load More Notifications
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}