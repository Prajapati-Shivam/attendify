'use client';

import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import type { DocumentData } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
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
import { errorHandler } from '@/lib/CustomError';
import { showSnackbar } from '@/lib/TsxUtils';
import { useSessionStore } from '@/store';

import ConfirmDialog from '../common/dialogs/ConfirmDialog';
import LoaderDialog from '../common/dialogs/LoaderDialog';
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

          docData.push({
            ...res,
            AttendanceClassName: ClassName,
            AttendanceSubjectName: SubjectName,
            AttendanceFacultyName: `${facultyData?.FacultyFirstName || ''} ${facultyData?.FacultyLastName || ''}`,
          });
        }),
      );
      return { docData, docs: snapshot.docs };
    },
    getNextPageParam: lastPage => {
      if (lastPage?.docs?.length === 0) {
        return null;
      }
      if (lastPage?.docs?.length === DisplayCount.ATTENDANCE_SHEET_LIST) {
        return lastPage?.docs.at(-1);
      }
      return null;
    },
    initialPageParam: null as null | DocumentData,
    enabled: true,
  });

  const [data, setData] = useState<AttendanceCollection[]>(() => {
    if (snapshotData) {
      return snapshotData.pages.flatMap(page => page.docData.map(doc => doc));
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
        page?.docData?.forEach(doc => {
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

  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();

  const [selectedAttendanceId, setSelectedAttendanceId] = useState('');

  const onDelete = async () => {
    if (!selectedAttendanceId) return;
    try {
      setLoading(true);
      await DbSession.deleteAttendanceSheet(selectedAttendanceId);
      await queryClient.invalidateQueries({
        queryKey: [REACT_QUERY_KEYS.ATTENDANCE_SHEET_LIST],
      });
      showSnackbar({
        message: 'Attendance Sheet deleted successfully',
        type: 'success',
      });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
      errorHandler(err);
    }
  };

  const handleRedirect = (res: AttendanceCollection) => {
    if (res.AttendanceStatus === 'pending') {
      navigate.push(`attendance_sheets/take_attendance?id=${res.AttendanceId}`);
    } else {
      navigate.push(`attendance_sheets/${res.AttendanceId}`);
    }
  };
  return (
    <Table>
      <TableHeader>
        <TableRow className="text-nowrap">
          <TableHead className="text-start">Class Name</TableHead>
          <TableHead>Subject Name</TableHead>
          <TableHead>Faculty Name</TableHead>
          <TableHead>No. of Student Present</TableHead>
          <TableHead>Total Student</TableHead>
          <TableHead>Status</TableHead>
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
              <TableRow
                key={res.AttendanceId}
                className="cursor-pointer text-center transition-colors duration-200 ease-in-out hover:bg-gray-200 hover:dark:bg-gray-700 sm:text-start"
              >
                <TableCell onClick={() => handleRedirect(res)}>
                  {res.AttendanceClassName}
                </TableCell>
                <TableCell onClick={() => handleRedirect(res)}>
                  {res.AttendanceSubjectName}
                </TableCell>
                <TableCell onClick={() => handleRedirect(res)}>
                  {res.AttendanceFacultyName}
                </TableCell>
                <TableCell onClick={() => handleRedirect(res)}>
                  {res.AttendancePresentStudentList.length || 0}
                </TableCell>
                <TableCell onClick={() => handleRedirect(res)}>
                  {res.AttendanceTotalStudents}
                </TableCell>
                <TableCell
                  className="capitalize"
                  onClick={() => handleRedirect(res)}
                >
                  {res.AttendanceStatus}
                </TableCell>
                <TableCell className="text-end">
                  <FaRegTrashAlt
                    onClick={() => {
                      setSelectedAttendanceId(res.AttendanceId);
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
        <div>Are you sure you want to delete this Attendance Sheet?</div>
      </ConfirmDialog>
      <LoaderDialog loading={loading} title="Loading..." />
    </Table>
  );
}
