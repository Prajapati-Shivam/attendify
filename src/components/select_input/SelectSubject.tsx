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
    name: 'Subject 1',
  },
  {
    id: 2,
    name: 'Subject 2',
  },
  {
    id: 3,
    name: 'Subject 3',
  },
  {
    id: 4,
    name: 'Subject 4',
  },
  {
    id: 5,
    name: 'Subject 5',
  },
];
export function SelectSubject() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a Subject" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Subjects</SelectLabel>
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
