// Footer.js
import React from 'react';
import { FaHeart } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 py-4 text-white">
      <div className="flex w-full items-center justify-center">
        <div className="flex items-center gap-2 text-center text-sm sm:text-base">
          Made with{' '}
          <span>
            {' '}
            <FaHeart className="text-red-500" />
          </span>{' '}
          <span>by Attendify team. &copy; All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
