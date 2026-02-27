'use client';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { closeModal } from '@/store/slices/uiSlice';
import { X } from 'lucide-react';

export default function Modal() {
  const dispatch = useDispatch();
  const { modalOpen, modalContent } = useSelector((state: RootState) => state.ui);

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [modalOpen]);

  if (!modalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-black bg-opacity-50 animate-in fade-in duration-300" onClick={() => dispatch(closeModal())} />
      <div className="relative bg-card text-foreground rounded-lg shadow-xl max-w-md w-full mx-4 p-6 animate-in zoom-in-95 duration-300">
        <button
          onClick={() => dispatch(closeModal())}
          className="absolute top-4 right-4 text-muted-foreground hover:text-muted-foreground"
        >
          <X className="h-6 w-6" />
        </button>
        <div className="mt-4">
          {modalContent}
        </div>
      </div>
    </div>
  );
}