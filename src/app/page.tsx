import { ClassroomDataTable } from '@/components/classroom/ClassroomDataTable';
import PageContainer from '@/components/common/Containers/PageContainer';

const Dashboard = () => {
  return (
    <PageContainer>
      <h2 className="text-2xl font-semibold text-indigo-500">Dashboard</h2>
      <p>This is dashboard page</p>

      <div className="mt-10 bg-white p-4 dark:bg-surfaceDark">
        <ClassroomDataTable />
      </div>
    </PageContainer>
  );
};

export default Dashboard;
