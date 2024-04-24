import React from 'react';

import PageContainer from '@/components/common/Containers/PageContainer';
import PageHeader from '@/components/common/Containers/PageHeader';
import StudentDetails from '@/components/students/StudentDetails';

type Props = {
  params: {
    slug: string;
  };
};

const SingleStudent = (props: Props) => {
  const { slug } = props.params;
  // fetch student details by slug
  // console.log(slug);
  return (
    <PageContainer>
      <PageHeader route="students">Student - John Doe</PageHeader>
      <div className="mt-10 bg-white p-4 dark:bg-surfaceDark">
        <StudentDetails studentId={slug} />
      </div>
    </PageContainer>
  );
};

export default SingleStudent;
