'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

import { useSessionStore } from '@/store';

const ProtectedPage = ({ children }: { children: React.ReactNode }) => {
  const { authUser, isLoading } = useSessionStore();

  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (
      !authUser ||
      !authUser.AuthUserAuthenticated ||
      !authUser.AuthUserId ||
      !authUser.AuthUserRole
    ) {
      router.push('/login');
    }
  }, []);

  return <>{children}</>;
};

export default ProtectedPage;
