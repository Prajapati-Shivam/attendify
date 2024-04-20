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

const faculties = [
  { value: 'faculty1', label: 'Faculty 1' },
  { value: 'faculty2', label: 'Faculty 2' },
  { value: 'faculty3', label: 'Faculty 3' },
  { value: 'faculty4', label: 'Faculty 4' },
  { value: 'faculty5', label: 'Faculty 5' },
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
            ? faculties.find(faculty => faculty.value === value)?.label
            : 'Select faculty...'}
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search faculty..." />
          <CommandEmpty>No faculty found.</CommandEmpty>
          <CommandGroup>
            {faculties.map(faculty => (
              <CommandItem
                key={faculty.value}
                value={faculty.value}
                onSelect={currentValue => {
                  setValue(currentValue === value ? '' : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === faculty.value ? 'opacity-100' : 'opacity-0',
                  )}
                />
                {faculty.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default FacultyInput;
