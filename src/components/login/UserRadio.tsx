import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface UserRadioProps {
  value: 'admin' | 'faculty' | 'student';
  setValue: React.Dispatch<
    React.SetStateAction<'admin' | 'faculty' | 'student'>
  >;
  disabled: boolean;
}

export function UserRadio({ setValue, value, disabled }: UserRadioProps) {
  if (window.innerWidth > 640) {
    return (
      <RadioGroup
        disabled={disabled}
        value={value}
        onValueChange={e => setValue(e as typeof value)}
        className="flex flex-col gap-x-4 sm:flex-row"
      >
        <label className="flex flex-1 cursor-pointer items-center space-x-2 rounded-md border border-indigo-500 bg-slate-100 p-4 dark:bg-slate-900">
          <RadioGroupItem value="admin" id="admin" />
          <Label htmlFor="admin">Admin</Label>
        </label>
        <label className="flex flex-1 cursor-pointer items-center space-x-2 rounded-md border border-indigo-500 bg-slate-100 p-4 dark:bg-slate-900">
          <RadioGroupItem value="faculty" id="faculty" />
          <Label htmlFor="faculty">Faculty</Label>
        </label>
        <label className="flex flex-1 cursor-pointer items-center space-x-2 rounded-md border border-indigo-500 bg-slate-100 p-4 dark:bg-slate-900">
          <RadioGroupItem value="student" id="student" />
          <Label htmlFor="student">Student</Label>
        </label>
      </RadioGroup>
    );
  }
  return (
    <Select
      disabled={disabled}
      value={value}
      onValueChange={e => setValue(e as typeof value)}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select User" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="admin">Admin</SelectItem>
        <SelectItem value="faculty">Faculty</SelectItem>
        <SelectItem value="student">Student</SelectItem>
      </SelectContent>
    </Select>
  );
}
