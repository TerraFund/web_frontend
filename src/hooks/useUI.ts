import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { toggleDarkMode, setSidebarOpen, openModal, closeModal } from '@/store/slices/uiSlice';

export const useUI = () => {
  const dispatch = useDispatch();
  const { darkMode, sidebarOpen, modalOpen, modalContent } = useSelector((state: RootState) => state.ui);

  return {
    darkMode,
    sidebarOpen,
    modalOpen,
    modalContent,
    toggleDarkMode: () => dispatch(toggleDarkMode()),
    setSidebarOpen: (open: boolean) => dispatch(setSidebarOpen(open)),
    openModal: (content: string) => dispatch(openModal(content)),
    closeModal: () => dispatch(closeModal()),
  };
};