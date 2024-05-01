'use client';

import { useRouter } from 'next/navigation';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const data = [
  {
    className: 'Class 1',
    subjectName: 'Maths',
    facultyName: 'John Doe',
    totalStudent: 30,
    studentPresent: 25,
    status: 'pending',
  },
  {
    className: 'Class 2',
    subjectName: 'Science',
    facultyName: 'Jane Doe',
    totalStudent: 30,
    studentPresent: 25,
    status: 'completed',
  },
  {
    className: 'Class 3',
    subjectName: 'English',
    facultyName: 'John Doe',
    totalStudent: 30,
    studentPresent: 25,
    status: 'pending',
  },
  {
    className: 'Class 4',
    subjectName: 'History',
    facultyName: 'Jane Doe',
    totalStudent: 30,
    studentPresent: 25,
    status: 'completed',
  },
];

export function AttendanceList() {
  const navigate = useRouter();
  return (
    <Table>
      <TableHeader>
        <TableRow className="text-nowrap">
          <TableHead className="text-start">Class Name</TableHead>
          <TableHead>Subject Name</TableHead>
          <TableHead>Faculty Name</TableHead>
          <TableHead>No. of Student Present</TableHead>
          <TableHead>Total Student</TableHead>
          <TableHead className="text-right">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow
            key={index}
            className="cursor-pointer text-center transition-colors duration-200 ease-in-out hover:bg-gray-200 hover:dark:bg-gray-700 sm:text-start"
            onClick={() => {
              if (item.status === 'pending') {
                navigate.push('/attendance_sheets/take_attendance');
              } else {
                navigate.push(`/attendance_sheets/${index}`);
              }
            }}
          >
            <TableCell>{item.className}</TableCell>
            <TableCell>{item.subjectName}</TableCell>
            <TableCell>{item.facultyName}</TableCell>
            <TableCell>{item.studentPresent}</TableCell>
            <TableCell>{item.totalStudent}</TableCell>
            <TableCell className="text-right">{item.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
