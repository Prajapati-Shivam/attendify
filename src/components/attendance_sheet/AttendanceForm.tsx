import React from "react";
import { SelectClassroom } from "../select_input/SelectClassroom";
import { SelectSubject } from "../select_input/SelectSubject";
import { SelectDate } from "../select_input/SelectDate";
import { Button } from "../ui/button";

type Props = {};

const AttendanceForm = (props: Props) => {
  return (
    // Create form with dropdown menu for Classroom, subject and date
    <div className="rounded-md bg-white dark:bg-gray-800 p-4">
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
