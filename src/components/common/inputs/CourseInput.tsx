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
import useFetchCourses from '@/hooks/fetch/useFetchCourses';

type Props = {
  field: any;
};

const CourseInput = (props: Props) => {
  const { data: courses } = useFetchCourses({});
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
            <SelectItem key={item.CourseId} value={item.CourseId}>
              {item.CourseShortName}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CourseInput;
