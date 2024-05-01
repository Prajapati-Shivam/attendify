import { QrCode } from 'lucide-react';
import React from 'react';

import PageContainer from '@/components/common/Containers/PageContainer';
import PageHeader from '@/components/common/Containers/PageHeader';

const TakeAttendance = () => {
  return (
    <PageContainer>
      <PageHeader>Take Attendance</PageHeader>
      <div className="mt-10 flex flex-col gap-8 sm:flex-row">
        <div className="flex-1">
          <QrCode size={200} />
        </div>
        <div className="flex-1">
          <p className="text-4xl font-semibold">
            Ask students to scan the QR code to mark their attendance
          </p>
        </div>
      </div>
    </PageContainer>
  );
};

export default TakeAttendance;
