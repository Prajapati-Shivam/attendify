import { Sidebar } from "@/components/Sidebar";
import AttendanceForm from "@/components/attendance_sheet/AttendanceForm";
import { StudentList } from "@/components/attendance_sheet/StudentList";
import { Button } from "@/components/ui/button";
type Props = {};

const AttendanceSheet = (props: Props) => {
  return (
    <div className="h-[calc(100vh-60px)]">
      <Sidebar />
      <div className="py-8 px-5 sm:px-12 lg:px-20">
        <h2 className="text-2xl text-indigo-500 font-semibold mb-8">
          Attendace
        </h2>
        <AttendanceForm />
        <div className="p-5 mt-10 bg-white dark:bg-gray-800">
          <h3 className="text-2xl font-medium">Attendance Sheet</h3>
          <StudentList />
          <Button className="hover:bg-indigo-600/90">Submit</Button>
        </div>
      </div>
    </div>
  );
};

export default AttendanceSheet;
