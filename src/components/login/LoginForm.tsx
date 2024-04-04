/* eslint-disable import/no-extraneous-dependencies */

'use client';

import Link from 'next/link';
import { useState } from 'react';

import { UserRadio } from '@/components/login/UserRadio';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import LoginFormAdmin from './login_forms/LoginFormAdmin';

const LoginForm = () => {
  const [userType, setUserType] = useState<'admin' | 'faculty' | 'student'>(
    'admin',
  );

  return (
    <>
      <div className="size-full" id="recaptcha-container"></div>

      <div className="flex flex-col gap-5 rounded-md bg-white p-5 shadow-md dark:bg-slate-800 sm:p-10">
        <UserRadio value={userType} setValue={setUserType} disabled={false} />

        {userType === 'admin' ? (
          <div className="flex flex-col gap-4">
            <LoginFormAdmin />
          </div>
        ) : (
          <>
            <div>
              <Label htmlFor="email" className="">
                Email Address
              </Label>
              <Input type="email" name="email" id="email" className="mt-2" />
            </div>
            <div>
              <Label htmlFor="password" className="">
                Password
              </Label>
              <Input
                type="password"
                name="password"
                id="password"
                className="mt-2"
              />
            </div>
            <div className="flex flex-col sm:flex-row">
              <Button className="flex-1 hover:bg-blueButtonHoverBg">
                Sign up
              </Button>
            </div>
            <Link
              href={'/forgot_password'}
              className="text-gray-500 dark:text-gray-300"
            >
              Forgot Password?
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default LoginForm;
