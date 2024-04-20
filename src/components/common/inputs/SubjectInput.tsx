'use client';

import { Check, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';

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

const frameworks = [
  {
    value: 'next.js',
    label: 'Next.js',
  },
  {
    value: 'sveltekit',
    label: 'SvelteKit',
  },
  {
    value: 'nuxt.js',
    label: 'Nuxt.js',
  },
  {
    value: 'remix',
    label: 'Remix',
  },
  {
    value: 'astro',
    label: 'Astro',
  },
];

const subjects = [
  {
    value: 'math',
    label: 'Math',
  },
  {
    value: 'science',
    label: 'Science',
  },
  {
    value: 'history',
    label: 'History',
  },
  {
    value: 'english',
    label: 'English',
  },
  {
    value: 'spanish',
    label: 'Spanish',
  },
];

const SubjectInput = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between border-inputBorderLight hover:bg-background dark:border-inputBorderDark dark:bg-primaryVariantDark"
        >
          {/* {value
            ? frameworks.find(framework => framework.value === value)?.label
            : 'Select framework...'} */}
          {value
            ? subjects.find(subject => subject.value === value)?.label
            : 'Select subject...'}
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search Subject..." />
          <CommandEmpty>No subject found.</CommandEmpty>
          <CommandGroup>
            {subjects.map(subject => (
              <CommandItem
                key={subject.value}
                value={subject.value}
                onSelect={currentValue => {
                  setValue(currentValue === value ? '' : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === subject.value ? 'opacity-100' : 'opacity-0',
                  )}
                />
                {subject.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
export default SubjectInput;
