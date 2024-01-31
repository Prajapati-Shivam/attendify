import React from "react";
import AttendanceForm from "../AttendanceForm";
import { Button } from "../ui/button";
import { StudentList } from "../StudentList";

type Props = {};

const AttendanceSheet = (props: Props) => {
  return (
    <div>
      <h2 className="text-2xl text-indigo-500 font-semibold mb-8">Attendace</h2>
      <AttendanceForm />
      <div className="p-5 mt-10">
        <h3 className="text-2xl font-medium">Attendance Sheet</h3>
        <StudentList />
        <Button>Submit</Button>
      </div>
    </div>
  );
};

export default AttendanceSheet;
