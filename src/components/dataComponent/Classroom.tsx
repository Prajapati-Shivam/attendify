import React from "react";
import { Button } from "../ui/button";
import { CreateClass } from "../CreateClass";
import { ClassroomDataTable } from "../ClassroomDataTable";

type Props = {};
const classroom = 3;
const Classroom = (props: Props) => {
  return (
    <div>
      <h2 className="text-2xl text-indigo-500 font-semibold">Classroom</h2>
      <CreateClass />
      {classroom > 0 && (
        <div className="mt-10">
          <ClassroomDataTable />
        </div>
      )}
    </div>
  );
};

export default Classroom;
