import React from "react";
import { Route, Routes } from "react-router-dom";
import ProtectRoutes from "../Components/ProtectRoutes";
import Home from "./Home";
import LogIn from "./LogIn";
import Register from "./Register";

function Router() {
  return (
    <Routes>
      <Route element={<ProtectRoutes />}>
        <Route path="/" element={<Home />} />
      </Route>

      <Route path="/login" element={<LogIn />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default Router;
