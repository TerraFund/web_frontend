'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import { ArrowLeft, Edit, Save, X, User, Mail, Shield, MapPin, Phone, FileText, Activity } from 'lucide-react';

export default function UserDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<{
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
    phone: string;
    location: string;
    joined: string;
    kycStatus: string;
    totalLands: number;
    activeDeals: number;
    totalInvestments: number;
    bio: string;
    documents: Array<{ id: string; name: string; type: string; status: string; uploaded: string }>;
  } | null>(null);

  useEffect(() => {
    // Mock API call - in real app, fetch from /api/admin/users/[id]
    const fetchUser = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        setUserData({
          id: params.id,
          name: 'John Doe',
          email: 'john@example.com',
          role: 'landowner',
          status: 'verified',
          phone: '+250 123 456 789',
          location: 'Kigali, Rwanda',
          joined: '2024-01-15',
          kycStatus: 'verified',
          totalLands: 3,
          activeDeals: 2,
          totalInvestments: 15000,
          bio: 'Experienced landowner with 5+ years in sustainable agriculture.',
          documents: [
            { id: '1', name: 'ID Document', type: 'ID', status: 'verified', uploaded: '2024-01-15' },
            { id: '2', name: 'Land Deed', type: 'Deed', status: 'verified', uploaded: '2024-01-16' },
          ],
        });
      } catch (error) {
        console.error('Failed to load user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [params.id]);

  const [editData, setEditData] = useState<any>(null);

  useEffect(() => {
    if (userData) {
      setEditData(userData);
    }
  }, [userData]);

  const handleSave = () => {
    setUserData(editData);
    setIsEditing(false);
    // Mock API call
    console.log('Saving user data:', editData);
  };

  const handleCancel = () => {
    setEditData(userData);
    setIsEditing(false);
  };

  const activityLog = [
    { id: '1', action: 'User registered', timestamp: '2024-01-15 10:30 AM', details: 'Account created successfully' },
    { id: '2', action: 'KYC submitted', timestamp: '2024-01-15 11:00 AM', details: 'ID and land documents uploaded' },
    { id: '3', action: 'KYC verified', timestamp: '2024-01-16 2:15 PM', details: 'All documents approved by admin' },
    { id: '4', action: 'Land listed', timestamp: '2024-01-17 9:45 AM', details: 'Coffee Farm Plot #5 listed for investment' },
    { id: '5', action: 'Proposal received', timestamp: '2024-01-18 3:20 PM', details: 'Received investment proposal from Sarah Smith' },
  ];

  if (loading) {
    return (
      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="flex items-center space-x-4 mb-8">
              <div className="h-5 w-5 bg-gray-300 rounded"></div>
              <div className="h-8 bg-gray-300 rounded w-1/3"></div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="h-64 bg-gray-300 rounded"></div>
                <div className="h-48 bg-gray-300 rounded"></div>
              </div>
              <div className="space-y-6">
                <div className="h-32 bg-gray-300 rounded"></div>
                <div className="h-32 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !userData) {
    return (
      <div className="p-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="bg-red-50">
            <h2 className="text-lg font-semibold text-red-800">Error Loading User</h2>
            <p className="text-red-600">{error}</p>
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
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{userData.name}</h1>
              <p className="text-gray-600">User ID: {userData.id}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)} variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Edit User
              </Button>
            ) : (
              <div className="flex space-x-2">
                <Button onClick={handleSave} size="sm">
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button onClick={handleCancel} variant="outline" size="sm">
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="bg-white">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">
                <User className="h-5 w-5 mr-2 text-primary" />
                Basic Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300"
                    />
                  ) : (
                    <p className="text-gray-900">{userData.name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editData.email}
                      onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300"
                    />
                  ) : (
                    <p className="text-gray-900">
                      <Mail className="h-4 w-4 mr-2 text-gray-500" />
                      {userData.email}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editData.phone}
                      onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300"
                    />
                  ) : (
                    <p className="text-gray-900">
                      <Phone className="h-4 w-4 mr-2 text-gray-500" />
                      {userData.phone}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.location}
                      onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300"
                    />
                  ) : (
                    <p className="text-gray-900">
                      <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                      {userData.location}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Role</label>
                  {isEditing ? (
                    <select
                      value={editData.role}
                      onChange={(e) => setEditData({ ...editData, role: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300"
                    >
                      <option value="landowner">Landowner</option>
                      <option value="investor">Investor</option>
                      <option value="admin">Admin</option>
                    </select>
                  ) : (
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full capitalize ${
                      userData.role === 'landowner'
                        ? 'bg-green-100 text-green-800'
                        : userData.role === 'investor'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                      {userData.role}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  {isEditing ? (
                    <select
                      value={editData.status}
                      onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300"
                    >
                      <option value="verified">Verified</option>
                      <option value="pending">Pending</option>
                      <option value="suspended">Suspended</option>
                    </select>
                  ) : (
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      userData.status === 'verified'
                        ? 'bg-green-100 text-green-800'
                        : userData.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {userData.status}
                    </span>
                  )}
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Bio</label>
                {isEditing ? (
                  <textarea
                    value={editData.bio}
                    onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300"
                  />
                ) : (
                  <p className="text-gray-600">{userData.bio}</p>
                )}
              </div>
            </div>

            {/* Documents */}
            <div className="bg-white">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">
                <FileText className="h-5 w-5 mr-2 text-primary" />
                Documents
              </h2>
              <div className="space-y-3">
                {userData.documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50">
                    <div>
                      <p className="font-medium text-gray-900">{doc.name}</p>
                      <p className="text-sm text-gray-600">Type: {doc.type} • Uploaded: {doc.uploaded}</p>
                    </div>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      doc.status === 'verified'
                        ? 'bg-green-100 text-green-800
                        : 'bg-yellow-100 text-yellow-800
                    }`}>
                      {doc.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity Log */}
            <div className="bg-white">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">
                <Activity className="h-5 w-5 mr-2 text-primary" />
                Activity Log
              </h2>
              <div className="space-y-4">
                {activityLog.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 pb-4 border-b border-gray-200">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-600">{activity.details}</p>
                      <p className="text-xs text-gray-500">{activity.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <div className="bg-white">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Statistics</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Lands</span>
                  <span className="font-semibold text-gray-900">{userData.totalLands}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Active Deals</span>
                  <span className="font-semibold text-gray-900">{userData.activeDeals}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Investments</span>
                  <span className="font-semibold text-gray-900">${userData.totalInvestments.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Joined</span>
                  <span className="font-semibold text-gray-900">{userData.joined}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Quick Actions</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="h-4 w-4 mr-2" />
                  Reset Password
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  View Documents
                </Button>
                {userData.status === 'verified' ? (
                  <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                    Suspend User
                  </Button>
                ) : (
                  <Button variant="outline" className="w-full justify-start text-green-600 hover:text-green-700">
                    Activate User
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}