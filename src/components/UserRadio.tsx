import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function UserRadio() {
  return (
    <RadioGroup defaultValue="student" className="flex flex-row gap-x-4">
      <div className="flex items-center space-x-2 border border-indigo-500 bg-slate-100 dark:bg-slate-900 flex-1 p-2 sm:p-4 rounded-md">
        <RadioGroupItem value="student" id="r1" />
        <Label htmlFor="r1">Student</Label>
      </div>
      <div className="flex items-center space-x-2 border border-indigo-500 bg-slate-100 dark:bg-slate-900 flex-1 p-2 sm:p-4 rounded-md">
        <RadioGroupItem value="teacher" id="r2" />
        <Label htmlFor="r2">Teacher</Label>
      </div>
    </RadioGroup>
  );
}
