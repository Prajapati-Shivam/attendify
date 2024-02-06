/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import {
  AiOutlineCheckCircle,
  AiOutlineClose,
  AiOutlineCloseCircle,
} from 'react-icons/ai';

import { useUIStore } from '@/store';

function Snackbar({ timeout = 5 }: { timeout?: number }) {
  const {
    setSnackbar,
    snackbar: { autoClose, message, open, type },
  } = useUIStore();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (autoClose === false) return;

    if (open) {
      const duration = 100 / ((timeout * 1000) / 100);
      let counter = 0;
      timer = setInterval(() => {
        counter += duration;
        if (counter >= 100) {
          setSnackbar({ open: false });
          clearInterval(timer);
        }
      }, 100);
    }

    // eslint-disable-next-line consistent-return
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [timeout, open, autoClose]);

  if (!open) return null;
  return (
    <div
      onClick={() => {
        setSnackbar({ open: false });
      }}
      className="notification fixed inset-x-4 bottom-[84px] z-[100] flex items-center gap-4 rounded border-[0.5px] border-inputBorderLight bg-surfaceLight py-1 pl-1 pr-4 shadow-md dark:border-inputBorderDark dark:bg-primaryVariantDark lg:bottom-4 lg:left-auto lg:right-4"
    >
      <div
        className={`rounded ${
          type === 'error'
            ? 'bg-red-700'
            : type === 'success'
              ? 'bg-green-500'
              : 'bg-blue-500'
        } min-h-full w-[6px]`}
      >
        &nbsp;
      </div>
      <div className="flex items-center justify-center">
        {type === 'success' || type === 'info' ? (
          <AiOutlineCheckCircle
            size={25}
            className={`${
              type === 'success' ? 'text-green-500' : 'text-blue-500'
            } text-base lg:text-xl`}
          />
        ) : (
          <AiOutlineCloseCircle className="text-lg text-red-500 lg:text-xl" />
        )}
      </div>
      <div className="py-1 text-sm lg:text-base">{message}</div>

      <div className="flex cursor-pointer items-center justify-center text-sm text-textSecondaryLight dark:text-textSecondaryDark">
        <AiOutlineClose />
      </div>
    </div>
  );
}

export default Snackbar;
