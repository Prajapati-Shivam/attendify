'use client';

import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import type { DocumentData } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
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
import { formatDate } from '@/lib/misc';
import { showSnackbar } from '@/lib/TsxUtils';
import { useSessionStore } from '@/store';

import ConfirmDialog from '../common/dialogs/ConfirmDialog';
import LoaderDialog from '../common/dialogs/LoaderDialog';
import NoSearchResult from '../common/NoSearchResult';
import TableShimmer from '../common/shimmer/TableShimmer';

export function SessionList() {
  const { faculty } = useSessionStore();

  const [generateSheetConfirmModal, setGenerateSheetConfirmModal] =
    useState(false);

  const {
    data: snapshotData,
    fetchNextPage,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    isFetching,
    error,
  } = useInfiniteQuery({
    queryKey: [REACT_QUERY_KEYS.SESSION_LIST, faculty],
    queryFn: async ({ pageParam }) => {
      const snapshot = await DbSession.getSessions({
        lmt: DisplayCount.SESSION_LIST,
        lastDoc: pageParam,
        instituteId: faculty!.FacultyInstituteId,
        facultyId: faculty?.FacultyId,
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

  const [selectedSession, setSelectedSession] = useState<{
    classId: string;
    sessionId: string;
    facultyId: string;
    subjectId: string;
  } | null>(null);

  const onGenerateAttendanceSheet = async () => {
    if (!faculty || !selectedSession) return;
    try {
      setLoading(true);

      const { classId, facultyId, sessionId, subjectId } = selectedSession;

      // Fetch the user's current location using the Geolocation API
      navigator.geolocation.getCurrentPosition(async position => {
        const { latitude, longitude } = position.coords;

        // Pass the location to the DbSession.generateAttendanceSheet function
        await DbSession.generateAttendanceSheet({
          classId,
          sessionId,
          facultyId,
          subjectId,
          instituteId: faculty.FacultyInstituteId,
          location: { lat: latitude, lng: longitude },
        });

        await queryClient.invalidateQueries({
          queryKey: [REACT_QUERY_KEYS.SESSION_LIST],
        });

        showSnackbar({
          message: 'Attendance sheet generated successfully',
          type: 'success',
        });

        setLoading(false);
      });
    } catch (e) {
      setLoading(false);
      console.log(e);
      errorHandler(e);
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow className="text-nowrap">
          <TableHead>Class Name</TableHead>
          <TableHead>Subject Name</TableHead>
          <TableHead>Faculty Name</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-end">Attendance Sheet</TableHead>
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
          data.map(session => {
            return (
              <TableRow
                key={session.SessionId}
                className="text-center sm:text-start"
              >
                <TableCell>{session.SessionClassName}</TableCell>
                <TableCell>{session.SessionSubjectName}</TableCell>
                <TableCell>{session.SessionFacultyName}</TableCell>
                <TableCell>
                  {formatDate(session.SessionDate, 'DD MMM')}{' '}
                  {session.SessionStartTime} - {session.SessionEndTime}
                </TableCell>
                <TableCell className="text-end">
                  {session.SessionIsAttendanceSheetGenerated ? (
                    <span className=" text-textPrimaryGreen">Generated</span>
                  ) : (
                    <span
                      onClick={() => {
                        setSelectedSession({
                          classId: session.SessionClassId,
                          facultyId: session.SessionFacultyId,
                          sessionId: session.SessionId,
                          subjectId: session.SessionSubjectId,
                        });
                        setGenerateSheetConfirmModal(true);
                      }}
                      className="cursor-pointer text-textPrimaryBlue underline"
                    >
                      Generate{' '}
                    </span>
                  )}
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
        positiveCallback={onGenerateAttendanceSheet}
        open={generateSheetConfirmModal}
        setOpened={setGenerateSheetConfirmModal}
      >
        <div>
          Are you sure you want to generate attendance sheet for this session
          with you current location?
        </div>
      </ConfirmDialog>
      <LoaderDialog loading={loading} title="Loading..." />
    </Table>
  );
}
