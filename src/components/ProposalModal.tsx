'use client';

import { useState, useEffect } from 'react';
import { useUI } from '@/hooks/useUI';
import Button from './Button';
import Input from './Input';
import { Wifi, WifiOff } from 'lucide-react';

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
  const [isOnline, setIsOnline] = useState(true);
  const [hasDraft, setHasDraft] = useState(false);

  useEffect(() => {
    // Check online status
    setIsOnline(navigator.onLine);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Load draft from localStorage
    const draftKey = `proposal_draft_${landId}`;
    const savedDraft = localStorage.getItem(draftKey);
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft);
        setFormData(draft);
        setHasDraft(true);
      } catch (e) {
        console.error('Failed to load draft:', e);
      }
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [landId]);

  // Auto-save draft
  useEffect(() => {
    const hasContent = formData.amount || formData.duration || formData.message;
    if (hasContent) {
      const draftKey = `proposal_draft_${landId}`;
      localStorage.setItem(draftKey, JSON.stringify(formData));
      setHasDraft(true);
    }
  }, [formData.amount, formData.duration, formData.message, landId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!isOnline) {
      // Save to localStorage for later sync
      const offlineKey = `offline_proposal_${landId}_${Date.now()}`;
      localStorage.setItem(offlineKey, JSON.stringify({
        ...formData,
        landId,
        timestamp: Date.now(),
      }));

      // Clear draft
      localStorage.removeItem(`proposal_draft_${landId}`);

      setLoading(false);
      closeModal();
      alert('Proposal saved offline. It will be sent when you\'re back online.');
      return;
    }

    // Mock submission
    setTimeout(() => {
      onSubmit({
        amount: parseFloat(formData.amount),
        duration: parseInt(formData.duration),
        message: formData.message,
      });
      // Clear draft on successful submit
      localStorage.removeItem(`proposal_draft_${landId}`);
      setLoading(false);
      closeModal();
    }, 1000);
  };

  return (
    <div className="max-w-md w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-foreground">
          Send Proposal
        </h2>
        <div className={`flex items-center text-sm ${isOnline ? 'text-green-600' : 'text-red-600'}`}>
          {isOnline ? <Wifi className="w-4 h-4 mr-1" /> : <WifiOff className="w-4 h-4 mr-1" />}
          {isOnline ? 'Online' : 'Offline'}
        </div>
      </div>
      <p className="text-muted-foreground">
        Submit your investment proposal for <strong>{landTitle}</strong>
      </p>
      {hasDraft && (
        <div className="bg-blue-50">
          <p className="text-sm text-blue-800">
            Draft loaded from previous session
          </p>
        </div>
      )}
      {!isOnline && (
        <div className="bg-yellow-50">
          <p className="text-sm text-yellow-800">
            You&apos;re offline. Your proposal will be saved and sent when you&apos;re back online.
          </p>
        </div>
      )}

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
          <label className="block text-sm font-medium text-foreground/80">
            Message
          </label>
          <textarea
            className="w-full px-3 py-2 border border-border"
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