import React from "react";
import { ToggleMode } from "./ToggleMode";
type Props = {};

const Navbar = (props: Props) => {
  const session = true;
  return (
    <div className="w-full h-[60px] px-5 sm:px-10 py-2 shadow justify-between items-center flex bg-white dark:bg-gray-950">
      <div className="font-bold leading-relaxed text-2xl">Attendify</div>
      <div className="flex items-center gap-x-2">
        {session && <div className="">links if session</div>}
        <ToggleMode />
      </div>
    </div>
  );
};

export default Navbar;
