"use client";
import AttendanceSheet from "@/components/dataComponent/AttendanceSheet";
import Dashboard from "@/components/dataComponent/Dashboard";
import Report from "@/components/dataComponent/Report";
import Student from "@/components/dataComponent/Student";
import {
  AreaChart,
  FileSpreadsheet,
  GraduationCap,
  ScrollText,
} from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [selectedComponent, setSelectedComponent] = useState("AttendanceSheet");
  const links = [
    {
      name: "Attendance Sheet",
      component: "AttendanceSheet",
      logo: <FileSpreadsheet />,
    },
    {
      name: "Dashboard",
      component: "Dashboard",
      logo: <AreaChart />,
    },

    {
      name: "Report",
      component: "Report",
      logo: <ScrollText />,
    },
    {
      name: "Student",
      component: "Student",
      logo: <GraduationCap />,
    },
  ];
  const handleClick = (comp: any) => {
    setSelectedComponent(comp);
  };
  return (
    <div className="h-[calc(100vh-60px)]">
      <div className="bg-white dark:bg-gray-950 h-[calc(100vh-60px)] w-[20%] pt-5 absolute space-y-4">
        {links.map((link) => (
          <div
            key={link.name}
            className={`flex items-center space-x-4 text-sky-900 dark:text-sky-100 p-4 rounded-r-full transition-all duration-300 hover:bg-gray-100 hover:font-bold hover:dark:bg-gray-100 hover:dark:text-indigo-600 hover:text-indigo-600 cursor-pointer ${
              selectedComponent === link.component
                ? "bg-gray-100 font-bold dark:bg-gray-100 dark:text-indigo-600 text-indigo-600"
                : ""
            }`}
            onClick={() => handleClick(link.component)}
          >
            <span>{link.logo}</span>
            <p>{link.name}</p>
          </div>
        ))}
      </div>
      <div className="ml-[20%] p-10">
        {/* Render content based on the selectedLink */}
        {selectedComponent === "Dashboard" && <Dashboard />}
        {selectedComponent === "AttendanceSheet" && <AttendanceSheet />}
        {selectedComponent === "Report" && <Report />}
        {selectedComponent === "Student" && <Student />}
      </div>
    </div>
  );
}
