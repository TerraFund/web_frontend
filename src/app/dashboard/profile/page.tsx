'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { User, Shield, FileText, Star, Camera, MapPin, Calendar, TrendingUp, Award, Users, Settings, Edit3, Upload, CheckCircle, Clock, DollarSign } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Profile() {
  const { user } = useSelector((state: RootState) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    bio: user?.bio || '',
    location: user?.location || '',
    website: user?.website || '',
  });

  const handleSave = () => {
    // Mock save
    setIsEditing(false);
  };

  const mockReviews = [
    { id: '1', from: 'Sarah Johnson', rating: 5, comment: 'Great landowner, very professional and transparent throughout the entire process.', date: '2024-01-15' },
    { id: '2', from: 'Mike Chen', rating: 4, comment: 'Good communication and fair pricing. Would work with again.', date: '2024-01-10' },
    { id: '3', from: 'David Kim', rating: 5, comment: 'Excellent experience. The land exceeded expectations and the documentation was perfect.', date: '2024-01-08' },
  ];

  const mockActivity = [
    { id: '1', type: 'land_listed', title: 'Listed new land plot', description: '25-acre coffee farm in Central Rwanda', date: '2024-01-20', icon: MapPin },
    { id: '2', type: 'deal_closed', title: 'Investment deal completed', description: 'Successfully closed deal for $45,000 investment', date: '2024-01-18', icon: CheckCircle },
    { id: '3', type: 'review_received', title: 'New review received', description: '5-star review from Sarah Johnson', date: '2024-01-15', icon: Star },
    { id: '4', type: 'kyc_verified', title: 'KYC verification completed', description: 'Your account is now fully verified', date: '2024-01-12', icon: Shield },
  ];

  const mockPortfolio = user?.role === 'landowner' ? [
    { id: '1', name: 'Coffee Farm Plot #5', location: 'Central Rwanda', size: 25, status: 'listed', price: 1500, image: '/lands/coffee-farm.jpg' },
    { id: '2', name: 'Maize Field #12', location: 'Rift Valley', size: 50, status: 'sold', price: 1200, image: '/lands/maize-field.jpg' },
  ] : [
    { id: '1', name: 'Coffee Farm Investment', location: 'Central Rwanda', amount: 25000, roi: 12.5, status: 'active' },
    { id: '2', name: 'Fruit Orchard Partnership', location: 'Western Rwanda', amount: 15000, roi: 8.3, status: 'active' },
  ];

  const portfolioGrowthData = [
    { month: 'Jan', value: 10000 },
    { month: 'Feb', value: 15000 },
    { month: 'Mar', value: 22000 },
    { month: 'Apr', value: 28000 },
    { month: 'May', value: 35000 },
    { month: 'Jun', value: 42000 },
  ];

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Profile</h1>
          <p className="text-lg text-gray-600">Manage your account and view your activity</p>
        </div>

        {/* Profile Header */}
        <div className="bg-white">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
            {/* Profile Picture */}
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white text-4xl font-bold">
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <button className="absolute bottom-0 right-0 bg-primary text-white p-3 rounded-full hover:bg-accent transition-colors shadow-lg">
                <Camera className="h-5 w-5" />
              </button>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">{user.name}</h2>
                  <p className="text-lg text-gray-600">{user.role}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      Kigali, Rwanda
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Joined {new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-3 mt-4 md:mt-0">
                  <Button variant="outline" size="sm">
                    <Edit3 className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">4.8</div>
                  <div className="text-sm text-gray-600">
                    <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                    Rating
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">12</div>
                  <div className="text-sm text-gray-600">Total Deals</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary">$125K</div>
                  <div className="text-sm text-gray-600">Portfolio Value</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">98%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'overview', label: 'Overview', icon: User },
                { id: 'portfolio', label: user.role === 'landowner' ? 'My Lands' : 'Investments', icon: TrendingUp },
                { id: 'activity', label: 'Activity', icon: Clock },
                { id: 'reviews', label: 'Reviews', icon: Star },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                      activeTab === tab.id
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-500
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Personal Information */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-gray-900">
                      <User className="h-5 w-5 mr-2" />
                      Personal Information
                    </h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      {isEditing ? 'Cancel' : 'Edit'}
                    </Button>
                  </div>

                  {isEditing ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      <Input
                        label="Location"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      />
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Bio</label>
                        <textarea
                          className="w-full px-3 py-2 border border-gray-300"
                          rows={3}
                          value={formData.bio}
                          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                          placeholder="Tell us about yourself..."
                        />
                      </div>
                      <div className="md:col-span-2 flex justify-end space-x-3">
                        <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                        <Button onClick={handleSave}>Save Changes</Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Full Name</label>
                          <p className="text-gray-900">{user.name}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Email</label>
                          <p className="text-gray-900">{user.email}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Phone</label>
                          <p className="text-gray-900">{user.phone || 'Not provided'}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Location</label>
                          <p className="text-gray-900">Kigali, Rwanda</p>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Bio</label>
                        <p className="text-gray-600">
                          Experienced landowner with over 10 years in sustainable agriculture. Passionate about connecting investors with high-quality agricultural opportunities in Rwanda.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Verification Status */}
                <div className="bg-white">
                  <h3 className="text-xl font-semibold text-gray-900">
                    <Shield className="h-5 w-5 mr-2" />
                    Verification Status
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full ${
                        user.kyc_status === 'verified' ? 'bg-green-500' :
                        user.kyc_status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></div>
                      <div>
                        <span className="text-gray-900">{user.kyc_status}</span>
                        {user.kyc_status === 'verified' && (
                          <p className="text-sm text-gray-600">Your account is fully verified</p>
                        )}
                      </div>
                    </div>
                    {user.kyc_status !== 'verified' && (
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Documents
                      </Button>
                    )}
                  </div>
                  {user.kyc_status === 'pending' && (
                    <div className="mt-4 p-4 bg-yellow-50">
                      <p className="text-sm text-yellow-800">
                        Your documents are being reviewed. This usually takes 1-2 business days.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Stats */}
                <div className="bg-white">
                  <h3 className="text-lg font-semibold text-gray-900">Quick Stats</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50">
                      <div className="flex items-center">
                        <TrendingUp className="h-5 w-5 text-green-500 mr-3" />
                        <span className="text-sm text-gray-600">Portfolio Growth</span>
                      </div>
                      <span className="text-lg font-bold text-green-600">+12.5%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50">
                      <div className="flex items-center">
                        <DollarSign className="h-5 w-5 text-blue-500 mr-3" />
                        <span className="text-sm text-gray-600">Total Invested</span>
                      </div>
                      <span className="text-lg font-bold text-blue-600">$125K</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50">
                      <div className="flex items-center">
                        <Users className="h-5 w-5 text-purple-500 mr-3" />
                        <span className="text-sm text-gray-600">Active Partners</span>
                      </div>
                      <span className="text-lg font-bold text-purple-600">8</span>
                    </div>
                  </div>
                </div>

                {/* Achievements */}
                <div className="bg-white">
                  <h3 className="text-lg font-semibold text-gray-900">
                    <Award className="h-5 w-5 mr-2" />
                    Achievements
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-yellow-50">
                      <Award className="h-6 w-6 text-yellow-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Top Landowner</p>
                        <p className="text-xs text-gray-600">Highest rated in Q4 2024</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-blue-50">
                      <CheckCircle className="h-6 w-6 text-blue-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Verified Partner</p>
                        <p className="text-xs text-gray-600">Completed 50+ successful deals</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'portfolio' && (
            <div className="space-y-8">
              {/* Portfolio Summary Chart */}
              <div className="bg-white">
                <h3 className="text-xl font-semibold text-gray-900">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Portfolio Performance
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={portfolioGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, 'Portfolio Value']} />
                    <Line type="monotone" dataKey="value" stroke="#0B6E4F" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Portfolio Items */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockPortfolio.map((item) => (
                  <div key={item.id} className="bg-white">
                    {user.role === 'landowner' && 'image' in item && (
                      <div className="h-48 bg-gradient-to-br from-primary to-accent relative">
                        <div className="absolute top-4 right-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            item.status === 'listed' ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'
                          }`}>
                            {item.status}
                          </span>
                        </div>
                      </div>
                    )}
                    <div className="p-6">
                      <h4 className="text-lg font-semibold text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-1" />
                        {item.location}
                      </p>
                      {user.role === 'landowner' && 'size' in item && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">{item.size} acres</span>
                          <span className="text-lg font-bold text-primary">${item.price}/acre</span>
                        </div>
                      )}
                      {user.role === 'investor' && 'amount' in item && (
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Invested</span>
                            <span className="text-sm font-medium text-gray-900">${item.amount.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">ROI</span>
                            <span className="text-sm font-medium text-green-600">+{item.roi}%</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="bg-white">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900">Recent Activity</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {mockActivity.map((activity) => {
                  const Icon = activity.icon;
                  return (
                    <div key={activity.id} className="p-6 hover:bg-gray-50">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                          <p className="text-sm text-gray-600">{activity.description}</p>
                          <p className="text-xs text-gray-500">{activity.date}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="bg-white">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">Reviews & Ratings</h3>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="text-lg font-bold text-gray-900">4.8</span>
                    </div>
                    <span className="text-sm text-gray-600">(12 reviews)</span>
                  </div>
                </div>

                <div className="space-y-6">
                  {mockReviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold">
                            {review.from.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{review.from}</p>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <span className="text-xs text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}