'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import Institute from '@/app/institute/page';
import LoginPage from '@/app/login/page';
import { useSessionStore } from '@/store';

const ProtectedPage = ({ children }: { children: React.ReactNode }) => {
  const { authUser, institute } = useSessionStore();
  const navigate = useRouter();
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
  if (authUser.AuthUserAuthenticated && authUser.AuthUserRole === 'student') {
    navigate.push('/student_portal');
  }

  return <>{children}</>;
};

export default ProtectedPage;
