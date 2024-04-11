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

const generateYears = () => {
  const years = [];
  const currentYear = new Date().getFullYear();
  for (let i = currentYear; i >= 2010; i -= 1) {
    years.push(i);
  }
  return years;
};

const SelectYear = (props: Props) => {
  return (
    <Select
      onValueChange={props.field.onChange}
      defaultValue={props.field.value}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select year" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Year</SelectLabel>
          {generateYears().map(year => (
            <SelectItem key={year} value={year.toString()}>
              {year}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectYear;
