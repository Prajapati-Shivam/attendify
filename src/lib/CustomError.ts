import { toast } from 'react-toastify';

class CustomError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CustomError';
  }
}

export const errorHandler = (error: unknown) => {
  if (error instanceof CustomError) {
    toast.error(`${error.message}`);
    return;
  }
  toast.error(`Something went wrong`);
};

export default CustomError;
