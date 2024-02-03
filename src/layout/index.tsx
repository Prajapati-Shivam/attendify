import React from "react";

import Footer from "./Footer";
import NavBar from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className=" flex w-full  flex-col overflow-x-hidden ">
      <NavBar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
