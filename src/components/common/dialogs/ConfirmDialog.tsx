import DialogDrawer from './DialogDrawer';

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
    <DialogDrawer
      opened={open}
      setOpened={setOpened}
      title={title}
      positiveCallback={positiveCallback}
      isDialogFooterReq
      negativeCallback={negativeCallback}
    >
      {children}
    </DialogDrawer>
  );
};

export default ConfirmDialog;
