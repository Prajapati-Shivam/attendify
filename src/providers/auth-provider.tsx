'use client';

import React, { useEffect } from 'react';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // const { setAuthUser } = useSessionStore();

  useEffect(() => {
    console.log('reloading');
    // setAuthUser({ AuthUserRole: 'admin', AuthUserAuthenticated: false });
  }, []);

  return <>{children}</>;
};

export default AuthProvider;
