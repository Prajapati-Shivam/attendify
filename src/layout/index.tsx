import React from "react";

import Footer from "./Footer";
import NavBar from "./Navbar";
import { Sidebar } from "@/layout/Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const session = true;
const Layout = ({ children }: LayoutProps) => {
  return (
    <div className=" flex w-full  flex-col overflow-x-hidden ">
      <NavBar />
      {session && <Sidebar />}
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
