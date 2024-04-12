import React from 'react';

import PageContainer from '@/components/common/Containers/PageContainer';
import PageHeader from '@/components/common/Containers/PageHeader';
import { CourseList } from '@/components/courses/CourseList';
import { CreateCourse } from '@/components/courses/CreateCourse';

//* Here use modal for creating new course
const Courses = () => {
  return (
    <PageContainer>
      <PageHeader>Courses</PageHeader>
      <CreateCourse />
      <div className="mt-10 bg-white p-4 dark:bg-surfaceDark">
        <CourseList />
      </div>
    </PageContainer>
  );
};

export default Courses;
