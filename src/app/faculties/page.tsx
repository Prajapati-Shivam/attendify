import Link from 'next/link';
import React from 'react';

import PageContainer from '@/components/common/Containers/PageContainer';
import PageHeader from '@/components/common/Containers/PageHeader';
import { FacultyList } from '@/components/faculties/FacultyList';
import { Button } from '@/components/ui/button';

const Faculties = () => {
  return (
    <PageContainer>
      <PageHeader>Faculties</PageHeader>
      <Button className="mr-4 mt-5 hover:bg-blueButtonHoverBg dark:hover:bg-blueButtonHoverBg">
        <Link href={'/faculties/create_faculty'}>Create Faculty</Link>
      </Button>
      <div className="mt-10 bg-white p-4 dark:bg-surfaceDark">
        <FacultyList />
      </div>
    </PageContainer>
  );
};

export default Faculties;
