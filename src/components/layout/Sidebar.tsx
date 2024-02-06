'use client';

import {
  AreaChart,
  ChevronRightCircle,
  FileSpreadsheet,
  GraduationCap,
  LogOut,
  ScrollText,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useSessionStore } from '@/store';

const links = [
  {
    name: 'Dashboard',
    logo: <AreaChart />,
    route: '/',
  },
  {
    name: 'Classroom',
    logo: <GraduationCap />,
    route: '/classroom',
  },
  {
    name: 'Attendance Sheet',
    logo: <FileSpreadsheet />,
    route: '/attendance_sheet',
  },

  {
    name: 'Report',
    logo: <ScrollText />,
    route: '/report',
  },
];

export function Sidebar() {
  const { authUser, userSignOut } = useSessionStore();

  const pathname = usePathname();

  if (!authUser.AuthUserAuthenticated) return <div></div>;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="absolute -left-5 top-20 cursor-pointer p-2">
          <ChevronRightCircle size={35} />
        </div>
      </SheetTrigger>
      <SheetContent side={'left'} className="w-[80%] p-0 sm:w-[300px]">
        <SheetHeader>
          <SheetTitle className="p-4 text-2xl font-bold">Attendify</SheetTitle>
        </SheetHeader>
        <div className="">
          {links.map(link => (
            <Link
              href={link.route}
              key={link.name}
              className={`flex cursor-pointer items-center space-x-4 rounded-r-full p-4 text-sky-900 transition-all duration-300  hover:font-bold  dark:text-sky-100 ${
                pathname === link.route
                  ? 'bg-gray-200 font-bold text-indigo-600 dark:bg-gray-800'
                  : 'hover:bg-gray-200 hover:dark:bg-gray-800'
              }`}
            >
              <span>{link.logo}</span>
              <span>{link.name}</span>
            </Link>
          ))}
          {authUser.AuthUserAuthenticated && (
            <div
              onClick={userSignOut}
              className="flex cursor-pointer items-center space-x-4 rounded-r-full p-4 text-sky-900 transition-all duration-300 hover:bg-gray-200 hover:font-bold dark:text-sky-100 hover:dark:bg-gray-800"
            >
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
