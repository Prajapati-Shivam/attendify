'use client';

import { useQueryClient } from '@tanstack/react-query';
import { Edit, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { REACT_QUERY_KEYS } from '@/@types/enum';
import type { StudentsCollection } from '@/app/students/[slug]/page';
import DbStudent from '@/firebase_configs/DB/DbStudent';
import { errorHandler } from '@/lib/CustomError';
import { formatDate } from '@/lib/misc';
import { showSnackbar } from '@/lib/TsxUtils';

import ConfirmDialog from '../common/dialogs/ConfirmDialog';
import LoaderDialog from '../common/dialogs/LoaderDialog';
import { Button } from '../ui/button';

interface StudentDetailsProps {
  studentData: StudentsCollection;
}

const StudentDetails = ({ studentData }: StudentDetailsProps) => {
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();

  const router = useRouter();

  const onDelete = async (studentId: string) => {
    try {
      setLoading(true);

      await DbStudent.deleteStudent(studentId);
      await queryClient.invalidateQueries({
        queryKey: [REACT_QUERY_KEYS.STUDENT_LIST],
      });
      showSnackbar({
        message: 'Student deleted successfully',
        type: 'success',
      });

      setLoading(false);

      router.back();
    } catch (err) {
      setLoading(false);
      console.log(err);
      errorHandler(err);
    }
  };

  const studentDetails = [
    { label: 'Full Name', value: studentData.StudentFullName },
    { label: 'Phone', value: studentData.StudentPhone },
    { label: 'Email', value: studentData.StudentEmail },
    { label: 'Password', value: studentData.StudentPassword },
    { label: 'Unique Id', value: studentData.StudentUniqueId },
    { label: 'Roll No.', value: studentData.StudentRollNo },
    { label: 'Course Name', value: studentData.StudentCourseName },
    { label: 'Class Name', value: studentData.StudentClassName },
    {
      label: 'Course Start Year',
      value: formatDate(studentData.StudentCourseStartYear, 'YYYY'),
    },
    {
      label: 'Course End Year',
      value: formatDate(studentData.StudentCourseEndYear, 'YYYY'),
    },
  ];
  return (
    <div className="p-4">
      <div>
        <div className="mb-4 text-xl font-semibold">Student Details</div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {studentDetails.map((item, index) => (
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
        <Button variant={'destructive'} onClick={() => setDeleteConfirm(true)}>
          <span className="flex items-center justify-center gap-x-2 px-4">
            <Trash2 size={20} />
            <span>Delete</span>
          </span>
        </Button>
      </div>
      <ConfirmDialog
        positiveCallback={() => onDelete(studentData.StudentId)}
        open={deleteConfirm}
        setOpened={setDeleteConfirm}
      >
        <div>Are you sure you want to delete this student?</div>
      </ConfirmDialog>
      <LoaderDialog loading={loading} title="Loading..." />
    </div>
  );
};

export default StudentDetails;
