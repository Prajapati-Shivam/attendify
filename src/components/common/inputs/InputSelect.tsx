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

interface InputSelectProps {
  data: { label: string; value: string }[];
  value: string;
  onChange: (e: string) => void;
  placeholder?: string;
}

const InputSelect = ({
  data,
  onChange,
  value,
  placeholder,
}: InputSelectProps) => {
  return (
    <Select
      onValueChange={e => onChange(e === value ? '' : e)}
      defaultValue={value}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {data.length > 0 ? (
            data.map(item => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))
          ) : (
            <SelectLabel>No Data</SelectLabel>
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default InputSelect;
