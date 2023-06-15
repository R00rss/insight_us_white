import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import SideBar from "../Bars/SideBar";
import ValidateJWT from "./ValidateJWT";
const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <ValidateJWT>{children}</ValidateJWT>
      {/* {children} */}
      <Footer />
    </>
  );
};

export default Layout;
