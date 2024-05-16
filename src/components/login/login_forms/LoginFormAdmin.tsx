/* eslint-disable @typescript-eslint/no-shadow */

'use client';

import { FirebaseError } from 'firebase/app';
import type { ConfirmationResult, User } from 'firebase/auth';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { doc, runTransaction, serverTimestamp } from 'firebase/firestore';
import React, { useCallback, useEffect, useState } from 'react';
import { v4 } from 'uuid';

import type {
  IAdminsCollection,
  ILoggedInUsersCollection,
} from '@/@types/database';
import type { LocalStorageLoggedInUserData } from '@/@types/enum';
import { CollectionName, LocalStorageKey } from '@/@types/enum';
import LoaderDialog from '@/components/common/dialogs/LoaderDialog';
import InputOtp from '@/components/common/inputs/InputOtp';
import { Button } from '@/components/ui/button';
import { auth, db } from '@/firebase_configs/config';
import { getNewDocId } from '@/firebase_configs/DB/utils';
import * as storage from '@/lib/Storage';
import { showSnackbar } from '@/lib/TsxUtils';
import { useSessionStore } from '@/store';

import InputWithTopHeader from '../../common/inputs/InputWithTopHeader';

const LoginFormAdmin = () => {
  const { setAuthUser } = useSessionStore();

  const [error, setError] = useState('');

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

  const [loading, setLoading] = useState(false);

  const [isSendOtpDisabled, setIsSendOtpDisabled] = useState(false);
  const [isResendOtpDisabled, setIsResendOtpDisabled] = useState(false);

  const sendOtp = () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      setError('Invalid phone number');
      return;
    }
    if (!recaptchaVerifierData) return;

    setIsSendOtpDisabled(true);

    setLoading(true);
    signInWithPhoneNumber(auth, `+91${phoneNumber}`, recaptchaVerifierData)
      .then(result => {
        setFinal(result);
        setShow(true);
        setIsSendOtpDisabled(false);
        setLoading(false);
        showSnackbar({
          message: 'OTP sent successfully',
          type: 'success',
        });
      })

      .catch(error => {
        // eslint-disable-next-line no-console
        console.log(error);
        if (
          error instanceof FirebaseError &&
          error.code === 'auth/too-many-requests'
        ) {
          showSnackbar({
            message: 'Your quota exceeded, please try after sometime',
            type: 'error',
          });
        } else {
          showSnackbar({
            message: 'Something went wrong',
            type: 'error',
          });
        }
        setIsSendOtpDisabled(false);
      });
  };

  const resendOTP = () => {
    if (phoneNumber === '' || !recaptchaVerifierData) return;

    try {
      setIsResendOtpDisabled(true);

      setLoading(true);
      signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifierData)
        .then(result => {
          setFinal(result);
          setShow(true);
          setIsResendOtpDisabled(false);
        })
        .catch(error => {
          console.log(error);
          if (
            error instanceof FirebaseError &&
            error.code === 'auth/too-many-requests'
          ) {
            showSnackbar({
              message: 'Your quota exceeded, please try after sometime',
              type: 'error',
            });
          } else {
            showSnackbar({
              message: 'Something wnet wrong',
              type: 'error',
            });
          }
          setLoading(false);
          recaptchaVerifierData.clear();
          setIsResendOtpDisabled(false);
        });

      setIsResendOtpDisabled(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      showSnackbar({
        message: 'Something wnet wrong',
        type: 'error',
      });
      recaptchaVerifierData?.clear();
      setIsResendOtpDisabled(false);
      setLoading(false);
    }
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
      AdminNameChangeTime: serverTimestamp(),
      AdminPhone: userPhone,
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

      setAuthUser({
        AuthUserAuthenticated: true,
        AuthUserId: uId,
        AuthUserRole: 'admin',
      });

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const validateOtp = useCallback(async () => {
    if (!otp || otp.length < 6 || !final) return;
    try {
      setLoading(true);
      const result = await final.confirm(otp);
      await otpSignInSuccess(result.user);

      setLoading(false);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.log(error);
      setLoading(false);
      if (error.response && error.response.status === 404) {
        showSnackbar({
          message: 'Wrong OTP',
          type: 'error',
        });
      } else if (error.response && error.response.status === 403) {
        showSnackbar({
          message: 'Otp expired',
          type: 'error',
        });
      } else {
        showSnackbar({
          message: 'Wrong OTP',
          type: 'error',
        });
      }
    }
  }, [final, otp]);

  return (
    <div className="flex w-full flex-col items-center gap-8">
      <div className="size-full" id="recaptcha-container"></div>
      {!show ? (
        <div className="flex w-full flex-col gap-1">
          <InputWithTopHeader
            label="Phone number"
            leadingIcon={<div>+91</div>}
            value={phoneNumber}
            onChange={e => setPhoneNumber(e.target.value)}
            inputMaxLength={10}
            errors={error}
          />
        </div>
      ) : (
        <div className="flex w-full">
          <InputOtp
            setShow={setShow}
            isResendOtpDisabled={isResendOtpDisabled}
            resendOtp={resendOTP}
            setOtp={setOtp}
            title={`Enter the six digit code we sent to ${phoneNumber}`}
          />
        </div>
      )}
      <Button
        disabled={isSendOtpDisabled}
        onClick={() => {
          if (show) {
            validateOtp();
          } else {
            sendOtp();
          }
        }}
        className="w-full bg-secondaryLight hover:bg-blueButtonHoverBg active:bg-blueButtonActiveBg"
      >
        {show ? 'Login' : 'Send OTP'}
      </Button>

      <LoaderDialog loading={loading} title="Please wait..." />
    </div>
  );
};

export default LoginFormAdmin;
