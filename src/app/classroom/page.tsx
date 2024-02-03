import { ClassroomDataTable } from "@/components/classroom/ClassroomDataTable";
import { CreateClass } from "@/components/classroom/CreateClass";

type Props = {};
const classroom = 3;
const Classroom = (props: Props) => {
  return (
    <div className="h-[calc(100vh-60px)]">
      <div className="py-8 px-5 sm:px-12 lg:px-20">
        <h2 className="text-2xl text-indigo-500 font-semibold">Classroom</h2>
        <CreateClass />
        {classroom > 0 && (
          <div className="mt-10 p-4 bg-white dark:bg-gray-800">
            <ClassroomDataTable />
          </div>
        )}
      </div>
    </div>
  );
};

export default Classroom;
