'use client';

import React from 'react';

import PageContainer from '@/components/common/Containers/PageContainer';
import PageHeader from '@/components/common/Containers/PageHeader';
import NoSearchResult from '@/components/common/NoSearchResult';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import useFetchClasses from '@/hooks/fetch/useFetchClasses';
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
  const { data: classes } = useFetchClasses({});
  // this is commented it is causing error
  // const { data: subjects } = useFetchSubjects({
  //   classId: attendance?.AttendanceClassId,
  // });
  return (
    <PageContainer>
      <PageHeader route="attendance_sheets">
        Attendance Details -{' Subject Name'}
        {/* {
          subjects?.find(s => s.SubjectId === attendance?.AttendanceSubjectId)
            ?.SubjectName
        } */}
      </PageHeader>
      <div className="mt-5">
        {attendance && (
          <div>
            <div>
              Class:{' '}
              {
                classes?.find(c => c.ClassId === attendance.AttendanceClassId)
                  ?.ClassName
              }
            </div>
          </div>
        )}
      </div>
      <div
        className="mt-10 
     bg-white p-4 dark:bg-surfaceDark"
      >
        <h3 className="ml-4 text-2xl">Present Student:</h3>
        <Table>
          <TableHeader>
            <TableRow className="text-nowrap">
              <TableHead>Student Name</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {attendance?.AttendancePresentStudentList.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7}>
                  <NoSearchResult />
                </TableCell>
              </TableRow>
            ) : (
              attendance?.AttendancePresentStudentList.map(student => (
                <TableRow
                  key={student.StudentId}
                  className="text-center sm:text-start"
                >
                  <TableCell>{student.StudentName}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <div
        className="mt-10 
        bg-white p-4 dark:bg-surfaceDark"
      >
        <h3 className="ml-4 text-2xl">Absent Student:</h3>
        <Table>
          <TableHeader>
            <TableRow className="text-nowrap">
              <TableHead>Student Name</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {attendance?.AttendancePresentStudentList.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7}>
                  <NoSearchResult />
                </TableCell>
              </TableRow>
            ) : (
              attendance?.AttendancePresentStudentList.map(student => (
                <TableRow
                  key={student.StudentId}
                  className="text-center sm:text-start"
                >
                  <TableCell>{student.StudentName}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </PageContainer>
  );
};

export default AttendanceView;
