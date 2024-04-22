'use client';

import { Check, ChevronsUpDown } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

type Props = {
  field: any;
};

const courses = [
  { value: 'course1', label: 'Course 1' },
  { value: 'course2', label: 'Course 2' },
  { value: 'course3', label: 'Course 3' },
  { value: 'course4', label: 'Course 4' },
  { value: 'course5', label: 'Course 5' },
];

const FacultyInput = (props: Props) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between border-inputBorderLight hover:bg-background dark:border-inputBorderDark dark:bg-primaryVariantDark"
        >
          {value
            ? courses.find(course => course.value === value)?.label
            : 'Select course...'}
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search course..." />
          <CommandEmpty>No course found.</CommandEmpty>
          <CommandGroup>
            {courses.map(course => (
              <CommandItem
                key={course.value}
                value={course.value}
                onSelect={currentValue => {
                  setValue(currentValue === value ? '' : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === course.value ? 'opacity-100' : 'opacity-0',
                  )}
                />
                {course.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default FacultyInput;
