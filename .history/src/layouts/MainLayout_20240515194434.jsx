import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      Test layout
      <Outlet />
    </>
  );
};

export default MainLayout;
