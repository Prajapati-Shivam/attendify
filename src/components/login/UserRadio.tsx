import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface UserRadioProps {
  value: 'admin' | 'faculty' | 'student';
  setValue: React.Dispatch<
    React.SetStateAction<'admin' | 'faculty' | 'student'>
  >;
  disabled: boolean;
}

export function UserRadio({ setValue, value, disabled }: UserRadioProps) {
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
