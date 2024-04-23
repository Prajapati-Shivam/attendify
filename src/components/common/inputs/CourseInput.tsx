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

const courses = [
  { id: 1, name: 'Course 1' },
  { id: 2, name: 'Course 2' },
  { id: 3, name: 'Course 3' },
  { id: 4, name: 'Course 4' },
  { id: 5, name: 'Course 5' },
];

const CourseInput = (props: Props) => {
  return (
    <Select
      onValueChange={props.field.onChange}
      defaultValue={props.field.value}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select course" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Course</SelectLabel>
          {courses.map(item => (
            <SelectItem key={item.id} value={item.id.toString()}>
              {item.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CourseInput;
