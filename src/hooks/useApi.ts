import { useState, useCallback } from 'react';
import { api } from '@/lib/api';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const makeRequest = useCallback(async <T>(
    apiCall: () => Promise<{ success: boolean; data?: T; error?: string }>,
    onSuccess?: (data: T) => void,
    onError?: (error: string) => void
  ) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiCall();

      if (response.success && response.data) {
        onSuccess?.(response.data);
      } else {
        const errorMessage = response.error || 'An error occurred';
        setError(errorMessage);
        onError?.(errorMessage);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Network error';
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    makeRequest,
    clearError: () => setError(null),
  };
};