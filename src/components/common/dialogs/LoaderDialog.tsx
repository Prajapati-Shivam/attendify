import Image from 'next/image';

import { AlertDialog, AlertDialogContent } from '@/components/ui/alert-dialog';

interface LoaderDialogProps {
  title?: string;
  description?: string;
  loading: boolean;
}

const LoaderDialog = ({
  title = 'Please wait...',
  description,
  loading,
}: LoaderDialogProps) => {
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent className="flex w-full max-w-sm items-center gap-6 rounded bg-white px-6 py-4 shadow dark:bg-primaryVariantDark">
        <Image src="/loading.gif" alt="loading" width={50} height={50} />
        <div className="flex flex-col">
          <div className="text-base font-bold">{title}</div>
          <div className="line-clamp-2 text-sm text-textSecondaryLight dark:text-textSecondaryDark">
            {description}
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LoaderDialog;
