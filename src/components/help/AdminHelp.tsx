import Link from 'next/link';
import React from 'react';

const url = 'http://attendlytics.vercel.app' || 'http://localhost:3000';
const links = [
  {
    title: 'Create Course',
    desc: 'Set up courses offered by your institution. Define course names, descriptions, and relevant details.',
    url: `${url}/courses`,
  },
  {
    title: 'Create Class',
    desc: 'Organize classes within each course. Assign instructors, specify timings, and manage class schedules.',
    url: `${url}/classes`,
  },
  {
    title: 'Create Student',
    desc: 'Add students enrolled in your institution. Record their personal information and assign them to specific courses and classes.',
    url: `${url}/students`,
  },
  {
    title: 'Create Faculty',
    desc: 'Add faculty members responsible for teaching courses. Include their qualifications, contact details, and areas of expertise.',
    url: `${url}/faculties`,
  },
  {
    title: 'Create Subject',
    desc: 'Define subjects or modules within each course. Specify subject names, codes, and other relevant details.',
    url: `${url}/subjects`,
  },
  {
    title: 'Create Session',
    desc: 'Schedule sessions for classes, exams, or other activities. Specify dates, timings, and locations for each session.',
    url: `${url}/sessions`,
  },
];

const AdminHelp = () => {
  return (
    <div className="mx-auto p-4">
      <h1 className="mb-4 text-3xl font-bold">
        Getting Started with Attendlytics
      </h1>
      <p className="mb-4">
        Upon successful login, you will be directed to the Institution page. If
        you have already created the institute you will be redirected to the
        dashboard.
      </p>
      <h2 className="mb-2 text-2xl font-bold">Next Steps:</h2>
      <p className="mb-4">
        After creating your institution, you can proceed to set up various
        components within Attendlytics:
      </p>
      <ul className="mb-4 list-disc">
        {links.map((link, index) => (
          <li key={index} className="mb-4 flex items-center gap-2">
            <Link
              className="text-lg font-semibold text-blue-500 hover:underline"
              href={link.url}
            >
              {link.title}:
            </Link>
            <p>{link.desc}</p>
          </li>
        ))}
      </ul>

      <p className="mb-4">
        By following these steps, you can effectively set up Attendlytics for
        your institution and streamline administrative tasks, student tracking,
        and manage attendance.
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

export default AdminHelp;
