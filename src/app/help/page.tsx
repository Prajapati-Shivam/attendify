'use client';

import { useState } from 'react';

import PageContainer from '@/components/common/Containers/PageContainer';
import PageHeader from '@/components/common/Containers/PageHeader';
import AdminHelp from '@/components/help/AdminHelp';
import FacultyHelp from '@/components/help/FacultyHelp';
import StudentHelp from '@/components/help/StudentHelp';
import { UserRadio } from '@/components/login/UserRadio';

const Dashboard = () => {
  const [userType, setUserType] = useState<'admin' | 'faculty' | 'student'>(
    'admin',
  );

  const displayHelp = () => {
    switch (userType) {
      case 'admin':
        return <AdminHelp />;
      case 'faculty':
        return <FacultyHelp />;
      case 'student':
        return <StudentHelp />;
      default:
        return <AdminHelp />;
    }
  };
  return (
    <PageContainer>
      <PageHeader>Getting Started with Attendlytics</PageHeader>
      <div className="mt-5">
        <UserRadio value={userType} setValue={setUserType} disabled={false} />
      </div>
      <div className="mt-10 bg-white p-4 dark:bg-surfaceDark">
        {displayHelp()}
      </div>
    </PageContainer>
  );
};

export default Dashboard;
