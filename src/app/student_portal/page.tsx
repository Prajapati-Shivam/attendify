import { QrCode } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import PageContainer from '@/components/common/Containers/PageContainer';
import PageHeader from '@/components/common/Containers/PageHeader';
import { SessionList } from '@/components/student_portal/SessionList';
import { Button } from '@/components/ui/button';

const StudentPortal = () => {
  return (
    <PageContainer>
      <div className="flex items-center justify-between">
        <PageHeader>My Sessions</PageHeader>
        <Link href={'/student_portal/scan_qr'}>
          <Button className="flex items-center gap-2 hover:bg-blueButtonHoverBg dark:hover:bg-blueButtonHoverBg">
            <QrCode />
            <span>Scan QR</span>
          </Button>
        </Link>
      </div>
      <div className="mt-10 bg-white p-4 dark:bg-surfaceDark">
        <SessionList />
      </div>
    </PageContainer>
  );
};

export default StudentPortal;
