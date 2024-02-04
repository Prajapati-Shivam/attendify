import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function UserRadio() {
  return (
    <RadioGroup
      defaultValue="admin"
      className="flex flex-col sm:flex-row gap-x-4"
    >
      <div className="flex items-center space-x-2 border border-indigo-500 bg-slate-100 dark:bg-slate-900 flex-1 p-4 rounded-md cursor-pointer">
        <RadioGroupItem value="admin" id="admin" />
        <Label htmlFor="admin">Admin</Label>
      </div>
      <div className="flex items-center space-x-2 border border-indigo-500 bg-slate-100 dark:bg-slate-900 flex-1 p-4 rounded-md cursor-pointer">
        <RadioGroupItem value="faculty" id="faculty" />
        <Label htmlFor="faculty">Faculty</Label>
      </div>
      <div className="flex items-center space-x-2 border border-indigo-500 bg-slate-100 dark:bg-slate-900 flex-1 p-4 rounded-md cursor-pointer">
        <RadioGroupItem value="student" id="student" />
        <Label htmlFor="student">Student</Label>
      </div>
    </RadioGroup>
  );
}
