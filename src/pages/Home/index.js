import React from "react";

import { Sidebar } from "../../components/organisme";
import { Outlet } from "react-router-dom";
const Home = () => {
  return (
    <div>
      <div className="flex  h-screen mt">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
