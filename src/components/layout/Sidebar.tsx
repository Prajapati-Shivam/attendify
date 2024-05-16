/* eslint-disable no-nested-ternary */

'use client';

import {
  AreaChart,
  FileSpreadsheet,
  GraduationCapIcon,
  HelpCircle,
  Hourglass,
  LayoutList,
  LibraryBig,
  LogOut,
  PanelRightClose,
  Presentation,
  ScrollText,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

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
    name: 'Courses',
    logo: <LayoutList />,
    route: '/courses',
  },
  {
    name: 'Classes',
    logo: <Presentation />,
    route: '/classes',
  },
  {
    name: 'Subjects',
    logo: <LibraryBig />,
    route: '/subjects',
  },
  {
    name: 'Students',
    logo: <GraduationCapIcon />,
    route: '/students',
  },
  {
    name: 'Faculties',
    logo: <Users />,
    route: '/faculties',
  },
  {
    name: 'Sessions',
    logo: <Hourglass />,
    route: '/sessions',
  },
  {
    name: 'Attendance Sheet',
    logo: <FileSpreadsheet />,
    route: '/attendance_sheets',
  },

  {
    name: 'Report',
    logo: <ScrollText />,
    route: '/report',
  },
  {
    name: 'Help',
    logo: <HelpCircle />,
    route: '/help',
  },
];

const studentPortalLinks = [
  {
    name: 'My Sessions',
    logo: <GraduationCapIcon />,
    route: '/student_portal',
  },
];

const facultyPortalLinks = [
  {
    name: 'My Sessions',
    logo: <GraduationCapIcon />,
    route: '/faculty_portal',
  },
  {
    name: 'Attendance Sheet',
    logo: <FileSpreadsheet />,
    route: '/faculty_portal/attendance_sheets',
  },
];

export function Sidebar() {
  const { authUser, userSignOut } = useSessionStore();

  const pathname = usePathname();

  const router = useRouter();

  const [logoutConfirmModal, setLogoutConfirmModal] = useState(false);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="fixed left-2 top-2 z-50 cursor-pointer p-2">
          <PanelRightClose size={25} />
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
          {(authUser.AuthUserRole === 'admin'
            ? links
            : authUser.AuthUserRole === 'student'
              ? studentPortalLinks
              : authUser.AuthUserRole === 'faculty'
                ? facultyPortalLinks
                : links
          ).map(link => (
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
