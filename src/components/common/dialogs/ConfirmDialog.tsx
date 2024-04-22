import { Button } from '@/components/ui/button';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../ui/dialog';

interface ConfirmDialogProps {
  open: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  children: React.ReactNode;
  positiveCallback: () => void;
  negativeCallback?: () => void;
}

const ConfirmDialog = ({
  negativeCallback,
  positiveCallback,
  open,
  setOpened,
  title = 'Confirm',
  children,
}: ConfirmDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpened} modal>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        {children}
        <DialogFooter>
          <Button
            variant="outline"
            className="mr-2 hover:border-blueButtonHoverBg"
            onClick={() => {
              setOpened(false);
              // eslint-disable-next-line @typescript-eslint/no-unused-expressions
              negativeCallback && negativeCallback();
            }}
          >
            Cancel
          </Button>

          <Button
            className="hover:bg-blueButtonHoverBg"
            onClick={() => {
              setOpened(false);
              positiveCallback();
            }}
          >
            Okay
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDialog;
