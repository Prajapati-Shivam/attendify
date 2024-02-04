import React from 'react';

import { SelectClassroom } from '../select_input/SelectClassroom';
import { SelectDate } from '../select_input/SelectDate';
import { SelectSubject } from '../select_input/SelectSubject';
import { Button } from '../ui/button';

const AttendanceForm = () => {
  return (
    // Create form with dropdown menu for Classroom, subject and date
    <div className="rounded-md bg-white p-4 dark:bg-gray-800">
      <form action="" className="flex gap-5">
        <SelectClassroom />
        <SelectSubject />
        <SelectDate />
        <Button className="hover:bg-indigo-600/90">Get Attendance Sheet</Button>
      </form>
    </div>
  );
};

export default AttendanceForm;
