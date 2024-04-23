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

const subject = [
  { id: 1, name: 'Subject 1' },
  { id: 2, name: 'Subject 2' },
  { id: 3, name: 'Subject 3' },
  { id: 4, name: 'Subject 4' },
  { id: 5, name: 'Subject 5' },
];

const SubjectInput = (props: Props) => {
  return (
    <Select
      onValueChange={props.field.onChange}
      defaultValue={props.field.value}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select Subject" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Subject</SelectLabel>
          {subject.map(item => (
            <SelectItem key={item.id} value={item.name}>
              {item.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SubjectInput;
