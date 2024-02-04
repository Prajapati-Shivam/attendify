'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

import { useSessionStore } from '@/store';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { authUser } = useSessionStore();

  const router = useRouter();

  useEffect(() => {
    console.log('reloading');

    if (!authUser.AuthUserAuthenticated) {
      router.push('/login');
    } else {
      router.push('/');
    }
  }, []);

  return <>{children}</>;
};

export default AuthProvider;
