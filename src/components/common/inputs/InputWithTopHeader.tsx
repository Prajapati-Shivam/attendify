import type { FormEvent } from 'react';
import { useState } from 'react';
import type {
  DeepMap,
  FieldError,
  Path,
  UseFormRegister,
} from 'react-hook-form';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

import { Label } from '@/components/ui/label';

import InputError from './InputError';

interface InputWithTopHeaderProps<FormFields extends Record<string, unknown>> {
  label?: string;
  placeholder?: string;
  className?: string;
  leadingIcon?: JSX.Element;
  tailIcon?: JSX.Element;
  onTailIconClick?: () => void;
  register?: UseFormRegister<FormFields>;
  name?: Path<FormFields>;
  errors?: Partial<DeepMap<FormFields, FieldError>>;
  value?: string | number;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  disabled?: boolean;
  inputRef?: React.LegacyRef<HTMLInputElement> | undefined;
  onBlur?: () => void;
  isUppercase?: boolean;
  inputMaxLength?: number;
  inputType?: 'text' | 'password';
}

const InputWithTopHeader = <FormFields extends Record<string, unknown>>({
  label,
  placeholder,
  className,
  leadingIcon,
  tailIcon,
  onTailIconClick,
  register,
  errors,
  name,
  value,
  onChange,
  disabled,
  inputRef,
  onBlur,
  isUppercase = false,
  inputType = 'text',
  inputMaxLength,
}: InputWithTopHeaderProps<FormFields>) => {
  const errorMessage = errors && name && errors[name]?.message;

  const hasError = !!(errors && errorMessage);

  const [isInputHidden, setIsInputHidden] = useState(inputType === 'password');

  const handleInputChange = (event: FormEvent<HTMLInputElement>) => {
    if (isUppercase) {
      const input = event.target as HTMLInputElement;
      input.value = input.value.toUpperCase();
    }
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label ? <Label>{label}</Label> : null}

      <div
        className={`flex size-full items-center justify-center rounded border bg-surfaceLight  ${
          hasError && errorMessage
            ? 'border-textPrimaryRed'
            : 'border-inputBorderLight dark:border-inputBorderDark'
        } focus-within:ring-[2px] dark:bg-primaryVariantDark `}
      >
        {leadingIcon ? (
          <div className="flex h-full cursor-pointer items-center justify-center px-2 pb-[9px] pt-2 hover:bg-onHoverBgLight   dark:hover:bg-onBackgroundLight">
            {leadingIcon}
          </div>
        ) : null}

        {register && name ? (
          <input
            {...register(name)}
            type={
              inputType === 'password' && isInputHidden ? 'password' : 'text'
            }
            onInput={event => {
              handleInputChange(event);
            }}
            onBlur={onBlur}
            className={`w-full py-1 text-sm dark:bg-primaryVariantDark ${
              leadingIcon ? 'pl-0' : 'pl-2'
            } outline-none ${tailIcon ? 'pr-0' : 'pr-2'}`}
            placeholder={placeholder}
            disabled={disabled}
            maxLength={inputMaxLength}
          />
        ) : (
          <input
            ref={inputRef}
            onBlur={onBlur}
            value={value}
            onChange={onChange}
            type={
              inputType === 'password' && isInputHidden ? 'password' : 'text'
            }
            onInput={event => {
              handleInputChange(event);
            }}
            className={`w-full py-1 text-sm dark:bg-primaryVariantDark ${
              leadingIcon ? 'pl-0' : 'pl-2'
            } outline-none ${tailIcon ? 'pr-0' : 'pr-2'}`}
            placeholder={placeholder}
            disabled={disabled}
            maxLength={inputMaxLength}
          />
        )}
        {inputType === 'password' && isInputHidden ? (
          <div
            onClick={() => setIsInputHidden(!isInputHidden)}
            className="flex h-full cursor-pointer items-center justify-center px-2 pb-[9px] pt-2 hover:bg-onHoverBgLight   dark:hover:bg-onSurfaceLight"
          >
            <AiOutlineEye className="size-4" />
          </div>
        ) : (
          inputType === 'password' &&
          !isInputHidden && (
            <div
              onClick={() => setIsInputHidden(!isInputHidden)}
              className="flex h-full cursor-pointer items-center justify-center px-2 pb-[9px] pt-2 hover:bg-onHoverBgLight   dark:hover:bg-onSurfaceLight"
            >
              <AiOutlineEyeInvisible className="size-4" />
            </div>
          )
        )}
        {tailIcon ? (
          <div
            onClick={onTailIconClick}
            className="flex h-full cursor-pointer items-center justify-center px-2 pb-[9px] pt-2 hover:bg-onHoverBgLight   dark:hover:bg-onSurfaceLight"
          >
            {tailIcon}
          </div>
        ) : null}
      </div>
      {hasError && errorMessage && <InputError errorMessage={errorMessage} />}
    </div>
  );
};

export default InputWithTopHeader;
