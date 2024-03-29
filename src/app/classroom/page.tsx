import { ClassroomDataTable } from '@/components/classroom/ClassroomDataTable';
import { CreateClass } from '@/components/classroom/CreateClass';

const classroom = 3;
const Classroom = () => {
  return (
    <div className="h-max">
      <div className="px-5 py-8 sm:px-12 lg:px-20">
        <h2 className="text-2xl font-semibold text-indigo-500">Classroom</h2>
        <CreateClass />
        {classroom > 0 && (
          <div className="mt-10 bg-white p-4 dark:bg-gray-800">
            <ClassroomDataTable />
          </div>
        )}
      </div>
    </div>
  );
};

export default Classroom;
