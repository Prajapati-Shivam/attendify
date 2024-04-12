import type { ChangeEvent } from 'react';
import React, { useEffect, useRef, useState } from 'react';

import { showSnackbar } from '@/lib/TsxUtils';

interface InputOtpProps {
  title: string;
  setOtp: React.Dispatch<React.SetStateAction<string>>;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  resendOtp: () => void;
  isResendOtpDisabled: boolean;
  isChangeReq?: boolean;
}

const InputOtp = ({
  setOtp,
  title,
  resendOtp,
  isResendOtpDisabled,
  setShow,
  isChangeReq = true,
}: InputOtpProps) => {
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const [seconds, setSeconds] = useState(30);

  const attemptsLeftRef = useRef(3);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (seconds > 0) {
      interval = setInterval(() => {
        // eslint-disable-next-line @typescript-eslint/no-shadow
        setSeconds(seconds => seconds - 1);
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }
    return () => clearInterval(interval || 0);
  }, [seconds]);

  const handleResendOTP = () => {
    if (attemptsLeftRef.current > 0 && !isResendOtpDisabled) {
      attemptsLeftRef.current -= 1;
      resendOtp();
      setSeconds(30);
      showSnackbar({
        message: `${attemptsLeftRef.current} login attempts left`,
        type: 'info',
      });
      // Resend OTP logic here
    } else {
      // No attempts left
      showSnackbar({
        message: 'No attempts left, please try again after sometime',
        type: 'error',
      });
    }
  };

  function handleInputChange(e: ChangeEvent<HTMLInputElement>, index: number) {
    const { value } = e.target;
    if (
      value.length === 1 &&
      index < inputRefs.length - 1 &&
      inputRefs[index + 1].current
    ) {
      inputRefs[index + 1].current?.focus();
    }
    const otpArray = inputRefs.map(ref => ref.current?.value);
    setOtp(otpArray.join(''));
  }

  function handleInputKeyDown(e: any, index: number) {
    if (e.key === 'Backspace' && !e.target.value && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  }

  function handleInput(e: React.FormEvent<HTMLInputElement>) {
    const pattern = /^[\d\b]+$/;
    const inputVal = e.currentTarget.value;
    if (!pattern.test(inputVal)) {
      e.currentTarget.value = inputVal.replaceAll(/\D/g, '');
    }
  }

  return (
    <div className="flex w-full flex-col gap-[6px]">
      <div className="flex w-full items-start gap-1">
        <span className=" line-clamp-2 text-xs font-medium">{title}</span>
        {isChangeReq && (
          <span
            onClick={() => setShow(false)}
            className=" mt-[2px] cursor-pointer text-[10px] font-semibold uppercase text-textPrimaryBlue hover:underline"
          >
            {'change'}
          </span>
        )}
      </div>
      <div className="mt-[2px] flex w-full flex-wrap justify-between gap-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            className="size-8 appearance-none rounded-md border border-inputBorderLight text-center text-xl focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-inputBorderDark dark:bg-primaryVariantDark dark:text-textPrimaryDark sm:size-11"
            ref={inputRefs[index]}
            onChange={e => handleInputChange(e, index)}
            onInput={handleInput} // event listener to restrict input to numeric characters
            onKeyDown={e =>
              handleInputKeyDown(
                e as unknown as ChangeEvent<HTMLInputElement>,
                index,
              )
            }
          />
        ))}
      </div>
      {seconds > 0 ? (
        <span className="mt-1 text-sm text-textTertiaryLight dark:text-textTertiaryDark">
          Resend otp in {seconds} seconds
        </span>
      ) : (
        <span
          onClick={() => {
            if (!isResendOtpDisabled && attemptsLeftRef.current > 0) {
              handleResendOTP();
            } else if (attemptsLeftRef.current === 0) {
              showSnackbar({
                message: 'No attempts left, please try again after sometime',
                type: 'error',
              });
            }
          }}
          role="button"
          className={`${
            (attemptsLeftRef.current === 0 || isResendOtpDisabled) &&
            'text-switchSecondaryBlueBg'
          } cursor-pointer text-textPrimaryBlue`}
        >
          Resend Otp
        </span>
      )}
    </div>
  );
};

export default InputOtp;
