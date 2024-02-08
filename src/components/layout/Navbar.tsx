"use client"
import { Bell, MessageSquare } from 'lucide-react';
import React from 'react';

import { ToggleMode } from '../ToggleMode';
import { UserAvatar } from '../UserAvatar';
import { useSessionStore } from '@/store';

const Navbar = () => {
  const { authUser } = useSessionStore();
  return (
    <div className="sticky top-0 z-50 flex h-[60px] w-full items-center justify-between bg-white px-5 py-2 shadow-md dark:bg-gray-950 sm:px-12 lg:px-20">
      <div className="text-2xl font-bold leading-relaxed">Attendify</div>
      <div className="flex items-center gap-x-3 sm:gap-x-5">
        <ToggleMode />
        {authUser.AuthUserAuthenticated && (
          <div className="flex items-center gap-x-3 sm:gap-x-5">
            <div className="cursor-pointer">
              <Bell />
            </div>
            <div className="cursor-pointer">
              <MessageSquare />
            </div>
            <div className="flex items-center gap-2">
              <UserAvatar />
              <span className="hidden sm:block">{'Username'}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
