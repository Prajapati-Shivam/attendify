'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import type { DocumentData } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
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
import DbStudent from '@/firebase_configs/DB/DbStudent';
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

export function SessionList() {
  const { student } = useSessionStore();

  const {
    data: snapshotData,
    fetchNextPage,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    isFetching,
    error,
  } = useInfiniteQuery({
    queryKey: [REACT_QUERY_KEYS.ATTENDANCE_SHEET_LIST, student!.StudentClassId],
    queryFn: async ({ pageParam }) => {
      const snapshot = await DbStudent.getStudentAttendanceSheets({
        lmt: DisplayCount.ATTENDANCE_SHEET_LIST,
        lastDoc: pageParam,
        classId: student!.StudentClassId,
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
          <TableHead>Class Name</TableHead>
          <TableHead>Subject Name</TableHead>
          <TableHead>Faculty Name</TableHead>
          <TableHead className="text-end">Attended</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length === 0 && !isLoading ? (
          <TableRow>
            <TableCell colSpan={4}>
              <NoSearchResult />
            </TableCell>
          </TableRow>
        ) : (
          data.map(res => {
            return (
              <TableRow
                key={res.AttendanceId}
                className="cursor-pointer text-center sm:text-start"
              >
                <TableCell>{res.AttendanceClassName}</TableCell>
                <TableCell>{res.AttendanceSubjectName}</TableCell>
                <TableCell>{res.AttendanceFacultyName}</TableCell>

                <TableCell className="text-end capitalize">
                  {res.AttendancePresentStudentList.find(
                    list => list.StudentId === student!.StudentId,
                  )
                    ? 'Yes'
                    : 'No'}
                </TableCell>
              </TableRow>
            );
          })
        )}
        <TableRow ref={ref}>
          <TableCell colSpan={4}>
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
