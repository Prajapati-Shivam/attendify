'use client';

import { Edit, Trash2 } from 'lucide-react';
import React from 'react';

import type { StudentsCollection } from '@/app/students/[slug]/page';
import { formatDate } from '@/lib/misc';

import { Button } from '../ui/button';

interface StudentDetailsProps {
  studentData: StudentsCollection;
}

const StudentDetails = ({ studentData }: StudentDetailsProps) => {
  return (
    <div className="p-4">
      <div>
        <div className="mb-4 text-xl font-semibold">Student Details</div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <div className="text-lg font-semibold">Full Name:</div>
            <div className="text-base text-gray-500 dark:text-gray-400">
              {studentData.StudentFullName}
            </div>
          </div>
          <div>
            <div className="text-lg font-semibold">Phone:</div>
            <div className="text-base text-gray-500 dark:text-gray-400">
              {studentData.StudentPhone}
            </div>
          </div>
          <div>
            <div className="text-lg font-semibold">Email:</div>
            <div className="text-base text-gray-500 dark:text-gray-400">
              {studentData.StudentEmail}
            </div>
          </div>
          <div>
            <div className="text-lg font-semibold">Password:</div>
            <div className="text-base text-gray-500 dark:text-gray-400">
              {studentData.StudentPassword}
            </div>
          </div>
          <div>
            <div className="text-lg font-semibold">Unique Id:</div>
            <div className="text-base text-gray-500 dark:text-gray-400">
              {studentData.StudentUniqueId}
            </div>
          </div>
          <div>
            <div className="text-lg font-semibold">Roll No.:</div>
            <div className="text-base text-gray-500 dark:text-gray-400">
              {studentData.StudentRollNo}
            </div>
          </div>
          <div>
            <div className="text-lg font-semibold">Course Name:</div>
            <div className="text-base text-gray-500 dark:text-gray-400">
              {studentData.StudentCourseName}
            </div>
          </div>
          <div>
            <div className="text-lg font-semibold">Class Name:</div>
            <div className="text-base text-gray-500 dark:text-gray-400">
              {studentData.StudentClassName}
            </div>
          </div>

          <div>
            <div className="text-lg font-semibold">Course Start Year:</div>
            <div className="text-base text-gray-500 dark:text-gray-400">
              {formatDate(studentData.StudentCourseStartYear, 'YYYY')}
            </div>
          </div>
          <div>
            <div className="text-lg font-semibold">Course End Year:</div>
            <div className="text-base text-gray-500 dark:text-gray-400">
              {formatDate(studentData.StudentCourseEndYear, 'YYYY')}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex gap-x-4">
        <Button className="hover:bg-blueButtonHoverBg">
          <span className="flex items-center justify-center gap-x-2 px-6">
            <Edit size={20} />
            <span>Edit</span>
          </span>
        </Button>
        <Button variant={'destructive'}>
          <span className="flex items-center justify-center gap-x-2 px-4">
            <Trash2 size={20} />
            <span>Delete</span>
          </span>
        </Button>
      </div>
    </div>
  );
};

export default StudentDetails;
