import Link from 'next/link';
import React from 'react';

import PageContainer from '@/components/common/Containers/PageContainer';
import PageHeader from '@/components/common/Containers/PageHeader';
import { Button } from '@/components/ui/button';

const Session = () => {
  return (
    <PageContainer>
      <PageHeader>Sessions</PageHeader>
      <Button className="mt-5 hover:bg-blueButtonHoverBg dark:hover:bg-blueButtonHoverBg">
        <Link href={'/sessions/create_session'}>Create Session</Link>
      </Button>
    </PageContainer>
  );
};

export default Session;
