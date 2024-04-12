import AttendanceForm from '@/components/attendance_sheet/AttendanceForm';
import { StudentList } from '@/components/attendance_sheet/StudentList';
import PageContainer from '@/components/common/Containers/PageContainer';
import { Button } from '@/components/ui/button';

const AttendanceSheet = () => {
  return (
    <PageContainer>
      <h2 className="mb-8 text-2xl font-semibold text-indigo-500">
        Attendance
      </h2>
      <AttendanceForm />
      <div className="mt-10 bg-white p-5 dark:bg-gray-800">
        <h3 className="text-2xl font-medium">Attendance Sheet</h3>
        <StudentList />
        <Button className="hover:bg-indigo-600/90">Submit</Button>
      </div>
    </PageContainer>
  );
};

export default AttendanceSheet;
