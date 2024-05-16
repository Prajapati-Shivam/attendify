import Link from 'next/link';
import React from 'react';

import PageContainer from '@/components/common/Containers/PageContainer';
import PageHeader from '@/components/common/Containers/PageHeader';
import { SessionList } from '@/components/sessions/SessionList';
import { Button } from '@/components/ui/button';

const FacultyPortal = () => {
  return (
    <PageContainer>
      <PageHeader>Sessions</PageHeader>
      <Link href={'/sessions/create_session'}>
        <Button className="mt-5 hover:bg-blueButtonHoverBg dark:hover:bg-blueButtonHoverBg">
          Create Session
        </Button>
      </Link>
      <div className="mt-10 bg-white p-4 dark:bg-surfaceDark">
        <SessionList />
      </div>
    </PageContainer>
  );
};

export default FacultyPortal;
