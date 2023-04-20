import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../../components/organisme/Header";

const MainApp = () => {
  return (
    <div className="relative ">
      <div className="fixed w-screen z-10">
        <Navbar />
      </div>
      <div className="">
        <Outlet />
      </div>
    </div>
  );
};

export default MainApp;
