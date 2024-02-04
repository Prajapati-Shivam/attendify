"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  AreaChart,
  ChevronRightCircle,
  FileSpreadsheet,
  GraduationCap,
  LogOut,
  ScrollText,
} from "lucide-react";
import Link from "next/link";
import { useSessionStore } from "@/store";
import { usePathname } from "next/navigation";

const links = [
  {
    name: "Classroom",
    component: "classroom",
    logo: <GraduationCap />,
  },
  {
    name: "Attendance Sheet",
    component: "attendance_sheet",
    logo: <FileSpreadsheet />,
  },
  {
    name: "Dashboard",
    component: "dashboard",
    logo: <AreaChart />,
  },
  {
    name: "Report",
    component: "report",
    logo: <ScrollText />,
  },
];

export function Sidebar() {
  const { authUser } = useSessionStore();

  const pathname = usePathname();

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
            <Link
              href={link.component}
              key={link.name}
              className={`flex items-center space-x-4 text-sky-900 dark:text-sky-100 p-4 rounded-r-full transition-all duration-300  hover:font-bold  cursor-pointer ${
                pathname.includes(link.component)
                  ? "bg-gray-200 font-bold dark:bg-gray-800 text-indigo-600"
                  : "hover:dark:bg-gray-800 hover:bg-gray-200"
              }`}
            >
              <span>{link.logo}</span>
              <span>{link.name}</span>
            </Link>
          ))}
          {authUser.AuthUserAuthenticated && (
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
