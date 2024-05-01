'use client';

import React from 'react';

import Institute from '@/app/institute/page';
import LoginPage from '@/app/login/page';
import { useSessionStore } from '@/store';

const ProtectedPage = ({ children }: { children: React.ReactNode }) => {
  const { authUser, institute } = useSessionStore();

  if (
    !authUser ||
    !authUser.AuthUserAuthenticated ||
    !authUser.AuthUserId ||
    !authUser.AuthUserRole
  ) {
    return <LoginPage />;
  }

  if (
    authUser.AuthUserAuthenticated &&
    authUser.AuthUserRole === 'admin' &&
    !institute
  ) {
    return <Institute />;
  }

  return <>{children}</>;
};

export default ProtectedPage;
