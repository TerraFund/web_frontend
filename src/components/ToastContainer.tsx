'use client';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { hideToast } from '@/store/slices/uiSlice';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

export default function ToastContainer() {
  const dispatch = useDispatch();
  const toast = useSelector((state: RootState) => state.ui.toast);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        dispatch(hideToast());
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [toast, dispatch]);

  if (!toast) return null;

  const icons = {
    success: CheckCircle,
    error: XCircle,
    info: Info,
  };

  const colors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
  };

  const Icon = icons[toast.type];

  return (
    <div className={`fixed top-4 right-4 z-50 flex items-center space-x-3 px-4 py-3 rounded-lg text-white shadow-lg transform transition-all duration-300 ${colors[toast.type]}`}>
      <Icon className="h-5 w-5" />
      <span>{toast.message}</span>
      <button
        onClick={() => dispatch(hideToast())}
        className="ml-2 hover:opacity-75 text-white"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}