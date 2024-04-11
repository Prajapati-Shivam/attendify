import type { CSSProperties } from 'react';
import { toast } from 'react-toastify';

interface SnackBarProps {
  message: React.ReactNode;
  type: 'info' | 'error' | 'success';
  style?: CSSProperties | undefined;
}

export const showSnackbar = ({ message, type }: SnackBarProps) => {
  if (type === 'success') {
    toast.success(message);
  } else if (type === 'error') {
    toast.error(message);
  } else {
    toast.info(message);
  }
};
