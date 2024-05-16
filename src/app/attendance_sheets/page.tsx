'use client';

import { useState } from 'react';

import AttendanceForm from '@/components/attendance_sheet/AttendanceForm';
import { AttendanceList } from '@/components/attendance_sheet/AttendanceList';
import PageContainer from '@/components/common/Containers/PageContainer';
import PageHeader from '@/components/common/Containers/PageHeader';
import { useSessionStore } from '@/store';

const AttendanceSheet = () => {
  const [selectedClassId, setSelectedClassId] = useState('');
  const [selectedSubjectId, setSelectedSubjectId] = useState('');

  const { institute, admin } = useSessionStore();

  return (
    <PageContainer>
      <PageHeader>Attendance</PageHeader>
      {institute && admin && (
        <AttendanceForm
          selectedClassId={selectedClassId}
          selectedSubjectId={selectedSubjectId}
          setSelectedClassId={setSelectedClassId}
          setSelectedSubjectId={setSelectedSubjectId}
        />
      )}
      <div className="mt-10 bg-white p-5 dark:bg-gray-800">
        {/* <h3 className="text-2xl font-medium">Attendance Sheet</h3> */}
        <AttendanceList
          selectedClassId={selectedClassId}
          selectedSubjectId={selectedSubjectId}
        />
      </div>
    </PageContainer>
  );
};

export default AttendanceSheet;
