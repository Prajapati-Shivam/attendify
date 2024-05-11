'use client';

import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import type { DocumentData } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';

import type { IClassesCollection } from '@/@types/database';
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
import { errorHandler } from '@/lib/CustomError';
import { formatDate } from '@/lib/misc';
import { showSnackbar } from '@/lib/TsxUtils';
import { useSessionStore } from '@/store';

import ConfirmDialog from '../common/dialogs/ConfirmDialog';
import LoaderDialog from '../common/dialogs/LoaderDialog';
import NoSearchResult from '../common/NoSearchResult';
import TableShimmer from '../common/shimmer/TableShimmer';

export function ClassroomDataTable() {
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
    queryKey: [REACT_QUERY_KEYS.CLASS_LIST, institute!.InstituteId],
    queryFn: async ({ pageParam }) => {
      const snapshot = await DbClass.getClasses({
        lmt: DisplayCount.CLASS_LIST,
        lastDoc: pageParam,
        instituteId: institute!.InstituteId,
      });
      return snapshot.docs;
    },
    getNextPageParam: lastPage => {
      if (lastPage?.length === 0) {
        return null;
      }
      if (lastPage?.length === DisplayCount.CLASS_LIST) {
        return lastPage.at(-1);
      }
      return null;
    },
    initialPageParam: null as null | DocumentData,
    enabled: true,
  });

  const [data, setData] = useState<IClassesCollection[]>(() => {
    if (snapshotData) {
      return snapshotData.pages.flatMap(page =>
        page.map(doc => doc.data() as IClassesCollection),
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
      const docData: IClassesCollection[] = [];
      snapshotData.pages?.forEach(page => {
        page?.forEach(doc => {
          const datum = doc.data() as IClassesCollection;
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
  const [selectedClassId, setSelectedClassId] = useState('');
  const queryClient = useQueryClient();
  const onDelete = async () => {
    try {
      setLoading(true);

      // console.log('Deleting class', selectedClassId);
      await DbClass.deleteClass(selectedClassId);
      await queryClient.invalidateQueries({
        queryKey: [REACT_QUERY_KEYS.CLASS_LIST],
      });

      showSnackbar({
        message: 'Class deleted successfully',
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
          <TableHead className="text-start">Name</TableHead>
          <TableHead>No. of Subject</TableHead>
          <TableHead>Total Students</TableHead>
          <TableHead>Academic year</TableHead>
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
          data.map(res => {
            return (
              <TableRow key={res.ClassId} className="text-center sm:text-start">
                <TableCell>{res.ClassName}</TableCell>
                <TableCell>{res.ClassSubjectsCount}</TableCell>
                <TableCell>{res.ClassStudentsCount}</TableCell>
                <TableCell>
                  {formatDate(res.ClassAcademicStartYear, 'YYYY')} -{' '}
                  {formatDate(res.ClassAcademicEndYear, 'YYYY')}
                </TableCell>
                <TableCell className="text-end">
                  <FaRegTrashAlt
                    onClick={() => {
                      setSelectedClassId(res.ClassId);
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
              Array.from({ length: 10 }).map((_, idx) => (
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
        <div>Are you sure you want to delete this Class?</div>
      </ConfirmDialog>
      <LoaderDialog loading={loading} title="Loading..." />
    </Table>
  );
}
