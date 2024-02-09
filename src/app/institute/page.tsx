import React from 'react';

import { InstituteForm } from '@/components/institute/InstituteForm';

const Institute = () => {
  return (
    <div className="h-max">
      <div className="px-5 py-8 sm:px-12 lg:px-20">
        <h2 className="text-2xl font-semibold text-indigo-500">Institute</h2>
        <InstituteForm />
      </div>
    </div>
  );
};

export default Institute;
