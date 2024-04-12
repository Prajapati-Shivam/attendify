'use client';

import Link from 'next/link';

import { ClassroomDataTable } from '@/components/classroom/ClassroomDataTable';
import PageContainer from '@/components/common/Containers/PageContainer';
import PageHeader from '@/components/common/Containers/PageHeader';
import { Button } from '@/components/ui/button';

const Classroom = () => {
  return (
    <PageContainer>
      <PageHeader>Classroom</PageHeader>
      <Button className="mr-4 mt-5 hover:bg-blueButtonHoverBg dark:hover:bg-blueButtonHoverBg">
        <Link href={'/classes/create_class'}>Create Classroom</Link>
      </Button>
      <Button className="mt-5 hover:bg-blueButtonHoverBg dark:hover:bg-blueButtonHoverBg">
        <Link href={'/classes/create_batch'}>Create Batch</Link>
      </Button>
      <div className="mt-10 bg-white p-4 dark:bg-gray-800">
        <ClassroomDataTable />
      </div>
    </PageContainer>
  );
};

export default Classroom;
