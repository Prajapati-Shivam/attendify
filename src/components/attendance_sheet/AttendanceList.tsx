'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import type { DocumentData } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import type { IAttendanceCollection } from '@/@types/database';
import { DisplayCount, REACT_QUERY_KEYS } from '@/@types/enum';
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
import { useSessionStore } from '@/store';

import NoSearchResult from '../common/NoSearchResult';
import TableShimmer from '../common/shimmer/TableShimmer';

interface AttendanceCollection
  extends Omit<
    IAttendanceCollection,
    'AttendanceClassId' | 'AttendanceSubjectId' | 'AttendanceFacultyId'
  > {
  AttendanceClassName: string;
  AttendanceSubjectName: string;
  AttendanceFacultyName: string;
}

export function AttendanceList() {
  const navigate = useRouter();

  const { institute } = useSessionStore();

  const {
    data: snapshotData,
    fetchNextPage,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    isFetching,
    error,
  } = useInfiniteQuery({
    queryKey: [REACT_QUERY_KEYS.ATTENDANCE_SHEET_LIST, institute!.InstituteId],
    queryFn: async ({ pageParam }) => {
      const snapshot = await DbSession.getAttendanceSheets({
        lmt: DisplayCount.ATTENDANCE_SHEET_LIST,
        lastDoc: pageParam,
        instituteId: institute!.InstituteId,
        isLifeTime: true,
      });
      const data = snapshot.docs.map(
        doc => doc.data() as IAttendanceCollection,
      );
      const docData: AttendanceCollection[] = [];
      await Promise.all(
        data.map(async res => {
          const {
            AttendanceClassId,
            AttendanceSubjectId,
            AttendanceFacultyId,
          } = res;

          const classData = await DbClass.getClassById(AttendanceClassId);
          const { ClassName } = classData;

          const subjectData = await DbClass.getSubjectById(AttendanceSubjectId);
          const { SubjectName } = subjectData;

          const facultyData =
            await DbFaculty.getFacultyById(AttendanceFacultyId);
          const { FacultyFirstName, FacultyLastName } = facultyData;

          docData.push({
            ...res,
            AttendanceClassName: ClassName,
            AttendanceSubjectName: SubjectName,
            AttendanceFacultyName: `${FacultyFirstName} ${FacultyLastName}`,
          });
        }),
      );
      return docData;
    },
    getNextPageParam: lastPage => {
      if (lastPage?.length === 0) {
        return null;
      }
      if (lastPage?.length === DisplayCount.ATTENDANCE_SHEET_LIST) {
        return lastPage.at(-1);
      }
      return null;
    },
    initialPageParam: null as null | DocumentData,
    enabled: true,
  });

  const [data, setData] = useState<AttendanceCollection[]>(() => {
    if (snapshotData) {
      return snapshotData.pages.flatMap(page => page.map(doc => doc));
    }
    return [];
  });

  useEffect(() => {
    console.log(error, 'error');
  }, [error]);

  // we are looping through the snapshot returned by react-query and converting them to data
  useEffect(() => {
    if (snapshotData) {
      const docData: AttendanceCollection[] = [];
      snapshotData.pages?.forEach(page => {
        page?.forEach(doc => {
          const datum = doc;
          docData.push(datum);
        });
      });
      setData(docData);
    }
  }, [snapshotData]);

  // hook for pagination
  const { ref, inView } = useInView();

  // this is for pagination
  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, hasNextPage, isFetching]);
  return (
    <Table>
      <TableHeader>
        <TableRow className="text-nowrap">
          <TableHead className="text-start">Class Name</TableHead>
          <TableHead>Subject Name</TableHead>
          <TableHead>Faculty Name</TableHead>
          <TableHead>No. of Student Present</TableHead>
          <TableHead>Total Student</TableHead>
          <TableHead className="text-right">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length === 0 && !isLoading ? (
          <TableRow>
            <TableCell colSpan={7}>
              <NoSearchResult />
            </TableCell>
          </TableRow>
        ) : (
          data.map(res => {
            return (
              <TableRow
                key={res.AttendanceId}
                className="cursor-pointer text-center transition-colors duration-200 ease-in-out hover:bg-gray-200 hover:dark:bg-gray-700 sm:text-start"
                onClick={() => {
                  if (res.AttendanceStatus === 'pending') {
                    navigate.push(
                      'attendance_sheets/take_attendance' +
                        `?id=${res.AttendanceId}`,
                    );
                  } else {
                    navigate.push(`attendance_sheets/${res.AttendanceId}`);
                  }
                }}
              >
                <TableCell>{res.AttendanceClassName}</TableCell>
                <TableCell>{res.AttendanceSubjectName}</TableCell>
                <TableCell>{res.AttendanceFacultyName}</TableCell>
                <TableCell>
                  {res.AttendancePresentStudentList.length || 0}
                </TableCell>
                <TableCell>{res.AttendanceTotalStudents}</TableCell>
                <TableCell className="text-end capitalize">
                  {res.AttendanceStatus}
                </TableCell>
              </TableRow>
            );
          })
        )}
        <TableRow ref={ref}>
          <TableCell colSpan={7}>
            {(isLoading || isFetchingNextPage) &&
              Array.from({ length: 10 }).map((_, idx) => (
                <TableShimmer key={idx} />
              ))}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
