'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

import type { LocalStorageLoggedInUserData } from '@/@types/enum';
import { LocalStorageKey } from '@/@types/enum';
import * as storage from '@/lib/Storage';
import { useSessionStore } from '@/store';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { setAuthUser } = useSessionStore();

  const router = useRouter();

  const fetchAuthUserData = async () => {
    const LocalUserLoggedInData: LocalStorageLoggedInUserData | null =
      storage.getJson<LocalStorageLoggedInUserData>(
        LocalStorageKey.LOGGEDIN_USER,
      );

    try {
      console.log(LocalUserLoggedInData, 'here is data');
      if (LocalUserLoggedInData) {
        console.log('dispatching');
        const { LoggedInAuthUserType } = LocalUserLoggedInData;
        setAuthUser({
          AuthUserAuthenticated: true,
          AuthUserRole: LoggedInAuthUserType,
        });
        router.push('/');
      } else {
        console.log('Local storage not found');
        router.push('/login');
      }
    } catch (error) {
      console.log(error, 'error');
      router.push('/login');
    }
  };

  useEffect(() => {
    fetchAuthUserData();
  }, []);

  return <>{children}</>;
};

export default AuthProvider;
