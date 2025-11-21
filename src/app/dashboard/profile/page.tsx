'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { User, Shield, FileText, Star } from 'lucide-react';

export default function Profile() {
  const { user } = useSelector((state: RootState) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  const handleSave = () => {
    // Mock save
    setIsEditing(false);
  };

  const mockReviews = [
    { id: '1', from: 'Sarah Johnson', rating: 5, comment: 'Great landowner, very professional', date: '2024-01-15' },
    { id: '2', from: 'Mike Chen', rating: 4, comment: 'Good communication throughout the process', date: '2024-01-10' },
  ];

  if (!user) return null;

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
         <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Profile</h1>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Info */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                      <User className="h-5 w-5 mr-2" />
                      Personal Information
                    </h2>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      {isEditing ? 'Cancel' : 'Edit'}
                    </Button>
                  </div>

                  {isEditing ? (
                    <div className="space-y-4">
                      <Input
                        label="Full Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                      <Input
                        label="Email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                      <Input
                        label="Phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                      <Button onClick={handleSave}>Save Changes</Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                        <p className="text-gray-900 dark:text-white">{user.name}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                        <p className="text-gray-900 dark:text-white">{user.email}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
                        <p className="text-gray-900 dark:text-white">{user.phone || 'Not provided'}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Role</label>
                        <p className="text-gray-900 dark:text-white capitalize">{user.role}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* KYC Status */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center mb-4">
                    <Shield className="h-5 w-5 mr-2" />
                    Verification Status
                  </h2>
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      user.kyc_status === 'verified' ? 'bg-green-500' :
                      user.kyc_status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></div>
                    <span className="text-gray-900 dark:text-white capitalize">{user.kyc_status}</span>
                  </div>
                  {user.kyc_status === 'pending' && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      Your documents are being reviewed. This usually takes 1-2 business days.
                    </p>
                  )}
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Account Stats */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Account Stats</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Member Since</span>
                      <span className="text-sm text-gray-900 dark:text-white">{user.created_at.split('T')[0]}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Total Deals</span>
                      <span className="text-sm text-gray-900 dark:text-white">3</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Average Rating</span>
                      <span className="text-sm text-gray-900 dark:text-white flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                        4.5
                      </span>
                    </div>
                  </div>
                </div>

                {/* Reviews */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <Star className="h-5 w-5 mr-2" />
                    Recent Reviews
                  </h3>
                  <div className="space-y-4">
                    {mockReviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0 last:pb-0">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">{review.from}</span>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{review.comment}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{review.date}</p>
                      </div>
                    ))}
         </div>
       </div>
     </div>
        </div>
      </div>
    </div>
  );
}