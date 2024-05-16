import React from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const generateYears = () => {
  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 5;
  const years = [];
  for (let i = 0; i < 10; i += 1) {
    years.push(startYear + i);
  }
  return years;
};
const YearInput = ({
  date,
  setDate,
}: {
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}) => {
  return (
    <Select
      onValueChange={value => {
        if (value) {
          setDate(new Date(value));
        }
      }}
      defaultValue={date ? date.getFullYear().toString() : undefined}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select Year" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {/* <SelectLabel>Faculty</SelectLabel> */}
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

export default YearInput;
