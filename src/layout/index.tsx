"use client";
import React from "react";

import Footer from "./Footer";
import NavBar from "./Navbar";
import { Sidebar } from "@/layout/Sidebar";
import { useSessionStore } from "@/store";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { authUser } = useSessionStore();
  return (
    <div className=" flex w-full  flex-col overflow-x-hidden h-full">
      <NavBar />
      {authUser.AuthUserAuthenticated && <Sidebar />}
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
