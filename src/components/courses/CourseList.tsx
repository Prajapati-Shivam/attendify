import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const courses = [
  {
    courseId: 1,
    courseName: 'Course 1',
    courseShortName: 'C1',
    courseCreatedAt: '2021-10-10',
  },
  {
    courseId: 2,
    courseName: 'Course 2',
    courseShortName: 'C2',
    courseCreatedAt: '2021-10-10',
  },
  {
    courseId: 3,
    courseName: 'Course 3',
    courseShortName: 'C3',
    courseCreatedAt: '2021-10-10',
  },
];

export function CourseList() {
  return (
    <Table>
      {/* <TableCaption>A list of your recent Classrooms.</TableCaption> */}
      <TableHeader>
        <TableRow>
          <TableHead className="w-[120px]">ID</TableHead>
          <TableHead>Course Name</TableHead>
          <TableHead>Course Code</TableHead>
          <TableHead className="text-right">Created At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {courses.map(course => (
          <TableRow key={course.courseId}>
            <TableCell className="font-medium">{course.courseId}</TableCell>
            <TableCell>{course.courseName}</TableCell>
            <TableCell>{course.courseShortName}</TableCell>
            <TableCell className="text-right">
              {course.courseCreatedAt}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
