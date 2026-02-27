'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background_light">
      <div className="text-center">
        <div className="text-6xl font-bold text-red-500 mb-4">⚠️</div>
        <h1 className="text-2xl font-bold text-foreground">
          Something went wrong!
        </h1>
        <p className="text-muted-foreground">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-accent transition-colors mr-4"
        >
          Try Again
        </button>
        <a
          href="/"
          className="border border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary hover:text-white transition-colors"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}