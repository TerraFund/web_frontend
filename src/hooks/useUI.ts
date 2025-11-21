import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { toggleDarkMode, setSidebarOpen, openModal, closeModal, showToast, hideToast } from '@/store/slices/uiSlice';

export const useUI = () => {
  const dispatch = useDispatch();
  const { darkMode, sidebarOpen, modalOpen, modalContent, toast } = useSelector((state: RootState) => state.ui);

  const displayToast = (message: string, type: 'success' | 'error' | 'info' = 'info', duration = 3000) => {
    dispatch(showToast({ message, type, duration }));
    setTimeout(() => dispatch(hideToast()), duration);
  };

  return {
    darkMode,
    sidebarOpen,
    modalOpen,
    modalContent,
    toast,
    toggleDarkMode: () => dispatch(toggleDarkMode()),
    setSidebarOpen: (open: boolean) => dispatch(setSidebarOpen(open)),
    openModal: (content: React.ReactNode) => dispatch(openModal(content)),
    closeModal: () => dispatch(closeModal()),
    showToast: displayToast,
    hideToast: () => dispatch(hideToast()),
  };
};