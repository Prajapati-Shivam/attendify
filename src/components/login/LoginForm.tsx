/* eslint-disable import/no-extraneous-dependencies */

'use client';

import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import Link from 'next/link';
import { useState } from 'react';
import { v4 } from 'uuid';

import type {
  IFacultiesCollection,
  ILoggedInUsersCollection,
  IStudentsCollection,
} from '@/@types/database';
import type { LocalStorageLoggedInUserData } from '@/@types/enum';
import { CollectionName, LocalStorageKey } from '@/@types/enum';
import { UserRadio } from '@/components/login/UserRadio';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ConstRegex } from '@/constants/ConstRegex';
import { db } from '@/firebase_configs/config';
import DbFaculty from '@/firebase_configs/DB/DbFaculty';
import DbStudent from '@/firebase_configs/DB/DbStudent';
import { getNewDocId } from '@/firebase_configs/DB/utils';
import CustomError, { errorHandler } from '@/lib/CustomError';
import * as storage from '@/lib/Storage';
import { useSessionStore } from '@/store';

import LoaderDialog from '../common/dialogs/LoaderDialog';
import LoginFormAdmin from './login_forms/LoginFormAdmin';

const LoginForm = () => {
  const { setAuthUser } = useSessionStore();

  const [userType, setUserType] = useState<'admin' | 'faculty' | 'student'>(
    'admin',
  );

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  const onLoginForStudentAndFaculty = async () => {
    if (userType === 'admin') return;

    try {
      const emailRegex = new RegExp(ConstRegex.EMAIL_OPTIONAL);

      if (email.length === 0 || !emailRegex.test(email)) {
        throw new CustomError('Please enter a valid email');
      }
      if (password.length < 6) {
        throw new CustomError('Password must be at least 6 character');
      }

      setLoading(true);

      if (userType === 'student') {
        const studentSnapshot = await DbStudent.getStudentFromCred(
          email,
          password,
        );

        if (studentSnapshot.size === 0) {
          throw new CustomError('Invalid credentials');
        }

        const studentData =
          studentSnapshot?.docs[0]?.data() as IStudentsCollection;

        const { StudentId } = studentData;

        const loggedInId = getNewDocId(CollectionName.loggedInUsers);

        const randNum = Date.now();
        const randomChar = v4();
        const loggedInCrypt = randNum + randomChar + StudentId;

        const newLoggedInDoc: ILoggedInUsersCollection = {
          LoggedInId: loggedInId,
          LoggedInUserId: StudentId,
          IsLoggedIn: true,
          LoggedInCreatedAt: serverTimestamp(),
          LoggedInCrypt: loggedInCrypt,
          LoggedInUserType: 'student',
        };

        const loggedInDocRef = doc(
          db,
          CollectionName.loggedInUsers,
          loggedInId,
        );

        await setDoc(loggedInDocRef, newLoggedInDoc);

        const lsLoggedInUser: LocalStorageLoggedInUserData = {
          LoggedInId: loggedInId,
          LoggedInCrypt: loggedInCrypt,
          LoggedInAuthUserType: 'student',
        };

        storage.setJson(LocalStorageKey.LOGGEDIN_USER, lsLoggedInUser);

        setAuthUser({
          AuthUserAuthenticated: true,
          AuthUserId: StudentId,
          AuthUserRole: 'student',
        });

        window.location.reload();
      } else {
        const facultySnapshot = await DbFaculty.getFacultyFromCred(
          email,
          password,
        );

        if (facultySnapshot.size === 0) {
          throw new CustomError('Invalid credentials');
        }

        const facultyData =
          facultySnapshot?.docs[0]?.data() as IFacultiesCollection;

        const { FacultyId } = facultyData;

        const loggedInId = getNewDocId(CollectionName.loggedInUsers);

        const randNum = Date.now();
        const randomChar = v4();
        const loggedInCrypt = randNum + randomChar + FacultyId;

        const newLoggedInDoc: ILoggedInUsersCollection = {
          LoggedInId: loggedInId,
          LoggedInUserId: FacultyId,
          IsLoggedIn: true,
          LoggedInCreatedAt: serverTimestamp(),
          LoggedInCrypt: loggedInCrypt,
          LoggedInUserType: 'faculty',
        };

        const loggedInDocRef = doc(
          db,
          CollectionName.loggedInUsers,
          loggedInId,
        );

        await setDoc(loggedInDocRef, newLoggedInDoc);

        const lsLoggedInUser: LocalStorageLoggedInUserData = {
          LoggedInId: loggedInId,
          LoggedInCrypt: loggedInCrypt,
          LoggedInAuthUserType: 'faculty',
        };

        storage.setJson(LocalStorageKey.LOGGEDIN_USER, lsLoggedInUser);

        setAuthUser({
          AuthUserAuthenticated: true,
          AuthUserId: FacultyId,
          AuthUserRole: 'faculty',
        });

        window.location.reload();
      }

      setLoading(false);
    } catch (error) {
      errorHandler(error);
      console.log(error);
      setLoading(false);
    }
  };

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
              <Input
                type="email"
                name="email"
                id="email"
                className="mt-2"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
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
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:flex-row">
              <Button
                onClick={onLoginForStudentAndFaculty}
                className="flex-1 hover:bg-blueButtonHoverBg"
              >
                Sign in
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

        <LoaderDialog loading={loading} title="Please wait..." />
      </div>
    </>
  );
};

export default LoginForm;
