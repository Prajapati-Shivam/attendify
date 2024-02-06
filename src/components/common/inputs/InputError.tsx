interface InputErrorProps {
  errorMessage: string;
}

const InputError = ({ errorMessage }: InputErrorProps) => {
  return (
    <small className="text-[10px]  text-shareLinkText">{errorMessage}</small>
  );
};

export default InputError;
