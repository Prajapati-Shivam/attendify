import React from 'react';

type Props = {
  children: React.ReactNode;
};

const PageContainer = (props: Props) => {
  return (
    <div className="h-max">
      <div className="px-5 py-8 sm:px-12 lg:px-20">{props.children}</div>
    </div>
  );
};

export default PageContainer;
