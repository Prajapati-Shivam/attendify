import React from 'react';

import { CourseList } from '@/components/courses/CourseList';
import { CreateCourse } from '@/components/courses/CreateCourse';

//* Here use modal for creating new course
const Courses = () => {
  return (
    <div className="h-max">
      <div className="px-5 py-8 sm:px-12 lg:px-20">
        <h2 className="text-2xl font-semibold text-indigo-500">Courses</h2>
        <CreateCourse />
        <div className="mt-10 bg-white p-4 dark:bg-surfaceDark">
          <CourseList />
        </div>
      </div>
    </div>
  );
};

export default Courses;
