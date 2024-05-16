import React from 'react';

import PageContainer from '@/components/common/Containers/PageContainer';
import PageHeader from '@/components/common/Containers/PageHeader';
import { SessionList } from '@/components/faculty_portal/SessionList';

const FacultyPortal = () => {
  return (
    <PageContainer>
      <PageHeader>Sessions</PageHeader>

      <div className="mt-10 bg-white p-4 dark:bg-surfaceDark">
        <SessionList />
      </div>
    </PageContainer>
  );
};

export default FacultyPortal;
