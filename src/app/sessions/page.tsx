import Link from 'next/link';
import React from 'react';

import { Button } from '@/components/ui/button';

const Session = () => {
  return (
    <div className="h-max">
      <div className="px-5 py-8 sm:px-12 lg:px-20">
        <h2 className="text-2xl font-semibold text-indigo-500">Sessions</h2>
        <Button className="mt-5 hover:bg-blueButtonHoverBg dark:hover:bg-blueButtonHoverBg">
          <Link href={'/sessions/create_session'}>Create Session</Link>
        </Button>
      </div>
    </div>
  );
};

export default Session;
