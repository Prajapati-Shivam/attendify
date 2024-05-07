'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import QRCode from 'qrcode';
import React, { useEffect, useState } from 'react';

import PageContainer from '@/components/common/Containers/PageContainer';
import PageHeader from '@/components/common/Containers/PageHeader';
import LoaderDialog from '@/components/common/dialogs/LoaderDialog';
import { Button } from '@/components/ui/button';
import DbSession from '@/firebase_configs/DB/DbSession';
import useListenAttendance from '@/hooks/listeners/useListenAttendance';
import { errorHandler } from '@/lib/CustomError';
import { showSnackbar } from '@/lib/TsxUtils';

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

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onSubmit = async () => {
    if (!attendanceId) return;
    try {
      setLoading(true);

      await DbSession.submitAttendance(attendanceId);

      showSnackbar({
        message: 'Attendance submitted successfully',
        type: 'success',
      });

      setLoading(false);

      router.push('/attendance_sheets');
    } catch (error) {
      setLoading(false);
      errorHandler(error);
      console.log(error);
    }
  };

  return (
    <PageContainer>
      <PageHeader route="attendance_sheets">Take Attendance</PageHeader>
      <div className="mt-10 flex flex-col gap-8 md:flex-row">
        <div className="flex flex-1 justify-center">
          <img src={qrCodeBase64} alt="qrcode" className="h-auto max-w-full" />
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-y-6">
          <h3 className="text-center text-2xl font-semibold sm:text-4xl">
            Ask students to scan the QR code to mark their attendance
          </h3>
          <div className="flex flex-col gap-2 text-center">
            <div>
              Total no. of present student:{' '}
              {attendance?.AttendancePresentStudentList.length || 0}
            </div>
            <div>
              Total no. of student:{' '}
              {attendance?.AttendanceTotalStudents || 'N/A'}
            </div>
            <Button
              onClick={onSubmit}
              className="mt-5 hover:bg-blueButtonHoverBg"
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
      <LoaderDialog loading={loading} />
    </PageContainer>
  );
};

export default TakeAttendance;
