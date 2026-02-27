import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import React from 'react';

interface ToastState {
  message: string;
  type: 'success' | 'error' | 'info';
  visible: boolean;
}

interface UiState {
  darkMode: boolean;
  sidebarOpen: boolean;
  modalOpen: boolean;
  modalContent: React.ReactNode | null;
  toast: ToastState | null;
}

const initialState: UiState = {
  darkMode: false,
  sidebarOpen: false,
  modalOpen: false,
  modalContent: null,
  toast: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    openModal: (state, action: PayloadAction<React.ReactNode>) => {
      state.modalOpen = true;
      state.modalContent = action.payload;
    },
    closeModal: (state) => {
      state.modalOpen = false;
      state.modalContent = null;
    },
    showToast: (state, action: PayloadAction<{ message: string; type: 'success' | 'error' | 'info'; duration?: number }>) => {
      state.toast = {
        message: action.payload.message,
        type: action.payload.type,
        visible: true,
      };
    },
    hideToast: (state) => {
      if (state.toast) {
        state.toast.visible = false;
      }
    },
  },
});

export const { toggleDarkMode, setSidebarOpen, openModal, closeModal, showToast, hideToast } = uiSlice.actions;
export default uiSlice.reducer;