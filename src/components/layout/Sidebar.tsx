'use client';

import {
  AreaChart,
  FileSpreadsheet,
  GraduationCap,
  LogOut,
  PanelRight,
  ScrollText,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { FaPeopleGroup } from 'react-icons/fa6';
import { MdOutlineMeetingRoom, MdOutlineSubject } from 'react-icons/md';
import { SiGotomeeting } from 'react-icons/si';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ConstAppDetails } from '@/constants/ConstAppDetails';
import { useSessionStore } from '@/store';

import ConfirmDialog from '../common/dialogs/ConfirmDialog';

const links = [
  {
    name: 'Dashboard',
    logo: <AreaChart />,
    route: '/',
  },
  {
    name: 'Sessions',
    logo: <MdOutlineMeetingRoom className="text-xl" />,
    route: '/sessions',
  },
  {
    name: 'Attendance Sheet',
    logo: <FileSpreadsheet />,
    route: '/attendance_sheet',
  },
  {
    name: 'Classes',
    logo: <GraduationCap />,
    route: '/classes',
  },
  {
    name: 'Courses',
    logo: <SiGotomeeting />,
    route: '/courses',
  },
  {
    name: 'Students',
    logo: <FaPeopleGroup className="text-lg" />,
    route: '/students',
  },
  {
    name: 'Faculties',
    logo: <FaChalkboardTeacher className="text-lg" />,
    route: '/faculties',
  },
  {
    name: 'Subjects',
    logo: <MdOutlineSubject className="text-lg" />,
    route: '/subjects',
  },
  {
    name: 'Report',
    logo: <ScrollText />,
    route: '/report',
  },
];

export function Sidebar() {
  const { authUser, userSignOut, institute } = useSessionStore();

  const pathname = usePathname();

  const router = useRouter();

  const [logoutConfirmModal, setLogoutConfirmModal] = useState(false);

  if (
    !authUser.AuthUserAuthenticated ||
    (authUser.AuthUserRole === 'admin' && !institute)
  )
    return <div></div>;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="fixed left-2 top-2 z-50 cursor-pointer p-2">
          <PanelRight size={25} />
        </div>
      </SheetTrigger>
      <SheetContent
        side={'left'}
        className="sidebar-scrollbar w-[80%] overflow-auto p-0 pb-12 sm:w-[300px]"
      >
        <SheetHeader>
          <SheetTitle className="p-4 text-2xl font-bold">
            {ConstAppDetails.APP_NAME}
          </SheetTitle>
        </SheetHeader>
        <div>
          {links.map(link => (
            <SheetClose asChild key={link.name}>
              <Link
                href={link.route}
                className={`flex cursor-pointer items-center space-x-4 rounded-r-full p-4 text-sky-900 transition-all duration-300  hover:font-bold  dark:text-sky-100 ${
                  pathname === link.route
                    ? 'bg-gray-200 font-bold text-indigo-600 dark:bg-gray-800'
                    : 'hover:bg-gray-200 hover:dark:bg-gray-800'
                }`}
              >
                <span className="flex w-6 items-center justify-center">
                  {link.logo}
                </span>
                <span>{link.name}</span>
              </Link>
            </SheetClose>
          ))}
          {authUser.AuthUserAuthenticated && (
            <div
              onClick={() => setLogoutConfirmModal(true)}
              className="flex cursor-pointer items-center space-x-4 rounded-r-full p-4 text-sky-900 transition-all duration-300 hover:bg-gray-200 hover:font-bold dark:text-sky-100 hover:dark:bg-gray-800"
            >
              <span>
                <LogOut />
              </span>
              <span>Logout</span>
            </div>
          )}
          <ConfirmDialog
            positiveCallback={() => {
              userSignOut();
              router.push('/login');
            }}
            open={logoutConfirmModal}
            setOpened={setLogoutConfirmModal}
          >
            <div>Are you sure to logout?</div>
          </ConfirmDialog>
        </div>
      </SheetContent>
    </Sheet>
  );
}
