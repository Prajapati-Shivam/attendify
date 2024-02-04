import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const students = [
  {
    studentId: '1',
    studentName: 'John Doe',
    status: 'Present',
  },
  {
    studentId: '2',
    studentName: 'Jane Doe',
    status: 'Present',
  },
  {
    studentId: '3',
    studentName: 'Peter',
    status: 'Absent',
  },
];

export function StudentList() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">#</TableHead>
          <TableHead>Student ID</TableHead>
          <TableHead>Student Name</TableHead>
          <TableHead className="text-right">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {students.map(student => (
          <TableRow key={student.studentId}>
            <TableCell className="font-medium">
              <input type="checkbox" name="status" id={student.studentId} />
            </TableCell>
            <TableCell>{student.studentId}</TableCell>
            <TableCell>{student.studentName}</TableCell>
            <TableCell className="text-right">{student.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
