'use client';

import { useState } from 'react';
import { useUI } from '@/hooks/useUI';
import Button from './Button';
import { Star } from 'lucide-react';

interface ReviewModalProps {
  targetUserId: string;
  targetUserName: string;
  onSubmit: (review: { rating: number; comment: string }) => void;
}

export default function ReviewModal({ targetUserId, targetUserName, onSubmit }: ReviewModalProps) {
  const { closeModal } = useUI();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;

    setLoading(true);

    // Mock submission
    setTimeout(() => {
      onSubmit({ rating, comment });
      setLoading(false);
      closeModal();
    }, 1000);
  };

  return (
    <div className="max-w-md w-full">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        Leave a Review
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Share your experience with <strong>{targetUserName}</strong>
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Rating
          </label>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="focus:outline-none"
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
              >
                <Star
                  className={`h-8 w-8 ${
                    star <= (hoverRating || rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
          {rating > 0 && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {rating} star{rating !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Comment (Optional)
          </label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 resize-none"
            rows={4}
            placeholder="Tell others about your experience..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        <div className="flex space-x-3">
          <Button
            type="button"
            variant="outline"
            onClick={closeModal}
            className="flex-1"
          >
            Skip
          </Button>
          <Button
            type="submit"
            loading={loading}
            disabled={rating === 0}
            className="flex-1"
          >
            Submit Review
          </Button>
        </div>
      </form>
    </div>
  );
}