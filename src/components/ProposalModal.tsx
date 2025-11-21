'use client';

import { useState } from 'react';
import { useUI } from '@/hooks/useUI';
import Button from './Button';
import Input from './Input';

interface ProposalModalProps {
  landId: string;
  landTitle: string;
  onSubmit: (data: { amount: number; duration: number; message: string }) => void;
}

export default function ProposalModal({ landId, landTitle, onSubmit }: ProposalModalProps) {
  const { closeModal } = useUI();
  const [formData, setFormData] = useState({
    amount: '',
    duration: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Mock submission
    setTimeout(() => {
      onSubmit({
        amount: parseFloat(formData.amount),
        duration: parseInt(formData.duration),
        message: formData.message,
      });
      setLoading(false);
      closeModal();
    }, 1000);
  };

  return (
    <div className="max-w-md w-full">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Send Proposal
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Submit your investment proposal for <strong>{landTitle}</strong>
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Investment Amount ($)"
          type="number"
          placeholder="Enter amount"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          required
        />

        <Input
          label="Duration (years)"
          type="number"
          placeholder="Enter duration"
          value={formData.duration}
          onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
          required
        />

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Message
          </label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 resize-none"
            rows={4}
            placeholder="Describe your investment plan..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
          />
        </div>

        <div className="flex space-x-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={closeModal}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            loading={loading}
            className="flex-1"
          >
            Send Proposal
          </Button>
        </div>
      </form>
    </div>
  );
}