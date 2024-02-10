import React from 'react';

const SplashScreen = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-surfaceLight dark:bg-surfaceDark">
      <img
        src="/assets/images/logo.png"
        alt=""
        className="animate-bounce"
        style={{ width: '400px' }}
      />
    </div>
  );
};

export default SplashScreen;
