import React from 'react';

import useFetchClasses from '@/hooks/fetch/useFetchClasses';
import useFetchSubjects from '@/hooks/fetch/useFetchSubjects';

import InputSelect from '../common/inputs/InputSelect';

interface AttendanceFormProps {
  selectedClassId: string;
  setSelectedClassId: React.Dispatch<React.SetStateAction<string>>;
  selectedSubjectId: string;
  setSelectedSubjectId: React.Dispatch<React.SetStateAction<string>>;
}

const AttendanceForm = ({
  selectedClassId,
  selectedSubjectId,
  setSelectedClassId,
  setSelectedSubjectId,
}: AttendanceFormProps) => {
  const { data: classes } = useFetchClasses({});
  const { data: subjects } = useFetchSubjects({ classId: selectedClassId });

  return (
    // Create form with dropdown menu for Classroom, subject and date
    <div className="mt-5 flex rounded-md bg-white p-4 dark:bg-gray-800">
      <div className="flex w-full flex-col gap-5 sm:max-w-md sm:flex-row">
        <InputSelect
          placeholder="Select a Classroom"
          data={classes.map(res => {
            return { label: res.ClassName, value: res.ClassId };
          })}
          value={selectedClassId}
          onChange={setSelectedClassId}
        />
        <InputSelect
          placeholder="Select a Subject"
          data={subjects.map(res => {
            return { label: res.SubjectName, value: res.SubjectId };
          })}
          value={selectedSubjectId}
          onChange={setSelectedSubjectId}
        />
      </div>
    </div>
  );
};

export default AttendanceForm;
