import { ClassroomDataTable } from '@/components/classroom/ClassroomDataTable';

const Dashboard = () => {
  return (
    <div className="h-max">
      <div className="px-5 py-8 sm:px-12 lg:px-20">
        <h2 className="text-2xl font-semibold text-indigo-500">Dashboard</h2>
        <p>This is dashboard page</p>

        <div className="mt-10 bg-white p-4 dark:bg-gray-800">
          <ClassroomDataTable />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
