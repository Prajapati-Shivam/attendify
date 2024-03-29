'use client';

import React from 'react';

interface LoginAdminProps {
  phoneNumber: string;
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
  otp: string;
  setOtp: React.Dispatch<React.SetStateAction<string>>;
  showOtpInput: boolean;
}

const LoginAdmin = ({
  otp,
  phoneNumber,
  setOtp,
  setPhoneNumber,
  showOtpInput,
}: LoginAdminProps) => {
  return (
    <div className="flex flex-col gap-4">
      {!showOtpInput ? (
        <div className="flex flex-col gap-1">
          <label htmlFor="phoneNumber">Phone number</label>
          <input
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            onChange={e => setPhoneNumber(e.target.value)}
          />
        </div>
      ) : (
        <div className="flex flex-col gap-1">
          <label htmlFor="otp">OTP</label>
          <input
            type="text"
            id="otp"
            value={otp}
            maxLength={6}
            onChange={e => setOtp(e.target.value)}
          />
        </div>
      )}
    </div>
  );
};

export default LoginAdmin;
