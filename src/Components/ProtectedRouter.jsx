import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRouter({ children }) {
  return localStorage.getItem("valid") ? children : <Navigate to={"/"} />;
}

export default ProtectedRouter;
