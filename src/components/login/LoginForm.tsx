/* eslint-disable import/no-extraneous-dependencies */

'use client';

import type { ConfirmationResult, User } from 'firebase/auth';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { doc, runTransaction, serverTimestamp } from 'firebase/firestore';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { v4 } from 'uuid';

import type {
  IAdminsCollection,
  ILoggedInUsersCollection,
} from '@/@types/database';
import type { LocalStorageLoggedInUserData } from '@/@types/enum';
import { CollectionName, LocalStorageKey } from '@/@types/enum';
import { UserRadio } from '@/components/login/UserRadio';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { auth, db } from '@/firebase_configs/config';
import { getNewDocId } from '@/firebase_configs/DB/DbAuth';
import * as storage from '@/lib/Storage';

import LoginAdmin from './LoginAdmin';

const LoginForm = () => {
  const [userType, setUserType] = useState<'admin' | 'faculty' | 'student'>(
    'admin',
  );

  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [show, setShow] = useState(false);

  const [final, setFinal] = useState<ConfirmationResult>();

  const [recaptchaVerifierData, setRecaptchaVerifierData] =
    useState<RecaptchaVerifier>();

  useEffect(() => {
    try {
      const recaptchaVerifier = new RecaptchaVerifier(
        auth,
        'recaptcha-container',
        {
          size: 'invisible',
          callback: () => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
          },
          'expired-callback': () => {
            // Response expired. Ask user to solve reCAPTCHA again.
          },
        },
      );

      setRecaptchaVerifierData(recaptchaVerifier);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const sendOtp = () => {
    console.log('click firing', phoneNumber);
    if (phoneNumber === '') return;
    if (!recaptchaVerifierData) return;
    console.log('sending otp');
    signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifierData)
      .then(result => {
        setFinal(result);
        setShow(true);
        setPhoneNumber('');
        console.log('otp sent successfully');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const otpSignInSuccess = useCallback(async (dbUser: User) => {
    const uId = dbUser.uid;
    const userPhone = dbUser.phoneNumber;

    if (!userPhone) {
      return;
    }

    const randNum = Date.now();
    const randomChar = v4();
    const loggedInCrypt = randNum + randomChar + uId;

    const loggedInId = getNewDocId(CollectionName.loggedInUsers);

    const newLoggedInDoc: ILoggedInUsersCollection = {
      LoggedInId: loggedInId,
      LoggedInUserId: uId,
      IsLoggedIn: true,
      LoggedInCreatedAt: serverTimestamp(),
      LoggedInCrypt: loggedInCrypt,
      LoggedInUserType: 'admin',
    };

    const newUserDoc: IAdminsCollection = {
      AdminId: uId,
      AdminCreateTime: serverTimestamp(),
      AdminInstituteName: '',
      AdminNameChangeTime: serverTimestamp(),
      AdminPhone: phoneNumber,
      AdminCountry: 'India',
      AdminCountryCode: '+91',
      AdminEmail: '',
      AdminFirstName: '',
      AdminLastName: '',
    };

    try {
      await runTransaction(db, async transaction => {
        const userDocRef = doc(db, CollectionName.admins, uId);

        const getUserDoc = await transaction.get(userDocRef);
        if (!getUserDoc.exists()) {
          transaction.set(userDocRef, newUserDoc);
        }

        const loggedInDocRef = doc(
          db,
          CollectionName.loggedInUsers,
          loggedInId,
        );

        transaction.set(loggedInDocRef, newLoggedInDoc);
      });

      const lsLoggedInUser: LocalStorageLoggedInUserData = {
        LoggedInId: loggedInId,
        LoggedInCrypt: loggedInCrypt,
        LoggedInAuthUserType: 'admin',
      };

      storage.setJson(LocalStorageKey.LOGGEDIN_USER, lsLoggedInUser);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const validateOtp = useCallback(async () => {
    if (!otp || otp.length < 6 || !final) return;
    try {
      const result = await final.confirm(otp);
      await otpSignInSuccess(result.user);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
    }
  }, [final, otp]);

  return (
    <form
      onSubmit={e => e.preventDefault()}
      className="flex flex-col gap-5 rounded-md bg-white bg-clip-padding p-5 opacity-50 shadow-md backdrop-blur-lg dark:bg-slate-800 lg:p-10"
    >
      <UserRadio value={userType} setValue={setUserType} />

      <div id="recaptcha-container"></div>
      <div></div>

      {userType === 'admin' ? (
        <div className="flex flex-col gap-4">
          <LoginAdmin
            otp={otp}
            phoneNumber={phoneNumber}
            setOtp={setOtp}
            setPhoneNumber={setPhoneNumber}
            showOtpInput={show}
          />
          <Button
            onClick={() => {
              if (show) {
                validateOtp();
              } else {
                sendOtp();
              }
            }}
            className="hover:bg-current/50 flex-1"
          >
            {show ? 'Login' : 'Send Otp'}
          </Button>
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
            <Button className="hover:bg-current/50 flex-1">Sign up</Button>
            <span className="my-2 text-center sm:mx-2">or</span>
            <Button className="hover:bg-current/90 flex-1 bg-black text-white">
              Continue with Google
            </Button>
          </div>
          <Link
            href={'/forgot-password'}
            className="text-gray-500 dark:text-gray-300"
          >
            Forgot Password?
          </Link>
          <div className="">
            {"Don't have an account? "}
            <Link href={'/register'} className="text-indigo-500">
              Register
            </Link>
          </div>
        </>
      )}
    </form>
  );
};

export default LoginForm;
