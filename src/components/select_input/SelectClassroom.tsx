import * as React from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Fetch data of classroom and subject from database and display it in the dropdown menu
// Dummpy Data
const classroom = [
  {
    id: 1,
    name: 'Classroom 1',
  },
  {
    id: 2,
    name: 'Classroom 2',
  },
  {
    id: 3,
    name: 'Classroom 3',
  },
  {
    id: 4,
    name: 'Classroom 4',
  },
  {
    id: 5,
    name: 'Classroom 5',
  },
];
export function SelectClassroom() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a Classroom" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Classrooms</SelectLabel>
          {/* <SelectItem value="apple">Apple</SelectItem> */}
          {classroom.map(item => {
            return (
              <SelectItem key={item.id} value={item.name}>
                {item.name}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
