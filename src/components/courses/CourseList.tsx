'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import type { DocumentData } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import type { ICoursesCollection } from '@/@types/database';
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
import { formatDate } from '@/lib/misc';
import { useSessionStore } from '@/store';

export function CourseList() {
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
      const snapshot = await DbClass.getCourses({
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
  });

  const [data, setData] = useState<ICoursesCollection[]>(() => {
    if (snapshotData) {
      return snapshotData.pages.flatMap(page =>
        page.map(doc => doc.data() as ICoursesCollection),
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
      const docData: ICoursesCollection[] = [];
      snapshotData.pages?.forEach(page => {
        page?.forEach(doc => {
          const datum = doc.data() as ICoursesCollection;
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
        <TableRow>
          <TableHead className="w-[120px]">SR No.</TableHead>
          <TableHead>Course Name</TableHead>
          <TableHead>Course Code</TableHead>
          <TableHead className="text-right">Created At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length === 0 && !isLoading ? (
          <TableRow>
            <TableCell colSpan={7}>No result found</TableCell>
          </TableRow>
        ) : (
          data.map((course, idx) => {
            return (
              <TableRow key={course.CourseId}>
                <TableCell className="font-medium">{idx + 1}.</TableCell>
                <TableCell>{course.CourseFullName}</TableCell>
                <TableCell>{course.CourseShortName}</TableCell>
                <TableCell className="text-right">
                  {formatDate(course.CourseCreatedAt, 'DD/MM/YY')}
                </TableCell>
              </TableRow>
            );
          })
        )}
        <TableRow ref={ref}>
          <TableCell colSpan={7}>
            {(isLoading || isFetchingNextPage) &&
              Array.from({ length: 10 }).map((_, idx) => (
                <div key={idx}>Loading</div>
              ))}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
