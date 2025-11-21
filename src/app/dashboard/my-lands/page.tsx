'use client';

import { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/Button';
import { MapPin, Edit, Eye, Trash2, Plus } from 'lucide-react';

export default function MyLands() {
  const [lands, setLands] = useState([
    {
      id: '1',
      title: 'Coffee Farm Plot #5',
      location: 'Central Kenya',
      size: 25,
      status: 'published',
      proposals: 3,
      createdAt: '2024-01-10',
    },
    {
      id: '2',
      title: 'Maize Field #12',
      location: 'Rift Valley',
      size: 50,
      status: 'draft',
      proposals: 0,
      createdAt: '2024-01-15',
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'text-green-600 bg-green-100';
      case 'draft':
        return 'text-yellow-600 bg-yellow-100';
      case 'sold':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const handleDelete = (id: string) => {
    setLands(lands.filter(land => land.id !== id));
  };

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Lands</h1>
              <Link href="/dashboard/add-land">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Land
                </Button>
              </Link>
            </div>

            {lands.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-12 text-center">
                <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No lands listed yet</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Start by adding your first land listing to connect with investors.
                </p>
                <Link href="/dashboard/add-land">
                  <Button>Add Your First Land</Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {lands.map((land) => (
                  <div key={land.id} className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                    <div className="h-32 bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                      <MapPin className="h-8 w-8 text-white" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{land.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {land.location}
                      </p>

                      <div className="flex justify-between items-center mb-4">
                        <span className="text-sm text-gray-600 dark:text-gray-400">{land.size} acres</span>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full capitalize ${getStatusColor(land.status)}`}>
                          {land.status}
                        </span>
                      </div>

                      <div className="flex justify-between items-center mb-4">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {land.proposals} proposal{land.proposals !== 1 ? 's' : ''}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          Added {land.createdAt}
                        </span>
                      </div>

                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(land.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
        </div>
      </div>
    </div>
  );
}