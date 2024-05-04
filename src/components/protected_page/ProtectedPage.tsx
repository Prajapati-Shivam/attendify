'use client';

import { useRouter } from 'next/router';
import React from 'react';

import Institute from '@/app/institute/page';
import LoginPage from '@/app/login/page';
import Dashboard from '@/app/page';
import { useSessionStore } from '@/store';

const ProtectedPage = ({ children }: { children: React.ReactNode }) => {
  const { authUser, institute } = useSessionStore();

  const router = useRouter();

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

  if (
    !router.pathname.includes('student_portal') &&
    authUser.AuthUserAuthenticated &&
    authUser.AuthUserRole === 'student'
  ) {
    return <Dashboard />;
  }

  return <>{children}</>;
};

export default ProtectedPage;
