import { Edit, Trash2 } from 'lucide-react';
import React from 'react';

import { Button } from '../ui/button';

type Props = {
  studentId: string;
};

const StudentDetails = async (props: Props) => {
  const studentData = [
    {
      StudentFullName: 'John Doe',
      StudentPhone: '08012345678',
      StudentEmail: 'john@gmail.com',
      StudentPassword: 'password123',
      StudentUniqueId: '123456',
      StudentRollNo: '001',
      StudentCourseId: '001',
      StudentClassId: '001',
      StudentCourseStartYear: '2022-01-01',
      StudentCourseEndYear: '2022-12-31',
    },
  ];

  // fetch student details by slug

  return (
    <div className="p-4">
      {studentData.map(student => (
        <div key={student.StudentUniqueId}>
          <div className="mb-4 text-xl font-semibold">Student Details</div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <div className="text-lg font-semibold">Full Name:</div>
              <div className="text-base text-gray-500 dark:text-gray-400">
                {student.StudentFullName}
              </div>
            </div>
            <div>
              <div className="text-lg font-semibold">Phone:</div>
              <div className="text-base text-gray-500 dark:text-gray-400">
                {student.StudentPhone}
              </div>
            </div>
            <div>
              <div className="text-lg font-semibold">Email:</div>
              <div className="text-base text-gray-500 dark:text-gray-400">
                {student.StudentEmail}
              </div>
            </div>
            <div>
              <div className="text-lg font-semibold">Password:</div>
              <div className="text-base text-gray-500 dark:text-gray-400">
                {student.StudentPassword}
              </div>
            </div>
            <div>
              <div className="text-lg font-semibold">Unique Id:</div>
              <div className="text-base text-gray-500 dark:text-gray-400">
                {student.StudentUniqueId}
              </div>
            </div>
            <div>
              <div className="text-lg font-semibold">Roll No.:</div>
              <div className="text-base text-gray-500 dark:text-gray-400">
                {student.StudentRollNo}
              </div>
            </div>
            <div>
              <div className="text-lg font-semibold">Course Id:</div>
              <div className="text-base text-gray-500 dark:text-gray-400">
                {student.StudentCourseId}
              </div>
            </div>
            <div>
              <div className="text-lg font-semibold">Class Id:</div>
              <div className="text-base text-gray-500 dark:text-gray-400">
                {student.StudentClassId}
              </div>
            </div>

            <div>
              <div className="text-lg font-semibold">Course Start Year:</div>
              <div className="text-base text-gray-500 dark:text-gray-400">
                {student.StudentCourseStartYear}
              </div>
            </div>
            <div>
              <div className="text-lg font-semibold">Course End Year:</div>
              <div className="text-base text-gray-500 dark:text-gray-400">
                {student.StudentCourseEndYear}
              </div>
            </div>
          </div>
        </div>
      ))}
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
