import React from "react";
import { ToggleMode } from "./ToggleMode";
import { Bell, MessageSquare } from "lucide-react";
import { UserAvatar } from "./UserAvatar";
type Props = {};

const Navbar = (props: Props) => {
  const session = true;
  return (
    <div className="w-full h-[60px] px-5 sm:px-12 lg:px-20 py-2 shadow-md z-50 justify-between items-center flex bg-white dark:bg-gray-950">
      <div className="font-bold leading-relaxed text-2xl">Attendify</div>
      <div className="flex items-center gap-x-3 sm:gap-x-5">
        <ToggleMode />
        {session && (
          <div className="flex items-center gap-x-3 sm:gap-x-5">
            <div className="cursor-pointer">
              <Bell />
            </div>
            <div className="cursor-pointer">
              <MessageSquare />
            </div>
            <div className="flex gap-2 items-center">
              <UserAvatar />
              <span className="hidden sm:block">{"Username"}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
