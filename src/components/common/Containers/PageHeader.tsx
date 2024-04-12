'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

type Props = {
  children: string | React.ReactNode;
  route?: string;
};

const PageHeader = (props: Props) => {
  const router = useRouter();
  if (props.route) {
    return (
      <div
        onClick={() => router.push(`/${props.route}`)}
        className="flex cursor-pointer items-center gap-2 text-2xl font-semibold text-indigo-500"
      >
        <ArrowLeft />
        <span>{props.children}</span>
      </div>
    );
  }

  return (
    <h2 className="text-2xl font-semibold text-textPrimaryBlue">
      {props.children}
    </h2>
  );
};

export default PageHeader;
