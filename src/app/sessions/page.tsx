import Link from 'next/link';
import React from 'react';

import PageContainer from '@/components/common/Containers/PageContainer';
import { Button } from '@/components/ui/button';

const Session = () => {
  return (
    <PageContainer>
      <h2 className="text-2xl font-semibold text-indigo-500">Sessions</h2>
      <Button className="mt-5 hover:bg-blueButtonHoverBg dark:hover:bg-blueButtonHoverBg">
        <Link href={'/sessions/create_session'}>Create Session</Link>
      </Button>
    </PageContainer>
  );
};

export default Session;
