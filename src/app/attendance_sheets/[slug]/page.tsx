'use client';

import { Edit, Trash2 } from 'lucide-react';
import React from 'react';

import PageContainer from '@/components/common/Containers/PageContainer';
import PageHeader from '@/components/common/Containers/PageHeader';
import { Button } from '@/components/ui/button';
import useListenAttendance from '@/hooks/listeners/useListenAttendance';

type Props = {
  params: {
    slug: string;
  };
};

const AttendanceView = (props: Props) => {
  const { slug } = props.params;
  const { attendance } = useListenAttendance({
    attendanceId: slug,
  });

  return (
    <PageContainer>
      <PageHeader route="attendance_sheets">
        Attendance Details - {slug}
      </PageHeader>
      <div className="mt-10 bg-surfaceLight p-4 dark:bg-surfaceDark">
        <div>
          <div className="mb-4 text-xl font-semibold">Attendance Details</div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div>
              No of student present:{' '}
              {attendance?.AttendancePresentStudentList?.length || 0}
            </div>
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
