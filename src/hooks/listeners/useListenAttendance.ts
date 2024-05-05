/* eslint-disable consistent-return */
import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import type { IAttendanceCollection } from '@/@types/database';
import { CollectionName } from '@/@types/enum';
import { db } from '@/firebase_configs/config';

const useListenAttendance = ({
  attendanceId,
}: {
  attendanceId: string | null;
}) => {
  const [attendance, setAttendance] = useState<IAttendanceCollection | null>(
    null,
  );

  useEffect(() => {
    if (!attendanceId) return;
    const attendanceRef = doc(db, CollectionName.attendances, attendanceId);

    const unsubscribe = onSnapshot(attendanceRef, snapshot => {
      if (snapshot.exists()) {
        const data = snapshot.data() as IAttendanceCollection;
        setAttendance(data);
      }
    });

    return () => unsubscribe();
  }, [attendanceId]);

  return { attendance };
};

export default useListenAttendance;
