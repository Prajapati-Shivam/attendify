import React from "react";
import AttendanceForm from "../attendance_sheet/AttendanceForm";
import { Button } from "../ui/button";
import { StudentList } from "../attendance_sheet/StudentList";

type Props = {};

const AttendanceSheet = (props: Props) => {
  return (
    <div>
      <h2 className="text-2xl text-indigo-500 font-semibold mb-8">Attendace</h2>
      <AttendanceForm />
      <div className="p-5 mt-10 bg-white dark:bg-gray-800">
        <h3 className="text-2xl font-medium">Attendance Sheet</h3>
        <StudentList />
        <Button className="hover:bg-indigo-600/90">Submit</Button>
      </div>
    </div>
  );
};

export default AttendanceSheet;
