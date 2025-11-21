'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import { CheckCircle, XCircle, MessageSquare, Eye } from 'lucide-react';

export default function Proposals() {
  const { user } = useSelector((state: RootState) => state.auth);
  const [activeTab, setActiveTab] = useState<'received' | 'sent'>('received');

  const mockProposals = [
    {
      id: '1',
      investorName: 'Sarah Johnson',
      landTitle: 'Coffee Farm Plot #5',
      amount: 50000,
      duration: 5,
      message: 'Interested in sustainable coffee production partnership.',
      status: 'pending',
      createdAt: '2024-01-15',
    },
    {
      id: '2',
      investorName: 'Mike Chen',
      landTitle: 'Maize Field #12',
      amount: 25000,
      duration: 3,
      message: 'Looking to invest in maize cultivation.',
      status: 'accepted',
      createdAt: '2024-01-10',
    },
  ];

  const handleAccept = (id: string) => {
    // Mock accept
    console.log('Accepted proposal', id);
  };

  const handleReject = (id: string) => {
    // Mock reject
    console.log('Rejected proposal', id);
  };

  return (
    <div className="min-h-screen bg-background_light dark:bg-background_dark">
      <Navbar />
      <div className="pt-16 flex">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Proposals</h1>

            {user?.role === 'landowner' && (
              <div className="mb-6">
                <div className="border-b border-gray-200 dark:border-gray-700">
                  <nav className="-mb-px flex space-x-8">
                    <button
                      onClick={() => setActiveTab('received')}
                      className={`py-2 px-1 border-b-2 font-medium text-sm ${
                        activeTab === 'received'
                          ? 'border-primary text-primary'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      Received Proposals
                    </button>
                    <button
                      onClick={() => setActiveTab('sent')}
                      className={`py-2 px-1 border-b-2 font-medium text-sm ${
                        activeTab === 'sent'
                          ? 'border-primary text-primary'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      Sent Proposals
                    </button>
                  </nav>
                </div>
              </div>
            )}

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {activeTab === 'received' ? 'Received Proposals' : 'Sent Proposals'}
                </h2>
              </div>
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {mockProposals.map((proposal) => (
                  <div key={proposal.id} className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                            {proposal.investorName}
                          </h3>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            proposal.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : proposal.status === 'accepted'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {proposal.status}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                          Interested in: {proposal.landTitle}
                        </p>
                        <p className="mt-2 text-sm text-gray-900 dark:text-white">
                          {proposal.message}
                        </p>
                        <div className="mt-3 flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                          <span>Amount: ${proposal.amount.toLocaleString()}</span>
                          <span>Duration: {proposal.duration} years</span>
                          <span>Received: {proposal.createdAt}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                          <Eye className="h-5 w-5" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                          <MessageSquare className="h-5 w-5" />
                        </button>
                        {user?.role === 'landowner' && proposal.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleAccept(proposal.id)}
                              className="p-2 text-green-600 hover:text-green-800"
                            >
                              <CheckCircle className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => handleReject(proposal.id)}
                              className="p-2 text-red-600 hover:text-red-800"
                            >
                              <XCircle className="h-5 w-5" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}