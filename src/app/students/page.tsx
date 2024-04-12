import Link from 'next/link';
import React from 'react';

import PageContainer from '@/components/common/Containers/PageContainer';
import { Button } from '@/components/ui/button';

const page = () => {
  return (
    <PageContainer>
      <h2 className="text-2xl font-semibold text-indigo-500">Students</h2>
      {/* <CreateClass /> */}
      <Button className="mt-5 hover:bg-blueButtonHoverBg dark:hover:bg-blueButtonHoverBg">
        <Link href={'/students/create_student'}>Create Student</Link>
      </Button>
      <div className="mt-10 bg-white p-4 dark:bg-gray-800">No</div>
    </PageContainer>
  );
};

export default page;
