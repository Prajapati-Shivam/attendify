'use client';

import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import type { DocumentData } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';

import type { IFacultiesCollection } from '@/@types/database';
import { DisplayCount, REACT_QUERY_KEYS } from '@/@types/enum';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import DbFaculty from '@/firebase_configs/DB/DbFaculty';
import { errorHandler } from '@/lib/CustomError';
import { showSnackbar } from '@/lib/TsxUtils';
import { useSessionStore } from '@/store';

import ConfirmDialog from '../common/dialogs/ConfirmDialog';
import LoaderDialog from '../common/dialogs/LoaderDialog';
import NoSearchResult from '../common/NoSearchResult';
import TableShimmer from '../common/shimmer/TableShimmer';

export function FacultyList() {
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
    queryKey: [REACT_QUERY_KEYS.FACULTY_LIST, institute!.InstituteId],
    queryFn: async ({ pageParam }) => {
      const snapshot = await DbFaculty.getFaculties({
        lmt: DisplayCount.FACULTY_LIST,
        lastDoc: pageParam,
        instituteId: institute!.InstituteId,
      });
      return snapshot.docs;
    },
    getNextPageParam: lastPage => {
      if (lastPage?.length === 0) {
        return null;
      }
      if (lastPage?.length === DisplayCount.FACULTY_LIST) {
        return lastPage.at(-1);
      }
      return null;
    },
    initialPageParam: null as null | DocumentData,
    enabled: true,
  });

  const [data, setData] = useState<IFacultiesCollection[]>(() => {
    if (snapshotData) {
      return snapshotData.pages.flatMap(page =>
        page.map(doc => doc.data() as IFacultiesCollection),
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
      const docData: IFacultiesCollection[] = [];
      snapshotData.pages?.forEach(page => {
        page?.forEach(doc => {
          const datum = doc.data() as IFacultiesCollection;
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

  const [selectedFacultyId, setSelectedFacultyId] = useState('');

  const onDelete = async () => {
    if (!selectedFacultyId) return;
    try {
      setLoading(true);

      await DbFaculty.deleteFaculty(selectedFacultyId);

      await queryClient.invalidateQueries({
        queryKey: [REACT_QUERY_KEYS.FACULTY_LIST],
      });

      showSnackbar({
        message: 'Faculty deleted successfully',
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
          <TableHead>Full Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Password</TableHead>
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
          data.map((faculty, idx) => {
            return (
              <TableRow
                key={faculty.FacultyId}
                className="text-center sm:text-start"
              >
                <TableCell>{idx + 1}.</TableCell>
                <TableCell>
                  {faculty.FacultyFirstName} {faculty.FacultyLastName}
                </TableCell>
                <TableCell>{faculty.FacultyEmail}</TableCell>
                <TableCell>{faculty.FacultyPassword}</TableCell>
                <TableCell className="text-end">
                  <FaRegTrashAlt
                    onClick={() => {
                      setSelectedFacultyId(faculty.FacultyId);
                      setDeleteConfirm(true);
                    }}
                    className="cursor-pointer text-xl text-textPrimaryRed"
                  />
                </TableCell>
              </TableRow>
            );
          })
        )}
        <TableRow ref={ref}>
          <TableCell colSpan={7}>
            {(isLoading || isFetchingNextPage) &&
              Array.from({ length: 5 }).map((_, idx) => (
                <TableShimmer key={idx} />
              ))}
          </TableCell>
        </TableRow>
      </TableBody>
      <ConfirmDialog
        positiveCallback={onDelete}
        open={deleteConfirm}
        setOpened={setDeleteConfirm}
      >
        <div>Are you sure you want to delete this faculty?</div>
      </ConfirmDialog>
      <LoaderDialog loading={loading} title="Loading..." />
    </Table>
  );
}
