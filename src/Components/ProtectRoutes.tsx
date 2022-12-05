import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectRoutes() {
  if (!localStorage.getItem(`token`)) {
   return <Navigate to={`/login`} />;
  }
  return <Outlet />;
}

export default ProtectRoutes;
