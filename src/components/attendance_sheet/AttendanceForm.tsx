import React from 'react';

import { SelectClassroom } from '../select_input/SelectClassroom';
import { SelectDate } from '../select_input/SelectDate';
import { SelectSubject } from '../select_input/SelectSubject';

const AttendanceForm = () => {
  return (
    // Create form with dropdown menu for Classroom, subject and date
    <div className="mt-5 flex rounded-md bg-white p-4 dark:bg-gray-800">
      <form action="" className="flex flex-col gap-5 sm:flex-row">
        <SelectClassroom />
        <SelectSubject />
        <SelectDate />
      </form>
    </div>
  );
};

export default AttendanceForm;
