import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const classrooms = [
  {
    name: "Classroom 1",
    subject: 4,
    student: 150,
  },
  {
    name: "Classroom 2",
    subject: 6,
    student: 200,
  },
  {
    name: "Classroom 3",
    subject: 3,
    student: 100,
  },
];

export function ClassroomDataTable() {
  return (
    <Table>
      <TableCaption>A list of your recent Classrooms.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[120px]">Name</TableHead>
          <TableHead>No. of Subject</TableHead>
          <TableHead className="text-right">Total Student</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {classrooms.map((classroom) => (
          <TableRow key={classroom.name}>
            <TableCell className="font-medium">{classroom.name}</TableCell>
            <TableCell>{classroom.subject}</TableCell>
            <TableCell className="text-right">{classroom.student}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
