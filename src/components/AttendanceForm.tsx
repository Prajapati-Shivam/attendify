import React from "react";
import { SelectClassroom } from "./selectInput/SelectClassroom";
import { SelectSubject } from "./selectInput/SelectSubject";
import { SelectDate } from "./selectInput/SelectDate";
import { Button } from "./ui/button";

type Props = {};

const AttendanceForm = (props: Props) => {
  return (
    // Create form with dropdown menu for Classroom, subject and date
    <div className="border-2 rounded-md border-white p-4">
      <form action="" className="flex gap-5">
        <SelectClassroom />
        <SelectSubject />
        <SelectDate />
        <Button variant="secondary">Get Attendance Sheet</Button>
      </form>
    </div>
  );
};

export default AttendanceForm;
