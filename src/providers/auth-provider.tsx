/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */

'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useEffect } from 'react';

import type {
  IAdminsCollection,
  IInstitutesCollection,
  ILoggedInUsersCollection,
} from '@/@types/database';
import type { LocalStorageLoggedInUserData } from '@/@types/enum';
import { LocalStorageKey } from '@/@types/enum';
import SplashScreen from '@/components/splash_screen/SplashScreen';
import Snackbar from '@/components/ui/snackbar';
import DbUser from '@/firebase_configs/DB/DbUser';
import { firebaseDataToObject } from '@/lib/misc';
import * as storage from '@/lib/Storage';
import { useSessionStore, useUIStore } from '@/store';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        gcTime: Number.POSITIVE_INFINITY,
      },
    },
  });

  const { setAuthUser, setIsLoading, isLoading, setAdmin, setInstitute } =
    useSessionStore();

  const { snackbar } = useUIStore();

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

        const loggedInUserData = loggedInUserDoc.docs[0]?.data();

        if (!loggedInUserData) {
          console.log('loggedInUserDoc not found -> signing out');
          setAuthUser({
            AuthUserAuthenticated: false,
            AuthUserId: '',
            AuthUserRole: 'admin',
          });
          setIsLoading(false);
          return;
        }

        const _loggedInUser = firebaseDataToObject(
          loggedInUserData,
        ) as unknown as ILoggedInUsersCollection;

        setAuthUser({
          AuthUserAuthenticated: _loggedInUser.IsLoggedIn,
          AuthUserRole: _loggedInUser.LoggedInUserType,
          AuthUserId: _loggedInUser.LoggedInUserId,
        });

        // Fetch admin data and store in zustand
        const adminSnapshot = await DbUser.getAdminById(
          _loggedInUser.LoggedInUserId,
        );

        const adminData = adminSnapshot.data();
        if (adminData) {
          const _adminData = firebaseDataToObject(
            adminData,
          ) as unknown as IAdminsCollection;
          setAdmin(_adminData);
        }

        // Fetch institute data and store in zustand
        const instituteSnapshot = await DbUser.getAdminInstitute(
          _loggedInUser.LoggedInUserId,
        );

        const instituteData = instituteSnapshot.docs[0]?.data();
        if (instituteData) {
          const _instituteData = firebaseDataToObject(
            instituteData,
          ) as unknown as IInstitutesCollection;
          setInstitute(_instituteData);
        }

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
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAuthUserData();
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {snackbar.open && <Snackbar />}
    </QueryClientProvider>
  );
};

export default AuthProvider;
