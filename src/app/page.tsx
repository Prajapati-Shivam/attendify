"use client";
import AttendanceSheet from "@/components/dataComponent/AttendanceSheet";
import Dashboard from "@/components/dataComponent/Dashboard";
import Report from "@/components/dataComponent/Report";
import Classroom from "@/components/dataComponent/Classroom";
import { useComponentStore } from "@/store";
import { Sidebar } from "@/components/Sidebar";

export default function Home() {
  const selectedComponent = useComponentStore((state) => state.component);
  return (
    <div className="h-[calc(100vh-60px)]">
      <Sidebar />
      <div className="py-8 px-5 sm:px-12 lg:px-20">
        {/* Render content based on the selectedLink */}
        {selectedComponent === "Dashboard" && <Dashboard />}
        {selectedComponent === "AttendanceSheet" && <AttendanceSheet />}
        {selectedComponent === "Report" && <Report />}
        {selectedComponent === "Classroom" && <Classroom />}
      </div>
    </div>
  );
}
