import Link from 'next/link';
import React from 'react';

import PageContainer from '@/components/common/Containers/PageContainer';
import PageHeader from '@/components/common/Containers/PageHeader';
import { Button } from '@/components/ui/button';

const page = () => {
  return (
    <PageContainer>
      <PageHeader>Students</PageHeader>
      <Button className="mt-5 hover:bg-blueButtonHoverBg dark:hover:bg-blueButtonHoverBg">
        <Link href={'/students/create_student'}>Create Student</Link>
      </Button>
      <div className="mt-10 bg-white p-4 dark:bg-gray-800">No</div>
    </PageContainer>
  );
};

export default page;
