'use client';

import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

import Institute from '@/app/institute/page';
import LoginPage from '@/app/login/page';
import { useSessionStore } from '@/store';

import Navbar from '../layout/Navbar';

const ProtectedPage = ({ children }: { children: React.ReactNode }) => {
  const { authUser, institute } = useSessionStore();

  const pathname = usePathname();

  const router = useRouter();

  if (
    !authUser ||
    !authUser.AuthUserAuthenticated ||
    !authUser.AuthUserId ||
    !authUser.AuthUserRole
  ) {
    router.push('/login');
    return (
      <>
        <Navbar /> <LoginPage />
      </>
    );
  }

  if (
    authUser.AuthUserAuthenticated &&
    authUser.AuthUserRole === 'admin' &&
    !institute
  ) {
    router.push('/institute');
    return (
      <>
        <Navbar />
        <Institute />
      </>
    );
  }

  if (
    !pathname.includes('student_portal') &&
    authUser.AuthUserAuthenticated &&
    authUser.AuthUserRole === 'student'
  ) {
    router.push('/student_portal');
    return <></>;
  }

  if (
    !pathname.includes('faculty_portal') &&
    authUser.AuthUserAuthenticated &&
    authUser.AuthUserRole === 'faculty'
  ) {
    router.push('/faculty_portal');
    return <></>;
  }

  return <>{children}</>;
};

export default ProtectedPage;
