import React from 'react';

import PageContainer from '@/components/common/Containers/PageContainer';
import PageHeader from '@/components/common/Containers/PageHeader';
import { CreateSubject } from '@/components/subject/CreateSubject';
import { SubjectList } from '@/components/subject/SubjectList';

const Subject = () => {
  return (
    <PageContainer>
      <PageHeader>Subjects</PageHeader>
      <CreateSubject />
      <div className="mt-10 bg-white p-4 dark:bg-surfaceDark">
        <SubjectList />
      </div>
    </PageContainer>
  );
};

export default Subject;
