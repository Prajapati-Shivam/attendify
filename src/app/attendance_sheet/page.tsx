import AttendanceForm from '@/components/attendance_sheet/AttendanceForm';
import { StudentList } from '@/components/attendance_sheet/StudentList';
import { Button } from '@/components/ui/button';

const AttendanceSheet = () => {
  return (
    <div className="h-max">
      <div className="px-5 py-8 sm:px-12 lg:px-20">
        <h2 className="mb-8 text-2xl font-semibold text-indigo-500">
          Attendance
        </h2>
        <AttendanceForm />
        <div className="mt-10 bg-white p-5 dark:bg-gray-800">
          <h3 className="text-2xl font-medium">Attendance Sheet</h3>
          <StudentList />
          <Button className="hover:bg-indigo-600/90">Submit</Button>
        </div>
      </div>
    </div>
  );
};

export default AttendanceSheet;
