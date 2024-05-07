'use client';

import type { QrcodeErrorCallback, QrcodeSuccessCallback } from 'html5-qrcode';
import { Html5QrcodeScanner } from 'html5-qrcode';
import type { LottieOptions } from 'lottie-react';
import Lottie from 'lottie-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import LoaderDialog from '@/components/common/dialogs/LoaderDialog';
import DbStudent from '@/firebase_configs/DB/DbStudent';
import { errorHandler } from '@/lib/CustomError';
import { useSessionStore } from '@/store';

import lottieAnimationSuccess from '../../../../public/assets/lotties/lottie_success.json';

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

  const router = useRouter();

  const success: QrcodeSuccessCallback = async (result: string) => {
    if (scanner && student && result) {
      scanner.clear();

      try {
        setLoading(true);
        await DbStudent.giveAttendance({
          attendanceId: result,
          studentId: student.StudentId,
          studentName: student.StudentFullName,
          studentMacAddress: 'test1-mac',
        });
        setLoading(false);
        setScanResult(true);
        setTimeout(() => router.back(), 2000);
      } catch (error) {
        console.log(error);
        setLoading(false);
        errorHandler(error);
        router.back();
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

  const lottieOptions: LottieOptions = {
    loop: false,
    autoplay: true,
    animationData: lottieAnimationSuccess,
    rendererSettings: {
      // Set the dimensions here
      preserveAspectRatio: 'xMidYMid meet', // You can adjust this to control aspect ratio
    },
  };

  return (
    <div className="flex h-[calc(100vh-100px)] w-full flex-col items-center justify-center">
      <div className="flex w-full max-w-md flex-col gap-4">
        {scanResult ? (
          <div className="flex h-full flex-col items-center justify-center gap-8">
            <Lottie
              {...lottieOptions}
              style={{ width: '200px', height: '200px', display: 'block' }}
            />

            <p className="text-center text-xl font-bold text-green-500">
              Attendance Submitted Successfully
            </p>
          </div>
        ) : (
          <div id="reader"></div>
        )}
      </div>
      <LoaderDialog loading={loading} description="Submitting attendance..." />
    </div>
  );
};

export default ScanQr;
