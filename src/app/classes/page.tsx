'use client';

import Link from 'next/link';

import { ClassroomDataTable } from '@/components/classroom/ClassroomDataTable';
import { Button } from '@/components/ui/button';

const Classroom = () => {
  return (
    <div className="h-max">
      <div className="px-5 py-8 sm:px-12 lg:px-20">
        <h2 className="text-2xl font-semibold text-indigo-500">Classroom</h2>
        <Button className="mt-5 hover:bg-blueButtonHoverBg dark:hover:bg-blueButtonHoverBg">
          <Link href={'/classes/create_class'}>Create Classroom</Link>
        </Button>
        <Button className="mt-5 hover:bg-blueButtonHoverBg dark:hover:bg-blueButtonHoverBg">
          <Link href={'/classes/create_batch'}>Create Batch</Link>
        </Button>
        <div className="mt-10 bg-white p-4 dark:bg-gray-800">
          <ClassroomDataTable />
        </div>
      </div>
    </div>
  );
};

export default Classroom;
