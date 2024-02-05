'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import LoginForm from '@/components/login/LoginForm';
import { useSessionStore } from '@/store';

const LoginPage = () => {
  const { authUser, isLoading } = useSessionStore();

  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (
      authUser &&
      authUser.AuthUserId &&
      authUser.AuthUserAuthenticated &&
      authUser.AuthUserRole
    ) {
      router.push('/');
    }
  }, [authUser, isLoading]);

  return (
    <div className="flex flex-col items-center justify-between gap-y-5 p-8 md:flex-row md:p-12 lg:p-20">
      <div
        className="sm:-top-100 absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div className="flex flex-1 flex-col gap-10 pr-0 sm:pr-5">
        <div className="text-4xl font-bold sm:text-6xl">
          <h1 className="text-black dark:text-white">Attendance</h1>
          <h2 className="text-3xl text-sky-900 dark:text-sky-200 sm:text-5xl">
            For your business
          </h2>
        </div>
        <p className="text-base font-normal leading-normal text-slate-500 dark:text-gray-300">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet,
          itaque accusantium odio, soluta, corrupti aliquam quibusdam tempora at
          cupiditate quis eum maiores libero veritatis? Dicta facilis sint
          aliquid ipsum atque?
        </p>
      </div>

      {/* Form container gray-800 */}
      <div className="w-full flex-1">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
