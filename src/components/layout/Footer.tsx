import { Heart } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import { ConstAppDetails } from '@/constants/ConstAppDetails';

import { Button } from '../ui/button';
import { Input } from '../ui/input';

const Footer = () => {
  return (
    <footer className="bg-gray-200 shadow-2xl dark:bg-surfaceDark">
      <svg
        className="relative top-0 block h-8 w-full bg-transparent"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 100"
        preserveAspectRatio="none"
      >
        <path
          className="fill-primaryVariantLight dark:fill-primaryVariantDark"
          d="M851.8,100c125,0,288.3-45,348.2-64V0H0v44c3.7-1,7.3-1.9,11-2.9C80.7,22,151.7,10.8,223.5,6.3C276.7,2.9,330,4,383,9.8 c52.2,5.7,103.3,16.2,153.4,32.8C623.9,71.3,726.8,100,851.8,100z"
        />
      </svg>
      <div className="mx-auto flex flex-col flex-wrap gap-y-8 px-5 pb-10 pt-20 sm:px-12 md:flex-row md:flex-nowrap md:items-center md:gap-y-0 lg:items-start lg:px-20">
        <div className="mx-auto mt-10 w-64 shrink-0 text-center md:mx-0 md:mt-0 md:text-left">
          <Image
            src="/assets/images/logo.png"
            alt={ConstAppDetails.APP_NAME}
            width={250}
            height={250}
          />
          <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
            {ConstAppDetails.APP_SHORT_DESCRIPTION}
          </p>
        </div>
        <div className="order-first -mb-10 flex grow flex-wrap text-center md:text-left">
          <div className="flex w-full flex-col">
            <h2 className="mb-3 text-sm font-medium tracking-widest">
              FEEDBACK
            </h2>
            <div className="flex flex-wrap items-end justify-center md:flex-nowrap md:justify-start lg:flex-wrap xl:flex-nowrap">
              <div className="relative mr-2 w-40 sm:mr-4 sm:w-auto lg:mr-0 xl:mr-4">
                <Input
                  id="footer"
                  type="text"
                  placeholder="Enter your email"
                  className="mt-1 w-full"
                />
              </div>
              <Button className="hover:bg-blueButtonHoverBg">Contact</Button>
            </div>
            <p className="mt-2 text-center text-sm text-gray-800 dark:text-gray-400 md:text-left">
              Let us know your feedback and suggestions.
              <br className="hidden lg:block" />
              To improve our services.
            </p>
          </div>
        </div>
      </div>
      <div className="bg-gray-200 dark:bg-surfaceDark/75">
        <div className="mx-auto flex flex-col flex-wrap justify-center px-5 py-4 sm:flex-row sm:px-12 md:justify-start lg:px-20">
          <p className="flex flex-col items-center gap-2 text-center text-base text-gray-500 dark:text-gray-400 sm:flex-row md:text-left">
            <span>Made with</span>
            <span className="text-red-500">
              <Heart fill="#ef4444" size={16} />
            </span>
            <span>
              by {ConstAppDetails.APP_NAME} team. &copy; All rights reserved.
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
