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
      <Link href={'/classes/create_class'}>
        <Button className="mr-4 mt-5 hover:bg-blueButtonHoverBg dark:hover:bg-blueButtonHoverBg">
          Create Classroom
        </Button>
      </Link>
      {/* <Link href={'/classes/create_batch'}>
        <Button className="mt-5 hover:bg-blueButtonHoverBg dark:hover:bg-blueButtonHoverBg">
          Create Batch
        </Button>
      </Link> */}
      <div className="mt-10 bg-white p-4 dark:bg-gray-800">
        <ClassroomDataTable />
      </div>
    </PageContainer>
  );
};

export default Classroom;
