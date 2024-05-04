'use client';

import React from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export function SessionList() {
  const dummyData = [
    {
      id: 1,
      courseName: 'Course Name1',
      className: 'Class Name1',
      subjectName: 'Subject Name1',
      facultyName: 'Faculty Name1',
      attended: 'yes',
    },
    {
      id: 2,
      courseName: 'Course Name2',
      className: 'Class Name2',
      subjectName: 'Subject Name2',
      facultyName: 'Faculty Name2',
      attended: 'no',
    },
    {
      id: 3,
      courseName: 'Course Name3',
      className: 'Class Name3',
      subjectName: 'Subject Name3',
      facultyName: 'Faculty Name3',
      attended: 'yes',
    },
  ];

  return (
    <Table>
      <TableHeader>
        <TableRow className="text-nowrap">
          <TableHead>Class Name</TableHead>
          <TableHead>Subject Name</TableHead>
          <TableHead>Faculty Name</TableHead>
          <TableHead className="text-end">Attended</TableHead>
          <TableHead className="text-end"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {dummyData.map(data => (
          <TableRow key={data.id}>
            <TableCell>{data.className}</TableCell>
            <TableCell>{data.subjectName}</TableCell>
            <TableCell>{data.facultyName}</TableCell>
            <TableCell className="text-end">
              {data.attended === 'yes' ? 'Yes' : 'No'}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
