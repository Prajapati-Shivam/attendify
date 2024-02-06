import type { StateCreator } from 'zustand';

interface ISnackbar {
  open: boolean;
  message?: string;
  type?: 'success' | 'error' | 'info';
  autoClose?: boolean;
}

interface UIState {
  snackbar: ISnackbar;
  setSnackbar: (snackbar: ISnackbar) => void;
}

export const createUISlice: StateCreator<UIState> = set => ({
  snackbar: { autoClose: true, message: '', open: false, type: 'success' },
  setSnackbar: data =>
    set(state => ({
      ...state,
      snackbar: {
        autoClose: data.autoClose,
        message: data.message,
        open: data.open,
        type: data.type,
      },
    })),
});
