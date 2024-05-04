import Link from 'next/link';
import React from 'react';

import PageContainer from '@/components/common/Containers/PageContainer';
import PageHeader from '@/components/common/Containers/PageHeader';
import { StudentList } from '@/components/students/StudentList';
import { Button } from '@/components/ui/button';

const page = () => {
  return (
    <PageContainer>
      <PageHeader>Students</PageHeader>
      <Link href={'/students/create_student'}>
        <Button className="mt-5 hover:bg-blueButtonHoverBg dark:hover:bg-blueButtonHoverBg">
          Create Student
        </Button>
      </Link>
      <div className="mt-10 bg-white p-4 dark:bg-surfaceDark">
        <StudentList />
      </div>
    </PageContainer>
  );
};

export default page;
