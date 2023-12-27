export interface InputErrorMessageProps {
  error?: string;
}

const InputErrorMessage: React.FC<InputErrorMessageProps> = ({
  error: errors,
}) => {
  return (
    <>
      {errors && (
        <span className="text-sm font-light text-red-400 dark:text-red-600">
          {errors}
        </span>
      )}
    </>
  );
};

export default InputErrorMessage;
