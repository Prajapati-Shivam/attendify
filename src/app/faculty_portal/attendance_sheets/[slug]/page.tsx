'use client';

import React, { useEffect, useState } from 'react';

import type {
  IAttendanceCollection,
  IStudentsCollection,
} from '@/@types/database';
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
import DbClass from '@/firebase_configs/DB/DbClass';
import DbFaculty from '@/firebase_configs/DB/DbFaculty';
import DbSession from '@/firebase_configs/DB/DbSession';
import { errorHandler } from '@/lib/CustomError';

type Props = {
  params: {
    slug: string;
  };
};

interface AttendanceCollection
  extends Omit<
    IAttendanceCollection,
    'AttendanceClassId' | 'AttendanceSubjectId' | 'AttendanceFacultyId'
  > {
  AttendanceClassName: string;
  AttendanceSubjectName: string;
  AttendanceFacultyName: string;
  AttendanceAbsentStudentList: { StudentId: string; StudentName: string }[];
}

const AttendanceView = (props: Props) => {
  const { slug } = props.params;

  const [loading, setLoading] = useState(true);

  const [attendanceSheetData, setAttendanceSheetData] =
    useState<AttendanceCollection | null>(null);

  useEffect(() => {
    const fetchAttendanceSheetDetails = async () => {
      if (!slug) return;
      try {
        setLoading(true);

        const attendanceSnapshot = await DbSession.getAttendanceSheetById(slug);
        const attendanceData =
          attendanceSnapshot.data() as IAttendanceCollection;

        const {
          AttendanceClassId,
          AttendanceFacultyId,
          AttendanceSubjectId,
          AttendancePresentStudentList,
        } = attendanceData;

        const classData = await DbClass.getClassById(AttendanceClassId);
        const { ClassName } = classData;

        const subjectData = await DbClass.getSubjectById(AttendanceSubjectId);
        const { SubjectName } = subjectData;

        const facultyData = await DbFaculty.getFacultyById(AttendanceFacultyId);

        const studentsSnapshot =
          await DbClass.getAllStudentsOfClass(AttendanceClassId);
        const allStudentsOfClass = studentsSnapshot.docs.map(
          doc => doc.data() as IStudentsCollection,
        );

        //* push the students detail in AttendanceAbsentStudentList if his/her details is not present in AttendancePresentStudentList , means the student is absent
        // Extract Student IDs from AttendancePresentStudentList
        const presentStudentIds = AttendancePresentStudentList.map(
          student => student.StudentId,
        );

        // Identify absent students
        const AttendanceAbsentStudentList = allStudentsOfClass
          .filter(student => !presentStudentIds.includes(student.StudentId))
          .map(student => ({
            StudentId: student.StudentId,
            StudentName: student.StudentFullName,
          }));

        setAttendanceSheetData({
          ...attendanceData,
          AttendanceClassName: ClassName,
          AttendanceSubjectName: SubjectName,
          AttendanceFacultyName: `${facultyData?.FacultyFirstName || ''} ${facultyData?.FacultyLastName || ''}`,
          AttendanceAbsentStudentList,
        });

        setLoading(false);
      } catch (error) {
        errorHandler(error);
        console.log(error);
        setLoading(false);
      }
    };

    fetchAttendanceSheetDetails();
  }, []);

  if (loading) {
    return (
      <div className="flex w-full items-center justify-center p-6">
        <div className="h-[400px] w-full bg-shimmerColorLight dark:bg-shimmerColorDark"></div>
      </div>
    );
  }

  if (!loading && !attendanceSheetData) {
    return (
      <div className="flex w-full items-center justify-center p-6">
        <NoSearchResult text="No details found" />
      </div>
    );
  }

  return (
    <PageContainer>
      <PageHeader route="faculty_portal/attendance_sheets">
        Attendance Details
      </PageHeader>
      <div className="mt-5 flex flex-col">
        <div>Class: {attendanceSheetData?.AttendanceClassName}</div>
        <div>Subject: {attendanceSheetData?.AttendanceSubjectName}</div>
        <div>Faculty: {attendanceSheetData?.AttendanceFacultyName}</div>
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
            {attendanceSheetData?.AttendancePresentStudentList.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7}>
                  <NoSearchResult />
                </TableCell>
              </TableRow>
            ) : (
              attendanceSheetData?.AttendancePresentStudentList.map(student => (
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
            {attendanceSheetData?.AttendanceAbsentStudentList.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7}>
                  <NoSearchResult />
                </TableCell>
              </TableRow>
            ) : (
              attendanceSheetData?.AttendanceAbsentStudentList.map(student => (
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
