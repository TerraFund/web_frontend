'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import { ArrowLeft, Edit, Save, X, MapPin, User, FileText, CheckCircle, XCircle, Eye, Download, AlertTriangle } from 'lucide-react';

export default function LandDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [landData, setLandData] = useState<{
    id: string;
    title: string;
    owner: string;
    ownerId: string;
    location: string;
    size: number;
    cropSuitability: string;
    soilQuality: string;
    waterSource: string;
    elevation: number;
    price: number;
    status: string;
    listed: string;
    description: string;
    coordinates: { lat: number; lng: number };
    documents: Array<{ id: string; name: string; type: string; status: string; uploaded: string }>;
    proposals: Array<{ id: string; investor: string; amount: number; status: string; submitted: string }>;
  } | null>(null);

  useEffect(() => {
    // Mock API call - in real app, fetch from /api/admin/lands/[id]
    const fetchLand = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        setLandData({
          id: params.id,
          title: 'Coffee Farm Plot #5',
          owner: 'John Doe',
          ownerId: '1',
          location: 'Central Rwanda',
          size: 25,
          cropSuitability: 'Coffee, Tea',
          soilQuality: 'Excellent',
          waterSource: 'River',
          elevation: 1800,
          price: 1500,
          status: 'verified',
          listed: '2024-01-10',
          description: 'Prime coffee farming land with excellent soil quality and reliable water source. Located in the heart of Rwanda\'s coffee growing region.',
          coordinates: { lat: -1.2864, lng: 36.8172 },
          documents: [
            { id: '1', name: 'Land Deed', type: 'Deed', status: 'verified', uploaded: '2024-01-10' },
            { id: '2', name: 'Soil Analysis Report', type: 'Report', status: 'verified', uploaded: '2024-01-11' },
            { id: '3', name: 'Water Rights Certificate', type: 'Certificate', status: 'pending', uploaded: '2024-01-12' },
          ],
          proposals: [
            { id: '1', investor: 'Sarah Smith', amount: 30000, status: 'pending', submitted: '2024-01-15' },
            { id: '2', investor: 'Mike Chen', amount: 25000, status: 'accepted', submitted: '2024-01-18' },
          ],
        });
      } catch (error) {
        console.error('Failed to load land data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLand();
  }, [params.id]);

  const [editData, setEditData] = useState<any>(null);

  useEffect(() => {
    if (landData) {
      setEditData(landData);
    }
  }, [landData]);

  const handleSave = () => {
    setLandData(editData);
    setIsEditing(false);
    // Mock API call
    console.log('Saving land data:', editData);
  };

  const handleCancel = () => {
    setEditData(landData);
    setIsEditing(false);
  };

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

  if (error || !landData) {
    return (
      <div className="p-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">Error Loading Land</h2>
            <p className="text-red-600 dark:text-red-300 mb-4">{error}</p>
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
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{landData.title}</h1>
              <p className="text-gray-600 dark:text-gray-400">Land ID: {landData.id}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
              landData.status === 'verified'
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                : landData.status === 'pending'
                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
            }`}>
              {landData.status}
            </span>
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)} variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Edit Land
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
            {/* Land Information */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Land Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.title}
                      onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  ) : (
                    <p className="text-gray-900 dark:text-white">{landData.title}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Owner</label>
                  <p className="text-gray-900 dark:text-white flex items-center">
                    <User className="h-4 w-4 mr-2 text-gray-500" />
                    {landData.owner}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.location}
                      onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  ) : (
                    <p className="text-gray-900 dark:text-white flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                      {landData.location}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Size</label>
                  {isEditing ? (
                    <input
                      type="number"
                      value={editData.size}
                      onChange={(e) => setEditData({ ...editData, size: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  ) : (
                    <p className="text-gray-900 dark:text-white">{landData.size} acres</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Crop Suitability</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.cropSuitability}
                      onChange={(e) => setEditData({ ...editData, cropSuitability: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  ) : (
                    <p className="text-gray-900 dark:text-white">{landData.cropSuitability}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price per Acre</label>
                  {isEditing ? (
                    <input
                      type="number"
                      value={editData.price}
                      onChange={(e) => setEditData({ ...editData, price: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  ) : (
                    <p className="text-gray-900 dark:text-white">${landData.price}/acre</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Soil Quality</label>
                  {isEditing ? (
                    <select
                      value={editData.soilQuality}
                      onChange={(e) => setEditData({ ...editData, soilQuality: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                    >
                      <option value="Excellent">Excellent</option>
                      <option value="Good">Good</option>
                      <option value="Fair">Fair</option>
                      <option value="Poor">Poor</option>
                    </select>
                  ) : (
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      landData.soilQuality === 'Excellent'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : landData.soilQuality === 'Good'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {landData.soilQuality}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Water Source</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.waterSource}
                      onChange={(e) => setEditData({ ...editData, waterSource: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  ) : (
                    <p className="text-gray-900 dark:text-white">{landData.waterSource}</p>
                  )}
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                {isEditing ? (
                  <textarea
                    value={editData.description}
                    onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                ) : (
                  <p className="text-gray-600 dark:text-gray-400">{landData.description}</p>
                )}
              </div>
            </div>

            {/* Documents */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                <FileText className="h-5 w-5 mr-2 text-primary" />
                Documents
              </h2>
              <div className="space-y-3">
                {landData.documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{doc.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Type: {doc.type} • Uploaded: {doc.uploaded}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        doc.status === 'verified'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      }`}>
                        {doc.status}
                      </span>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Investment Proposals */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Investment Proposals</h2>
              <div className="space-y-3">
                {landData.proposals.map((proposal) => (
                  <div key={proposal.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{proposal.investor}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Amount: ${proposal.amount.toLocaleString()} • Submitted: {proposal.submitted}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        proposal.status === 'accepted'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : proposal.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {proposal.status}
                      </span>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Land Preview */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Land Preview</h3>
              <div className="aspect-video bg-gradient-to-br from-primary via-primary to-accent rounded-lg flex items-center justify-center">
                <MapPin className="h-12 w-12 text-white" />
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Elevation</span>
                  <span className="text-gray-900 dark:text-white">{landData.elevation}m</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Coordinates</span>
                  <span className="text-gray-900 dark:text-white">{landData.coordinates.lat}, {landData.coordinates.lng}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Quick Actions</h3>
              <div className="space-y-3">
                {landData.status === 'verified' ? (
                  <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                    <XCircle className="h-4 w-4 mr-2" />
                    Hide Land
                  </Button>
                ) : (
                  <Button variant="outline" className="w-full justify-start text-green-600 hover:text-green-700">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Verify Land
                  </Button>
                )}
                <Button variant="outline" className="w-full justify-start">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Flag for Review
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
              </div>
            </div>

            {/* Statistics */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Statistics</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Total Value</span>
                  <span className="font-semibold text-gray-900 dark:text-white">${(landData.size * landData.price).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Proposals</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{landData.proposals.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Listed Date</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{landData.listed}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}