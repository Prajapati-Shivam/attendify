import React from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Props = {
  field: any;
};

const faculty = [
  { id: 1, name: 'Faculty 1' },
  { id: 2, name: 'Faculty 2' },
  { id: 3, name: 'Faculty 3' },
  { id: 4, name: 'Faculty 4' },
  { id: 5, name: 'Faculty 5' },
];

const FacultyInput = (props: Props) => {
  return (
    <Select
      onValueChange={props.field.onChange}
      defaultValue={props.field.value}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select faculty" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Faculty</SelectLabel>
          {faculty.map(item => (
            <SelectItem key={item.id} value={item.name}>
              {item.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default FacultyInput;
