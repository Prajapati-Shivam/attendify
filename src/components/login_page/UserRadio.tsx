import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export function UserRadio() {
  return (
    <RadioGroup
      defaultValue="admin"
      className="flex flex-col gap-x-4 sm:flex-row"
    >
      <div className="flex flex-1 cursor-pointer items-center space-x-2 rounded-md border border-indigo-500 bg-slate-100 p-4 dark:bg-slate-900">
        <RadioGroupItem value="admin" id="admin" />
        <Label htmlFor="admin">Admin</Label>
      </div>
      <div className="flex flex-1 cursor-pointer items-center space-x-2 rounded-md border border-indigo-500 bg-slate-100 p-4 dark:bg-slate-900">
        <RadioGroupItem value="faculty" id="faculty" />
        <Label htmlFor="faculty">Faculty</Label>
      </div>
      <div className="flex flex-1 cursor-pointer items-center space-x-2 rounded-md border border-indigo-500 bg-slate-100 p-4 dark:bg-slate-900">
        <RadioGroupItem value="student" id="student" />
        <Label htmlFor="student">Student</Label>
      </div>
    </RadioGroup>
  );
}
