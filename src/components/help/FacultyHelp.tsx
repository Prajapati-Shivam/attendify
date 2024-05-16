import Link from 'next/link';
import React from 'react';

const url = 'http://attendlytics.vercel.app' || 'http://localhost:3000';
const links = [
  {
    title: 'My Session',
    desc: 'View the upcoming sessions and whether an attendance sheet is generated or not.',
    url: `${url}/faculty_portal`,
  },
  {
    title: 'Attendance Sheet',
    desc: 'View the attendance sheet created for the session. You can share the QR code with the students for scanning and marking their attendance if it is pending. If the attendance has been taken, you can check the attendance details such as present students, absent students, total students, etc.',
    url: `${url}/faculty_portal/attendance_sheets`,
  },
];

const FacultyHelp = () => {
  return (
    <div className="mx-auto p-4">
      <h1 className="mb-4 text-3xl font-bold">
        Getting Started with Attendlytics
      </h1>
      <p className="mb-4">
        You will be provided with Email and Password to login to the
        Attendlytics by the Admin. After successful login, you will be directed
        to My Session Page
      </p>
      <h2 className="mb-2 text-2xl font-bold">Next Steps:</h2>
      <p className="mb-4">
        On My Session Page, you can view the upcoming sessions and attendance
      </p>
      <ul className="mb-4 list-inside list-disc">
        {links.map((link, index) => (
          <li key={index} className="mb-2">
            <Link
              className="text-nowrap text-lg font-semibold text-blue-500 hover:underline"
              href={link.url}
            >
              {link.title}:
            </Link>
            <p className="ml-6">{link.desc}</p>
          </li>
        ))}
      </ul>

      <p className="mb-4">
        By following these steps, you can easily use Attendlytics for managing
        and taking attendance of students.
      </p>
      <h2 className="mb-2 text-2xl font-bold">Contact</h2>
      <p className="mb-2">Still having trouble? Contact the developers:</p>
      <ul className="mb-4">
        <li>
          <Link
            className="text-blue-500 hover:underline"
            target="_blank"
            href="https://github.com/Yuvraj210103"
          >
            Yuvraj Singh
          </Link>
        </li>
        <li>
          <Link
            className="text-blue-500 hover:underline"
            target="_blank"
            href="https://github.com/Prajapati-Shivam"
          >
            Shivam Prajapati
          </Link>
        </li>
        <li>
          <Link
            className="text-blue-500 hover:underline"
            target="_blank"
            href="https://github.com/Shubham-7498"
          >
            Shubham Gupta
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default FacultyHelp;
