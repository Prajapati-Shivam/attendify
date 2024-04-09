import Link from 'next/link';
import React from 'react';

import { Button } from '@/components/ui/button';

const page = () => {
  return (
    <div className="h-max">
      <div className="px-5 py-8 sm:px-12 lg:px-20">
        <h2 className="text-2xl font-semibold text-indigo-500">Students</h2>
        {/* <CreateClass /> */}
        <Button className="mt-5 hover:bg-blueButtonHoverBg dark:hover:bg-blueButtonHoverBg">
          <Link href={'/students/create_student'}>Create Student</Link>
        </Button>
        <div className="mt-10 bg-white p-4 dark:bg-gray-800">No</div>
      </div>
    </div>
  );
};

export default page;
