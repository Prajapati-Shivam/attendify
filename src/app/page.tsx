import { ClassroomDataTable } from '@/components/classroom/ClassroomDataTable';
import PageContainer from '@/components/common/Containers/PageContainer';
import PageHeader from '@/components/common/Containers/PageHeader';

const Dashboard = () => {
  return (
    <PageContainer>
      <PageHeader>Dashboard</PageHeader>
      <div className="mt-10 bg-white p-4 dark:bg-surfaceDark">
        <ClassroomDataTable />
      </div>
    </PageContainer>
  );
};

export default Dashboard;
