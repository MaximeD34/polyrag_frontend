import React from "react";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

const [state, setState] = useState(false);

const MainLayout = () => {
  return (
    <>
      Test layout
      <Outlet />
    </>
  );
};

export default MainLayout;
