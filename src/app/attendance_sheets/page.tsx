import AttendanceForm from '@/components/attendance_sheet/AttendanceForm';
import { AttendanceList } from '@/components/attendance_sheet/AttendanceList';
import PageContainer from '@/components/common/Containers/PageContainer';
import PageHeader from '@/components/common/Containers/PageHeader';

const AttendanceSheet = () => {
  return (
    <PageContainer>
      <PageHeader>Attendance</PageHeader>
      <AttendanceForm />
      <div className="mt-10 bg-white p-5 dark:bg-gray-800">
        {/* <h3 className="text-2xl font-medium">Attendance Sheet</h3> */}
        <AttendanceList />
      </div>
    </PageContainer>
  );
};

export default AttendanceSheet;
