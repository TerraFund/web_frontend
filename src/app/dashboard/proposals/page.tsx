'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { CheckCircle, XCircle, MessageSquare, Eye, Send, DollarSign, Calendar } from 'lucide-react';

export default function Proposals() {
  const { user } = useSelector((state: RootState) => state.auth);
  const [activeTab, setActiveTab] = useState<'received' | 'sent'>('received');
  const [selectedProposal, setSelectedProposal] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [animatingProposal, setAnimatingProposal] = useState<string | null>(null);

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
    setAnimatingProposal(id);
    setTimeout(() => {
      // Mock accept - in real app would update state/API
      console.log('Accepted proposal', id);
      setAnimatingProposal(null);
    }, 1000);
  };

  const handleReject = (id: string) => {
    setAnimatingProposal(id);
    setTimeout(() => {
      // Mock reject - in real app would update state/API
      console.log('Rejected proposal', id);
      setAnimatingProposal(null);
    }, 1000);
  };

  const openProposalModal = (proposal: any) => {
    setSelectedProposal(proposal);
    setShowModal(true);
  };

  return (
    <div className="p-8">
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
                 {mockProposals.map((proposal, index) => (
                   <div
                     key={proposal.id}
                     className={`p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 animate-in slide-in-from-bottom-4`}
                     style={{ animationDelay: `${index * 100}ms` }}
                   >
                     <div className={`flex items-center justify-between ${animatingProposal === proposal.id ? 'animate-pulse' : ''}`}>
                       <div className="flex-1">
                         <div className="flex items-center space-x-3">
                           <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                             {proposal.investorName}
                           </h3>
                           <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full animate-in zoom-in duration-300 ${
                             proposal.status === 'pending'
                               ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                               : proposal.status === 'accepted'
                               ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                               : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
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
                           <div className="flex items-center">
                             <DollarSign className="w-4 h-4 mr-1" />
                             <span>${proposal.amount.toLocaleString()}</span>
                           </div>
                           <div className="flex items-center">
                             <Calendar className="w-4 h-4 mr-1" />
                             <span>{proposal.duration} years</span>
                           </div>
                           <span>Received: {proposal.createdAt}</span>
                         </div>
                       </div>
                       <div className="flex items-center space-x-2">
                         <button
                           onClick={() => openProposalModal(proposal)}
                           className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors hover:scale-110"
                         >
                           <Eye className="h-5 w-5" />
                         </button>
                         <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors hover:scale-110">
                           <MessageSquare className="h-5 w-5" />
                         </button>
                         {user?.role === 'landowner' && proposal.status === 'pending' && (
                           <>
                             <button
                               onClick={() => handleAccept(proposal.id)}
                               className={`p-2 text-green-600 hover:text-green-800 transition-all duration-200 hover:scale-110 ${
                                 animatingProposal === proposal.id ? 'animate-bounce' : ''
                               }`}
                             >
                               <CheckCircle className="h-5 w-5" />
                             </button>
                             <button
                               onClick={() => handleReject(proposal.id)}
                               className={`p-2 text-red-600 hover:text-red-800 transition-all duration-200 hover:scale-110 ${
                                 animatingProposal === proposal.id ? 'animate-bounce' : ''
                               }`}
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

      {/* Proposal Detail Modal */}
      {showModal && selectedProposal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Proposal Details
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold">
                    {selectedProposal.investorName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{selectedProposal.investorName}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Investor</p>
                  </div>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ml-auto ${
                    selectedProposal.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      : selectedProposal.status === 'accepted'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {selectedProposal.status}
                  </span>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h5 className="font-medium text-gray-900 dark:text-white mb-2">Land of Interest</h5>
                  <p className="text-gray-700 dark:text-gray-300">{selectedProposal.landTitle}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <DollarSign className="w-4 h-4 text-primary mr-2" />
                      <span className="font-medium text-gray-900 dark:text-white">Investment Amount</span>
                    </div>
                    <p className="text-2xl font-bold text-primary">${selectedProposal.amount.toLocaleString()}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Calendar className="w-4 h-4 text-primary mr-2" />
                      <span className="font-medium text-gray-900 dark:text-white">Duration</span>
                    </div>
                    <p className="text-2xl font-bold text-primary">{selectedProposal.duration} years</p>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h5 className="font-medium text-gray-900 dark:text-white mb-2">Message</h5>
                  <p className="text-gray-700 dark:text-gray-300">{selectedProposal.message}</p>
                </div>

                {user?.role === 'landowner' && selectedProposal.status === 'pending' && (
                  <div className="flex space-x-3 pt-4">
                    <button
                      onClick={() => {
                        handleAccept(selectedProposal.id);
                        setShowModal(false);
                      }}
                      className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Accept Proposal
                    </button>
                    <button
                      onClick={() => {
                        handleReject(selectedProposal.id);
                        setShowModal(false);
                      }}
                      className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject Proposal
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}