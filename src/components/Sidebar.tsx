import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useComponentStore } from "@/store";
import {
  AreaChart,
  ChevronRightCircle,
  FileSpreadsheet,
  GraduationCap,
  LogOut,
  ScrollText,
} from "lucide-react";

export function Sidebar() {
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
  const component = useComponentStore((state) => state.component);
  const setComponent = useComponentStore((state) => state.setComponent);
  const session = true;
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="absolute -left-5 top-20 p-2 cursor-pointer">
          <ChevronRightCircle size={35} />
        </div>
      </SheetTrigger>
      <SheetContent side={"left"} className="w-[80%] sm:w-[300px] p-0">
        <SheetHeader>
          <SheetTitle className="font-bold text-2xl p-4">Attendify</SheetTitle>
        </SheetHeader>
        <div className="">
          {links.map((link) => (
            <div
              key={link.name}
              className={`flex items-center space-x-4 text-sky-900 dark:text-sky-100 p-4 rounded-r-full transition-all duration-300 hover:bg-gray-200 hover:font-bold hover:dark:bg-gray-800 cursor-pointer ${
                component === link.component
                  ? "bg-gray-200 font-bold dark:bg-gray-800 text-indigo-600"
                  : ""
              }`}
              onClick={() => setComponent(link.component)}
            >
              <span>{link.logo}</span>
              <span>{link.name}</span>
            </div>
          ))}
          {session && (
            <div className="flex items-center space-x-4 text-sky-900 dark:text-sky-100 p-4 rounded-r-full transition-all duration-300 hover:bg-gray-200 hover:font-bold hover:dark:bg-gray-800 cursor-pointer">
              <span>
                <LogOut />
              </span>
              <span>Logout</span>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
