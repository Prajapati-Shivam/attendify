'use client';

import type { QrcodeErrorCallback, QrcodeSuccessCallback } from 'html5-qrcode';
import { Html5QrcodeScanner } from 'html5-qrcode';
import React, { useEffect, useState } from 'react';

import LoaderDialog from '@/components/common/dialogs/LoaderDialog';
import DbStudent from '@/firebase_configs/DB/DbStudent';
import { useSessionStore } from '@/store';

const ScanQr = () => {
  const { student } = useSessionStore();

  const [scanResult, setScanResult] = useState<boolean>(false);

  const [scanner, setScanner] = useState<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    const sc = new Html5QrcodeScanner(
      'reader',
      {
        qrbox: { width: 250, height: 250 },
        fps: 5,
      },
      false,
    );

    setScanner(sc);
  }, []);

  const [loading, setLoading] = useState(false);

  const success: QrcodeSuccessCallback = async (result: string) => {
    if (scanner && student) {
      scanner.clear();
      setScanResult(result?.length > 0);

      try {
        setLoading(true);
        await DbStudent.giveAttendance({
          attendanceId: result,
          studentId: student.StudentId,
          studentName: student.StudentFullName,
          studentMacAddress: 'test1-mac',
        });
        setLoading(false);
        console.log('successfully gave attendance');
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  };

  const error: QrcodeErrorCallback = er => {
    console.log(er, 'er');
  };

  useEffect(() => {
    if (scanner) {
      scanner.render(success, error);
    }
  }, [scanner]);

  return (
    <div className="flex h-[calc(100vh-100px)] w-full flex-col items-center justify-center">
      <div className="flex w-full max-w-md flex-col gap-4">
        <div id="reader"></div>
        {scanResult ? (
          <div>Your attendance is marked successfully</div>
        ) : (
          <div>Your attendance is not yet marked</div>
        )}
      </div>
      <LoaderDialog loading={loading} description="Submitting attendance..." />
    </div>
  );
};

export default ScanQr;
