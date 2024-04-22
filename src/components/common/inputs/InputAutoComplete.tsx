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

interface InputAutoCompleteProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  data: { value: string; label: string }[];
  onSearchValueChange?: (e: string) => void;
}

const InputAutoComplete = ({
  setValue,
  value,
  data,
  onSearchValueChange,
}: InputAutoCompleteProps) => {
  const [open, setOpen] = React.useState(false);

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
            ? data.find(datum => datum.value === value)?.label
            : 'Select a course'}
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search course..." />
          <CommandEmpty>No course found.</CommandEmpty>
          <CommandGroup>
            {data.map(datum => (
              <CommandItem
                key={datum.value}
                value={datum.label}
                onSelect={currentValue => {
                  setValue(currentValue === value ? '' : currentValue);
                  if (onSearchValueChange) {
                    onSearchValueChange(currentValue);
                  }
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === datum.value ? 'opacity-100' : 'opacity-0',
                  )}
                />
                {datum.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default InputAutoComplete;
