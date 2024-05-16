import React from "react";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

const [state, setState] = useState(false);

const navigation = [
  { title: "Features", path: "javascript:void(0)" },
  { title: "Integrations", path: "javascript:void(0)" },
  { title: "Customers", path: "javascript:void(0)" },
  { title: "Pricing", path: "javascript:void(0)" }
]

const MainLayout = () => {
  return (
    <>
      Test layout
      <Outlet />
    </>
  );
};

export default MainLayout;
