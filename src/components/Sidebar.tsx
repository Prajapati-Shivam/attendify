import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  AreaChart,
  FileSpreadsheet,
  GraduationCap,
  ScrollText,
} from "lucide-react";

export function Sidebar({ selectedComponent, setSelectedComponent }: any) {
  const links = [
    {
      name: "Classroom",
      component: "Classroom",
      logo: <GraduationCap />,
    },
    {
      name: "Attendance Sheet",
      component: "AttendanceSheet",
      logo: <FileSpreadsheet />,
    },
    {
      name: "Dashboard",
      component: "Dashboard",
      logo: <AreaChart />,
    },
    {
      name: "Report",
      component: "Report",
      logo: <ScrollText />,
    },
  ];
  const handleClick = (comp: any) => {
    setSelectedComponent(comp);
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open</Button>
      </SheetTrigger>
      <SheetContent side={"left"}>
        <div className="bg-gray-300 z-30 dark:bg-gray-950 h-screen w-[20%] pt-5 absolute -left-72 space-y-4 shadow-md">
          {links.map((link) => (
            <div
              key={link.name}
              className={`flex items-center space-x-4 text-sky-900 dark:text-sky-100 p-4 rounded-r-full transition-all duration-300 hover:bg-gray-100 hover:font-bold hover:dark:bg-gray-100 hover:dark:text-indigo-600 hover:text-indigo-600 cursor-pointer ${
                selectedComponent === link.component
                  ? "bg-gray-100 font-bold dark:bg-gray-800 text-indigo-600"
                  : ""
              }`}
              onClick={() => handleClick(link.component)}
            >
              <span>{link.logo}</span>
              <p>{link.name}</p>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
