'use client';

import { Edit, Trash2 } from 'lucide-react';
import React from 'react';

import PageContainer from '@/components/common/Containers/PageContainer';
import PageHeader from '@/components/common/Containers/PageHeader';
import { Button } from '@/components/ui/button';

type Props = {
  params: {
    slug: string;
  };
};

const attendanceData = {
  className: 'Class 2',
  subjectName: 'Science',
  facultyName: 'Jane Doe',
  totalStudent: 30,
  studentPresent: 25,
  status: 'completed',
};

const AttendanceView = (props: Props) => {
  const { slug } = props.params;
  const attendanceDetails = [
    {
      label: 'Class Name',
      value: attendanceData.className,
    },
    {
      label: 'Subject Name',
      value: attendanceData.subjectName,
    },
    {
      label: 'Faculty Name',
      value: attendanceData.facultyName,
    },
    {
      label: 'Total Student',
      value: attendanceData.totalStudent,
    },
    {
      label: 'No. of Student Present',
      value: attendanceData.studentPresent,
    },
    {
      label: 'Status',
      value: attendanceData.status,
    },
  ];
  return (
    <PageContainer>
      <PageHeader route="attendance_sheets">
        Attendance Details - {slug}
      </PageHeader>
      <div className="mt-10 bg-surfaceLight p-4 dark:bg-surfaceDark">
        <div>
          <div className="mb-4 text-xl font-semibold">Attendance Details</div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {attendanceDetails.map((item, index) => (
              <div key={index}>
                <div className="text-lg font-semibold">{item.label}:</div>
                <div className="text-base text-gray-500 dark:text-gray-400">
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-4 sm:flex-row">
          <Button className="hover:bg-blueButtonHoverBg">
            <span className="flex items-center justify-center gap-x-2 px-6">
              <Edit size={20} />
              <span>Edit</span>
            </span>
          </Button>
          <Button
            variant={'destructive'}
            // onClick={() => setDeleteConfirm(true)}
          >
            <span className="flex items-center justify-center gap-x-2 px-4">
              <Trash2 size={20} />
              <span>Delete</span>
            </span>
          </Button>
        </div>
        {/* <ConfirmDialog
          positiveCallback={() => onDelete(studentData.StudentId)}
          open={deleteConfirm}
          setOpened={setDeleteConfirm}
        >
          <div>Are you sure you want to delete this student?</div>
        </ConfirmDialog>
        <LoaderDialog loading={loading} title="Loading..." /> */}
      </div>
    </PageContainer>
  );
};

export default AttendanceView;
