import React from "react";
import { Button } from "../ui/button";
import { CreateClass } from "../CreateClass";

type Props = {};

const Classroom = (props: Props) => {
  return (
    <div>
      <h2 className="text-2xl text-indigo-500 font-semibold">Classroom</h2>
      <CreateClass />
    </div>
  );
};

export default Classroom;
