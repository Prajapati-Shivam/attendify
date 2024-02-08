import React from 'react';

const SplashScreen = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-surfaceLight dark:bg-surfaceDark">
      <img src="/assets/images/logo.jpeg" alt="" className="animate-bounce" />
    </div>
  );
};

export default SplashScreen;
