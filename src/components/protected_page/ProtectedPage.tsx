'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

import { useSessionStore } from '@/store';

const ProtectedPage = ({ children }: { children: React.ReactNode }) => {
  const { authUser, isLoading, institute } = useSessionStore();

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

    if (authUser.AuthUserAuthenticated && authUser.AuthUserRole === "admin" && !institute) {
      router.push('/institute');
    }
  }, [isLoading, authUser]);

  return <>{children}</>;
};

export default ProtectedPage;
