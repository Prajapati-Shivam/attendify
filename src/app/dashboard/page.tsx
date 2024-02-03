import { Sidebar } from "@/components/Sidebar";
import { ClassroomDataTable } from "@/components/classroom/ClassroomDataTable";
import { CreateClass } from "@/components/classroom/CreateClass";

type Props = {};

const Dashboard = (props: Props) => {
  return (
    <div className="h-[calc(100vh-60px)]">
      <Sidebar />
      <div className="py-8 px-5 sm:px-12 lg:px-20">
        <h2 className="text-2xl text-indigo-500 font-semibold">Dashboard</h2>
        <p>This is dashboard page</p>

        <div className="mt-10 p-4 bg-white dark:bg-gray-800">
          <ClassroomDataTable />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
