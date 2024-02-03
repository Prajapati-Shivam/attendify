// Footer.js
import React from "react";
import { FaHeart } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="flex items-center justify-center w-full">
        <div className="flex text-center gap-2 items-center text-sm sm:text-base">
          Made with{" "}
          <span>
            {" "}
            <FaHeart className="text-red-500" />
          </span>{" "}
          <span>by Attendify team. &copy; All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
