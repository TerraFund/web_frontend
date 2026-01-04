'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { RootState } from '@/store';
import ReviewModal from '@/components/ReviewModal';

export default function Dashboard() {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<{ id: string; name: string } | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, router]);

  const handleReviewClick = () => {
    // Mock selecting a partner for review
    setSelectedPartner({ id: 'partner1', name: 'Sarah Johnson' });
    setShowReviewModal(true);
  };

  const handleReviewSubmit = (review: { rating: number; comment: string }) => {
    console.log('Review submitted:', review);
    setShowReviewModal(false);
    setSelectedPartner(null);
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
          Welcome back, {user.name}!
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {user.role === 'landowner' ? 'My Lands' : 'Available Lands'}
            </h3>
            <p className="text-3xl font-bold text-primary">12</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {user.role === 'landowner' ? 'Proposals Received' : 'Proposals Sent'}
            </h3>
            <p className="text-3xl font-bold text-accent">8</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Active Deals
            </h3>
            <p className="text-3xl font-bold text-secondary">3</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Total Value
            </h3>
            <p className="text-3xl font-bold text-primary">$125,000</p>
          </div>
        </div>

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
             <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
               Recent Activity
             </h3>
             <div className="space-y-4">
               <div className="flex items-center space-x-3">
                 <div className="w-2 h-2 bg-primary rounded-full"></div>
                 <p className="text-sm text-gray-600 dark:text-gray-400">
                   New proposal received for Land Plot #5
                 </p>
               </div>
               <div className="flex items-center space-x-3">
                 <div className="w-2 h-2 bg-accent rounded-full"></div>
                 <p className="text-sm text-gray-600 dark:text-gray-400">
                   Contract signed for Investment Deal #12
                 </p>
               </div>
               <div className="flex items-center space-x-3">
                 <div className="w-2 h-2 bg-secondary rounded-full"></div>
                 <p className="text-sm text-gray-600 dark:text-gray-400">
                   KYC verification completed
                 </p>
               </div>
             </div>
           </div>

           <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
             <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
               Quick Actions
             </h3>
             <div className="space-y-3">
               {user.role === 'landowner' ? (
                 <>
                   <button className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-accent transition-colors">
                     Add New Land
                   </button>
                   <button className="w-full border border-primary text-primary py-2 px-4 rounded-lg hover:bg-primary hover:text-white transition-colors">
                     View Proposals
                   </button>
                 </>
               ) : (
                 <>
                   <button className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-accent transition-colors">
                     Browse Lands
                   </button>
                   <button className="w-full border border-primary text-primary py-2 px-4 rounded-lg hover:bg-primary hover:text-white transition-colors">
                     My Proposals
                   </button>
                 </>
               )}
               <button className="w-full border border-gray-300 dark:border-gray-500 text-gray-700 dark:text-gray-100 py-2 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                 View Profile
               </button>
             </div>

             {/* Review Prompt for Completed Deals */}
             <div className="mt-6 p-4 bg-gradient-to-r from-accent/10 to-primary/10 border border-accent/20 rounded-lg">
               <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                 Leave a Review
               </h4>
               <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                 Share your experience with recent partners to help the community.
               </p>
               <button
                 onClick={handleReviewClick}
                 className="w-full bg-accent text-white py-2 px-4 rounded-lg hover:bg-accent/80 transition-colors text-sm"
               >
                 Review Completed Deals
               </button>
             </div>
           </div>
         </div>
      </div>

      {/* Review Modal */}
      {showReviewModal && selectedPartner && (
        <ReviewModal
          targetUserId={selectedPartner.id}
          targetUserName={selectedPartner.name}
          onSubmit={handleReviewSubmit}
        />
      )}
    </div>
  );
}