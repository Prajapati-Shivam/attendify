'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import type { DocumentData } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import type { IStudentsCollection } from '@/@types/database';
import { DisplayCount, REACT_QUERY_KEYS } from '@/@types/enum';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import DbStudent from '@/firebase_configs/DB/DbStudent';
import { useSessionStore } from '@/store';

import NoSearchResult from '../common/NoSearchResult';
import TableShimmer from '../common/shimmer/TableShimmer';

export function StudentList() {
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
    queryKey: [REACT_QUERY_KEYS.COURSE_LIST, institute!.InstituteId],
    queryFn: async ({ pageParam }) => {
      const snapshot = await DbStudent.getStudents({
        lmt: DisplayCount.COURSE_LIST,
        lastDoc: pageParam,
        instituteId: institute!.InstituteId,
      });
      return snapshot.docs;
    },
    getNextPageParam: lastPage => {
      if (lastPage?.length === 0) {
        return null;
      }
      if (lastPage?.length === DisplayCount.COURSE_LIST) {
        return lastPage.at(-1);
      }
      return null;
    },
    initialPageParam: null as null | DocumentData,
    enabled: true,
  });

  const [data, setData] = useState<IStudentsCollection[]>(() => {
    if (snapshotData) {
      return snapshotData.pages.flatMap(page =>
        page.map(doc => doc.data() as IStudentsCollection),
      );
    }
    return [];
  });

  useEffect(() => {
    console.log(error, 'error');
  }, [error]);

  // we are looping through the snapshot returned by react-query and converting them to data
  useEffect(() => {
    if (snapshotData) {
      const docData: IStudentsCollection[] = [];
      snapshotData.pages?.forEach(page => {
        page?.forEach(doc => {
          const datum = doc.data() as IStudentsCollection;
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
  const navigate = useRouter();
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[120px]">Roll No.</TableHead>
          <TableHead>Student Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
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
          data
            .sort((a, b) => Number(a.StudentRollNo) - Number(b.StudentRollNo))
            .map(student => {
              return (
                <TableRow
                  key={student.StudentId}
                  onClick={() => {
                    navigate.push(`/students/${student.StudentId}`);
                  }}
                  className="cursor-pointer transition-colors duration-200 ease-in-out hover:bg-[#303f54]"
                >
                  <TableCell className="font-medium">
                    {student.StudentRollNo}
                  </TableCell>
                  <TableCell>{student.StudentFullName}</TableCell>
                  <TableCell>{student.StudentEmail}</TableCell>
                  <TableCell>{student.StudentPhone}</TableCell>
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
