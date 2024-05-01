'use client';

import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import type { DocumentData } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';

import type { ISessionsCollection } from '@/@types/database';
import { DisplayCount, REACT_QUERY_KEYS } from '@/@types/enum';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import DbSession from '@/firebase_configs/DB/DbSession';
import { errorHandler } from '@/lib/CustomError';
import { showSnackbar } from '@/lib/TsxUtils';
import { useSessionStore } from '@/store';

import ConfirmDialog from '../common/dialogs/ConfirmDialog';
import LoaderDialog from '../common/dialogs/LoaderDialog';
import NoSearchResult from '../common/NoSearchResult';
import TableShimmer from '../common/shimmer/TableShimmer';

export function SessionList() {
  const { institute } = useSessionStore();
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const {
    data: snapshotData,
    fetchNextPage,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    isFetching,
    error,
  } = useInfiniteQuery({
    queryKey: [REACT_QUERY_KEYS.SESSION_LIST, institute!.InstituteId],
    queryFn: async ({ pageParam }) => {
      const snapshot = await DbSession.getSessions({
        lmt: DisplayCount.SESSION_LIST,
        lastDoc: pageParam,
        instituteId: institute!.InstituteId,
      });
      return snapshot.docs;
    },
    getNextPageParam: lastPage => {
      if (lastPage?.length === 0) {
        return null;
      }
      if (lastPage?.length === DisplayCount.SESSION_LIST) {
        return lastPage.at(-1);
      }
      return null;
    },
    initialPageParam: null as null | DocumentData,
    enabled: true,
  });

  const [data, setData] = useState<ISessionsCollection[]>(() => {
    if (snapshotData) {
      return snapshotData.pages.flatMap(page =>
        page.map(doc => doc.data() as ISessionsCollection),
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
      const docData: ISessionsCollection[] = [];
      snapshotData.pages?.forEach(page => {
        page?.forEach(doc => {
          const datum = doc.data() as ISessionsCollection;
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

  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();

  const onDelete = async (courseId: string) => {
    try {
      setLoading(true);

      await DbSession.deleteSession(courseId);
      await queryClient.invalidateQueries({
        queryKey: [REACT_QUERY_KEYS.SESSION_LIST],
      });

      showSnackbar({
        message: 'Session deleted successfully',
        type: 'success',
      });

      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
      errorHandler(err);
    }
  };
  return (
    <Table>
      <TableHeader>
        <TableRow className="text-nowrap">
          <TableHead className="text-start">SR No.</TableHead>
          <TableHead>Class Name</TableHead>
          <TableHead>Subject Name</TableHead>
          <TableHead>Faculty Name</TableHead>
          <TableHead className="text-right"></TableHead>
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
          data.map((session, idx) => {
            return (
              <TableRow
                key={session.SessionId}
                className="text-center sm:text-start"
              >
                <TableCell>{idx + 1}.</TableCell>
                <TableCell>{session.SessionClassName}</TableCell>
                <TableCell>{session.SessionSubjectName}</TableCell>
                <TableCell>{session.SessionFacultyName}</TableCell>
                <TableCell className="flex justify-end text-end">
                  <FaRegTrashAlt
                    onClick={() => setDeleteConfirm(true)}
                    className="cursor-pointer text-xl text-textPrimaryRed"
                  />
                </TableCell>
                <ConfirmDialog
                  positiveCallback={() => onDelete(session.SessionId)}
                  open={deleteConfirm}
                  setOpened={setDeleteConfirm}
                >
                  <div>Are you sure you want to delete this session?</div>
                </ConfirmDialog>
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
      <LoaderDialog loading={loading} title="Loading..." />
    </Table>
  );
}
