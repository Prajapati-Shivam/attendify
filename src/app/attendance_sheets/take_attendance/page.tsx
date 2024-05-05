'use client';

import { useSearchParams } from 'next/navigation';
import QRCode from 'qrcode';
import React, { useEffect, useState } from 'react';

import PageContainer from '@/components/common/Containers/PageContainer';
import PageHeader from '@/components/common/Containers/PageHeader';
import useListenAttendance from '@/hooks/listeners/useListenAttendance';

const TakeAttendance = () => {
  const searchParam = useSearchParams();

  const attendanceId = searchParam.get('id');

  const [qrCodeBase64, setQrCodeBase64] = useState('');

  useEffect(() => {
    if (!attendanceId) return;
    QRCode.toDataURL(attendanceId, { width: 400 }).then(res => {
      setQrCodeBase64(res);
    });
  }, [attendanceId]);

  const { attendance } = useListenAttendance({ attendanceId });

  return (
    <PageContainer>
      <PageHeader>Take Attendance</PageHeader>
      <div className="mt-10 flex flex-col gap-8 sm:flex-row">
        <div className="flex-1">
          <img src={qrCodeBase64} alt="" className="size-[400px]" />
        </div>
        <div className="flex-1">
          <p className="text-4xl font-semibold">
            Ask students to scan the QR code to mark their attendance
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <div>
            Total no. of student: {attendance?.AttendanceTotalStudents || 'N/A'}
          </div>
          <div>
            Total no. of present student:{' '}
            {attendance?.AttendancePresentStudentList.length || 0}
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default TakeAttendance;
