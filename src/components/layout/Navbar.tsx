'use client';

import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { ConstAppDetails } from '@/constants/ConstAppDetails';
import { useSessionStore } from '@/store';

import ConfirmDialog from '../common/dialogs/ConfirmDialog';
import { ToggleMode } from '../ToggleMode';
import { UserAvatar } from '../UserAvatar';

const Navbar = () => {
  const { authUser, institute, userSignOut } = useSessionStore();
  const router = useRouter();

  const [logoutConfirmModal, setLogoutConfirmModal] = useState(false);
  return (
    <div className="sticky top-0 z-50 flex h-[60px] w-full items-center justify-between bg-white px-5 py-2 shadow-md dark:bg-gray-950 sm:px-12 lg:px-20">
      <div
        className={`${authUser.AuthUserAuthenticated ? 'ml-8' : 'ml-0'} text-2xl font-bold leading-relaxed sm:ml-0`}
      >
        {ConstAppDetails.APP_NAME}
      </div>
      <div className="flex items-center gap-x-3 sm:gap-x-5">
        {authUser.AuthUserAuthenticated && (
          <LogOut
            className="cursor-pointer"
            onClick={() => setLogoutConfirmModal(true)}
          />
        )}
        <ToggleMode />
        {((authUser.AuthUserAuthenticated &&
          authUser.AuthUserRole === 'admin' &&
          institute) ||
          (authUser.AuthUserAuthenticated &&
            authUser.AuthUserRole !== 'admin')) && (
          <div className="flex items-center gap-x-3 sm:gap-x-5">
            <div className="flex items-center gap-2">
              <UserAvatar user={authUser.AuthUserRole} />
              <span className="hidden sm:block">
                Welcome{' '}
                <span className="capitalize">{authUser.AuthUserRole}</span>
              </span>
            </div>
          </div>
        )}
        <ConfirmDialog
          positiveCallback={() => {
            userSignOut();
            router.push('/login');
          }}
          open={logoutConfirmModal}
          setOpened={setLogoutConfirmModal}
        >
          <div>Are you sure to logout?</div>
        </ConfirmDialog>
      </div>
    </div>
  );
};

export default Navbar;
