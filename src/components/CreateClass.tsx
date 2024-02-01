import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ClassFormCard } from "./ClassFormCard";

export function CreateClass() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="hover:bg-indigo-600/90">Create classroom</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Classroom</DialogTitle>
          {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Name of your classroom" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="subject">Add Subject</Label>
                <Input id="subject" placeholder="Name of your subjects" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="batch">Add Batch</Label>
                <Input id="batch" placeholder="Name of your batch" />
              </div>
            </div>
          </form>
        </div>
        <DialogFooter>
          <Button type="submit">Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
