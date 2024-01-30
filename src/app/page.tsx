"use client";
import AttendanceSheet from "@/components/dataComponent/AttendanceSheet";
import Dashboard from "@/components/dataComponent/Dashboard";
import Report from "@/components/dataComponent/Report";
import Classroom from "@/components/dataComponent/Classroom";
import {
  AreaChart,
  FileSpreadsheet,
  GraduationCap,
  ScrollText,
} from "lucide-react";
import { useComponentStore } from "@/store";
import { Sidebar } from "@/components/Sidebar";

export default function Home() {
  const links = [
    {
      name: "Classroom",
      component: "Classroom",
      logo: <GraduationCap />,
    },
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
  ];

  const selectedComponent = useComponentStore((state) => state.component);
  return (
    <div className="h-[calc(100vh-60px)]">
      <Sidebar />
      <div className="py-8 px-12">
        {/* Render content based on the selectedLink */}
        {selectedComponent === "Dashboard" && <Dashboard />}
        {selectedComponent === "AttendanceSheet" && <AttendanceSheet />}
        {selectedComponent === "Report" && <Report />}
        {selectedComponent === "Classroom" && <Classroom />}
      </div>
    </div>
  );
}
