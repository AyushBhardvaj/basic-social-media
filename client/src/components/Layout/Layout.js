import { Box } from "@mui/material";
import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Box>
      <Header />
      <Outlet />
    </Box>
  );
};

export default Layout;
