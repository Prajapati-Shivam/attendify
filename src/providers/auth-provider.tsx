/* eslint-disable no-underscore-dangle */

'use client';

import React, { useEffect } from 'react';

import type { ILoggedInUsersCollection } from '@/@types/database';
import type { LocalStorageLoggedInUserData } from '@/@types/enum';
import { LocalStorageKey } from '@/@types/enum';
import DbUser from '@/firebase_configs/DB/DbUser';
import { firebaseDataToObject } from '@/lib/misc';
import * as storage from '@/lib/Storage';
import { useSessionStore } from '@/store';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { setAuthUser, setIsLoading } = useSessionStore();

  const fetchAuthUserData = async () => {
    const LocalUserLoggedInData: LocalStorageLoggedInUserData | null =
      storage.getJson<LocalStorageLoggedInUserData>(
        LocalStorageKey.LOGGEDIN_USER,
      );

    try {
      if (LocalUserLoggedInData) {
        const { LoggedInAuthUserType, LoggedInCrypt, LoggedInId } =
          LocalUserLoggedInData;

        if (!LoggedInAuthUserType || !LoggedInCrypt || !LoggedInId) {
          console.log('Local storage not found');
          setAuthUser({
            AuthUserAuthenticated: false,
            AuthUserId: '',
            AuthUserRole: 'admin',
          });
          setIsLoading(false);
          return;
        }

        const loggedInUserDoc = await DbUser.getUserLoggedInData(
          LoggedInId,
          LoggedInCrypt,
          true,
          LoggedInAuthUserType,
        );

        if (!loggedInUserDoc) {
          console.log('loggedInUserDoc not found -> signing out');
          setAuthUser({
            AuthUserAuthenticated: false,
            AuthUserId: '',
            AuthUserRole: 'admin',
          });
          setIsLoading(false);
          return;
        }

        const loggedInUserData = loggedInUserDoc.docs[0].data();

        // eslint-disable-next-line @typescript-eslint/naming-convention
        const _loggedInUser = firebaseDataToObject(
          loggedInUserData,
        ) as unknown as ILoggedInUsersCollection;

        setAuthUser({
          AuthUserAuthenticated: _loggedInUser.IsLoggedIn,
          AuthUserRole: _loggedInUser.LoggedInUserType,
          AuthUserId: _loggedInUser.LoggedInUserId,
        });
        setIsLoading(false);
      } else {
        console.log('Local storage not found');
        setAuthUser({
          AuthUserAuthenticated: false,
          AuthUserId: '',
          AuthUserRole: 'admin',
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error, 'error');
      setAuthUser({
        AuthUserAuthenticated: false,
        AuthUserId: '',
        AuthUserRole: 'admin',
      });
    }
  };

  useEffect(() => {
    fetchAuthUserData();
  }, []);

  return <>{children}</>;
};

export default AuthProvider;
